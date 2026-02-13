'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, Users, CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'client' | 'staff'>('client');

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How CrewDirect Works
          </h1>
          <p className="text-xl text-gray-600">
            Simple, transparent, and reliable
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('client')}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'client'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            For Event Organizers
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'staff'
                ? 'bg-accent-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="w-5 h-5" />
            For Event Staff
          </button>
        </div>

        {activeTab === 'client' && (
          <div className="space-y-8">
            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Post Your Event</h3>
                  <p className="text-gray-600 mb-4">
                    Fill out a quick form with your event details: location, date, time, roles needed, and pay rate. Takes less than 2 minutes.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Specify exact roles (Promoter, Usher, Security, etc.)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Set gender requirements if needed
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Add urgent bonus for last-minute needs
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Matched with Verified Staff</h3>
                  <p className="text-gray-600 mb-4">
                    Our platform automatically notifies nearby qualified staff. Review applications and approve with one click.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      All staff are ID verified
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      See ratings and past work history
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Instant confirmation notifications
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Attendance Automatically</h3>
                  <p className="text-gray-600 mb-4">
                    Staff check in and out via GPS or QR code. You get automatic proof of attendance and hours worked.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      GPS verification at venue
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Digital timesheets generated automatically
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      No disputes about attendance
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Pay Within 48 Hours</h3>
                  <p className="text-gray-600 mb-4">
                    Once the shift ends, you have 48 hours to complete payment. Simple, transparent, and fair.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Clear payment deadline countdown
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Late payments affect your account rating
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Rate the staff after payment
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                Start Hiring Now
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="space-y-8">
            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-accent-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Browse Nearby Gigs</h3>
                  <p className="text-gray-600 mb-4">
                    See all available event opportunities in your city. Filter by role, pay, date, and distance from you.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Location-based job matching
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      See pay rates upfront
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      View client ratings and payment history
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-accent-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Apply with One Tap</h3>
                  <p className="text-gray-600 mb-4">
                    Simple application process. Click "Apply", choose your role, and you're done. Get instant confirmation when accepted.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      No lengthy forms or interviews
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Instant notifications when accepted
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Save favorite jobs to apply later
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-accent-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Check-In and Check-Out</h3>
                  <p className="text-gray-600 mb-4">
                    On event day, simply check in when you arrive and check out when you leave. Uses GPS or QR code for verification.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Easy mobile check-in process
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Proof of attendance automatically recorded
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Hours worked calculated automatically
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-accent-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Paid in 48 Hours</h3>
                  <p className="text-gray-600 mb-4">
                    Once you complete your shift, you're guaranteed payment within 48 hours. No waiting, no chasing clients.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      48-hour payment guarantee enforced
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Track payment status in real-time
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      Build your reputation for better opportunities
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/signup" className="btn-secondary text-lg px-8 py-4">
                Start Finding Work
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
