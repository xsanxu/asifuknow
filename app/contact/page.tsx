import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          We're here to help. Reach out to us through any of these channels.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-8">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-2">Call us directly</p>
            <a href="tel:+919876543210" className="text-primary-600 font-semibold">
              +91-98765-43210
            </a>
          </div>

          <div className="card p-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-2">Message us</p>
            <a href="https://wa.me/919876543210" className="text-primary-600 font-semibold">
              Chat on WhatsApp
            </a>
          </div>

          <div className="card p-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-2">Write to us</p>
            <a href="mailto:support@crewdirect.com" className="text-primary-600 font-semibold">
              support@crewdirect.com
            </a>
          </div>
        </div>

        <div className="mt-12 card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h2>
          <p className="text-gray-600 mb-2">Monday - Saturday: 9:00 AM - 9:00 PM</p>
          <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
}
