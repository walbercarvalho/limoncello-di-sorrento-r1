import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp, Droplet, Leaf, MapPin, Sun, Wine, ChevronLeft, ChevronRight } from 'lucide-react';

type Language = 'en' | 'it' | 'pt';

interface ProductProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const translations = {
  en: {
    nav: { home: "Home", product: "The Limoncello", origins: "Our Origins", craft: "Craft Process", cocktails: "Cocktails and Etc.", contact: "Contact" },
    banner: { title: "The magic of Sorrento in each sip", breadcrumb: "LIMONCELLO DI SORRENTO — THE LIMONCELLO" },
    intro: { label: "LIMONCELLO DI SORRENTO", title: "The original", body: "The original <strong>Limoncello di Sorrento</strong> is crafted using an artisanal method passed down through generations. Certified with the <strong>P.G.I.</strong> mark, it represents an unbreakable bond with the <em>terroir</em> of the Amalfi Coast." },
    moodboard: "[Product bottle alongside a cocktail, shot in warm golden tones on a handcrafted surface]",
    origin: { label: "ANTONIO MARESCA AND SORRENTO", title: "The original recipe", body: "In the early 1900s, <strong>Antonio Maresca</strong> began serving his guests a special lemon liqueur at his <em>pensione</em> in <strong>Sorrento</strong>. The recipe, steeped in local tradition, used only the finest lemons from the surrounding groves. Today, that same dedication to quality and authenticity lives on, preserving the true taste of the Amalfi Coast in every bottle.", img: "[Historical sepia-toned photograph of the founding location — a charming pension or villa with period architecture]" },
    ingredient: { label: "[Botanical-style cutaway: the star ingredient shown whole and in cross-section, on a clean light background]", title: "Ovale di Sorrento", body: "The <strong>Ovale di Sorrento P.G.I.</strong> is no ordinary lemon. Cultivated under traditional <em>pagliarelle</em> (straw mats) that delay ripening, these lemons develop a thick, intensely aromatic peel rich in essential oils. This unique microclimate and careful cultivation are what give our limoncello its unmistakable flavor." },
    attributes: {
      title: "Spot the original", subtitle: "The production process follows an artisanal method at every stage. Discover what makes Limoncello di Sorrento the original.",
      items: [
        { title: "P.G.I. SORRENTO LEMONS", desc: "Certified origin, guaranteeing the highest quality and traditional cultivation methods." },
        { title: "100% NATURAL", desc: "No artificial colors, flavors, or preservatives. Just pure, natural ingredients." },
        { title: "TERROIR", desc: "Grown in the unique volcanic soil and maritime climate of the Sorrento peninsula." },
        { title: "PEEL", desc: "Rich in essential oils, carefully peeled by hand to avoid the bitter pith." },
        { title: "ALCOHOL CONTENT", desc: "Perfectly balanced at a minimum of 30% ABV to extract and preserve the lemon's essence." }
      ],
      cta: "DISCOVER THE PROCESS →"
    },
    bottle: { img: "[Product bottle photographed as a design object — transparent background, emphasizing the glass texture, embossed patterns, and label detail]", quote: "As yellow as the sun. As clear as the sea. The journey begins through the waves." },
    territory: { 
      label: "THE TERRITORY", 
      title: "Sorrento and the Amalfi Coast", 
      body: "Where the Lattari Mountains plunge into the Tyrrhenian Sea, a unique microclimate is born. The sea breeze, the volcanic soil, and the golden sunlight create the perfect sanctuary for our lemons.", 
      slides: [
        { img: "/images/product-5-1.png", alt: "Coastal cliffs at golden hour" },
        { img: "/images/product-5-2.png", alt: "Terraced lemon groves" },
        { img: "/images/product-5-3.png", alt: "Narrow village streets" },
        { img: "/images/product-5-4.png", alt: "Panoramic sea views" },
        { img: "/images/product-5-5.png", alt: "Volcanic soil close-up" },
        { img: "/images/product-5-6.png", alt: "Traditional pergola structures" },
        { img: "/images/product-5-7.png", alt: "Sunrise over the water" },
        { img: "/images/product-5-8.png", alt: "Artisanal harvest process" }
      ] 
    },
    lifestyle: { img: "[Poolside scene: two cocktails made with the product, warm sunset lighting, aspirational Mediterranean setting]", label: "FOR ENTHUSIASTS AND BARTENDERS", title: "Neat or mixed?", body: "A versatile classic. Enjoy it ice-cold neat as a traditional digestif, or mix it into extraordinary cocktails for a refreshing twist.", cta: "DISCOVER COCKTAILS →" },
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
    banner: { title: "La magia di Sorrento in ogni sorso", breadcrumb: "LIMONCELLO DI SORRENTO — IL LIMONCELLO" },
    intro: { label: "LIMONCELLO DI SORRENTO", title: "L'originale", body: "L'originale <strong>Limoncello di Sorrento</strong> è creato con un metodo artigianale tramandato da generazioni. Certificato con il marchio <strong>I.G.P.</strong>, rappresenta un legame indissolubile con il <em>terroir</em> della Costiera Amalfitana." },
    moodboard: "[Bottiglia del prodotto accanto a un cocktail, fotografata in calde tonalità dorate su una superficie artigianale]",
    origin: { label: "ANTONIO MARESCA E SORRENTO", title: "La ricetta originale", body: "Nei primi del '900, <strong>Antonio Maresca</strong> iniziò a servire ai suoi ospiti uno speciale liquore al limone nella sua <em>pensione</em> a <strong>Sorrento</strong>. La ricetta, intrisa di tradizione locale, utilizzava solo i migliori limoni dei limoneti circostanti. Oggi, quella stessa dedizione alla qualità e all'autenticità continua a vivere, preservando il vero sapore della Costiera Amalfitana in ogni bottiglia.", img: "[Fotografia storica in color seppia del luogo di fondazione — un'affascinante pensione o villa con architettura d'epoca]" },
    ingredient: { label: "[Spaccato in stile botanico: l'ingrediente principale mostrato intero e in sezione, su uno sfondo chiaro e pulito]", title: "Ovale di Sorrento", body: "L'<strong>Ovale di Sorrento I.G.P.</strong> non è un limone comune. Coltivato sotto le tradizionali <em>pagliarelle</em> che ne ritardano la maturazione, sviluppa una buccia spessa e intensamente aromatica, ricca di oli essenziali. Questo microclima unico e l'attenta coltivazione conferiscono al nostro limoncello il suo sapore inconfondibile." },
    attributes: {
      title: "Riconosci l'originale", subtitle: "Il processo di produzione segue un metodo artigianale in ogni sua fase. Scopri cosa rende unico il Limoncello di Sorrento.",
      items: [
        { title: "LIMONI DI SORRENTO I.G.P.", desc: "Origine certificata, a garanzia della massima qualità e dei metodi di coltivazione tradizionali." },
        { title: "100% NATURALE", desc: "Nessun colorante, aroma o conservante artificiale. Solo ingredienti puri e naturali." },
        { title: "TERROIR", desc: "Coltivato nel singolare terreno vulcanico e nel clima marittimo della penisola sorrentina." },
        { title: "BUCCIA", desc: "Ricca di oli essenziali, accuratamente sbucciata a mano per evitare la parte bianca amara." },
        { title: "GRADAZIONE ALCOLICA", desc: "Perfettamente bilanciata a un minimo del 30% vol. per estrarre e preservare l'essenza del limone." }
      ],
      cta: "SCOPRI IL PROCESSO →"
    },
    bottle: { img: "[Bottiglia del prodotto fotografata come oggetto di design — sfondo trasparente, enfatizzando la texture del vetro, i motivi in rilievo e i dettagli dell'etichetta]", quote: "Giallo come il sole. Limpido come il mare. Il viaggio inizia tra le onde." },
    territory: { 
      label: "IL TERRITORIO", 
      title: "Sorrento e la Costiera Amalfitana", 
      body: "Dove i Monti Lattari si tuffano nel Mar Tirreno, nasce un microclima unico. La brezza marina, il terreno vulcanico e la luce dorata del sole creano il santuario perfetto per i nostri limoni.", 
      slides: [
        { img: "/images/product-5-1.png", alt: "Scogliere costiere all'ora d'oro" },
        { img: "/images/product-5-2.png", alt: "Limoneti terrazzati" },
        { img: "/images/product-5-3.png", alt: "Strette strade di paese" },
        { img: "/images/product-5-4.png", alt: "Viste panoramiche sul mare" },
        { img: "/images/product-5-5.png", alt: "Primo piano del terreno vulcanico" },
        { img: "/images/product-5-6.png", alt: "Strutture tradizionali a pergola" },
        { img: "/images/product-5-7.png", alt: "Alba sull'acqua" },
        { img: "/images/product-5-8.png", alt: "Processo di raccolta artigianale" }
      ] 
    },
    lifestyle: { img: "[Scena a bordo piscina: due cocktail realizzati con il prodotto, calda luce del tramonto, ambientazione mediterranea aspirazionale]", label: "PER APPASSIONATI E BARTENDER", title: "Liscio o miscelato?", body: "Un classico versatile. Gustalo ghiacciato come tradizionale digestivo, o miscelalo in cocktail straordinari per un tocco rinfrescante.", cta: "SCOPRI I COCKTAIL →" },
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
    banner: { title: "A magia de Sorrento em cada gole", breadcrumb: "LIMONCELLO DI SORRENTO — O LIMONCELLO" },
    intro: { label: "LIMONCELLO DI SORRENTO", title: "O original", body: "O original <strong>Limoncello di Sorrento</strong> é criado usando um método artesanal passado de geração em geração. Certificado com a marca <strong>I.G.P.</strong>, representa um vínculo inquebrável com o <em>terroir</em> da Costa Amalfitana." },
    moodboard: "[Garrafa do produto ao lado de um coquetel, fotografada em tons dourados quentes sobre uma superfície artesanal]",
    origin: { label: "ANTONIO MARESCA E SORRENTO", title: "A receita original", body: "No início dos anos 1900, <strong>Antonio Maresca</strong> começou a servir aos seus hóspedes um licor de limão especial em sua <em>pensione</em> em <strong>Sorrento</strong>. A receita, enraizada na tradição local, usava apenas os melhores limões dos pomares vizinhos. Hoje, essa mesma dedicação à qualidade e autenticidade continua viva, preservando o verdadeiro sabor da Costa Amalfitana em cada garrafa.", img: "[Fotografia histórica em tom sépia do local de fundação — uma charmosa pensão ou vila com arquitetura de época]" },
    ingredient: { label: "[Corte em estilo botânico: o ingrediente principal mostrado inteiro e em seção transversal, sobre um fundo claro e limpo]", title: "Ovale di Sorrento", body: "O <strong>Ovale di Sorrento I.G.P.</strong> não é um limão comum. Cultivado sob as tradicionais <em>pagliarelle</em> (esteiras de palha) que atrasam o amadurecimento, desenvolve uma casca grossa e intensamente aromática, rica em óleos essenciais. Este microclima único e cultivo cuidadoso são o que dão ao nosso limoncello seu sabor inconfundível." },
    attributes: {
      title: "Reconheça o original", subtitle: "O processo de produção segue um método artesanal em todas as etapas. Descubra o que torna o Limoncello di Sorrento o original.",
      items: [
        { title: "LIMÕES DE SORRENTO I.G.P.", desc: "Origem certificada, garantindo a mais alta qualidade e métodos de cultivo tradicionais." },
        { title: "100% NATURAL", desc: "Sem corantes, sabores ou conservantes artificiais. Apenas ingredientes puros e naturais." },
        { title: "TERROIR", desc: "Cultivado no solo vulcânico único e no clima marítimo da península de Sorrento." },
        { title: "CASCA", desc: "Rica em óleos essenciais, cuidadosamente descascada à mão para evitar a parte branca amarga." },
        { title: "TEOR ALCOÓLICO", desc: "Perfeitamente equilibrado em um mínimo de 30% ABV para extrair e preservar a essência do limão." }
      ],
      cta: "DESCUBRA O PROCESSO →"
    },
    bottle: { img: "[Garrafa do produto fotografada como um objeto de design — fundo transparente, enfatizando a textura do vidro, padrões em relevo e detalhes do rótulo]", quote: "Amarelo como o sol. Claro como o mar. A jornada começa através das ondas." },
    territory: { 
      label: "O TERRITÓRIO", 
      title: "Sorrento e a Costa Amalfitana", 
      body: "Onde as Montanhas Lattari mergulham no Mar Tirreno, nasce um microclima único. A brisa do mar, o solo vulcânico e a luz dourada do sol criam o santuário perfeito para nossos limões.", 
      slides: [
        { img: "/images/product-5-1.png", alt: "Penhascos costeiros na hora dourada" },
        { img: "/images/product-5-2.png", alt: "Pomares de limão em socalcos" },
        { img: "/images/product-5-3.png", alt: "Ruas estreitas de vilarejos" },
        { img: "/images/product-5-4.png", alt: "Vistas panorâmicas do mar" },
        { img: "/images/product-5-5.png", alt: "Close-up do solo vulcânico" },
        { img: "/images/product-5-6.png", alt: "Estruturas tradicionais de pérgula" },
        { img: "/images/product-5-7.png", alt: "Nascer do sol sobre a água" },
        { img: "/images/product-5-8.png", alt: "Processo de colheita artesanal" }
      ] 
    },
    lifestyle: { img: "[Cena à beira da piscina: dois coquetéis feitos com o produto, iluminação quente do pôr do sol, cenário mediterrâneo inspirador]", label: "PARA ENTUSIASTAS E BARTENDERS", title: "Puro ou misturado?", body: "Um clássico versátil. Aprecie-o bem gelado como um digestivo tradicional, ou misture-o em coquetéis extraordinários para um toque refrescante.", cta: "DESCUBRA OS COQUETÉIS →" },
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

export default function Product({ lang, setLang }: ProductProps) {
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    setBannerLoaded(true);
  }, []);
  const t = translations[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

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

  // Auto-scroll carousel every 8s
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const width = carouselRef.current.clientWidth;
        const scrollLeft = carouselRef.current.scrollLeft;
        const scrollWidth = carouselRef.current.scrollWidth;
        
        // If we're near the end, loop back to start, otherwise scroll right
        if (scrollLeft + width >= scrollWidth - 50) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: width, behavior: 'smooth' });
        }
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentSlide(index + 1);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -width : width, behavior: 'smooth' });
    }
  };

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

      {/* 1. TITLE BANNER */}
      <section className="relative h-[45vh] md:h-[50vh] flex flex-col items-center justify-center text-[#F9F9F9] px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/hero-product.png)',
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

      {/* 2. BRAND INTRODUCTION */}
      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-24 bg-[#F9F9F9] text-center max-w-[1600px] mx-auto">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="w-24 h-24 rounded-full border-2 border-[#F4D03F] flex items-center justify-center mx-auto mb-10">
              <span className="text-[#082B4F] font-playfair font-bold text-sm tracking-widest text-center leading-tight">L DI S</span>
            </div>
            <p className="text-[0.75rem] tracking-widest uppercase text-[#F4D03F] font-bold mb-4">{t.intro.label}</p>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-8">{t.intro.title}</h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-[65ch] mx-auto opacity-90" dangerouslySetInnerHTML={{ __html: t.intro.body }} />
          </FadeIn>
        </div>
      </section>

      {/* 3. PRODUCT MOODBOARD IMAGE */}
      <section className="w-full">
        <div className="w-full aspect-[16/9] md:aspect-[16/7] bg-[#082B4F] flex items-center justify-center border-y border-white/10 overflow-hidden">
          <img 
            src="/images/product-01.png" 
            alt="Product bottle alongside a cocktail" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* 4. ORIGIN STORY */}
      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-24 bg-[#F9F9F9] overflow-hidden max-w-[1600px] mx-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-[55%] md:pl-8 text-center md:text-left">
            <FadeIn direction="left">
              <p className="text-[0.75rem] tracking-widest uppercase text-[#F4D03F] font-bold mb-4">{t.origin.label}</p>
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-8">{t.origin.title}</h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-[65ch] mx-auto md:mx-0 opacity-90" dangerouslySetInnerHTML={{ __html: t.origin.body }} />
            </FadeIn>
          </div>
          <div className="w-full md:w-[45%]">
            <FadeIn direction="right">
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/10">
                <img 
                  src="/images/origins-01.png" 
                  alt="Historical photograph of the founding location" 
                  className="w-full h-full object-cover sepia-[0.3] contrast-[0.9]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. INGREDIENT SPOTLIGHT */}
      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-24 bg-white text-center relative overflow-hidden flex items-center max-w-[1600px] mx-auto">
        {/* Decorative Vietri Art - Left */}
        <div className="absolute left-0 top-0 bottom-0 h-full opacity-[0.15] pointer-events-none select-none">
          <img src="/images/vietri-01.png" alt="" className="h-full w-auto max-w-none" referrerPolicy="no-referrer" />
        </div>
        
        {/* Decorative Vietri Art - Right */}
        <div className="absolute right-0 top-0 bottom-0 h-full opacity-[0.15] pointer-events-none select-none">
          <img src="/images/vietri-01.png" alt="" className="h-full w-auto max-w-none scale-x-[-1]" referrerPolicy="no-referrer" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn>
            <div className="w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden mx-auto mb-12 border border-[#082B4F]/10">
              <img 
                src="/images/product-03.png" 
                alt="Botanical-style cutaway of the star ingredient" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-8">{t.ingredient.title}</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-[65ch] mx-auto opacity-90" dangerouslySetInnerHTML={{ __html: t.ingredient.body }} />
          </FadeIn>
        </div>
      </section>

      {/* 6. PRODUCT ATTRIBUTES GRID */}
      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-24 bg-[#F9F9F9] max-w-[1600px] mx-auto">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-[600px] mx-auto mb-20">
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-6">{t.attributes.title}</h2>
              <p className="text-base md:text-lg leading-relaxed opacity-90">{t.attributes.subtitle}</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-20">
            {t.attributes.items.map((item, idx) => {
              const icons = [<MapPin size={24} />, <Leaf size={24} />, <Sun size={24} />, <Droplet size={24} />, <Wine size={24} />];
              return (
                <FadeIn key={idx} delay={idx * 150} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mb-6">
                    {icons[idx]}
                  </div>
                  <h3 className="text-[0.8rem] tracking-widest uppercase font-bold mb-4">{item.title}</h3>
                  <p className="text-[0.875rem] leading-relaxed opacity-80 max-w-[250px]">{item.desc}</p>
                </FadeIn>
              );
            })}
          </div>
          
          <div className="text-center">
            <FadeIn delay={600}>
              <Link to="/craft" className="inline-block bg-[#F4D03F] text-[#082B4F] px-[22px] py-[11px] text-[0.715rem] md:px-8 md:py-4 md:text-sm font-playfair uppercase tracking-widest hover:scale-105 hover:brightness-105 hover:shadow-[0_10px_30px_rgba(244,208,63,0.4)] transition-all duration-[600ms] ease-in-out">
                {t.attributes.cta}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. BOTTLE SHOWCASE */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-white flex flex-col items-center text-center max-w-[1600px] mx-auto overflow-hidden">
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

        <FadeIn className="w-full max-w-[180px] sm:max-w-[240px] md:max-w-md mx-auto mb-16 relative z-10">
          <div className="w-full aspect-[2/5] flex items-center justify-center transition-transform duration-[1000ms] hover:scale-[1.02]">
            <img 
              src="/images/product-05.png" 
              alt="Limoncello di Sorrento bottle design" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </FadeIn>
        <FadeIn delay={200} className="relative z-10">
          <p className="font-playfair italic text-[clamp(1.25rem,3vw,2rem)] text-[#082B4F] max-w-3xl leading-relaxed">
            "{t.bottle.quote}"
          </p>
        </FadeIn>
        <div className="w-[80px] h-[1px] bg-[#F4D03F] mt-24 relative z-10" />

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

      {/* 8. TERRITORY GALLERY */}
      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-24 bg-[#F9F9F9] overflow-hidden max-w-[1600px] mx-auto">
        <div className="px-6 max-w-7xl mx-auto mb-16">
          <FadeIn>
            <p className="text-[0.75rem] tracking-widest uppercase text-[#F4D03F] font-bold mb-4">{t.territory.label}</p>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-6">{t.territory.title}</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-[65ch] opacity-90">{t.territory.body}</p>
          </FadeIn>
        </div>
        
        <FadeIn delay={200} className="relative w-full">
          <div 
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-6 md:px-[10vw] pb-8"
          >
            {t.territory.slides.map((slide, idx) => (
              <div key={idx} className="min-w-[85vw] md:min-w-[400px] aspect-[4/3] md:aspect-[3/2] snap-center bg-[#082B4F] rounded-sm overflow-hidden border border-white/10 flex-shrink-0 relative group">
                <img 
                  src={slide.img} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-playfair text-sm tracking-widest uppercase">{slide.alt}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between px-6 max-w-7xl mx-auto mt-8">
            <button onClick={() => scrollCarousel('left')} className="p-2 text-[#F4D03F] hover:scale-110 transition-transform duration-[500ms]">
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
            <div className="font-playfair text-sm tracking-widest opacity-60">
              {String(currentSlide).padStart(2, '0')} / {String(t.territory.slides.length).padStart(2, '0')}
            </div>
            <button onClick={() => scrollCarousel('right')} className="p-2 text-[#F4D03F] hover:scale-110 transition-transform duration-[500ms]">
              <ChevronRight size={32} strokeWidth={1} />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* 9. LIFESTYLE BRIDGE */}
      <section 
        className="relative w-full aspect-[4/5] md:aspect-[21/9] flex items-center justify-center bg-[#082B4F]"
        style={{
          backgroundImage: 'url(/images/product-06.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-[#F9F9F9] px-6 max-w-2xl">
          <FadeIn>
            <p className="text-[0.75rem] tracking-widest uppercase text-[#F4D03F] font-bold mb-4">{t.lifestyle.label}</p>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-6">{t.lifestyle.title}</h2>
            <p className="text-base md:text-lg leading-relaxed opacity-90 mb-10">{t.lifestyle.body}</p>
            <Link to="/cocktails" className="inline-block bg-[#F4D03F] text-[#082B4F] px-[22px] py-[11px] text-[0.715rem] md:px-8 md:py-4 md:text-sm font-playfair uppercase tracking-widest hover:scale-105 hover:brightness-105 hover:shadow-[0_10px_30px_rgba(244,208,63,0.4)] transition-all duration-[600ms] ease-in-out">
              {t.lifestyle.cta}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 10. DECORATIVE DIVIDER + FOOTER */}
      <div className="w-full h-32 md:h-48 bg-[#F9F9F9] relative overflow-hidden">
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
