import Footer from '@/components/footer'
import Header from '@/components/header'
import Hero from '@/components/hero'
import AboutUs from '@/components/about-us'
import Brands from '@/components/brands'
import Testimonials from '@/components/testimonials'
import Contact from '@/components/contact'
import WhatsAppButton from '@/components/whatsapp-button'

export default function LandingPage() {
  return (
    <div id='home' className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 mt-[80px]'>
        <Hero />
        <Brands />
        <AboutUs />
        <Testimonials />
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  )
}
