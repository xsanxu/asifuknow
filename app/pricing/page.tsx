import Link from 'next/link';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Only pay when you hire. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="card p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Tier</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">₹0</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-gray-600 mb-6">For clients trying out the platform</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Post up to 2 events per month</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Access to verified staff pool</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Basic attendance tracking</span>
              </li>
              <li className="flex items-start">
                <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Replacement engine</span>
              </li>
              <li className="flex items-start">
                <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Priority support</span>
              </li>
            </ul>
            <Link href="/signup" className="btn-outline w-full text-center">
              Get Started Free
            </Link>
          </div>

          <div className="card p-8 border-4 border-primary-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                RECOMMENDED
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter Premium</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">₹150</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-gray-600 mb-6">For regular event organizers</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">Unlimited events for 30 days</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Full access to verified staff pool</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Replacement engine access</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Advanced attendance tracking</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Digital invoicing</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Client verification badge</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>
            <Link href="/signup" className="btn-primary w-full text-center">
              Start Premium Plan
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Terms</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">48-Hour Payment Rule</h3>
              <p className="text-gray-600">
                All clients MUST pay staff within 48 hours after shift completion. Late payments trigger account restrictions and reduced visibility.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deposit Requirements</h3>
              <p className="text-gray-600 mb-3">
                Deposits are required only for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Clients booking 5+ events per month</li>
                <li>Clients with history of late payments</li>
              </ul>
              <p className="text-gray-600 mt-3">
                Options include monthly wallet deposits or per-event partial deposits.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Event Staff</h3>
              <p className="text-gray-600">
                Staff always work for free on this platform. No subscription or fees required. Just create a profile and start applying for gigs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need a Custom Plan?
          </h2>
          <p className="text-lg text-primary-100 mb-6">
            For agencies and companies booking 10+ events per month, we offer Pro and Enterprise plans with additional features
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
