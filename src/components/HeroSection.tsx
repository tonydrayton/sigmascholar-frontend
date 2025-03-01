'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
	const router = useRouter();

	return (
		<section className="py-16 md:py-24">
			<div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
				<div className="space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold text-emerald-800 leading-tight">
						AI-Powered Learning <br />
						<span className="text-primary">For Young Minds</span>
					</h1>

					<p className="text-lg text-gray-600">
						Sigma Scholar uses advanced AI to help elementary students master reading and math skills.
						Our personalized approach adapts to each child&apos;s learning style and pace.
					</p>

					<div className="flex flex-col sm:flex-row gap-4">
						<Button
							onClick={() => router.push('/chat')}
							className="flex items-center space-x-2"
							size="lg"
						>
							<BookOpen className="h-5 w-5 mr-1" />
							<span>Get Started</span>
						</Button>
					</div>
				</div>

				<div className="relative">
					<div className="rounded-2xl overflow-hidden shadow-xl w-full h-[400px] relative">
						<Image
							src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80"
							alt="Elementary students learning with AI"
							fill
							style={{ objectFit: 'cover' }}
							priority
						/>
					</div>
					<div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
						<div className="flex items-center space-x-2">
							<div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
							<p className="font-medium text-primary">AI Tutor Active</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
