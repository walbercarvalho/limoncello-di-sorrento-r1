import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, ArrowUp, ArrowRight, Leaf, MapPin, Sun, Droplet } from 'lucide-react';

import { Link } from 'react-router-dom';

// --- Types & Content ---

type Language = 'en' | 'it' | 'pt';

const content = {
  en: {
    ageGate: {
      question: "Are you old enough to drink alcohol?",
      subtext: "You must be of legal drinking age in your country to enter this site.",
      yes: "Yes, I am",
      no: "No, I am not",
      denied: "You must be of legal drinking age to view this content."
    },
    nav: {
      home: "Home",
      product: "The Limoncello",
      origins: "Our Origins",
      craft: "Craft Process",
      cocktails: "Cocktails and Etc.",
      contact: "Contact"
    },
    hero: [
      {
        label: "THE BIRTHPLACE",
        headline: "A Taste of the\nAmalfi Coast",
        cta: "Taste Sorrento",
        imageDesc: "[Hero: Golden-hour coastal Amalfi landscape with bottle in foreground]",
        video: "/images/hero-1.mp4"
      },
      {
        label: "THE CRAFT",
        headline: "Sun-Ripened\nPerfection",
        cta: "Explore Our Process",
        imageDesc: "[Hero: Close-up of vibrant yellow Sorrento lemons on the branch]",
        image: "/images/hero-2.png"
      },
      {
        label: "THE TRADITION",
        headline: "Generations of\nArtisans",
        cta: "Read Our Story",
        imageDesc: "[Hero: Artisan peeling lemons in a rustic sunlit workshop]",
        image: "/images/hero-3.png"
      }
    ],
    intro: {
      headline: "The Essence of Sorrento",
      p1: "For over a century, our family has cultivated the finest Limone di Sorrento lemons in our terraced giardini overlooking the Mediterranean Sea.",
      p2: "Every bottle of Limoncello di Sorrento captures the unique terroir of the Amalfi Coast—a perfect balance of vibrant citrus, warm sunshine, and coastal breezes. It is a millesimé expression of our heritage.",
      cta: "Discover our Limoncello"
    },
    origins: {
      label: "OUR ROOTS",
      headline: "Born from the Sun and Sea",
      p1: "The story of our limoncello begins in the steep, terraced lemon groves of Sorrento. Here, protected by traditional 'pagliarelle' (straw mats), our lemons ripen slowly, absorbing the essence of the sea and the volcanic soil.",
      p2: "It was in these very groves that our great-grandmother first perfected her recipe, steeping the fragrant, oil-rich peels in pure alcohol to capture their vibrant spirit. Today, we honor her legacy with every small batch we produce.",
      imageDesc: "[Portrait: Historic black and white photo of the family's original lemon grove]"
    },
    gallery: [
      { desc: "[Gallery: Sweeping view of Sorrento coastline at sunset]", image: "/images/section3-1.png" },
      { desc: "[Gallery: Close-up of the bright, textured peel of an Limone di Sorrento lemon]", image: "/images/section3-2.png" },
      { desc: "[Gallery: Elegant pour of chilled limoncello into a frosted glass]", image: "/images/section3-3.png" }
    ],
    craft: {
      label: "THE PROCESS",
      headline: "Patience and Purity",
      p1: "True artisanal limoncello requires time and an unwavering commitment to quality. We use only P.G.I. certified Sorrento lemons, peeled by hand within hours of harvest to ensure the essential oils are perfectly preserved.",
      p2: "The peels are steeped in pure alcohol for exactly 21 days—no more, no less. We add only pure water and natural sugar, never artificial colors or flavors.",
      badges: [
        "100% Natural",
        "P.G.I. Certified",
        "Hand-Peeled",
        "30% ABV"
      ],
      imageDesc: "[Portrait: Hands carefully peeling a lemon, capturing the mist of essential oils]"
    },
    serve: {
      label: "THE EXPERIENCE",
      headline: "How to taste it",
      p: "Serve ice-cold straight from the freezer as a perfect digestivo, or mix it with prosecco and fresh basil for a refreshing Amalfi Spritz.",
      cta: "Explore Cocktails",
      imageDesc: "[Background: Elegant dinner table setting on a terrace at dusk, glasses of limoncello catching the light]"
    },
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
    ageGate: {
      question: "Hai l'età legale per bere alcolici?",
      subtext: "Devi avere l'età legale per il consumo di alcolici nel tuo paese per entrare in questo sito.",
      yes: "Sì, ho l'età legale",
      no: "No, non ce l'ho",
      denied: "Devi avere l'età legale per visualizzare questo contenuto."
    },
    nav: {
      home: "Home",
      product: "Il Limoncello",
      origins: "Le Nostre Origini",
      craft: "Processo Artigianale",
      cocktails: "Cocktail e Altro",
      contact: "Contatti"
    },
    hero: [
      {
        label: "IL LUOGO D'ORIGINE",
        headline: "Un Assaggio della\nCostiera Amalfitana",
        cta: "Scopri Sorrento",
        imageDesc: "[Hero: Paesaggio costiero amalfitano all'ora d'oro con bottiglia in primo piano]",
        video: "/images/hero-1.mp4"
      },
      {
        label: "L'ARTIGIANATO",
        headline: "Perfezione Maturata\nal Sole",
        cta: "Esplora il Processo",
        imageDesc: "[Hero: Primo piano di limoni di Sorrento gialli e vivaci sul ramo]",
        image: "/images/hero-2.png"
      },
      {
        label: "LA TRADIZIONE",
        headline: "Generazioni di\nArtigiani",
        cta: "Leggi la Nostra Storia",
        imageDesc: "[Hero: Artigiano che sbuccia limoni in un laboratorio rustico illuminato dal sole]",
        image: "/images/hero-3.png"
      }
    ],
    intro: {
      headline: "L'Essenza di Sorrento",
      p1: "Per oltre un secolo, la nostra famiglia ha coltivato i migliori limoni Limone di Sorrento nei nostri giardini terrazzati affacciati sul Mar Mediterraneo.",
      p2: "Ogni bottiglia di Limoncello di Sorrento cattura il terroir unico della Costiera Amalfitana: un perfetto equilibrio tra agrumi vivaci, sole caldo e brezze costiere. È un'espressione millesimé della nostra eredità.",
      cta: "Scopri il nostro Limoncello"
    },
    origins: {
      label: "LE NOSTRE RADICI",
      headline: "Nato dal Sole e dal Mare",
      p1: "La storia del nostro limoncello inizia nei ripidi limoneti terrazzati di Sorrento. Qui, protetti dalle tradizionali 'pagliarelle', i nostri limoni maturano lentamente, assorbendo l'essenza del mare e del terreno vulcanico.",
      p2: "È stato proprio in questi boschetti che la nostra bisnonna ha perfezionato per la prima volta la sua ricetta, mettendo in infusione le bucce profumate e ricche di oli in puro alcol per catturarne lo spirito vibrante. Oggi onoriamo la sua eredità con ogni piccolo lotto che produciamo.",
      imageDesc: "[Portrait: Storica foto in bianco e nero del limoneto originale della famiglia]"
    },
    gallery: [
      { desc: "[Gallery: Ampia vista della costa di Sorrento al tramonto]", image: "/images/section3-1.png" },
      { desc: "[Gallery: Primo piano della buccia luminosa e ruvida di un limone Limone di Sorrento]", image: "/images/section3-2.png" },
      { desc: "[Gallery: Elegante versata di limoncello freddo in un bicchiere brinato]", image: "/images/section3-3.png" }
    ],
    craft: {
      label: "IL PROCESSO",
      headline: "Pazienza e Purezza",
      p1: "Il vero limoncello artigianale richiede tempo e un impegno incrollabile per la qualità. Utilizziamo solo limoni di Sorrento certificati I.G.P., sbucciati a mano entro poche ore dal raccolto per garantire che gli oli essenziali siano perfettamente conservati.",
      p2: "Le bucce vengono messe in infusione in puro alcol per esattamente 21 giorni: né più, né meno. Aggiungiamo solo acqua pura e zucchero naturale, mai coloranti o aromi artificiali.",
      badges: [
        "100% Naturale",
        "Certificato I.G.P.",
        "Sbucciato a Mano",
        "30% Vol."
      ],
      imageDesc: "[Portrait: Mani che sbucciano con cura un limone, catturando la nebulizzazione degli oli essenziali]"
    },
    serve: {
      label: "L'ESPERIENZA",
      headline: "Come degustarlo",
      p: "Servilo ghiacciato direttamente dal freezer come perfetto digestivo, oppure mescolalo con prosecco e basilico fresco per un rinfrescante Amalfi Spritz.",
      cta: "Esplora i Cocktail",
      imageDesc: "[Background: Elegante tavola apparecchiata su una terrazza al tramonto, bicchieri di limoncello che catturano la luce]"
    },
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
    ageGate: {
      question: "Você tem idade legal para consumir bebidas alcoólicas?",
      subtext: "Você deve ter a idade legal para consumo de álcool em seu país para acessar este site.",
      yes: "Sim, eu tenho",
      no: "Não, eu não tenho",
      denied: "Você deve ter a idade legal para visualizar este conteúdo."
    },
    nav: {
      home: "Início",
      product: "O Limoncello",
      origins: "Nossas Origens",
      craft: "Processo Artesanal",
      cocktails: "Coquetéis e Etc.",
      contact: "Contato"
    },
    hero: [
      {
        label: "O BERÇO",
        headline: "Um Sabor da\nCosta Amalfitana",
        cta: "Descubra Sorrento",
        imageDesc: "[Hero: Paisagem costeira de Amalfi na hora dourada com garrafa em primeiro plano]",
        video: "/images/hero-1.mp4"
      },
      {
        label: "O PROCESSO",
        headline: "Perfeição Amadurecida\nao Sol",
        cta: "Explore Nosso Processo",
        imageDesc: "[Hero: Close de limões de Sorrento amarelos vibrantes no galho]",
        image: "/images/hero-2.png"
      },
      {
        label: "A TRADIÇÃO",
        headline: "Gerações de\nArtesãos",
        cta: "Leia Nossa História",
        imageDesc: "[Hero: Artesão descascando limões em uma oficina rústica iluminada pelo sol]",
        image: "/images/hero-3.png"
      }
    ],
    intro: {
      headline: "A Essência de Sorrento",
      p1: "Por mais de um século, nossa família cultivou os melhores limões Limone di Sorrento em nossos jardins em terraços com vista para o Mar Mediterrâneo.",
      p2: "Cada garrafa de Limoncello di Sorrento captura o terroir único da Costa Amalfitana — um equilíbrio perfeito entre cítricos vibrantes, sol quente e brisas costeiras. É uma expressão millesimé de nossa herança.",
      cta: "Descubra nosso Limoncello"
    },
    origins: {
      label: "NOSSAS RAÍZES",
      headline: "Nascido do Sol e do Mar",
      p1: "A história do nosso limoncello começa nos íngremes limoeiros em terraços de Sorrento. Aqui, protegidos pelas tradicionais 'pagliarelle' (esteiras de palha), nossos limões amadurecem lentamente, absorvendo a essência do mar e do solo vulcânico.",
      p2: "Foi nestes mesmos bosques que nossa bisavó aperfeiçoou pela primeira vez sua receita, macerando as cascas perfumadas e ricas em óleos em álcool puro para capturar seu espírito vibrante. Hoje, honramos seu legado com cada pequeno lote que produzimos.",
      imageDesc: "[Portrait: Foto histórica em preto e branco do limoeiro original da família]"
    },
    gallery: [
      { desc: "[Gallery: Ampla vista da costa de Sorrento ao pôr do sol]", image: "/images/section3-1.png" },
      { desc: "[Gallery: Close da casca brilhante e texturizada de um limão Limone di Sorrento]", image: "/images/section3-2.png" },
      { desc: "[Gallery: Elegante derramamento de limoncello gelado em um copo fosco]", image: "/images/section3-3.png" }
    ],
    craft: {
      label: "O PROCESSO",
      headline: "Paciência e Pureza",
      p1: "O verdadeiro limoncello artesanal exige tempo e um compromisso inabalável com a qualidade. Usamos apenas limões de Sorrento com certificação I.G.P., descascados à mão horas após a colheita para garantir que os óleos essenciais sejam perfeitamente preservados.",
      p2: "As cascas são maceradas em álcool puro por exatamente 21 dias — nem mais, nem menos. Adicionamos apenas água pura e açúcar natural, nunca cores artificiais ou conservantes.",
      badges: [
        "100% Natural",
        "Certificação I.G.P.",
        "Descascado à Mão",
        "30% ABV"
      ],
      imageDesc: "[Portrait: Mãos descascando cuidadosamente um limão, capturando a névoa de óleos essenciais]"
    },
    serve: {
      label: "A EXPERIÊNCIA",
      headline: "Como degustar",
      p: "Sirva bem gelado direto do freezer como um digestivo perfeito, ou misture com prosecco e manjericão fresco para um refrescante Amalfi Spritz.",
      cta: "Explore Coquetéis",
      imageDesc: "[Background: Elegante configuração de mesa de jantar em um terraço ao anoitecer, copos de limoncello capturando a luz]"
    },
    footer: {
      drinkResponsibly: "BEBA COM RESPONSABILIDADE",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "P.IVA: IT 10195214213",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      developedBy: "Desenvolvido por"
    }
  }
};

