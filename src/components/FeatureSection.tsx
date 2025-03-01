import React from 'react';
import { BookOpen, Calculator, Brain, Award } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';
import Image from 'next/image';

const features = [
  {
    Icon: BookOpen,
    name: "Reading Comprehension",
    description: "Interactive stories and exercises that improve vocabulary, comprehension, and critical thinking skills.",
    href: "#reading",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Image
      src="https://images.unsplash.com/photo-1541854615901-93c354197834?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt='book'
      fill
      className='[mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] pointer-events-none'
      />
    ),
  },
  {
    Icon: Calculator,
    name: "Math Problem Solving",
    description: "Step-by-step guidance through math problems with visual aids and real-world examples.",
    href: "#math",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Image
      src='https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      alt='math'
      fill
      className='[mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] object-cover pointer-events-none'
      />
    ),
  },
  {
    Icon: Brain,
    name: "Adaptive Learning",
    description: "Our AI adjusts difficulty based on each student's progress, ensuring the perfect learning challenge.",
    href: "#adaptive",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Image
      src='https://plus.unsplash.com/premium_photo-1663090073232-a7e475ef1f38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVhcm5pbmd8ZW58MHx8MHx8fDA%3D'
      alt='math'
      fill
      className='[mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] object-cover object-[10%_10%] pointer-events-none'
      />
    ),
  },
  {
    Icon: Award,
    name: "Achievement System",
    description: "Earn badges and rewards that celebrate progress and motivate continued learning.",
    href: "#achievements",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Image
      src='https://plus.unsplash.com/premium_photo-1713102867032-9f7ddbbca7da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wzfHx8ZW58MHx8fHx8'
      alt='math'
      fill
      className='[mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] object-cover object-[10%_10%] pointer-events-none'
      />
    ),
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 lg:px-40 bg-white/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">How Sigma Scholar Helps Students Excel</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides personalized support across key learning areas,
            making education more accessible and enjoyable for elementary students.
          </p>
        </div>

        <BentoGrid className="auto-rows-[20rem]">
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default FeatureSection;
