export default function TermsPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using CrewDirect, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Rules</h2>
            <p className="text-gray-600 mb-3">
              All users must adhere to the following rules:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Provide accurate and truthful information</li>
              <li>Maintain professional conduct at all times</li>
              <li>Honor all confirmed bookings and agreements</li>
              <li>Follow the 48-hour payment rule for clients</li>
              <li>Respect privacy and confidentiality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600">
              Users are responsible for maintaining the confidentiality of their account, all activities under their account, and complying with all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600">
              CrewDirect serves as a platform connecting clients and staff. We are not responsible for the actions of users, quality of work, or disputes between parties.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