// --- Components ---

const RevealOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  const t = content[lang];

  // Handle scroll for nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero slider auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % t.hero.length);
    }, 10000); // Changed from 6000 to 10000 (10 seconds)
    return () => clearInterval(timer);
  }, [t.hero.length]);

  // Hero fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroVisible(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Close menu on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % t.hero.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + t.hero.length) % t.hero.length);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-lora text-[#082B4F] bg-[#F9F9F9] min-h-screen selection:bg-[#F4D03F] selection:text-[#082B4F]">
      {/* Main Content */}
      <div className="opacity-100">
        
        {/* 2. Navigation */}
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

        {/* 3. Full-Viewport Hero Slider */}
        <section className="relative h-screen w-full overflow-hidden bg-[#249BC4]">
          {t.hero.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {/* Video, Image Placeholder or Actual Image */}
              {slide.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src={slide.video}
                />
              ) : slide.image ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-[#249BC4] flex items-center justify-center p-8 text-center">
                  <span className="text-[#F9F9F9]/50 font-lora text-lg max-w-md">{slide.imageDesc}</span>
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#082B4F]/80 via-[#082B4F]/30 to-transparent" />
              
            </div>
          ))}

          {/* Bottle Image Overlay */}
          <div className={`absolute bottom-[-5%] right-[-20%] sm:right-[-10%] md:bottom-[-5%] md:right-0 lg:right-[2%] z-20 h-[70vh] md:h-[90vh] max-w-[85%] sm:max-w-[80%] md:max-w-none max-h-[900px] pointer-events-none flex items-end transition-all duration-[1000ms] ease-in-out ${isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <img 
              src="/images/Limoncelo-di-sorrento-04.png" 
              alt="Limoncello di Sorrento Bottle" 
              className="h-full w-auto object-contain drop-shadow-2xl md:scale-110 origin-bottom"
            />
          </div>

          {/* Content Overlays (Placed above bottle with z-30) */}
          {t.hero.map((slide, idx) => (
            <div key={`content-${idx}`} className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-30' : 'opacity-0 z-0'}`}>
              <div className={`absolute inset-0 flex flex-col pt-[25vh] pb-[25vh] md:pt-0 md:pb-32 px-6 md:px-24 max-w-7xl mx-auto justify-between md:justify-end transition-all duration-[1000ms] ease-in-out ${isHeroVisible && idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="w-full pointer-events-auto">
                  <span className="font-playfair text-[0.875rem] uppercase tracking-[0.2em] text-[#F4D03F] mb-4 md:mb-6 block">
                    {slide.label}
                  </span>
                  <h2 className="font-playfair text-[clamp(2.5rem,11.5vw,4.5rem)] md:text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-[#F9F9F9] mb-0 md:mb-10 whitespace-normal md:whitespace-pre-line tracking-tight md:tracking-normal w-[85%] md:w-auto">
                    {slide.headline}
                  </h2>
                </div>
                <div className="pointer-events-auto">
                  <Link 
                    to={idx === 0 ? '/product' : idx === 1 ? '/craft' : '/origins'}
                    className="inline-block bg-[#F4D03F] text-[#082B4F] px-[22px] py-[11px] text-[0.715rem] md:px-8 md:py-4 md:text-sm font-playfair uppercase tracking-widest hover:scale-105 hover:brightness-105 hover:shadow-[0_10px_30px_rgba(244,208,63,0.4)] transition-all duration-[600ms] ease-in-out relative z-40"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <div className="absolute bottom-12 right-6 md:right-24 z-30 flex items-center gap-8 text-[#F9F9F9]">
            <div className="flex gap-4">
              <button onClick={prevSlide} className="p-2 hover:text-[#F4D03F] transition-colors duration-[600ms]">
                <ChevronLeft size={32} strokeWidth={1} />
              </button>
              <button onClick={nextSlide} className="p-2 hover:text-[#F4D03F] transition-colors duration-[600ms]">
                <ChevronRight size={32} strokeWidth={1} />
              </button>
            </div>
            <div className="font-mono text-sm tracking-widest opacity-80">
              0{currentSlide + 1} / 0{t.hero.length}
            </div>
          </div>
        </section>

        {/* 4. Brand Introduction Section */}
        <section className="py-32 px-6 bg-[#F9F9F9] relative overflow-hidden flex items-center">
          {/* Decorative Vietri Art - Left */}
          <div className="absolute left-[-20%] md:left-0 top-0 bottom-0 h-full opacity-[0.05] md:opacity-[0.15] pointer-events-none select-none">
            <img src="/images/vietri-01.png" alt="" className="h-full w-auto max-w-none" referrerPolicy="no-referrer" />
          </div>
          
          {/* Decorative Vietri Art - Right */}
          <div className="absolute right-[-20%] md:right-0 top-0 bottom-0 h-full opacity-[0.05] md:opacity-[0.15] pointer-events-none select-none">
            <img src="/images/vietri-01.png" alt="" className="h-full w-auto max-w-none scale-x-[-1]" referrerPolicy="no-referrer" />
          </div>

          <div className="max-w-[700px] mx-auto text-center relative z-10">
            <RevealOnScroll>
              {/* Decorative Seal */}
              <div className="w-24 h-24 mx-auto mb-12 rounded-full border border-[#249BC4] flex items-center justify-center p-2">
                <div className="w-full h-full rounded-full border border-[#249BC4]/30 flex items-center justify-center text-[#249BC4] font-playfair text-xs text-center leading-tight">
                  Dal<br/>1890
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={150}>
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-10 text-[#082B4F]">
                {t.intro.headline}
              </h2>
            </RevealOnScroll>
            
            <RevealOnScroll delay={300}>
              <p className="text-lg md:text-xl leading-relaxed mb-8 text-[#082B4F]/80">
                {t.intro.p1}
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-12 text-[#082B4F]/80">
                {t.intro.p2}
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={450}>
              <Link to="/product" className="inline-block font-playfair text-sm uppercase tracking-[0.2em] text-[#249BC4] link-underline pb-1">
                {t.intro.cta} &rarr;
              </Link>
            </RevealOnScroll>
          </div>
        </section>

        {/* 5. Origin Story — Asymmetric Two-Column */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-32">
            <div className="w-full md:w-[45%] order-2 md:order-1">
              <RevealOnScroll>
                <span className="font-playfair text-[0.75rem] uppercase tracking-[0.2em] text-[#249BC4] mb-6 block">
                  {t.origins.label}
                </span>
                <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-8 text-[#082B4F]">
                  {t.origins.headline}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={150}>
                <p className="text-lg leading-relaxed mb-6 text-[#082B4F]/80">
                  {t.origins.p1}
                </p>
                <p className="text-lg leading-relaxed text-[#082B4F]/80">
                  {t.origins.p2}
                </p>
              </RevealOnScroll>
            </div>
            <div className="w-full md:w-[55%] order-1 md:order-2">
              <RevealOnScroll delay={300}>
                <div className="aspect-[3/4] md:aspect-[4/5] bg-[#249BC4] flex items-center justify-center text-center rounded-sm overflow-hidden relative">
                  <img 
                    src="/images/Limoneto-di-sorrento-01.png" 
                    alt="Historic black and white photo of the family's original lemon grove" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* 6. Atmospheric Photo Gallery */}
        <section className="w-full overflow-hidden">
          {t.gallery.map((item, idx) => (
            <div 
              key={idx} 
              className="h-[60vh] md:h-[80vh] w-full bg-[#082B4F] flex items-center justify-center p-8 text-center relative"
              style={{
                backgroundAttachment: 'fixed', // Simple parallax
                backgroundImage: item.image ? `url(${item.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: idx % 2 === 0 ? '#082B4F' : '#249BC4'
              }}
            >
              {!item.image && (
                <span className="text-[#F9F9F9]/50 font-lora max-w-md relative z-10">{item.desc}</span>
              )}
              {/* Subtle overlay to blend sections */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </section>

        {/* 7. Terroir / Craft Section — Reversed Two-Column */}
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-32">
            <div className="w-full md:w-[55%]">
              <RevealOnScroll>
                <div className="aspect-[3/4] md:aspect-[4/5] bg-[#249BC4] flex items-center justify-center text-center rounded-sm overflow-hidden relative">
                  <img 
                    src="/images/Limoneto-di-sorrento-02.png" 
                    alt="Hands carefully peeling a lemon, capturing the mist of essential oils" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </RevealOnScroll>
            </div>
            <div className="w-full md:w-[45%]">
              <RevealOnScroll delay={150}>
                <span className="font-playfair text-[0.75rem] uppercase tracking-[0.2em] text-[#249BC4] mb-6 block">
                  {t.craft.label}
                </span>
                <h2 className="font-playfair text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8 text-[#082B4F]">
                  {t.craft.headline}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <p className="text-lg leading-relaxed mb-6 text-[#082B4F]/80">
                  {t.craft.p1}
                </p>
                <p className="text-lg leading-relaxed mb-12 text-[#082B4F]/80">
                  {t.craft.p2}
                </p>
              </RevealOnScroll>
              
              <RevealOnScroll delay={450}>
                <div className="grid grid-cols-2 gap-8">
                  {t.craft.badges.map((badge, idx) => {
                    const icons = [<Leaf size={24} />, <MapPin size={24} />, <Sun size={24} />, <Droplet size={24} />];
                    return (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border border-[#F4D03F] flex items-center justify-center flex-shrink-0 text-[#F4D03F]">
                          {icons[idx]}
                        </div>
                        <span className="font-playfair text-sm tracking-wider text-[#082B4F]">{badge}</span>
                      </div>
                    );
                  })}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* 8. Lifestyle / Serve Section */}
        <section 
          className="relative py-48 px-6 text-center bg-[#082B4F]"
          style={{
            backgroundImage: 'url(/images/Limoncello-Spritz-01.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#082B4F]/90 via-[#082B4F]/60 to-[#082B4F]/90"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <RevealOnScroll>
              <span className="font-playfair text-[0.75rem] uppercase tracking-[0.2em] text-[#F4D03F] mb-6 block">
                {t.serve.label}
              </span>
              <h2 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-8 text-[#F9F9F9]">
                {t.serve.headline}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <p className="text-xl leading-relaxed mb-12 text-[#F9F9F9]/80">
                {t.serve.p}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <Link to="/cocktails" className="inline-block bg-transparent border border-[#F4D03F] text-[#F4D03F] px-10 py-4 font-playfair uppercase tracking-widest text-sm hover:bg-[#F4D03F] hover:text-[#082B4F] hover:shadow-[0_10px_30px_rgba(244,208,63,0.4)] transition-all duration-[600ms] ease-in-out">
                {t.serve.cta}
              </Link>
            </RevealOnScroll>
          </div>
        </section>

        {/* 9. Decorative Divider */}
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

        {/* 10. Footer */}
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
    </div>
  );
}
