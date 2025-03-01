'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import FeatureSection from '@/components/FeatureSection'
import TestimonialSection from '@/components/TestimonialSection'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-emerald-50 z-0">
        <div className="absolute inset-0 bg-grid-emerald-500/[0.05] bg-[size:50px_50px]" />
      </div>

      <Header setCurrentPage={setCurrentPage} />

      <main className="flex-grow z-10 relative">
        {currentPage === 'home' && (
          <>
            <HeroSection setCurrentPage={setCurrentPage} />
            <FeatureSection />
            <TestimonialSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
