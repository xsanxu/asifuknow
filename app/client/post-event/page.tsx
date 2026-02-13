'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { AlertTriangle } from 'lucide-react';

const ROLE_OPTIONS = ['Promoter', 'Usher/GRE', 'Server', 'Security', 'Backstage Runner', 'Setup/Teardown Crew', 'Other'];

interface RoleData {
  name: string;
  count: number;
  gender: string;
  pay: number;
}

export default function PostEventPage() {
  const router = useRouter();
  const { profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roles, setRoles] = useState<RoleData[]>([
    { name: 'Promoter', count: 1, gender: 'Any', pay: 1500 },
  ]);
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    area: '',
    venue: '',
    venue_address: '',
    shift_date: '',
    shift_start: '10:00',
    shift_end: '18:00',
    dress_code: '',
    reporting_time: '',
    meeting_point: '',
    language_requirements: [] as string[],
    food_provided: false,
    travel_allowance: '',
    special_instructions: '',
    is_urgent: false,
    urgent_bonus: '',
  });

  useEffect(() => {
    if (!authLoading && (!profile || profile.user_type !== 'client')) {
      router.push('/signup');
    }
  }, [profile, authLoading]);

  const addRole = () => {
    setRoles([...roles, { name: 'Promoter', count: 1, gender: 'Any', pay: 1500 }]);
  };

  const removeRole = (index: number) => {
    if (roles.length > 1) {
      setRoles(roles.filter((_, i) => i !== index));
    }
  };

  const updateRole = (index: number, field: keyof RoleData, value: any) => {
    const updated = [...roles];
    updated[index] = { ...updated[index], [field]: value };
    setRoles(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!profile) throw new Error('Not authenticated');

      const totalRequired = roles.reduce((sum, role) => sum + role.count, 0);

      const { data, error: insertError } = await supabase.from('events').insert({
        client_id: profile.id,
        title: formData.title || null,
        city: formData.city,
        area: formData.area,
        venue: formData.venue,
        venue_address: formData.venue_address,
        shift_date: formData.shift_date,
        shift_start: formData.shift_start,
        shift_end: formData.shift_end,
        roles: roles,
        dress_code: formData.dress_code,
        reporting_time: formData.reporting_time,
        meeting_point: formData.meeting_point,
        language_requirements: formData.language_requirements.length > 0 ? formData.language_requirements : null,
        food_provided: formData.food_provided,
        travel_allowance: formData.travel_allowance ? parseFloat(formData.travel_allowance) : null,
        special_instructions: formData.special_instructions || null,
        is_urgent: formData.is_urgent,
        urgent_bonus: formData.urgent_bonus ? parseFloat(formData.urgent_bonus) : null,
        status: 'active',
        filled_count: 0,
        total_required: totalRequired,
      }).select();

      if (insertError) throw insertError;

      await supabase
        .from('subscriptions')
        .update({
          events_posted_this_month: supabase.rpc('increment', { field: 'events_posted_this_month' }),
        })
        .eq('client_id', profile.id);

      alert('Event posted successfully!');
      router.push('/client/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to post event');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Post New Event</h1>
          <p className="text-gray-600">Fill out the details to start hiring verified staff</p>
        </div>

        {error && (
          <div className="card p-4 mb-6 bg-red-50 border-2 border-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Mall Promotion Event"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Bangalore"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g., Koramangala"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g., Phoenix Marketcity"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Venue Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.venue_address}
                  onChange={(e) => setFormData({ ...formData, venue_address: e.target.value })}
                  placeholder="Complete address with landmarks"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Date & Time</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.shift_date}
                  onChange={(e) => setFormData({ ...formData, shift_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.shift_start}
                  onChange={(e) => setFormData({ ...formData, shift_start: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.shift_end}
                  onChange={(e) => setFormData({ ...formData, shift_end: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Roles Required</h2>

            <div className="space-y-4">
              {roles.map((role, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={role.name}
                        onChange={(e) => updateRole(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {ROLE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                      <input
                        type="number"
                        min="1"
                        value={role.count}
                        onChange={(e) => updateRole(index, 'count', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={role.gender}
                        onChange={(e) => updateRole(index, 'gender', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="Any">Any</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pay (₹)</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={role.pay}
                          onChange={(e) => updateRole(index, 'pay', parseInt(e.target.value))}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        {roles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRole(index)}
                            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addRole}
                className="btn-outline w-full"
              >
                + Add Another Role
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dress Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.dress_code}
                  onChange={(e) => setFormData({ ...formData, dress_code: e.target.value })}
                  placeholder="e.g., Formal black shirt and pants"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reporting_time}
                    onChange={(e) => setFormData({ ...formData, reporting_time: e.target.value })}
                    placeholder="e.g., 9:30 AM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Point <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.meeting_point}
                    onChange={(e) => setFormData({ ...formData, meeting_point: e.target.value })}
                    placeholder="e.g., Main entrance, security desk"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="food_provided"
                    checked={formData.food_provided}
                    onChange={(e) => setFormData({ ...formData, food_provided: e.target.checked })}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="food_provided" className="ml-3 text-gray-700">
                    Food & Breaks Provided
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Allowance (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.travel_allowance}
                    onChange={(e) => setFormData({ ...formData, travel_allowance: e.target.value })}
                    placeholder="Optional"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions
                </label>
                <textarea
                  value={formData.special_instructions}
                  onChange={(e) => setFormData({ ...formData, special_instructions: e.target.value })}
                  placeholder="Any additional requirements or details"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_urgent"
                  checked={formData.is_urgent}
                  onChange={(e) => setFormData({ ...formData, is_urgent: e.target.checked })}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="is_urgent" className="ml-3 text-gray-700">
                  Mark as URGENT (adds urgent badge to listing)
                </label>
              </div>

              {formData.is_urgent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgent Bonus (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.urgent_bonus}
                    onChange={(e) => setFormData({ ...formData, urgent_bonus: e.target.value })}
                    placeholder="Extra amount for urgent filling"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
