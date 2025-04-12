import Footer from '@/components/footer'
import Header from '@/components/header'
import Hero from '@/components/hero'
import AboutUs from '@/components/aboutUs'
import Brands from '@/components/brands'
import Testimonials from '@/components/testimonials'
import Contact from '@/components/contact'

export default function LandingPage() {
  return (
    <div id='inicio' className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <Hero />
        <AboutUs />
        <Brands />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
