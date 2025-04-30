import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Your Privacy Matters</h2>
          </div>
          <p className="text-neutral-600">
            At NewsPortal, we take your privacy seriously. This policy outlines how we collect, 
            use, and protect your personal information when you use our website.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <ul className="space-y-4 text-neutral-600">
                <li>• Personal information (name, email) when you create an account</li>
                <li>• Usage data and preferences to improve your experience</li>
                <li>• Comments and interactions with our content</li>
                <li>• Technical information about your device and browser</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <ul className="space-y-4 text-neutral-600">
                <li>• To provide and improve our services</li>
                <li>• To personalize your experience</li>
                <li>• To communicate with you about updates and news</li>
                <li>• To ensure the security of our platform</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <UserCheck className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">Your Rights</h2>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <ul className="space-y-4 text-neutral-600">
                <li>• Access your personal data</li>
                <li>• Request correction or deletion of your data</li>
                <li>• Opt-out of marketing communications</li>
                <li>• Lodge a complaint with relevant authorities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-neutral-600">
              If you have any questions about our privacy policy or how we handle your data, 
              please contact us at privacy@newsportal.com.
            </p>
          </section>

          <section className="bg-neutral-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
            <p className="text-neutral-600">
              We may update this privacy policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "last modified" date.
            </p>
            <p className="text-sm text-neutral-500 mt-4">
              Last modified: March 15, 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;