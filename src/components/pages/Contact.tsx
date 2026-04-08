import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp, Instagram, Facebook, Twitter, MapPin, Mail } from 'lucide-react';

type Language = 'en' | 'it' | 'pt';

interface ContactProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const translations = {
  en: {
    nav: { home: "Home", product: "The Limoncello", origins: "Our Origins", craft: "Craft Process", cocktails: "Cocktails and Etc.", contact: "Contact" },
    banner: {
      title: "We'd love to hear from you",
      breadcrumb: "LIMONCELLO DI SORRENTO — CONTACT"
    },
    location: {
      label: "OUR HOME",
      title: "Where to find us",
      desc: "We live and work on the Sorrento Peninsula, where the lemons grow and the craft continues. Here's where you can reach us.",
      addressName: "Limoncello di Sorrento",
      addressRegion: "Santa Fortunata St, 33, 80067 Sorrento NA",
      addressCountry: "Itália",
      email: "contact@limoncellodisorrento.com"
    },
    form: {
      label: "GET IN TOUCH",
      title: "Send us a message",
      subtitle: "Whether it's a question, a partnership inquiry, or just to say hello — we'd love to hear from you.",
      fields: {
        name: "Name",
        namePlaceholder: "Your full name",
        email: "E-mail",
        emailPlaceholder: "your@email.com",
        phone: "Phone",
        phonePlaceholder: "+39 000 000 0000",
        message: "Message",
        messagePlaceholder: "How can we help?"
      },
      submit: "SEND MESSAGE",
      successTitle: "Thank you for reaching out.",
      successDesc: "We'll get back to you as soon as we can."
    },
    closing: "We're always happy to hear from those who share our love for this land and its lemons.",
    footer: {
      drinkResponsibly: "DRINK RESPONSIBLY",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "VAT: IT 10195214213",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      developedBy: "Developed by"
    }
  },
  it: {
    nav: { home: "Home", product: "Il Limoncello", origins: "Le Origini", craft: "Processo Artigianale", cocktails: "Cocktail e Altro", contact: "Contatti" },
    banner: {
      title: "Saremmo felici di sentirti",
      breadcrumb: "LIMONCELLO DI SORRENTO — CONTATTI"
    },
    location: {
      label: "LA NOSTRA CASA",
      title: "Dove trovarci",
      desc: "Viviamo e lavoriamo nella Penisola Sorrentina, dove crescono i limoni e continua il nostro artigianato. Ecco dove puoi contattarci.",
      addressName: "Limoncello di Sorrento",
      addressRegion: "Santa Fortunata St, 33, 80067 Sorrento NA",
      addressCountry: "Itália",
      email: "contact@limoncellodisorrento.com"
    },
    form: {
      label: "CONTATTACI",
      title: "Inviaci un messaggio",
      subtitle: "Che si tratti di una domanda, di una richiesta di partnership o solo per un saluto, saremmo felici di sentirti.",
      fields: {
        name: "Nome",
        namePlaceholder: "Il tuo nome completo",
        email: "E-mail",
        emailPlaceholder: "tua@email.com",
        phone: "Telefono",
        phonePlaceholder: "+39 000 000 0000",
        message: "Messaggio",
        messagePlaceholder: "Come possiamo aiutarti?"
      },
      submit: "INVIA MESSAGGIO",
      successTitle: "Grazie per averci contattato.",
      successDesc: "Ti risponderemo il prima possibile."
    },
    closing: "Siamo sempre felici di sentire chi condivide il nostro amore per questa terra e i suoi limoni.",
    footer: {
      drinkResponsibly: "BEVI RESPONSABILMENTE",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "P.IVA: IT 10195214213",
      privacy: "Privacy Policy",
      terms: "Termini di Servizio",
      developedBy: "Sviluppato da"
    }
  },
  pt: {
    nav: { home: "Início", product: "O Limoncello", origins: "Nossas Origens", craft: "Processo Artesanal", cocktails: "Coquetéis e Etc.", contact: "Contato" },
    banner: {
      title: "Adoraríamos ouvir você",
      breadcrumb: "LIMONCELLO DI SORRENTO — CONTATO"
    },
    location: {
      label: "NOSSA CASA",
      title: "Onde nos encontrar",
      desc: "Vivemos e trabalhamos na Península de Sorrento, onde os limões crescem e o artesanato continua. Aqui é onde você pode nos contatar.",
      addressName: "Limoncello di Sorrento",
      addressRegion: "Santa Fortunata St, 33, 80067 Sorrento NA",
      addressCountry: "Itália",
      email: "contact@limoncellodisorrento.com"
    },
    form: {
      label: "ENTRE EM CONTATO",
      title: "Envie-nos uma mensagem",
      subtitle: "Seja uma dúvida, uma proposta de parceria ou apenas para dizer olá — adoraríamos ouvir você.",
      fields: {
        name: "Nome",
        namePlaceholder: "Seu nome completo",
        email: "E-mail",
        emailPlaceholder: "seu@email.com",
        phone: "Telefone",
        phonePlaceholder: "+39 000 000 0000",
        message: "Mensagem",
        messagePlaceholder: "Como podemos ajudar?"
      },
      submit: "ENVIAR MENSAGEM",
      successTitle: "Obrigado por entrar em contato.",
      successDesc: "Retornaremos o mais breve possível."
    },
    closing: "Ficamos sempre felizes em ouvir aqueles que compartilham nosso amor por esta terra e seus limões.",
    footer: {
      drinkResponsibly: "BEBA COM MODERAÇÃO",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "IVA: IT 10195214213",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      developedBy: "Desenvolvido por"
    }
  }
};

