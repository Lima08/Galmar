import Footer from '@/components/footer'
import ContactBar from '@/components/contact-bar'
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
    <div id='home' className='flex min-h-screen min-w-0 flex-col'>
      <ContactBar />
      <Header />
      <main className='min-w-0 flex-1'>
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
