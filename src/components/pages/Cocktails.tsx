import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';

type Language = 'en' | 'it' | 'pt';

interface CocktailsProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const content = {
  en: {
    nav: {
      home: "Home",
      product: "The Limoncello",
      origins: "Our Origins",
      craft: "Craft Process",
      cocktails: "Cocktails and Etc.",
      contact: "Contact"
    },
    footer: {
      drinkResponsibly: "Drink responsibly. Do not share with anyone under the legal drinking age.",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "P.IVA 10195214213",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      developedBy: "Developed by"
    },
    banner: {
      breadcrumb: "LIMONCELLO DI SORRENTO — COCKTAILS AND ETC.",
      title: "Let a classic surprise you"
    },
    intro: {
      label: "HOW TO ENJOY LIMONCELLO DI SORRENTO",
      title: "An ideal base",
      text: "Made with fragrant P.G.I. Sorrento Lemons, Limoncello di Sorrento is delicious enjoyed neat — traditionally served ice-cold at the end of a meal as a digestivo. But its intense aroma and natural sweetness also make it the perfect base for extraordinary cocktails and mixed drinks for any occasion, from aperitifs to after-dinner moments.",
      drinkResponsibly: "PLEASE DRINK RESPONSIBLY"
    },
    cocktails: [
      {
        name: "Limoncello Spritz",
        desc: "Bright, bubbly, and effortlessly refreshing — the aperitif of the Sorrento coast.",
        ingredients: [
          { amount: "90 ml", name: "Prosecco" },
          { amount: "60 ml", name: "Limoncello di Sorrento" },
          { amount: "30 ml", name: "Soda water" },
          { amount: "", name: "Fresh mint sprig" },
          { amount: "", name: "Lemon slice" }
        ],
        glass: "Wine glass (350 ml)",
        preparation: "Fill a large wine glass with ice. Pour the Prosecco, Limoncello di Sorrento, and soda water. Stir gently and garnish with a sprig of fresh mint and a slice of lemon. Serve immediately.",
        tip: "",
        imageDesc: "[A Limoncello Spritz in a large wine glass filled with ice, golden-yellow liquid with bubbles rising, a sprig of fresh mint and a lemon slice as garnish, poolside stone surface, warm afternoon light]",
        img: "/images/cocktails-01.png",
        layout: "left"
      },
      {
        name: "Limoncello Rosemary",
        desc: "Herbal, citrus-bright, and aromatic — gin meets Sorrento in a glass.",
        ingredients: [
          { amount: "45 ml", name: "Gin" },
          { amount: "30 ml", name: "Limoncello di Sorrento" },
          { amount: "20 ml", name: "Fresh lemon juice" },
          { amount: "15 ml", name: "Rosemary simple syrup" },
          { amount: "", name: "Fresh rosemary sprig" },
          { amount: "", name: "Lemon slice" }
        ],
        glass: "Rocks glass (300 ml)",
        preparation: "Fill a cocktail shaker with ice. Add gin, Limoncello di Sorrento, lemon juice, and rosemary simple syrup. Shake vigorously for 15 seconds until well chilled. Strain into a rocks glass over a large ice cube. Garnish with a fresh rosemary sprig and a lemon slice.",
        tip: "For the rosemary syrup, simmer equal parts sugar and water with fresh rosemary for 5 minutes. Cool and strain.",
        imageDesc: "[A Limoncello Rosemary cocktail in a rocks glass over a large ice cube, pale golden liquid, a tall rosemary sprig standing in the glass, a lemon wheel on the rim, rustic wooden surface, natural light]",
        img: "/images/cocktails-02.png",
        layout: "right"
      },
      {
        name: "Limoncello Negroni",
        desc: "The classic Negroni, lifted by a bright Sorrento twist — bittersweet with a citrus edge.",
        ingredients: [
          { amount: "25 ml", name: "Gin" },
          { amount: "25 ml", name: "Campari" },
          { amount: "25 ml", name: "Sweet vermouth" },
          { amount: "15 ml", name: "Limoncello di Sorrento" },
          { amount: "", name: "Lemon twist" }
        ],
        glass: "Rocks glass (250 ml)",
        preparation: "Add a large ice cube to a rocks glass. Pour in the gin, Campari, sweet vermouth, and Limoncello di Sorrento. Stir gently with a bar spoon until well chilled. Garnish with a lemon twist, expressing the oils over the surface of the drink.",
        tip: "",
        imageDesc: "[A Limoncello Negroni in a rocks glass with a large ice cube, amber-golden liquid with a reddish tint from Campari, a long lemon twist draped over the rim, dark marble surface, moody warm lighting]",
        img: "/images/cocktails-03.png",
        layout: "left"
      },
      {
        name: "Lemon Drop",
        desc: "Sweet, tart, and dangerously smooth — the cocktail that turns limoncello into a celebration.",
        ingredients: [
          { amount: "45 ml", name: "Vodka" },
          { amount: "30 ml", name: "Limoncello di Sorrento" },
          { amount: "20 ml", name: "Fresh lemon juice" },
          { amount: "10 ml", name: "Simple syrup" },
          { amount: "", name: "Granulated sugar (for rim)" },
          { amount: "", name: "Lemon twist" }
        ],
        glass: "Coupe glass or martini glass (250 ml), sugar-rimmed",
        preparation: "Run a lemon wedge around the rim of a chilled coupe glass and dip into granulated sugar. In a cocktail shaker, combine vodka, Limoncello di Sorrento, lemon juice, and simple syrup with ice. Shake vigorously for 15 seconds. Strain into the glass. Garnish with a lemon twist.",
        tip: "",
        imageDesc: "[A Lemon Drop martini in a sugar-rimmed coupe glass, crystal-clear pale gold liquid, a delicate lemon twist curled on the rim, bright white surface with scattered lemon zest, crisp daylight]",
        img: "/images/cocktails-04.png",
        layout: "right"
      },
      {
        name: "Sorbetto al Limoncello",
        desc: "A refreshing, velvety Italian lemon sorbet with a sophisticated Limoncello twist.",
        ingredients: [
          { amount: "250 g", name: "Sugar" },
          { amount: "250 ml", name: "Water" },
          { amount: "250 ml", name: "Fresh lemon juice" },
          { amount: "60 ml", name: "Limoncello di Sorrento" },
          { amount: "1 tbsp", name: "Lemon zest" },
          { amount: "", name: "Fresh mint leaves (optional)" }
        ],
        glass: "Dessert bowl or chilled lemon shell",
        preparation: "Combine sugar and water in a saucepan. Bring to a boil, stirring until sugar dissolves. Let cool completely. Stir in lemon juice, Limoncello di Sorrento, and lemon zest. Pour into an ice cream maker and freeze according to manufacturer's instructions. Alternatively, pour into a shallow dish and freeze, stirring every 30 minutes until firm. Garnish with mint.",
        tip: "For an elegant presentation, serve inside hollowed-out lemon halves that have been frozen.",
        imageDesc: "[A scoop of vibrant yellow lemon sorbet in a chilled glass bowl, garnished with a fresh mint leaf and a thin curl of lemon zest, frosted glass, bright Mediterranean light]",
        img: "/images/cocktails-05.png",
        layout: "left"
      }
    ]
  },
  it: {
    nav: {
      home: "Home",
      product: "Il Limoncello",
      origins: "Le Nostre Origini",
      craft: "Processo Artigianale",
      cocktails: "Cocktail e Altro",
      contact: "Contatti"
    },
    footer: {
      drinkResponsibly: "Bevi responsabilmente. Non condividere con minori.",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "P.IVA 10195214213",
      privacy: "Privacy Policy",
      terms: "Termini di Servizio",
      developedBy: "Sviluppato da"
    },
    banner: {
      breadcrumb: "LIMONCELLO DI SORRENTO — COCKTAIL E ALTRO",
      title: "Lasciati sorprendere da un classico"
    },
    intro: {
      label: "COME GUSTARE IL LIMONCELLO DI SORRENTO",
      title: "Una base ideale",
      text: "Realizzato con profumati Limoni di Sorrento I.G.P., il Limoncello di Sorrento è delizioso gustato liscio — tradizionalmente servito ghiacciato a fine pasto come digestivo. Ma il suo aroma intenso e la sua naturale dolcezza lo rendono anche la base perfetta per cocktail straordinari e drink miscelati per ogni occasione, dall'aperitivo al dopocena.",
      drinkResponsibly: "BEVI RESPONSABILMENTE"
    },
    cocktails: [
      {
        name: "Limoncello Spritz",
        desc: "Vivace, frizzante e rinfrescante — l'aperitivo della costa sorrentina.",
        ingredients: [
          { amount: "90 ml", name: "Prosecco" },
          { amount: "60 ml", name: "Limoncello di Sorrento" },
          { amount: "30 ml", name: "Acqua gassata" },
          { amount: "", name: "Rametto di menta fresca" },
          { amount: "", name: "Fetta di limone" }
        ],
        glass: "Calice da vino (350 ml)",
        preparation: "Riempi un grande calice da vino con ghiaccio. Versa il Prosecco, il Limoncello di Sorrento e l'acqua gassata. Mescola delicatamente e guarnisci con un rametto di menta fresca e una fetta di limone. Servi immediatamente.",
        tip: "",
        imageDesc: "[Un Limoncello Spritz in un grande calice da vino pieno di ghiaccio, liquido giallo dorato con bollicine, un rametto di menta fresca e una fetta di limone come guarnizione, superficie in pietra a bordo piscina, calda luce pomeridiana]",
        img: "/images/cocktails-01.png",
        layout: "left"
      },
      {
        name: "Limoncello Rosemary",
        desc: "Erbaceo, agrumato e aromatico — il gin incontra Sorrento in un bicchiere.",
        ingredients: [
          { amount: "45 ml", name: "Gin" },
          { amount: "30 ml", name: "Limoncello di Sorrento" },
          { amount: "20 ml", name: "Succo di limone fresco" },
          { amount: "15 ml", name: "Sciroppo di rosmarino" },
          { amount: "", name: "Rametto di rosmarino fresco" },
          { amount: "", name: "Fetta di limone" }
        ],
        glass: "Bicchiere Rocks (300 ml)",
        preparation: "Riempi uno shaker con ghiaccio. Aggiungi gin, Limoncello di Sorrento, succo di limone e sciroppo di rosmarino. Shakerare energicamente per 15 secondi fino a quando non è ben freddo. Filtra in un bicchiere rocks su un grande cubetto di ghiaccio. Guarnisci con un rametto di rosmarino fresco e una fetta di limone.",
        tip: "Per lo sciroppo al rosmarino, fai sobbollire parti uguali di zucchero e acqua con rosmarino fresco per 5 minuti. Fai raffreddare e filtra.",
        imageDesc: "[Un cocktail Limoncello Rosemary in un bicchiere rocks su un grande cubetto di ghiaccio, liquido dorato pallido, un alto rametto di rosmarino nel bicchiere, una fetta di limone sul bordo, superficie in legno rustico, luce naturale]",
        img: "/images/cocktails-02.png",
        layout: "right"
      },
      {
        name: "Limoncello Negroni",
        desc: "Il classico Negroni, ravvivato da un tocco sorrentino — agrodolce con una nota agrumata.",
        ingredients: [
          { amount: "25 ml", name: "Gin" },
          { amount: "25 ml", name: "Campari" },
          { amount: "25 ml", name: "Vermouth dolce" },
          { amount: "15 ml", name: "Limoncello di Sorrento" },
          { amount: "", name: "Scorza di limone" }
        ],
        glass: "Bicchiere Rocks (250 ml)",
        preparation: "Aggiungi un grande cubetto di ghiaccio a un bicchiere rocks. Versa il gin, il Campari, il vermouth dolce e il Limoncello di Sorrento. Mescola delicatamente con un bar spoon fino a quando non è ben freddo. Guarnisci con una scorza di limone, spremendone gli oli sulla superficie del drink.",
        tip: "",
        imageDesc: "[Un Limoncello Negroni in un bicchiere rocks con un grande cubetto di ghiaccio, liquido ambrato-dorato con una sfumatura rossastra dal Campari, una lunga scorza di limone sul bordo, superficie in marmo scuro, illuminazione calda e suggestiva]",
        img: "/images/cocktails-03.png",
        layout: "left"
      },
      {
        name: "Lemon Drop",
        desc: "Dolce, aspro e pericolosamente morbido — il cocktail che trasforma il limoncello in una celebrazione.",
        ingredients: [
          { amount: "45 ml", name: "Vodka" },
          { amount: "30 ml", name: "Limoncello di Sorrento" },
          { amount: "20 ml", name: "Succo di limone fresco" },
          { amount: "10 ml", name: "Sciroppo semplice" },
          { amount: "", name: "Zucchero semolato (per il bordo)" },
          { amount: "", name: "Scorza di limone" }
        ],
        glass: "Coppa o bicchiere da martini (250 ml), con bordo zuccherato",
        preparation: "Passa uno spicchio di limone lungo il bordo di una coppa fredda e immergilo nello zucchero semolato. In uno shaker, unisci vodka, Limoncello di Sorrento, succo di limone e sciroppo semplice con ghiaccio. Shakerare energicamente per 15 secondi. Filtra nel bicchiere preparato. Guarnisci con una scorza di limone.",
        tip: "",
        imageDesc: "[Un martini Lemon Drop in una coppa con bordo zuccherato, liquido dorato pallido cristallino, una delicata scorza di limone arricciata sul bordo, superficie bianca brillante con scorza di limone sparsa, luce del giorno nitida]",
        img: "/images/cocktails-04.png",
        layout: "right"
      },
      {
        name: "Sorbetto al Limoncello",
        desc: "Un rinfrescante e vellutato sorbetto al limone con un sofisticato tocco di Limoncello.",
        ingredients: [
          { amount: "250 g", name: "Zucchero" },
          { amount: "250 ml", name: "Acqua" },
          { amount: "250 ml", name: "Succo di limone fresco" },
          { amount: "60 ml", name: "Limoncello di Sorrento" },
          { amount: "1 cucchiaio", name: "Scorza di limone" },
          { amount: "", name: "Foglie di menta fresca (opzionale)" }
        ],
        glass: "Coppetta da dessert o scorza di limone ghiacciata",
        preparation: "Unisci zucchero e acqua in un pentolino. Porta a ebollizione, mescolando finché lo zucchero non si scioglie. Lascia raffreddare completamente. Aggiungi il succo di limone, il Limoncello di Sorrento e la scorza di limone. Versa in una gelatiera e congela secondo le istruzioni del produttore. In alternativa, versa in un contenitore basso e congela, mescolando ogni 30 minuti fino a consistenza desiderata. Guarnisci con menta.",
        tip: "Per una presentazione elegante, servi all'interno di metà limone svuotate e precedentemente congelate.",
        imageDesc: "[Una pallina di sorbetto al limone giallo vibrante in una coppetta di vetro ghiacciata, guarnita con una foglia di menta fresca e un ricciolo di scorza di limone, vetro appannato dal freddo, luce mediterranea brillante]",
        img: "/images/cocktails-05.png",
        layout: "left"
      }
    ]
  },
  pt: {
    nav: {
      home: "Início",
      product: "O Limoncello",
      origins: "Nossas Origens",
      craft: "Processo Artesanal",
      cocktails: "Coquetéis e Etc.",
      contact: "Contato"
    },
    footer: {
      drinkResponsibly: "Beba com responsabilidade. Não compartilhe com menores de idade.",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "P.IVA 10195214213",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      developedBy: "Desenvolvido por"
    },
    banner: {
      breadcrumb: "LIMONCELLO DI SORRENTO — COQUETÉIS E ETC.",
      title: "Deixe um clássico surpreender você"
    },
    intro: {
      label: "COMO APRECIAR O LIMONCELLO DI SORRENTO",
      title: "Uma base ideal",
      text: "Feito com os perfumados Limões de Sorrento I.G.P., o Limoncello di Sorrento é delicioso apreciado puro — tradicionalmente servido bem gelado no final de uma refeição como digestivo. Mas seu aroma intenso e doçura natural também o tornam a base perfeita para coquetéis extraordinários e bebidas mistas para qualquer ocasião, desde aperitivos até momentos após o jantar.",
      drinkResponsibly: "POR FAVOR, BEBA COM RESPONSABILIDADE"
    },
    cocktails: [
      {
        name: "Limoncello Spritz",
        desc: "Brilhante, borbulhante e refrescante — o aperitivo da costa de Sorrento.",
        ingredients: [
          { amount: "90 ml", name: "Prosecco" },
          { amount: "60 ml", name: "Limoncello di Sorrento" },
          { amount: "30 ml", name: "Água com gás" },
          { amount: "", name: "Ramo de hortelã fresca" },
          { amount: "", name: "Fatia de limão" }
        ],
        glass: "Taça de vinho (350 ml)",
        preparation: "Encha uma taça de vinho grande com gelo. Despeje o Prosecco, o Limoncello di Sorrento e a água com gás. Mexa delicadamente e decore com um ramo de hortelã fresca e uma fatia de limão. Sirva imediatamente.",
        tip: "",
        imageDesc: "[Um Limoncello Spritz em uma grande taça de vinho cheia de gelo, líquido amarelo dourado com bolhas subindo, um ramo de hortelã fresca e uma fatia de limão como guarnição, superfície de pedra à beira da piscina, luz quente da tarde]",
        img: "/images/cocktails-01.png",
        layout: "left"
      },
      {
        name: "Limoncello Rosemary",
        desc: "Herbal, cítrico e aromático — o gin encontra Sorrento em um copo.",
        ingredients: [
          { amount: "45 ml", name: "Gin" },
          { amount: "30 ml", name: "Limoncello di Sorrento" },
          { amount: "20 ml", name: "Suco de limão fresco" },
          { amount: "15 ml", name: "Xarope de alecrim" },
          { amount: "", name: "Ramo de alecrim fresco" },
          { amount: "", name: "Fatia de limão" }
        ],
        glass: "Copo Rocks (300 ml)",
        preparation: "Encha uma coqueteleira com gelo. Adicione gin, Limoncello di Sorrento, suco de limão e xarope de alecrim. Agite vigorosamente por 15 segundos até ficar bem gelado. Coe para um copo rocks sobre um cubo de gelo grande. Decore com um ramo de alecrim fresco e uma fatia de limão.",
        tip: "Para o xarope de alecrim, cozinhe partes iguais de açúcar e água com alecrim fresco por 5 minutos. Esfrie e coe.",
        imageDesc: "[Um coquetel Limoncello Rosemary em um copo rocks sobre um cubo de gelo grande, líquido dourado claro, um ramo alto de alecrim no copo, uma rodela de limão na borda, superfície de madeira rústica, luz natural]",
        img: "/images/cocktails-02.png",
        layout: "right"
      },
      {
        name: "Limoncello Negroni",
        desc: "O clássico Negroni, elevado por um toque brilhante de Sorrento — agridoce com um toque cítrico.",
        ingredients: [
          { amount: "25 ml", name: "Gin" },
          { amount: "25 ml", name: "Campari" },
          { amount: "25 ml", name: "Vermute doce" },
          { amount: "15 ml", name: "Limoncello di Sorrento" },
          { amount: "", name: "Casca de limão" }
        ],
        glass: "Copo Rocks (250 ml)",
        preparation: "Adicione um cubo de gelo grande a um copo rocks. Despeje o gin, o Campari, o vermute doce e o Limoncello di Sorrento. Mexa delicadamente com uma colher de bar até ficar bem gelado. Decore com uma casca de limão, espremendo os óleos sobre a superfície da bebida.",
        tip: "",
        imageDesc: "[Um Limoncello Negroni em um copo rocks com um cubo de gelo grande, líquido âmbar-dourado com um tom avermelhado do Campari, uma longa casca de limão na borda, superfície de mármore escuro, iluminação quente e atmosférica]",
        img: "/images/cocktails-03.png",
        layout: "left"
      },
      {
        name: "Lemon Drop",
        desc: "Doce, azedo e perigosamente suave — o coquetel que transforma o limoncello in uma celebração.",
        ingredients: [
          { amount: "45 ml", name: "Vodka" },
          { amount: "30 ml", name: "Limoncello di Sorrento" },
          { amount: "20 ml", name: "Suco de limão fresco" },
          { amount: "10 ml", name: "Xarope simples" },
          { amount: "", name: "Açúcar granulado (para a borda)" },
          { amount: "", name: "Casca de limão" }
        ],
        glass: "Taça Coupe ou de martini (250 ml), com borda de açúcar",
        preparation: "Passe uma fatia de limão ao redor da borda de uma taça coupe gelada e mergulhe no açúcar granulado. Em uma coqueteleira, misture vodka, Limoncello di Sorrento, suco de limão e xarope simples com gelo. Agite vigorosamente por 15 segundos. Coe para a taça preparada. Decore com uma casca de limão.",
        tip: "",
        imageDesc: "[Um martini Lemon Drop em uma taça coupe com borda de açúcar, líquido dourado claro cristalino, uma delicada casca de limão enrolada na borda, superfície branca brilhante com raspas de limão espalhadas, luz do dia nítida]",
        img: "/images/cocktails-04.png",
        layout: "right"
      },
      {
        name: "Sorbetto al Limoncello",
        desc: "Um sorvete de limão italiano refrescante e aveludado com um toque sofisticado de Limoncello.",
        ingredients: [
          { amount: "250 g", name: "Açúcar" },
          { amount: "250 ml", name: "Água" },
          { amount: "250 ml", name: "Suco de limão fresco" },
          { amount: "60 ml", name: "Limoncello di Sorrento" },
          { amount: "1 colher", name: "Raspas de limão" },
          { amount: "", name: "Folhas de hortelã fresca (opcional)" }
        ],
        glass: "Taça de sobremesa ou casca de limão gelada",
        preparation: "Combine o açúcar e a água em uma panela. Deixe ferver, mexendo até o açúcar dissolver. Deixe esfriar completamente. Adicione o suco de limão, o Limoncello di Sorrento e as raspas de limão. Despeje em uma sorveteira e congele de acordo com as instruções do fabricante. Alternativamente, despeje em um prato raso e congele, mexendo a cada 30 minutos até ficar firme. Decore com hortelã.",
        tip: "Para uma apresentação elegante, sirva dentro de metades de limão escavadas que foram congeladas.",
        imageDesc: "[Uma bola de sorbet de limão amarelo vibrante em uma taça de vidro gelada, decorada com uma folha de hortelã fresca e uma fina raspa de limão, vidro fosco, luz mediterrânea brilhante]",
        img: "/images/cocktails-05.png",
        layout: "left"
      }
    ]
  }
};