export default function Contact({ lang, setLang }: ContactProps) {
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    setBannerLoaded(true);
  }, []);
  const t = translations[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '', submitted: false });

  // Scroll handler for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Intersection Observers for animations
  const locationRef = useRef<HTMLDivElement>(null);
  const formHeaderRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  const [locationVisible, setLocationVisible] = useState(false);
  const [formHeaderVisible, setFormHeaderVisible] = useState(false);
  const [formFieldsVisible, setFormFieldsVisible] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

    const locationObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLocationVisible(true);
    }, observerOptions);
    if (locationRef.current) locationObserver.observe(locationRef.current);

    const formHeaderObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFormHeaderVisible(true);
    }, observerOptions);
    if (formHeaderRef.current) formHeaderObserver.observe(formHeaderRef.current);

    const formFieldsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFormFieldsVisible(true);
    }, observerOptions);
    if (formFieldsRef.current) formFieldsObserver.observe(formFieldsRef.current);

    const closingObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setClosingVisible(true);
    }, observerOptions);
    if (closingRef.current) closingObserver.observe(closingRef.current);

    return () => {
      locationObserver.disconnect();
      formHeaderObserver.disconnect();
      formFieldsObserver.disconnect();
      closingObserver.disconnect();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setFormState(prev => ({ ...prev, submitted: true }));
  };

  return (
    <div className="font-lora text-[#082B4F] bg-[#F9F9F9] min-h-screen selection:bg-[#F4D03F] selection:text-[#082B4F] overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-[1000ms] ease-in-out ${isScrolled ? 'bg-[#F9F9F9]/85 backdrop-blur-md shadow-sm py-4 border-b border-[#082B4F]/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className={`font-playfair text-xl tracking-wider transition-colors duration-[1000ms] ${isScrolled ? 'text-[#082B4F]' : 'text-[#F9F9F9]'}`}>
            <img src="/images/limoncello-logo-04.png" alt="Limoncello di Sorrento" className="h-16 md:h-20 w-auto object-contain transition-all duration-500" />
          </Link>
          
          <div className="flex items-center gap-6">
            <div className={`flex gap-3 text-sm font-playfair uppercase tracking-widest transition-colors duration-[1000ms] ${isScrolled ? 'text-[#082B4F]' : 'text-[#F9F9F9]'}`}>
              <button onClick={() => setLang('en')} className={lang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}>EN</button>
              <span>|</span>
              <button onClick={() => setLang('it')} className={lang === 'it' ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}>IT</button>
              <span>|</span>
              <button onClick={() => setLang('pt')} className={lang === 'pt' ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}>PT</button>
            </div>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`transition-colors duration-[1000ms] ${isScrolled ? 'text-[#082B4F]' : 'text-[#F9F9F9]'}`}
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-[#249BC4]/95 backdrop-blur-xl text-[#F9F9F9] flex flex-col justify-center items-center transition-all duration-[1000ms] ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Decorative Side Images */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-24 md:w-48 lg:w-64 bg-repeat-y opacity-40 transition-transform duration-[1200ms] ease-in-out delay-100 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ backgroundImage: 'url(/images/vietri-06.png)', backgroundSize: '100% auto' }}
        />
        <div 
          className={`absolute right-0 top-0 bottom-0 w-24 md:w-48 lg:w-64 bg-repeat-y opacity-40 transition-transform duration-[1200ms] ease-in-out delay-100 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} -scale-x-100`}
          style={{ backgroundImage: 'url(/images/vietri-06.png)', backgroundSize: '100% auto' }}
        />
        
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-12 p-2 hover:rotate-90 transition-transform duration-[600ms] z-10"
        >
          <X size={40} strokeWidth={2.5} />
        </button>
        
        <ul className="text-center space-y-8 relative z-10">
          {Object.entries(t.nav).map(([key, item], idx) => (
            <li key={idx} className="overflow-hidden">
              <Link 
                to={key === 'home' ? '/' : key === 'product' ? '/product' : key === 'origins' ? '/origins' : key === 'craft' ? '/craft' : key === 'cocktails' ? '/cocktails' : key === 'contact' ? '/contact' : '#'} 
                onClick={() => setIsMenuOpen(false)}
                className={`block font-playfair text-4xl md:text-6xl hover:text-[#F4D03F] transition-all duration-[800ms] ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SECTION 1: TITLE BANNER */}
      <section className="relative h-[40vh] md:h-[50vh] min-h-[400px] flex flex-col items-center justify-center text-[#F9F9F9] px-6 overflow-hidden bg-[#082B4F]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#082B4F]/50 z-10" />
          <img 
            src="/images/hero-contact.png" 
            alt="Sorrento Coastline" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-20 flex flex-col items-center text-center">
          <div 
            className="w-[120px] h-[2px] bg-[#F4D03F] mb-8 transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '400ms' }}
          />
          <h1 
            className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] max-w-4xl leading-tight mb-6 transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '800ms' }}
          >
            {t.banner.title}
          </h1>
          <div 
            className="text-sm tracking-widest uppercase font-playfair transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '1000ms' }}
          >
            <span className="font-bold">{t.banner.breadcrumb}</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHERE TO FIND US */}
      <section className="py-20 lg:py-28 px-6 bg-[#F9F9F9] overflow-hidden">
        <div 
          ref={locationRef}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-center"
        >
          {/* Image Side (LEFT) */}
          <div 
            className="w-full lg:w-1/2 transition-all duration-800 ease-in-out"
            style={{ 
              opacity: locationVisible ? 1 : 0, 
              transform: locationVisible ? 'translateX(0)' : 'translateX(-30px)' 
            }}
          >
            <div className="aspect-[4/3] rounded-lg bg-[#082B4F] overflow-hidden border border-[#082B4F]/10">
              <img 
                src="/images/contact-01.png" 
                alt="Sorrento Peninsula" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Text Side (RIGHT) */}
          <div 
            className="w-full lg:w-1/2 transition-all duration-800 ease-in-out"
            style={{ 
              opacity: locationVisible ? 1 : 0, 
              transform: locationVisible ? 'translateX(0)' : 'translateX(30px)',
              transitionDelay: '200ms'
            }}
          >
            <div className="text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">
              {t.location.label}
            </div>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F] leading-snug mb-6">
              {t.location.title}
            </h2>
            <p className="text-[#082B4F]/80 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
              {t.location.desc}
            </p>
            
            <div className="text-sm leading-loose text-[#082B4F] mb-6">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#F4D03F] mt-1.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{t.location.addressName}</div>
                  <div>{t.location.addressRegion}</div>
                  <div>{t.location.addressCountry}</div>
                </div>
              </div>
            </div>

            <div className="text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#F4D03F] flex-shrink-0" />
                <a 
                  href={`mailto:${t.location.email}`} 
                  className="text-[#082B4F] hover:text-[#F4D03F] transition-colors duration-300 underline underline-offset-4 decoration-[#082B4F]/20 hover:decoration-[#F4D03F]"
                >
                  {t.location.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONTACT FORM */}
      <section className="py-24 lg:py-36 px-6 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div 
            ref={formHeaderRef}
            className="max-w-[600px] mx-auto text-center mb-12 transition-all duration-700 ease-in-out"
            style={{ 
              opacity: formHeaderVisible ? 1 : 0, 
              transform: formHeaderVisible ? 'translateY(0)' : 'translateY(30px)' 
            }}
          >
            <div className="text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">
              {t.form.label}
            </div>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F] mb-4">
              {t.form.title}
            </h2>
            <p className="text-sm text-[#082B4F]/60">
              {t.form.subtitle}
            </p>
          </div>

          {/* Form Container */}
          <div className="max-w-[580px] mx-auto relative min-h-[400px]">
            
            {/* Success State */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-600 ease-in-out"
              style={{ 
                opacity: formState.submitted ? 1 : 0, 
                transform: formState.submitted ? 'translateY(0)' : 'translateY(15px)',
                pointerEvents: formState.submitted ? 'auto' : 'none',
                zIndex: formState.submitted ? 10 : -1
              }}
            >
              <div className="w-[60px] h-[2px] bg-[#F4D03F] mb-8" />
              <h3 className="font-playfair text-3xl text-[#082B4F] mb-4">
                {t.form.successTitle}
              </h3>
              <p className="text-sm text-[#082B4F]/60">
                {t.form.successDesc}
              </p>
            </div>

            {/* Form Fields */}
            <div 
              ref={formFieldsRef}
              className="transition-all duration-400 ease-in-out"
              style={{ 
                opacity: formState.submitted ? 0 : 1,
                pointerEvents: formState.submitted ? 'none' : 'auto'
              }}
            >
              {/* Field 1: Name */}
              <div 
                className="mb-8 transition-all duration-500 ease-in-out"
                style={{ 
                  opacity: formFieldsVisible ? 1 : 0, 
                  transform: formFieldsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '0ms'
                }}
              >
                <label className="block text-xs uppercase tracking-widest text-[#082B4F] font-medium mb-2">
                  {t.form.fields.name}
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder={t.form.fields.namePlaceholder}
                  className="w-full bg-transparent border-b-2 border-[#082B4F]/20 py-3 text-base font-playfair text-[#082B4F] focus:outline-none focus:border-[#F4D03F] transition-colors duration-300 placeholder:italic placeholder:text-[#082B4F]/30"
                />
              </div>

              {/* Field 2: E-mail */}
              <div 
                className="mb-8 transition-all duration-500 ease-in-out"
                style={{ 
                  opacity: formFieldsVisible ? 1 : 0, 
                  transform: formFieldsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '100ms'
                }}
              >
                <label className="block text-xs uppercase tracking-widest text-[#082B4F] font-medium mb-2">
                  {t.form.fields.email}
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder={t.form.fields.emailPlaceholder}
                  className="w-full bg-transparent border-b-2 border-[#082B4F]/20 py-3 text-base font-playfair text-[#082B4F] focus:outline-none focus:border-[#F4D03F] transition-colors duration-300 placeholder:italic placeholder:text-[#082B4F]/30"
                />
              </div>

              {/* Field 3: Phone */}
              <div 
                className="mb-8 transition-all duration-500 ease-in-out"
                style={{ 
                  opacity: formFieldsVisible ? 1 : 0, 
                  transform: formFieldsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '200ms'
                }}
              >
                <label className="block text-xs uppercase tracking-widest text-[#082B4F] font-medium mb-2">
                  {t.form.fields.phone}
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  placeholder={t.form.fields.phonePlaceholder}
                  className="w-full bg-transparent border-b-2 border-[#082B4F]/20 py-3 text-base font-playfair text-[#082B4F] focus:outline-none focus:border-[#F4D03F] transition-colors duration-300 placeholder:italic placeholder:text-[#082B4F]/30"
                />
              </div>

              {/* Field 4: Message */}
              <div 
                className="mb-8 transition-all duration-500 ease-in-out"
                style={{ 
                  opacity: formFieldsVisible ? 1 : 0, 
                  transform: formFieldsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '300ms'
                }}
              >
                <label className="block text-xs uppercase tracking-widest text-[#082B4F] font-medium mb-2">
                  {t.form.fields.message}
                </label>
                <textarea 
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder={t.form.fields.messagePlaceholder}
                  className="w-full bg-transparent border-b-2 border-[#082B4F]/20 py-3 text-base font-playfair text-[#082B4F] focus:outline-none focus:border-[#F4D03F] transition-colors duration-300 placeholder:italic placeholder:text-[#082B4F]/30 min-h-[120px] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div 
                className="mt-10 transition-all duration-500 ease-in-out"
                style={{ 
                  opacity: formFieldsVisible ? 1 : 0, 
                  transform: formFieldsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '400ms'
                }}
              >
                <button 
                  onClick={handleSubmit}
                  className="mx-auto block bg-[#F4D03F] text-[#082B4F] px-10 py-3.5 rounded-md uppercase tracking-widest text-sm font-semibold hover:scale-[1.03] hover:brightness-105 transition-all duration-400"
                >
                  {t.form.submit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CLOSING LINE */}
      <section className="relative py-24 lg:py-36 px-6 bg-[#F9F9F9] overflow-hidden">
        {/* Top Decorative Border */}
        <div className="absolute top-0 left-0 w-full h-24 opacity-20 pointer-events-none">
          <div 
            className="w-full h-full scale-y-[-1]"
            style={{
              backgroundImage: 'url(/images/vietri-04.png)',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'bottom',
              backgroundSize: 'contain'
            }}
          />
        </div>

        <div 
          ref={closingRef}
          className="max-w-[600px] mx-auto flex flex-col items-center relative z-10"
        >
          <div 
            className="w-[60px] h-[2px] bg-[#F4D03F] mb-6 transition-all duration-400 ease-in-out"
            style={{ opacity: closingVisible ? 1 : 0 }}
          />
          <p 
            className="font-playfair italic text-[#082B4F] text-center text-[clamp(1rem,2.5vw,1.5rem)] transition-all duration-700 ease-in-out"
            style={{ 
              opacity: closingVisible ? 1 : 0,
              transform: closingVisible ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            {t.closing}
          </p>
        </div>

        {/* Bottom Decorative Border */}
        <div className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'url(/images/vietri-04.png)',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'bottom',
              backgroundSize: 'contain'
            }}
          />
        </div>
      </section>
      
      <footer className="bg-[#249BC4] text-[#F9F9F9] pt-8 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16 mb-24">
            
            <div className="text-center md:text-left">
              <Link to="/">
                <img src="/images/limoncello-logo-05.png" alt="Limoncello di Sorrento" className="h-20 w-auto object-contain mb-2 mx-auto md:mx-0" />
              </Link>
              <p className="font-playfair text-[0.85rem] uppercase tracking-[0.3em] text-[#F4D03F]">Gusta la Tradizione</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 text-center sm:text-left">
              <div className="flex flex-col gap-4">
                {Object.entries(t.nav).slice(0, 3).map(([key, item], idx) => (
                  <Link key={idx} to={key === 'home' ? '/' : key === 'product' ? '/product' : key === 'origins' ? '/origins' : key === 'craft' ? '/craft' : key === 'cocktails' ? '/cocktails' : key === 'contact' ? '/contact' : '#'} className="font-playfair text-sm tracking-widest uppercase hover:text-[#F4D03F] transition-colors duration-[600ms]">{item}</Link>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {Object.entries(t.nav).slice(3).map(([key, item], idx) => (
                  <Link key={idx} to={key === 'home' ? '/' : key === 'product' ? '/product' : key === 'origins' ? '/origins' : key === 'craft' ? '/craft' : key === 'cocktails' ? '/cocktails' : key === 'contact' ? '/contact' : '#'} className="font-playfair text-sm tracking-widest uppercase hover:text-[#F4D03F] transition-colors duration-[600ms]">{item}</Link>
                ))}
              </div>
            </div>

          </div>

          <div className="border-t border-[#F9F9F9]/20 pt-8 flex flex-col gap-8 text-xs font-lora opacity-70">
            
            <div className="flex justify-between items-center">
              <p className="font-playfair uppercase tracking-widest text-[#F4D03F]">{t.footer.drinkResponsibly}</p>
              <button 
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full border border-[#F9F9F9]/30 flex items-center justify-center hover:bg-[#F9F9F9] hover:text-[#249BC4] transition-all duration-[600ms]"
              >
                <ArrowUp size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-center gap-4 pt-4 border-t border-[#F9F9F9]/10">
              <p className="text-center xl:text-left">{t.footer.address} | {t.footer.vat}</p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 xl:gap-6">
                <Link to="/privacy" className="hover:text-[#F4D03F] transition-colors">{t.footer.privacy}</Link>
                <span className="hidden md:inline text-[#F9F9F9]/30">|</span>
                <Link to="/terms" className="hover:text-[#F4D03F] transition-colors">{t.footer.terms}</Link>
                <span className="hidden md:inline text-[#F9F9F9]/30">|</span>
                <div className="text-[11px] tracking-wider">
                  {t.footer.developedBy} <a href="https://novamedia.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4D03F] transition-colors underline underline-offset-2">Novamedia</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
