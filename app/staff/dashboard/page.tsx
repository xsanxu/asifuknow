'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Calendar, IndianRupee, Briefcase, Star, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function StaffDashboardPage() {
  const router = useRouter();
  const { profile, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    pendingApplications: 0,
    upcomingShifts: 0,
    totalEarnings: 0,
    eventsCompleted: 0,
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!profile || profile.user_type !== 'staff')) {
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

      const [applicationsRes, attendanceRes] = await Promise.all([
        supabase
          .from('applications')
          .select(`
            *,
            events (
              *,
              profiles:client_id (full_name, company_name)
            )
          `)
          .eq('staff_id', profile.id)
          .order('applied_at', { ascending: false })
          .limit(10),
        supabase
          .from('attendance')
          .select('*')
          .eq('staff_id', profile.id),
      ]);

      if (applicationsRes.error) throw applicationsRes.error;
      if (attendanceRes.error) throw attendanceRes.error;

      const apps = applicationsRes.data || [];
      const pending = apps.filter((a: any) => a.status === 'pending');
      const accepted = apps.filter((a: any) => a.status === 'accepted');

      const totalEarnings = (attendanceRes.data || []).reduce(
        (sum: number, att: any) => sum + (att.amount_earned || 0),
        0
      );

      const eventsCompleted = (attendanceRes.data || []).filter(
        (att: any) => att.payment_status === 'paid'
      ).length;

      setStats({
        pendingApplications: pending.length,
        upcomingShifts: accepted.length,
        totalEarnings,
        eventsCompleted,
      });

      setApplications(apps);
      setUpcomingEvents(accepted.slice(0, 5));
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name}!
          </h1>
          <p className="text-gray-600">Here's your work summary</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.pendingApplications}</span>
            </div>
            <p className="text-gray-600 font-medium">Pending Applications</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.upcomingShifts}</span>
            </div>
            <p className="text-gray-600 font-medium">Upcoming Shifts</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <IndianRupee className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">
                {stats.totalEarnings.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-gray-600 font-medium">Total Earnings</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-primary-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.eventsCompleted}</span>
            </div>
            <p className="text-gray-600 font-medium">Events Completed</p>
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
              <div className="text-2xl font-bold mb-1">{profile?.events_completed}</div>
              <p className="text-primary-100">Total Events</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
              <Link href="/staff/browse" className="text-primary-600 font-medium hover:text-primary-700">
                Browse More →
              </Link>
            </div>

            <div className="space-y-4">
              {applications.length === 0 ? (
                <div className="card p-8 text-center">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No applications yet</p>
                  <Link href="/staff/browse" className="btn-primary">
                    Browse Available Gigs
                  </Link>
                </div>
              ) : (
                applications.slice(0, 5).map((app: any) => (
                  <div key={app.id} className="card p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {app.role} - {app.events?.city}
                      </h3>
                      <span
                        className={`badge ${
                          app.status === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : app.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {app.events?.venue} • {new Date(app.events?.shift_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Client: {app.events?.profiles?.company_name || app.events?.profiles?.full_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Shifts</h2>
            </div>

            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <div className="card p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No upcoming shifts</p>
                </div>
              ) : (
                upcomingEvents.map((app: any) => (
                  <div key={app.id} className="card p-4 border-l-4 border-green-500">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {app.role} - {app.events?.venue}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(app.events?.shift_date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      {app.events?.shift_start} - {app.events?.shift_end}
                    </div>
                    <div className="mt-3">
                      <Link
                        href={`/staff/checkin/${app.events?.id}`}
                        className="text-primary-600 font-medium text-sm hover:text-primary-700"
                      >
                        Check In →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/staff/browse" className="btn-primary text-lg px-8 py-4">
            <TrendingUp className="inline-block w-5 h-5 mr-2" />
            Find More Opportunities
          </Link>
        </div>
      </div>
    </div>
  );
}
