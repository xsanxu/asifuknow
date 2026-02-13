import { Calendar, MapPin, IndianRupee, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Role {
  name: string;
  count: number;
  gender: string;
  pay: number;
}

interface Event {
  id: string;
  title?: string;
  city: string;
  area: string;
  venue: string;
  shift_date: string;
  shift_start: string;
  shift_end: string;
  roles: Role[];
  is_urgent: boolean;
  urgent_bonus?: number;
  filled_count: number;
  total_required: number;
  status: string;
  client_id: string;
}

interface EventCardProps {
  event: Event;
  clientInfo?: {
    full_name: string;
    company_name?: string;
    is_verified: boolean;
    rating_avg: number;
    payment_score: number;
  };
  showActions?: boolean;
  onApply?: (eventId: string, role: string) => void;
}

export default function EventCard({ event, clientInfo, showActions = true, onApply }: EventCardProps) {
  const mainRole = event.roles[0];
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="card p-6 hover:border-primary-300 border-2 border-transparent transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-wrap">
          {event.is_urgent && (
            <span className="badge bg-red-100 text-red-700 animate-pulse">
              <AlertCircle className="w-4 h-4 mr-1" />
              URGENT
            </span>
          )}
          {clientInfo?.is_verified && (
            <span className="badge bg-green-100 text-green-700">
              <CheckCircle className="w-4 h-4 mr-1" />
              Verified Client
            </span>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {mainRole.name.toUpperCase()} {mainRole.gender !== 'Any' && `(${mainRole.gender})`}
      </h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700">
          <Calendar className="w-4 h-4 mr-2 text-primary-600" />
          <span className="font-medium">
            {formatDate(event.shift_date)}, {formatTime(event.shift_start)} - {formatTime(event.shift_end)}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <MapPin className="w-4 h-4 mr-2 text-primary-600" />
          <span>{event.area}, {event.city}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <Users className="w-4 h-4 mr-2 text-primary-600" />
          <span>
            Need: {event.total_required} staff
            {event.filled_count > 0 && (
              <span className="ml-2 text-orange-600 font-medium">
                ({event.filled_count}/{event.total_required} confirmed)
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="bg-primary-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-2xl font-bold text-primary-600">
            <IndianRupee className="w-6 h-6" />
            <span>{mainRole.pay.toLocaleString('en-IN')}/shift</span>
          </div>
        </div>
        {event.urgent_bonus && (
          <div className="text-sm text-green-700 font-medium">
            + ₹{event.urgent_bonus} urgent bonus
          </div>
        )}
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Clock className="w-4 h-4 mr-1" />
          Pay within 48h guaranteed
        </div>
      </div>

      {clientInfo && (
        <div className="border-t pt-3 mb-4">
          <p className="text-sm text-gray-600">
            Client: <span className="font-medium">{clientInfo.company_name || clientInfo.full_name}</span>
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <span>Rating: {clientInfo.rating_avg.toFixed(1)}/5</span>
            <span>Pay-on-time: {clientInfo.payment_score}%</span>
          </div>
        </div>
      )}

      {showActions && (
        <div className="flex gap-2">
          <Link href={`/events/${event.id}`} className="flex-1 btn-outline text-center py-2">
            View Details
          </Link>
          {onApply && (
            <button
              onClick={() => onApply(event.id, mainRole.name)}
              className="flex-1 btn-primary py-2"
            >
              Apply Now
            </button>
          )}
        </div>
      )}

      {event.filled_count >= event.total_required * 0.7 && (
        <div className="mt-3 text-center text-sm text-orange-600 font-medium">
          Filling fast! {event.total_required - event.filled_count} spots left
        </div>
      )}
    </div>
  );
}