function useScrollReveal() {
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
      {
        threshold: 0.15,
        rootMargin: "-50px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
}

function FadeIn({ children, delay = 0, direction = 'up', className = '' }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'left' | 'right' | 'none', className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  
  let transform = 'translateY(30px)';
  if (direction === 'left') transform = 'translateX(-30px)';
  if (direction === 'right') transform = 'translateX(30px)';
  if (direction === 'none') transform = 'none';

  return (
    <div 
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transform,
        transition: `opacity 800ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 800ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export default function Cocktails({ lang, setLang }: CocktailsProps) {
  const t = content[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Trigger banner animation on load
    setTimeout(() => setBannerLoaded(true), 100);
    
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

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#082B4F] font-lora overflow-x-hidden">
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
      <section className="relative h-[40vh] lg:h-[50vh] flex items-center justify-center overflow-hidden bg-[#082B4F]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
        >
          <source src="/images/hero-cocktails.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#082B4F]/60 z-10" />
        
        <div className="relative z-20 text-center px-6 mt-16">
          <div 
            className="w-[120px] h-[2px] bg-[#F4D03F] mx-auto mb-8 transition-all duration-1000 ease-out"
            style={{ 
              opacity: bannerLoaded ? 1 : 0,
              transform: bannerLoaded ? 'scaleX(1)' : 'scaleX(0)'
            }}
          />
          <h1 
            className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] text-[#F9F9F9] mb-6 transition-all duration-1000 ease-out delay-400"
            style={{ 
              opacity: bannerLoaded ? 1 : 0,
              transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {t.banner.title}
          </h1>
          <div 
            className="text-xs tracking-[0.2em] font-semibold transition-all duration-1000 ease-out delay-800"
            style={{ 
              opacity: bannerLoaded ? 1 : 0,
              transform: bannerLoaded ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            <span className="text-[#F9F9F9] uppercase">{t.banner.breadcrumb}</span>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="py-20 lg:py-28 bg-[#F9F9F9] px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn delay={0}>
            <span className="block text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">{t.intro.label}</span>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F] mb-6">{t.intro.title}</h2>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-lg md:text-xl leading-relaxed text-[#082B4F]/80 mb-8">
              {t.intro.text}
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <p className="text-xs text-[#082B4F]/40 uppercase tracking-widest">
              {t.intro.drinkResponsibly}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* COCKTAILS */}
      {t.cocktails.map((cocktail, index) => {
        const isLeft = cocktail.layout === 'left';
        const bgColor = index % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#F9F9F9]';
        
        return (
          <section key={index} className={`py-16 lg:py-24 px-6 ${bgColor}`}>
            <div className={`max-w-7xl mx-auto flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16`}>
              
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <FadeIn direction={isLeft ? 'left' : 'right'} delay={0} className="w-full h-full">
                  <div className="aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#082B4F] relative border border-[#082B4F]/10 flex items-center justify-center">
                    {cocktail.img ? (
                      <img 
                        src={cocktail.img} 
                        alt={cocktail.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="p-8">
                        <p className="text-sm text-[#F9F9F9]/70 text-center font-lora italic">
                          {cocktail.imageDesc}
                        </p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>

              {/* Recipe Side */}
              <div className="w-full lg:w-1/2 flex items-center py-8 lg:py-12">
                <FadeIn direction={isLeft ? 'right' : 'left'} delay={200} className="w-full">
                  <div className="w-full">
                    <h3 className="font-playfair text-2xl lg:text-3xl text-[#082B4F] mb-2">{cocktail.name}</h3>
                    <p className="font-serif italic text-sm lg:text-base text-[#082B4F]/60 mb-6">{cocktail.desc}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-xs tracking-[0.15em] text-[#F4D03F] font-semibold uppercase mb-3">Ingredients</h4>
                      <ul className="text-sm leading-loose">
                        {cocktail.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-baseline">
                            {ing.amount && (
                              <span className="w-[60px] flex-shrink-0 text-right mr-3 font-mono font-medium text-[#082B4F]">
                                {ing.amount}
                              </span>
                            )}
                            {!ing.amount && (
                              <span className="w-[60px] flex-shrink-0 text-right mr-3"></span>
                            )}
                            <span className="text-[#082B4F]/80">{ing.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xs tracking-[0.15em] text-[#F4D03F] font-semibold uppercase mb-2">Glass</h4>
                      <p className="text-sm text-[#082B4F]/70">{cocktail.glass}</p>
                    </div>

                    <div>
                      <h4 className="text-xs tracking-[0.15em] text-[#F4D03F] font-semibold uppercase mb-2">Preparation</h4>
                      <p className="text-sm leading-relaxed max-w-[45ch] text-[#082B4F]/80">{cocktail.preparation}</p>
                      {cocktail.tip && (
                        <p className="text-xs italic text-[#082B4F]/50 mt-3 max-w-[45ch]">{cocktail.tip}</p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              </div>

            </div>
            {/* Subtle bottom divider */}
            <div className="max-w-7xl mx-auto mt-16 lg:mt-24 h-[1px] bg-[#082B4F]/[0.08]" />
          </section>
        );
      })}

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
