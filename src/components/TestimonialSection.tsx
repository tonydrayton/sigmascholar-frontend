import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
	{
		name: "Mrs. Johnson",
		role: "2nd Grade Teacher",
		content: "Sigma Scholar has transformed how my students approach reading comprehension. The AI tutor provides personalized guidance that I simply couldn't offer to 25 students simultaneously.",
		stars: 5,
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
	},
	{
		name: "Michael P.",
		role: "Parent of 3rd Grader",
		content: "My son struggled with math anxiety until we found Sigma Scholar. The step-by-step approach and encouraging feedback have boosted his confidence tremendously.",
		stars: 5,
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
	},
	{
		name: "Principal Rivera",
		role: "Elementary School Principal",
		content: "We've implemented Sigma Scholar across our entire school, and the results have been remarkable. Test scores have improved, and more importantly, our students are enjoying learning.",
		stars: 5,
		image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
	}
];

const TestimonialSection: React.FC = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-emerald-800 mb-4">What Educators and Parents Say</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Discover how Sigma Scholar is making a difference in elementary education across the country.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<div key={index} className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
							<div className="flex items-center mb-4">
								<Avatar className="h-12 w-12 mr-4">
									<AvatarImage src={testimonial.image} alt={testimonial.name} className='object-cover' />
									<AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="font-semibold text-emerald-800">{testimonial.name}</h4>
									<p className="text-sm text-gray-500">{testimonial.role}</p>
								</div>
							</div>

							<div className="flex mb-3">
								{[...Array(testimonial.stars)].map((_, i) => (
									<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
								))}
							</div>

							<p className="text-gray-600 italic">&quot;{testimonial.content}&quot;</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialSection;
