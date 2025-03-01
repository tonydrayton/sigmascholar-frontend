import React from 'react';
import Image from 'next/image';
import { BookOpen, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GridPatternLinearGradient from './GridPatternLinearGradient';
import { motion } from 'framer-motion';
interface HeroSectionProps {
	setCurrentPage: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentPage }) => {
	return (
		<section className="">
			<GridPatternLinearGradient />
			<div className="container mx-auto py-4 px-4 grid md:grid-cols-2 gap-12 items-center">
				<div className="space-y-6 drop-shadow-sm">
					<h1 className="text-4xl md:text-5xl font-bold text-emerald-800 leading-tight">
						AI-Powered Learning <br />
						<motion.span
								initial={{ backgroundPosition: '0% 50%' }}
								animate={{ backgroundPosition: '100% 50%' }}
								transition={{
									duration: 3,
									ease: 'easeInOut',
									repeat: Infinity,
									repeatType: 'reverse'
								}}
								className="group relative font-semibold rounded-lg bg-gradient-to-r from-green-600 to-green-400 dark:from-neutral-500 dark:to-neutral-200 bg-clip-text text-transparent drop-shadow-md"
								style={{
									backgroundSize: '200% 100%',
									backgroundImage: 'linear-gradient(to right, #gray500, #ffffff)',
								}}
							>
								For Young Minds
							</motion.span>
					</h1>

					<p className="text-lg text-gray-600">
						Sigma Scholar uses advanced AI to help elementary students master reading and math skills.
						Our personalized approach adapts to each child&apos;s learning style and pace.
					</p>

					<div className="flex flex-col sm:flex-row gap-4">
						<Button
							onClick={() => setCurrentPage('reading')}
							className="flex items-center space-x-2"
							size="lg"
						>
							<BookOpen className="h-5 w-5 mr-1" />
							<span>Reading Help</span>
						</Button>

						<Button
							onClick={() => setCurrentPage('math')}
							variant="outline"
							className="flex items-center space-x-2 border-primary text-primary hover:bg-primary/10"
							size="lg"
						>
							<Calculator className="h-5 w-5 mr-1" />
							<span>Math Help</span>
						</Button>
					</div>
				</div>

				<div className="relative">
					<div className="rounded-2xl overflow-hidden shadow-xl w-full h-[400px] relative">
						<Image
							src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80"
							alt="Elementary students learning with AI"
							fill
							style={{ objectFit: 'cover' }}
							priority
						/>
					</div>
					<div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
						<div className="flex items-center space-x-2">
							<div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
							<p className="font-medium text-primary">AI Tutor Active</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
