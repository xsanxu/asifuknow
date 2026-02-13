'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Calendar, Users, Clock, AlertTriangle, CheckCircle, Plus, Star } from 'lucide-react';

export default function ClientDashboardPage() {
  const router = useRouter();
  const { profile, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    activeEvents: 0,
    upcomingEvents: 0,
    totalStaffHired: 0,
    pendingPayments: 0,
  });
  const [events, setEvents] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!profile || profile.user_type !== 'client')) {
      router.push('/signup');
      return;
    }

    if (profile) {
      loadDashboardData();
    }
  }, [profile, authLoading]);

  const loadDashboardData = async () => {
    if (!profile) return;

    try {
      setLoading(true);

      const [eventsRes, subscriptionRes, attendanceRes] = await Promise.all([
        supabase
          .from('events')
          .select('*')
          .eq('client_id', profile.id)
          .order('shift_date', { ascending: false })
          .limit(20),
        supabase
          .from('subscriptions')
          .select('*')
          .eq('client_id', profile.id)
          .maybeSingle(),
        supabase
          .from('attendance')
          .select('*, events!inner(*)')
          .eq('events.client_id', profile.id),
      ]);

      if (eventsRes.error) throw eventsRes.error;

      const allEvents = eventsRes.data || [];
      const activeEvents = allEvents.filter((e: any) => e.status === 'active');
      const upcomingEvents = allEvents.filter(
        (e: any) => new Date(e.shift_date) >= new Date() && e.status === 'active'
      );

      const pendingPayments = (attendanceRes.data || []).filter(
        (att: any) => att.payment_status === 'pending'
      ).length;

      const totalStaffHired = (attendanceRes.data || []).length;

      setStats({
        activeEvents: activeEvents.length,
        upcomingEvents: upcomingEvents.length,
        totalStaffHired,
        pendingPayments,
      });

      setEvents(allEvents);
      setSubscription(subscriptionRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {profile?.company_name || profile?.full_name}!
            </h1>
            <p className="text-gray-600">Manage your events and staff</p>
          </div>
          <Link href="/client/post-event" className="btn-primary flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-5 h-5" />
            Post New Event
          </Link>
        </div>

        {subscription?.plan === 'free' && subscription?.events_posted_this_month >= 2 && (
          <div className="card p-6 mb-8 bg-yellow-50 border-2 border-yellow-300">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Free Tier Limit Reached
                </h3>
                <p className="text-gray-700 mb-3">
                  You've posted 2 events this month. Upgrade to Starter Premium for unlimited events at just ₹150/month.
                </p>
                <Link href="/pricing" className="text-primary-600 font-semibold hover:text-primary-700">
                  View Pricing →
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-primary-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.activeEvents}</span>
            </div>
            <p className="text-gray-600 font-medium">Active Events</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</span>
            </div>
            <p className="text-gray-600 font-medium">Upcoming Events</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.totalStaffHired}</span>
            </div>
            <p className="text-gray-600 font-medium">Total Staff Hired</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.pendingPayments}</span>
            </div>
            <p className="text-gray-600 font-medium">Pending Payments</p>
          </div>
        </div>

        <div className="card p-6 mb-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6" />
                <span className="text-2xl font-bold">{profile?.rating_avg.toFixed(1)} / 5.0</span>
              </div>
              <p className="text-primary-100">
                Your Rating ({profile?.rating_count} reviews)
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold mb-1">{profile?.payment_score}%</div>
              <p className="text-primary-100">Pay-on-time Score</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Events</h2>

          {events.length === 0 ? (
            <div className="card p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-600 mb-6">
                Post your first event to start hiring verified staff
              </p>
              <Link href="/client/post-event" className="btn-primary">
                Post Your First Event
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event: any) => (
                <div key={event.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {event.title || event.venue}
                        </h3>
                        <span
                          className={`badge ${
                            event.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : event.status === 'completed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {event.status}
                        </span>
                        {event.is_urgent && (
                          <span className="badge bg-red-100 text-red-700">URGENT</span>
                        )}
                      </div>
                      <p className="text-gray-600">
                        {event.area}, {event.city} • {new Date(event.shift_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {event.filled_count}/{event.total_required}
                      </div>
                      <p className="text-sm text-gray-600">Staff confirmed</p>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <Link
                      href={`/client/event/${event.id}`}
                      className="btn-outline text-sm py-2"
                    >
                      View Details
                    </Link>
                    {event.status === 'active' && event.filled_count < event.total_required && (
                      <button className="btn-primary text-sm py-2">Need Replacement</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
