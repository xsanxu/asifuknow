import { Shield, CheckCircle, AlertTriangle, MapPin, Camera, Star, Lock } from 'lucide-react';
import Link from 'next/link';

export default function SafetyPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Safety & Trust
          </h1>
          <p className="text-xl text-gray-600">
            Building a secure platform for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Verification Process
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>ID verification for all staff members</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Phone number verification via OTP</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Company verification for client accounts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Background checks available (optional premium)</span>
              </li>
            </ul>
          </div>

          <div className="card p-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Payment Protection
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>48-hour payment rule strictly enforced</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Late payment consequences for clients</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Dispute resolution process in place</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span>Payment history visible to all staff</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Attendance Proof System</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GPS Verification</h3>
              <p className="text-gray-600">
                Staff check in and out using GPS location verification at the venue. Creates an accurate digital record of attendance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code Scanning</h3>
              <p className="text-gray-600">
                Clients can generate QR codes for staff to scan on arrival and departure. Quick and reliable attendance tracking.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo Verification</h3>
              <p className="text-gray-600">
                Optional photo capture during check-in to provide additional verification and security for both parties.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Timesheets</h3>
              <p className="text-gray-600">
                Automatically generated timesheets with check-in/out times. Eliminates disputes about hours worked.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Community Standards</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Code of Conduct</h3>
              <p className="text-gray-600 mb-3">
                All users must adhere to our community standards:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Professional and respectful behavior at all times</li>
                <li>Accurate job descriptions and honest profile information</li>
                <li>Punctuality and reliability for confirmed events</li>
                <li>Clear communication with all parties</li>
                <li>Respect for privacy and confidentiality</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating System</h3>
              <p className="text-gray-600">
                Mutual ratings help maintain quality. Both clients and staff rate each other on punctuality, reliability, professionalism, and communication.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reporting Mechanism</h3>
              <p className="text-gray-600">
                If you experience any issues, report them immediately through our platform. We investigate all reports seriously and take appropriate action.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No-Show Policy</h3>
              <p className="text-gray-700 mb-3">
                To maintain platform reliability, we track attendance carefully:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">For Staff:</span>
                  <span>Repeated no-shows result in lower ranking in job feed and potential suspension</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">For Clients:</span>
                  <span>Cancellations within 24 hours may affect your reputation and require deposits for future events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Anti-Bypass Protection
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-6">
            To maintain platform value and safety, contact details are masked until bookings are confirmed. This protects both parties and ensures accountability.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Attendance Logs</h4>
              <p className="text-gray-600 text-sm">
                Digital proof of work protects everyone
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Replacement System</h4>
              <p className="text-gray-600 text-sm">
                Fast, reliable backup staff available
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Rating System</h4>
              <p className="text-gray-600 text-sm">
                Build reputation for better opportunities
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions About Safety?
          </h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq" className="btn-outline">
              Read FAQ
            </Link>
            <Link href="/contact" className="btn-primary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
