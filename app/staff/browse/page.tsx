'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import EventCard from '@/components/EventCard';
import { Filter, MapPin, Calendar, IndianRupee, Briefcase } from 'lucide-react';

const ROLE_OPTIONS = ['All Roles', 'Promoter', 'Usher/GRE', 'Server', 'Security', 'Backstage Runner', 'Setup/Teardown Crew'];

export default function BrowseGigsPage() {
  const router = useRouter();
  const { profile, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    role: 'All Roles',
    minPay: '',
    urgentOnly: false,
  });

  useEffect(() => {
    if (!authLoading && (!profile || profile.user_type !== 'staff')) {
      router.push('/signup');
      return;
    }

    if (profile) {
      loadEvents();
    }
  }, [profile, authLoading, filters]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('events')
        .select(`
          *,
          profiles:client_id (
            full_name,
            company_name,
            is_verified,
            rating_avg,
            payment_score
          )
        `)
        .eq('status', 'active')
        .gte('shift_date', new Date().toISOString().split('T')[0])
        .order('shift_date', { ascending: true });

      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }

      if (filters.urgentOnly) {
        query = query.eq('is_urgent', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      let filteredEvents = data || [];

      if (filters.minPay) {
        filteredEvents = filteredEvents.filter((event: any) => {
          const roles = event.roles as any[];
          return roles.some((role: any) => role.pay >= parseInt(filters.minPay));
        });
      }

      if (filters.role !== 'All Roles') {
        filteredEvents = filteredEvents.filter((event: any) => {
          const roles = event.roles as any[];
          return roles.some((role: any) => role.name === filters.role);
        });
      }

      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (eventId: string, role: string) => {
    if (!profile) return;

    try {
      const { data: existing } = await supabase
        .from('applications')
        .select('*')
        .eq('event_id', eventId)
        .eq('staff_id', profile.id)
        .maybeSingle();

      if (existing) {
        alert('You have already applied to this event');
        return;
      }

      const { error } = await supabase.from('applications').insert({
        event_id: eventId,
        staff_id: profile.id,
        role: role,
        status: 'pending',
      });

      if (error) throw error;

      alert('Application submitted successfully!');
      loadEvents();
    } catch (error: any) {
      alert(error.message || 'Failed to apply');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gigs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Browse Available Gigs
          </h1>
          <p className="text-gray-600">
            {events.length} event{events.length !== 1 ? 's' : ''} available near you
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="card p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  City
                </label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  placeholder="Search city..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <IndianRupee className="w-4 h-4 inline mr-1" />
                  Minimum Pay
                </label>
                <input
                  type="number"
                  value={filters.minPay}
                  onChange={(e) => setFilters({ ...filters, minPay: e.target.value })}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filters
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.urgentOnly}
                    onChange={(e) => setFilters({ ...filters, urgentOnly: e.target.checked })}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Urgent Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No gigs available</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new opportunities
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                clientInfo={event.profiles}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
