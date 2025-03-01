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
    <div className="min-h-screen flex flex-col">
      {/* Grid Background */}

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
