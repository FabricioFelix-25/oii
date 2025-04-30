import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Sobre NewsPortal</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-neutral-600 mb-8">
          NewsPortal is your trusted source for the latest news and insights across technology, 
          geopolitics, programming, and gaming. Our mission is to deliver accurate, timely, 
          and engaging content that keeps you informed and ahead of the curve.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-neutral-600">
              To provide comprehensive, accurate, and engaging coverage of the most important 
              developments in technology, global affairs, software development, and gaming, 
              helping our readers stay informed and make better decisions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-2 text-neutral-600">
              <li>• Accuracy and integrity in reporting</li>
              <li>• Innovation in content delivery</li>
              <li>• Engagement with our community</li>
              <li>• Respect for diverse perspectives</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Coverage Areas</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-2">Technology</h3>
              <p className="text-neutral-600">Latest innovations and breakthroughs</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Geopolitics</h3>
              <p className="text-neutral-600">Global affairs and analysis</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-2">Programming</h3>
              <p className="text-neutral-600">Development trends and insights</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <h3 className="text-xl font-bold text-pink-600 mb-2">Gaming</h3>
              <p className="text-neutral-600">Reviews and industry news</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-neutral-600">contact@newsportal.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-neutral-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <h3 className="font-medium">Localizção  </h3>
                <p className="text-neutral-600">Salvador, BA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;