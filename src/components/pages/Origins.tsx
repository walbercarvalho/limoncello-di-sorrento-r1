import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp, Instagram, Facebook, Twitter } from 'lucide-react';

type Language = 'en' | 'it' | 'pt';

interface OriginsProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const translations = {
  en: {
    nav: { home: "Home", product: "The Limoncello", origins: "Our Origins", craft: "Craft Process", cocktails: "Cocktails and Etc.", contact: "Contact" },
    banner: { title: "Here where the sea glimmers", breadcrumb: "LIMONCELLO DI SORRENTO — OUR ORIGINS" },
    chapter1: {
      label: "THE ORIGINAL RECIPE",
      title: "Antonio Maresca and the Maresca pensione",
      p1: "In the early 1900s, the Sorrento peninsula was a haven for travelers seeking the warmth of the Mediterranean sun. At his family's <em>pensione</em>, <strong>Antonio Maresca</strong> welcomed guests with a hospitality that became legendary. It was here, on a terrace overlooking the Gulf of Naples at sunset, that he first served his special lemon liqueur. Known in the local dialect as <em>rosolio di limone</em>, this vibrant infusion was a gesture of pure generosity.",
      p2: "Decades later, in 1988, the family formally founded the company, becoming the first to patent and use the name 'limoncello'. Through the generations, the commitment to Antonio's craft has never wavered. <strong>The original recipe is still used to this day.</strong> It relies entirely on the P.G.I. Sorrento Lemons—the prized <em>Ovale di Sorrento</em>—grown in the volcanic soil and sea breezes of our terraced gardens.",
      imageDesc: "[Historical photograph: the terrace of the original hotel/pension, period architecture, warm sepia tones, early-century Mediterranean hospitality]"
    },
    chapter2: {
      label: "A UNIQUE PLACE IN THE WORLD",
      title: "The magic of Sorrento",
      p1: "Sorrento is more than a destination; it is a state of mind. Far from the modern world, it is a place where anything can still happen—unexpected encounters, love at first sight, and jaw-dropping sceneries. The golden light, the scent of citrus in the air, the warmth of the sun on ancient stone, and the endless expanse of the sea create an atmosphere that is truly intoxicating.",
      p2: "Every bottle of our limoncello takes you into this world sip by sip, carrying the essence of the coast wherever you go. <strong>Limoncello di Sorrento, where anything can still happen.</strong>"
    },
    manifesto: "If true that in the world there are coasts as beautiful as Sorrento, no coast in the world can boast a history as rich as ours.",
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
    nav: { home: "Home", product: "Il Limoncello", origins: "Le Nostre Origini", craft: "Processo Artigianale", cocktails: "Cocktail e Altro", contact: "Contatti" },
    banner: { title: "Qui dove il mare luccica", breadcrumb: "LIMONCELLO DI SORRENTO — LE NOSTRE ORIGINI" },
    chapter1: {
      label: "LA RICETTA ORIGINALE",
      title: "Antonio Maresca e la pensione Maresca",
      p1: "Nei primi del '900, la penisola sorrentina era un rifugio per i viaggiatori in cerca del calore del sole mediterraneo. Nella <em>pensione</em> di famiglia, <strong>Antonio Maresca</strong> accoglieva gli ospiti con un'ospitalità divenuta leggendaria. Fu qui, su una terrazza affacciata sul Golfo di Napoli al tramonto, che servì per la prima volta il suo speciale liquore al limone. Conosciuto nel dialetto locale come <em>rosolio di limone</em>, questa vibrante infusione era un gesto di pura generosità.",
      p2: "Decenni dopo, nel 1988, la famiglia fondò formalmente l'azienda, diventando la prima a brevettare e utilizzare il nome 'limoncello'. Attraverso le generazioni, l'impegno per l'arte di Antonio non ha mai vacillato. <strong>La ricetta originale è usata ancora oggi.</strong> Si basa interamente sui Limoni di Sorrento I.G.P. — il pregiato <em>Ovale di Sorrento</em> — coltivati nel terreno vulcanico e nelle brezze marine dei nostri giardini terrazzati.",
      imageDesc: "[Fotografia storica: la terrazza dell'hotel/pensione originale, architettura d'epoca, caldi toni seppia, ospitalità mediterranea di inizio secolo]"
    },
    chapter2: {
      label: "UN LUOGO UNICO AL MONDO",
      title: "La magia di Sorrento",
      p1: "Sorrento è più di una destinazione; è uno stato d'animo. Lontano dal mondo moderno, è un luogo dove tutto può ancora accadere: incontri inaspettati, amori a prima vista e paesaggi mozzafiato. La luce dorata, il profumo degli agrumi nell'aria, il calore del sole sull'antica pietra e l'infinita distesa del mare creano un'atmosfera davvero inebriante.",
      p2: "Ogni bottiglia del nostro limoncello ti porta in questo mondo sorso dopo sorso, portando con sé l'essenza della costiera ovunque tu vada. <strong>Limoncello di Sorrento, dove tutto può ancora accadere.</strong>"
    },
    manifesto: "Se è vero che al mondo esistono coste belle come Sorrento, nessuna costa al mondo può vantare una storia ricca come la nostra.",
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
    banner: { title: "Aqui onde o mar brilha", breadcrumb: "LIMONCELLO DI SORRENTO — NOSSAS ORIGENS" },
    chapter1: {
      label: "A RECEITA ORIGINAL",
      title: "Antonio Maresca e a pensão Maresca",
      p1: "No início dos anos 1900, a península de Sorrento era um refúgio para viajantes em busca do calor do sol mediterrâneo. Na <em>pensione</em> de sua família, <strong>Antonio Maresca</strong> recebia os hóspedes com uma hospitalidade que se tornou lendária. Foi aqui, em um terraço com vista para o Golfo de Nápoles ao pôr do sol, que ele serviu pela primeira vez seu licor de limão especial. Conhecido no dialeto local como <em>rosolio di limone</em>, esta infusão vibrante era um gesto de pura generosidade.",
      p2: "Décadas depois, em 1988, a família fundou formalmente a empresa, tornando-se a primeira a patentear e usar o nome 'limoncello'. Através das gerações, o compromisso com a arte de Antonio nunca vacilou. <strong>A receita original ainda é usada até hoje.</strong> Baseia-se inteiramente nos Limões de Sorrento I.G.P. — o premiado <em>Ovale di Sorrento</em> — cultivados no solo vulcânico e nas brisas marítimas de nossos jardins em socalcos.",
      imageDesc: "[Fotografia histórica: o terraço do hotel/pensão original, arquitetura de época, tons sépia quentes, hospitalidade mediterrânea do início do século]"
    },
    chapter2: {
      label: "UM LUGAR ÚNICO NO MUNDO",
      title: "A magia de Sorrento",
      p1: "Sorrento é mais do que um destino; é um estado de espírito. Longe do mundo moderno, é um lugar onde tudo ainda pode acontecer — encontros inesperados, amor à primeira vista e cenários de cair o queixo. A luz dourada, o perfume dos cítricos no ar, o calor do sol na pedra antiga e a imensidão infinita do mar criam uma atmosfera verdadeiramente inebriante.",
      p2: "Cada garrafa do nosso limoncello leva você a este mundo gole por gole, carregando a essência da costa onde quer que você vá. <strong>Limoncello di Sorrento, onde tudo ainda pode acontecer.</strong>"
    },
    manifesto: "Se é verdade que no mundo existem costas tão belas quanto Sorrento, nenhuma costa no mundo pode ostentar uma história tão rica quanto a nossa.",
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

// Reusable Fade-In Component
const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "left" | "right", key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const translateClass = direction === "up" ? "translate-y-8" : direction === "left" ? "-translate-x-8" : "translate-x-8";

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-[1000ms] ease-in-out ${isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${translateClass}`} ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Origins({ lang, setLang }: OriginsProps) {
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    setBannerLoaded(true);
  }, []);
  const t = translations[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="font-lora text-[#082B4F] bg-[#F9F9F9] min-h-screen selection:bg-[#F4D03F] selection:text-[#082B4F] overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-[1000ms] ease-in-out ${scrolled ? 'bg-[#F9F9F9]/85 backdrop-blur-md shadow-sm py-4 border-b border-[#082B4F]/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className={`font-playfair text-xl tracking-wider transition-colors duration-[1000ms] ${scrolled ? 'text-[#082B4F]' : 'text-[#F9F9F9]'}`}>
            <img src="/images/limoncello-logo-04.png" alt="Limoncello di Sorrento" className="h-16 md:h-20 w-auto object-contain transition-all duration-500" />
          </Link>
          
          <div className="flex items-center gap-6">
            <div className={`flex gap-3 text-sm font-playfair uppercase tracking-widest transition-colors duration-[1000ms] ${scrolled ? 'text-[#082B4F]' : 'text-[#F9F9F9]'}`}>
              <button onClick={() => setLang('en')} className={lang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}>EN</button>
              <span>|</span>
              <button onClick={() => setLang('it')} className={lang === 'it' ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}>IT</button>
              <span>|</span>
              <button onClick={() => setLang('pt')} className={lang === 'pt' ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}>PT</button>
            </div>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`transition-colors duration-[1000ms] ${scrolled ? 'text-[#082B4F]' : 'text-[#F9F9F9]'}`}
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
                className={`block font-playfair text-4xl md:text-6xl hover:text-[#F4D03F] transition-all duration-[800ms] ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 1. TITLE BANNER */}
      <section className="relative h-[45vh] md:h-[50vh] flex flex-col items-center justify-center text-[#F9F9F9] px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/section3-1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#082B4F]/60 z-0" /> {/* Overlay to ensure text readability */}
        
        <div className="relative z-10 flex flex-col items-center">
          <div 
            className="w-[120px] h-[2px] bg-[#F4D03F] mb-8 transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '400ms' }}
          />
          <h1 
            className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] text-center max-w-4xl leading-tight mb-6 transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '800ms' }}
          >
            {t.banner.title}
          </h1>
          <div 
            className="text-[0.8rem] tracking-widest uppercase font-playfair transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '1000ms' }}
          >
            {t.banner.breadcrumb}
          </div>
        </div>
      </section>

