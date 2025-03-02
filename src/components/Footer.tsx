import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-800 text-white pt-12 pb-6 z-10 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
              src="/logo.png"
              alt="cat logo"
              width={50}
              height={50}
              priority
              />
              <span className="text-2xl font-bold text-white">Sigma Scholar</span>
            </div>
            <p className="text-emerald-100 mb-4">
              Empowering elementary students with AI-powered tutoring in reading and mathematics.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-emerald-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-emerald-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-emerald-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Reading Help</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Math Help</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">For Parents</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">For Educators</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-emerald-100 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-emerald-300 mt-0.5" />
                <span className="text-emerald-100">support@sigmascholar.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-emerald-300 mt-0.5" />
                <span className="text-emerald-100">(555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-300 mt-0.5" />
                <span className="text-emerald-100">123 Learning Lane<br />Education City, ED 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-700 pt-6 text-center text-emerald-200 text-sm">
          <p>&copy; {new Date().getFullYear()} Sigma Scholar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
