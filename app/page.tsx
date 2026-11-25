import Footer from '@/components/footer'
import Header from '@/components/header'
import Hero from '@/components/hero'
import AboutUs from '@/components/about-us'
import Brands from '@/components/brands'
import Testimonials from '@/components/testimonials'
import Contact from '@/components/contact'
import WhatsAppButton from '@/components/whatsapp-button'
import RevealObserver from '@/components/reveal-observer'

export default function LandingPage() {
  return (
    <div id='home' className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 mt-[var(--header-h)]'>
        <Hero />
        <Brands />
        <AboutUs />
        <Testimonials />
        <Contact />
      </main>
      <WhatsAppButton />
      <RevealObserver />
      <Footer />
    </div>
  )
}
