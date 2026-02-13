import Link from 'next/link';
import { Briefcase, Users, Shield, Clock, CheckCircle, TrendingUp, MapPin, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            India's Direct Event Manpower Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            No middlemen. Verified staff. 48-hour payment guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              <Briefcase className="inline-block mr-2 w-5 h-5" />
              Hire Event Staff
            </Link>
            <Link href="/signup" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              <Users className="inline-block mr-2 w-5 h-5" />
              Find Event Work
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-sm md:text-base">Verified Professionals</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">48h</div>
              <div className="text-gray-600 text-sm md:text-base">Payment Guarantee</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600 text-sm md:text-base">Events Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600 text-sm md:text-base">Cities Across India</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Two simple paths to success
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary-100 p-3 rounded-xl">
                  <Briefcase className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Event Organizers</h3>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Post Your Event</h4>
                    <p className="text-gray-600 text-sm">Complete the form in under 2 minutes</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Get Matched with Verified Staff</h4>
                    <p className="text-gray-600 text-sm">Review applications and approve instantly</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Track Attendance Automatically</h4>
                    <p className="text-gray-600 text-sm">GPS and QR code verification system</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Pay Within 48 Hours</h4>
                    <p className="text-gray-600 text-sm">Simple, transparent payment process</p>
                  </div>
                </div>
              </div>
              <Link href="/signup" className="btn-primary w-full mt-8">
                Start Hiring
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-accent-100 p-3 rounded-xl">
                  <Users className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Event Staff</h3>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Browse Nearby Gigs</h4>
                    <p className="text-gray-600 text-sm">Filter by location, role, and pay rate</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Apply with One Tap</h4>
                    <p className="text-gray-600 text-sm">Quick application process, instant confirmation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Check-In and Check-Out</h4>
                    <p className="text-gray-600 text-sm">Easy attendance tracking via app</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Get Paid in 48 Hours</h4>
                    <p className="text-gray-600 text-sm">Guaranteed payment after shift completion</p>
                  </div>
                </div>
              </div>
              <Link href="/signup" className="btn-secondary w-full mt-8">
                Find Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose CrewDirect?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The reliable platform for event manpower needs
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">All Staff Verified</h3>
              <p className="text-gray-600">
                Every professional is verified with ID and background checks for your safety
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">48-Hour Payment Guarantee</h3>
              <p className="text-gray-600">
                Staff get paid within 48 hours or clients face account restrictions
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Attendance Proof Required</h3>
              <p className="text-gray-600">
                GPS and QR code check-in system ensures accountability and transparency
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Replacement Guarantee</h3>
              <p className="text-gray-600">
                Staff can't make it? We'll find a replacement fast with our standby pool
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mutual Rating System</h3>
              <p className="text-gray-600">
                Both clients and staff rate each other to maintain quality and trust
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location-Based Matching</h3>
              <p className="text-gray-600">
                Find staff near your venue or gigs close to your location
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of event professionals and organizers across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg text-lg"
            >
              Sign Up Free
            </Link>
            <Link
              href="/how-it-works"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors duration-200 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