      {/* 2. CHAPTER 1: THE FOUNDING STORY */}
      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-24 bg-[#F9F9F9] max-w-[1600px] mx-auto">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text column */}
          <div className="w-full lg:w-[58%] order-2 lg:order-1">
            <FadeIn direction="left" delay={0}>
              <p className="text-sm tracking-[0.2em] uppercase font-playfair mb-6 text-[#249BC4]">
                {t.chapter1.label}
              </p>
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-8 text-[#082B4F]">
                {t.chapter1.title}
              </h2>
              <div className="text-lg md:text-xl leading-relaxed text-[#082B4F]/80 space-y-6">
                <p dangerouslySetInnerHTML={{ __html: t.chapter1.p1 }} />
                <p dangerouslySetInnerHTML={{ __html: t.chapter1.p2 }} />
              </div>
            </FadeIn>
          </div>
          
          {/* Image column */}
          <div className="w-full lg:w-[42%] order-1 lg:order-2">
            <FadeIn direction="right" delay={200}>
              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#EAE6DF] relative">
                <img 
                  src="/images/origins-01.png" 
                  alt={t.chapter1.imageDesc} 
                  className="w-full h-full object-cover sepia-[0.3] contrast-[0.9]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. CHAPTER 2: THE PLACE */}
      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-24 bg-[#ffffff] max-w-[1600px] mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Text block */}
          <div className="max-w-[720px] mx-auto text-center mb-20">
            <FadeIn direction="up">
              <p className="text-sm tracking-[0.2em] uppercase font-playfair mb-6 text-[#249BC4]">
                {t.chapter2.label}
              </p>
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-8 text-[#082B4F]">
                {t.chapter2.title}
              </h2>
              <div className="text-lg md:text-xl leading-relaxed text-[#082B4F]/80 space-y-6">
                <p dangerouslySetInnerHTML={{ __html: t.chapter2.p1 }} />
                <p dangerouslySetInnerHTML={{ __html: t.chapter2.p2 }} />
              </div>
            </FadeIn>
          </div>

          {/* Photo mosaic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            <FadeIn delay={0} className="w-full">
              <div className="aspect-[16/10] w-full bg-[#EAE6DF] rounded-sm overflow-hidden">
                <img 
                  src="/images/origins-02.png" 
                  alt="Person on a boat at sunset, cocktail in hand, golden-hour light, open sea" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
            <FadeIn delay={150} className="w-full">
              <div className="aspect-[16/10] w-full bg-[#EAE6DF] rounded-sm overflow-hidden">
                <img 
                  src="/images/origins-04.png" 
                  alt="Coastal vegetation, Mediterranean cliffs descending toward turquoise water" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
            <FadeIn delay={300} className="w-full">
              <div className="aspect-[3/4] w-full bg-[#EAE6DF] rounded-sm overflow-hidden">
                <img 
                  src="/images/origins-03.png" 
                  alt="Close-up of a person by the sea holding a cocktail, natural and relaxed" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
            <FadeIn delay={450} className="w-full">
              <div className="aspect-[3/4] w-full bg-[#EAE6DF] rounded-sm overflow-hidden">
                <img 
                  src="/images/origins-05.png" 
                  alt="Whitewashed church or building typical of the origin place, warm stone, blue sky" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. MANIFESTO QUOTE */}
      <section className="py-24 lg:py-36 px-6 bg-[#F9F9F9] flex flex-col items-center justify-center">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="w-[80px] h-[2px] bg-[#F4D03F] mx-auto mb-12 opacity-50 animate-[fadeIn_400ms_ease-in-out_both]" style={{ animationDelay: '200ms' }} />
          <FadeIn delay={400} direction="up" className="transition-all duration-[1000ms]">
            <p className="font-playfair italic text-[clamp(1.25rem,3.5vw,2.25rem)] leading-[1.8] text-[#082B4F]">
              {t.manifesto}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="w-full h-24 bg-[#F9F9F9] flex items-center justify-center overflow-hidden">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: 'url(/images/vietri-04.png)',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'bottom',
            backgroundSize: 'contain'
          }}
        />
      </div>

      {/* Footer */}
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
