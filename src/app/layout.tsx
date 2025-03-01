import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Sigma Scholar - AI-Powered Learning For Young Minds',
	description:
		'Sigma Scholar uses advanced AI to help elementary students master reading and math skills. Our personalized approach adapts to each child\'s learning style and pace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen flex flex-col bg-emerald-50`}>
				{/* Persistent Header */}
				<Header />

				{/* Main Content */}
				<main className="flex-grow">{children}</main>

				{/* Persistent Footer */}
				<Footer />
			</body>
		</html>
	);
}
