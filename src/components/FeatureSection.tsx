import React from 'react';
import { BookOpen, Calculator, Brain, Clock, Award, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Reading Comprehension",
    description: "Interactive stories and exercises that improve vocabulary, comprehension, and critical thinking skills."
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: "Math Problem Solving",
    description: "Step-by-step guidance through math problems with visual aids and real-world examples."
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Adaptive Learning",
    description: "Our AI adjusts difficulty based on each student's progress, ensuring the perfect learning challenge."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Instant Feedback",
    description: "Get immediate, helpful feedback on answers to reinforce learning and correct misconceptions."
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Achievement System",
    description: "Earn badges and rewards that celebrate progress and motivate continued learning."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Engaging Exercises",
    description: "Fun, interactive activities that make learning enjoyable and keep students motivated."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-white/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">How Sigma Scholar Helps Students Excel</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides personalized support across key learning areas,
            making education more accessible and enjoyable for elementary students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-emerald-100">
              <div className="mb-4 bg-secondary w-16 h-16 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
