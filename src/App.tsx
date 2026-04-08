import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/components/pages/Home';
import Product from '@/components/pages/Product';
import Origins from '@/components/pages/Origins';
import TheCraft from '@/components/pages/TheCraft';
import Cocktails from '@/components/pages/Cocktails';
import Contact from '@/components/pages/Contact';
import Terms from '@/components/pages/Terms';
import Privacy from '@/components/pages/Privacy';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

type Language = 'en' | 'it' | 'pt';

const content = {
  en: {
    ageGate: {
      question: "Are you old enough to drink alcohol?",
      subtext: "You must be of legal drinking age in your country to enter this site.",
      yes: "Yes, I am",
      no: "No, I am not",
      denied: "You must be of legal drinking age to view this content."
    }
  },
  it: {
    ageGate: {
      question: "Hai l'età legale per bere alcolici?",
      subtext: "Devi avere l'età legale per il consumo di alcolici nel tuo paese per entrare in questo sito.",
      yes: "Sì, lo sono",
      no: "No, non lo sono",
      denied: "Devi avere l'età legale per il consumo di alcolici per visualizzare questo contenuto."
    }
  },
  pt: {
    ageGate: {
      question: "Você tem idade legal para beber álcool?",
      subtext: "Você deve ter a idade legal para consumo de álcool em seu país para entrar neste site.",
      yes: "Sim, eu tenho",
      no: "Não, eu não tenho",
      denied: "Você deve ter a idade legal para consumo de álcool para visualizar este conteúdo."
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);

  const t = content[lang];

  const handleAgeGate = (verified: boolean) => {
    setAgeVerified(verified);
    if (verified) {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    if (ageVerified !== true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [ageVerified]);

  return (
    <Router>
      <ScrollToTop />
      {/* Age Gate Modal */}
      {ageVerified !== true && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#082B4F]/80 backdrop-blur-md transition-opacity duration-[1000ms] ease-in-out ${ageVerified === false ? 'opacity-100' : ''}`}>
          <div className="bg-[#F9F9F9]/95 backdrop-blur-xl p-12 max-w-lg w-full mx-4 text-center shadow-[0_20px_50px_rgba(8,43,79,0.3)] border border-white/20 relative overflow-hidden rounded-sm">
            
            {/* Top Decorative Border */}
            <div 
              className="absolute top-0 left-0 w-full h-40 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'url(/images/vietri-02.png)',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top',
                backgroundSize: '160px'
              }}
            />

            {/* Bottom Decorative Border */}
            <div 
              className="absolute bottom-0 left-0 w-full h-40 opacity-30 pointer-events-none"
              style={{
                backgroundImage: 'url(/images/vietri-03.png)',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                backgroundSize: '160px'
              }}
            />

            <div className="relative z-10">
              <img src="/images/limoncello-logo-04.png" alt="Limoncello di Sorrento" className="h-24 w-auto mx-auto mb-6" />
              {ageVerified === false ? (
                <p className="text-lg">{t.ageGate.denied}</p>
              ) : (
                <>
                  <h2 className="font-playfair text-2xl mb-4">{t.ageGate.question}</h2>
                  <p className="mb-8 text-[#082B4F]/70">{t.ageGate.subtext}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => handleAgeGate(true)}
                      className="bg-[#F4D03F] text-[#082B4F] px-8 py-3 font-playfair uppercase tracking-widest text-sm hover:scale-105 hover:brightness-105 hover:shadow-[0_10px_30px_rgba(244,208,63,0.4)] transition-all duration-[600ms] ease-in-out"
                    >
                      {t.ageGate.yes}
                    </button>
                    <button 
                      onClick={() => handleAgeGate(false)}
                      className="border border-[#082B4F] text-[#082B4F] px-8 py-3 font-playfair uppercase tracking-widest text-sm hover:bg-[#082B4F] hover:text-[#F9F9F9] hover:shadow-[0_10px_30px_rgba(8,43,79,0.3)] transition-all duration-[600ms] ease-in-out"
                    >
                      {t.ageGate.no}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Only visible after age gate */}
      <div className={`transition-opacity duration-[1000ms] ease-in-out ${ageVerified === true ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Routes>
          <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
          <Route path="/product" element={<Product lang={lang} setLang={setLang} />} />
          <Route path="/origins" element={<Origins lang={lang} setLang={setLang} />} />
          <Route path="/craft" element={<TheCraft lang={lang} setLang={setLang} />} />
          <Route path="/cocktails" element={<Cocktails lang={lang} setLang={setLang} />} />
          <Route path="/contact" element={<Contact lang={lang} setLang={setLang} />} />
          <Route path="/terms" element={<Terms lang={lang} setLang={setLang} />} />
          <Route path="/privacy" element={<Privacy lang={lang} setLang={setLang} />} />
        </Routes>
      </div>
    </Router>
  );
}
