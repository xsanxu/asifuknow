'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const clientFAQs: FAQItem[] = [
  {
    question: 'How do I post an event?',
    answer: 'Click "Post Event" from your dashboard, fill out the quick form with event details (location, date, time, roles needed, pay rate), and submit. Your event will be live immediately and visible to nearby staff.',
  },
  {
    question: 'What if my staff doesn\'t show up?',
    answer: 'Use the Replacement Engine to instantly broadcast the need to standby workers nearby. You can also add an urgent bonus to fill the position faster. We track no-shows and penalize unreliable staff.',
  },
  {
    question: 'When do I need to pay?',
    answer: 'You must pay within 48 hours after the shift ends. Late payments will affect your account rating and may result in restrictions. We enforce this strictly to maintain trust on the platform.',
  },
  {
    question: 'How do replacements work?',
    answer: 'If confirmed staff can\'t make it, click "Need Replacement" on your event. The system broadcasts to available workers with matching skills nearby. You can offer an urgent bonus for faster filling.',
  },
  {
    question: 'What if there\'s a dispute?',
    answer: 'Contact our support team immediately. We review attendance records, GPS data, and communications to resolve disputes fairly. All actions on the platform are logged for transparency.',
  },
  {
    question: 'Do I need a subscription?',
    answer: 'You can post up to 2 events per month for free. For unlimited events, get the Starter Premium plan at ₹150/month with additional features like the replacement engine and priority support.',
  },
  {
    question: 'What are deposit requirements?',
    answer: 'Deposits are required only if you book 5+ events per month or have a history of late payments. This protects staff and maintains platform integrity.',
  },
];

const staffFAQs: FAQItem[] = [
  {
    question: 'How do I get paid?',
    answer: 'After completing your shift and checking out, clients have 48 hours to process payment. Payment goes directly to your registered account. Track payment status in real-time from your dashboard.',
  },
  {
    question: 'What if I can\'t make a shift?',
    answer: 'Cancel as soon as possible through the app. Frequent no-shows will lower your ranking in the job feed and may lead to suspension. Early cancellation is better than not showing up.',
  },
  {
    question: 'How does check-in work?',
    answer: 'On event day, open the app 15 minutes before your shift. Use GPS verification at the venue or scan the QR code provided by the client. Check out the same way when leaving.',
  },
  {
    question: 'How do I improve my rating?',
    answer: 'Be punctual, professional, complete all shifts, communicate clearly, and follow job requirements. Good ratings lead to more job opportunities and priority placement in the feed.',
  },
  {
    question: 'What happens if I\'m late?',
    answer: 'Check in as soon as you arrive. Late arrival will be noted in the timesheet and may affect your rating. Communicate with the client if you\'re running late.',
  },
  {
    question: 'Can I work multiple events in one day?',
    answer: 'Yes, as long as the shift times don\'t overlap. Filter by date and time to find events that fit your schedule.',
  },
  {
    question: 'Is there a fee to use the platform?',
    answer: 'No! The platform is completely free for staff. Create your profile and start applying to jobs immediately. No subscription or hidden fees.',
  },
];

function FAQSection({ title, faqs }: { title: string; faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions
          </p>
        </div>

        <div className="space-y-12">
          <FAQSection title="For Event Organizers" faqs={clientFAQs} />
          <FAQSection title="For Event Staff" faqs={staffFAQs} />
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our support team is available to help you
          </p>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
              <span className="text-gray-700">WhatsApp Support</span>
              <span className="font-semibold text-primary-600">+91-98765-43210</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
              <span className="text-gray-700">Email</span>
              <span className="font-semibold text-primary-600">support@crewdirect.com</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
              <span className="text-gray-700">Hours</span>
              <span className="font-semibold text-primary-600">9 AM - 9 PM</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/contact" className="btn-primary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
