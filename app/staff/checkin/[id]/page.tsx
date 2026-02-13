'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { MapPin, Clock, CheckCircle, Camera } from 'lucide-react';

export default function CheckInPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  const { profile } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [attendance, setAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile && eventId) {
      loadEventAndAttendance();
    }
  }, [profile, eventId]);

  const loadEventAndAttendance = async () => {
    try {
      const [eventRes, attendanceRes] = await Promise.all([
        supabase.from('events').select('*').eq('id', eventId).single(),
        supabase
          .from('attendance')
          .select('*')
          .eq('event_id', eventId)
          .eq('staff_id', profile?.id)
          .maybeSingle(),
      ]);

      if (eventRes.error) throw eventRes.error;

      setEvent(eventRes.data);
      setAttendance(attendanceRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!profile || !event) return;

    try {
      setLoading(true);

      const roles = event.roles as any[];
      const mainRole = roles[0];

      if (attendance) {
        const { error } = await supabase
          .from('attendance')
          .update({
            check_in_time: new Date().toISOString(),
          })
          .eq('id', attendance.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('attendance').insert({
          event_id: eventId,
          staff_id: profile.id,
          check_in_time: new Date().toISOString(),
          amount_earned: mainRole.pay,
          payment_status: 'pending',
        });

        if (error) throw error;
      }

      alert('Checked in successfully!');
      await loadEventAndAttendance();
    } catch (error: any) {
      alert(error.message || 'Failed to check in');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!attendance) return;

    try {
      setLoading(true);

      const checkInTime = new Date(attendance.check_in_time);
      const checkOutTime = new Date();
      const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

      const { error } = await supabase
        .from('attendance')
        .update({
          check_out_time: checkOutTime.toISOString(),
          hours_worked: hoursWorked.toFixed(2),
          payment_due_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        })
        .eq('id', attendance.id);

      if (error) throw error;

      alert('Checked out successfully! Payment will be processed within 48 hours.');
      router.push('/staff/dashboard');
    } catch (error: any) {
      alert(error.message || 'Failed to check out');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {event.title || event.venue}
            </h1>
            <p className="text-gray-600">{event.city}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">
                  {new Date(event.shift_date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  {event.shift_start} - {event.shift_end}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">{event.venue}</p>
                <p className="text-sm text-gray-600">{event.venue_address}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Current Status</h3>
            {!attendance?.check_in_time && (
              <div className="text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">Ready to check in?</p>
                <button onClick={handleCheckIn} disabled={loading} className="btn-primary w-full">
                  <MapPin className="inline-block w-5 h-5 mr-2" />
                  Check In Now
                </button>
              </div>
            )}

            {attendance?.check_in_time && !attendance?.check_out_time && (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-700 font-medium mb-2">Checked In</p>
                <p className="text-sm text-gray-600 mb-4">
                  {new Date(attendance.check_in_time).toLocaleTimeString()}
                </p>
                <button onClick={handleCheckOut} disabled={loading} className="btn-primary w-full">
                  <CheckCircle className="inline-block w-5 h-5 mr-2" />
                  Check Out
                </button>
              </div>
            )}

            {attendance?.check_out_time && (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <p className="text-primary-600 font-medium mb-2">Shift Completed</p>
                <p className="text-sm text-gray-600 mb-1">
                  Check-in: {new Date(attendance.check_in_time).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Check-out: {new Date(attendance.check_out_time).toLocaleTimeString()}
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Hours Worked</p>
                  <p className="text-2xl font-bold text-gray-900">{attendance.hours_worked} hrs</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Payment will be processed within 48 hours of check-out completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
