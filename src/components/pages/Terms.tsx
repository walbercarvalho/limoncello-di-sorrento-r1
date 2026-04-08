import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';

type Language = 'en' | 'it' | 'pt';

interface TermsProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const translations = {
  en: {
    nav: { home: "Home", product: "The Limoncello", origins: "Our Origins", craft: "Craft Process", cocktails: "Cocktails and Etc.", contact: "Contact" },
    banner: { title: "Terms of Service", breadcrumb: "LIMONCELLO DI SORRENTO — TERMS OF SERVICE" },
    content: {
      title: "Terms and Conditions",
      intro: "The company Limoncello di Sorrento, with registered office in Santa Fortunata St, 33, 80067 Sorrento NA, Itália, determines and publishes the contents of this website and the websites it registers (hereinafter the \"Website\") in order to promote knowledge of Limoncello di Sorrento products.",
      acceptance: "Before browsing and using the Website, please read the terms and conditions of use below carefully, as using the Website implies full acceptance of them. If you accept, you will therefore be bound by them. If, however, you do not share the content of these conditions or do not intend to be bound by them, you will have to leave the Website.",
      ageGate: "You are also requested to leave the Website if you are under the minimum age required by law to consume alcoholic beverages in the country you are in, or if you are in a country where using or even only the viewing the Website's contents is not permitted by law.",
      modifications: "Limoncello di Sorrento can freely modify the terms and conditions of access to the Website when it deems it appropriate, without the need for any notice, and it is therefore the responsibility of those accessing the Website to consult the terms and conditions at each new access.",
      sections: [
        {
          title: "Intellectual property",
          text: "The contents of the Website, including, for example, texts, images, audio and video, are owned by Limoncello di Sorrento, or are legitimately available to it. The trademarks present, both nominative or figurative, are the exclusive property of Limoncello di Sorrento or the companies controlled by it, or refer to products Limoncello di Sorrento distributes on behalf of other companies as governed by commercial agreements. All trademarks are registered with the competent Italian or international authorities and are protected by applicable intellectual property laws. In the absence of written authorisation from the holders of rights on these trademarks, any use or reproduction of them is prohibited. You can print any content on this Website directly or through third parties only if the use of the downloaded material is exclusively personal and non-commercial and it is not altered in any way."
        },
        {
          title: "Limitations of liability",
          text: "The use of the Website and browsing on it fall under the sole responsibility of the user who accesses it. Limoncello di Sorrento undertakes to ensure that access to the Website is always possible for those who can legitimately browse it and that the information on it is up to date. However, the Website and its contents are provided and accepted in the state they are found and are presented without any guarantee, implicit or explicit, regarding the Website functionality or the lack of viruses, the accuracy of the services offered, or the correctness and completeness of the information published therein. Limoncello di Sorrento will not, therefore, be responsible for any errors, inaccuracies or omissions relating to the material contained on the Website, nor will it be responsible for any damages of any kind which derive from accessing or browsing the Website or even from the impossibility of using it, or from reliance on the material contained on the Website. Limoncello di Sorrento reserves the right to interrupt access to the Website or to deactivate a part of it, precluding the possibility of consulting a topic or section of the website at any time and without notice."
        },
        {
          title: "Unsolicited communications",
          text: "Sending information or other materials, by email or any other means, implies recognition of Limoncello di Sorrento's free and irrevocable authorisation to use, reproduce, modify, publish, distribute or show what has been received, including in a non-exclusive way, either alone or as part of other work, in any form and by any means or technology. Limoncello di Sorrento does not select or control any of the content transmitted to the Website by third parties and is not responsible for selecting or controlling these materials, and therefore assumes no responsibility or obligation regarding them."
        },
        {
          title: "Links to other websites",
          text: "The Website may contain links to third-party websites. These links do not imply that Limoncello di Sorrento endorses the content of these websites in any way, and it is in no way responsible for their content. You access and view these websites under your direct and exclusive responsibility. Limoncello di Sorrento is not responsible for the terms and conditions established by other companies. Users wishing to insert a link to this website on their \"homepage\" must expressly request authorisation from Limoncello di Sorrento via the following email address: contact@limoncellodisorrento.com."
        },
        {
          title: "Applicable legal jurisdiction",
          text: "These Terms of Use are governed by the rules of Italian law and must be interpreted in accordance with Italian laws. Any dispute arising from these Terms of Use, including but not limited to disputes concerning their existence and validity, must be judged by the competent courts of Naples."
        }
      ]
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
    nav: { home: "Home", product: "Il Limoncello", origins: "Le Nostre Origini", craft: "Processo Artigianale", cocktails: "Cocktail e Altro", contact: "Contatti" },
    banner: { title: "Termini di Servizio", breadcrumb: "LIMONCELLO DI SORRENTO — TERMINI DI SERVIZIO" },
    content: {
      title: "Termini e Condizioni",
      intro: "La società Limoncello di Sorrento, con sede legale in Santa Fortunata St, 33, 80067 Sorrento NA, Itália, determina e pubblica i contenuti di questo sito web e dei siti web che registra (di seguito il \"Sito\") al fine di promuovere la conoscenza dei prodotti Limoncello di Sorrento.",
      acceptance: "Prima di navigare e utilizzare il Sito, si prega di leggere attentamente i termini e le condizioni d'uso riportati di seguito, poiché l'utilizzo del Sito implica la loro piena accettazione. Se accetti, sarai quindi vincolato da essi. Se, tuttavia, non condividi il contenuto di queste condizioni o non intendi essere vincolato da esse, dovrai abbandonare il Sito.",
      ageGate: "Sei inoltre pregato di abbandonare il Sito se sei al di sotto dell'età minima richiesta dalla legge per consumare bevande alcoliche nel paese in cui ti trovi, o se ti trovi in un paese in cui l'uso o anche solo la visualizzazione dei contenuti del Sito non è consentito dalla legge.",
      modifications: "Limoncello di Sorrento può modificare liberamente i termini e le condizioni di accesso al Sito quando lo riterrà opportuno, senza necessità di preavviso, ed è pertanto responsabilità di chi accede al Sito consultare i termini e le condizioni ad ogni nuovo accesso.",
      sections: [
        {
          title: "Proprietà intellettuale",
          text: "I contenuti del Sito, inclusi, ad esempio, testi, immagini, audio e video, sono di proprietà di Limoncello di Sorrento, o sono legittimamente a sua disposizione. I marchi presenti, sia nominativi che figurativi, sono di proprietà esclusiva di Limoncello di Sorrento o delle società da essa controllate, o si riferiscono a prodotti che Limoncello di Sorrento distribuisce per conto di altre società come disciplinato da accordi commerciali. Tutti i marchi sono registrati presso le competenti autorità italiane o internazionali e sono protetti dalle leggi applicabili sulla proprietà intellettuale. In assenza di autorizzazione scritta da parte dei titolari dei diritti su questi marchi, ne è vietato qualsiasi uso o riproduzione. È possibile stampare qualsiasi contenuto di questo Sito direttamente o tramite terzi solo se l'uso del materiale scaricato è esclusivamente personale e non commerciale e non viene alterato in alcun modo."
        },
        {
          title: "Limitazioni di responsabilità",
          text: "L'uso del Sito e la navigazione su di esso ricadono sotto la sola responsabilità dell'utente che vi accede. Limoncello di Sorrento si impegna a garantire che l'accesso al Sito sia sempre possibile per coloro che possono legittimamente navigarvi e che le informazioni in esso contenute siano aggiornate. Tuttavia, il Sito e i suoi contenuti sono forniti e accettati nello stato in cui si trovano e sono presentati senza alcuna garanzia, implicita o esplicita, riguardante la funzionalità del Sito o l'assenza di virus, l'accuratezza dei servizi offerti, o la correttezza e completezza delle informazioni in esso pubblicate. Limoncello di Sorrento non sarà, pertanto, responsabile per eventuali errori, inesattezze o omissioni relativi al materiale contenuto nel Sito, né sarà responsabile per danni di qualsiasi natura derivanti dall'accesso o dalla navigazione nel Sito o anche dall'impossibilità di utilizzarlo, o dall'affidamento sul materiale contenuto nel Sito. Limoncello di Sorrento si riserva il diritto di interrompere l'accesso al Sito o di disattivarne una parte, precludendo la possibilità di consultare un argomento o una sezione del sito in qualsiasi momento e senza preavviso."
        },
        {
          title: "Comunicazioni non sollecitate",
          text: "L'invio di informazioni o altri materiali, tramite e-mail o qualsiasi altro mezzo, implica il riconoscimento della libera e irrevocabile autorizzazione di Limoncello di Sorrento a utilizzare, riprodurre, modificare, pubblicare, distribuire o mostrare quanto ricevuto, anche in modo non esclusivo, sia da solo che come parte di altro lavoro, in qualsiasi forma e con qualsiasi mezzo o tecnologia. Limoncello di Sorrento non seleziona né controlla alcuno dei contenuti trasmessi al Sito da terzi e non è responsabile della selezione o del controllo di tali materiali, e pertanto non assume alcuna responsabilità o obbligo al riguardo."
        },
        {
          title: "Link ad altri siti web",
          text: "Il Sito può contenere link a siti web di terzi. Questi link non implicano che Limoncello di Sorrento approvi in alcun modo il contenuto di questi siti web, e non è in alcun modo responsabile del loro contenuto. L'accesso e la visualizzazione di questi siti web avvengono sotto la tua diretta ed esclusiva responsabilità. Limoncello di Sorrento non è responsabile dei termini e delle condizioni stabiliti da altre società. Gli utenti che desiderano inserire un link a questo sito web nella loro \"homepage\" devono richiedere espressamente l'autorizzazione a Limoncello di Sorrento tramite il seguente indirizzo e-mail: contact@limoncellodisorrento.com."
        },
        {
          title: "Giurisdizione legale applicabile",
          text: "Le presenti Condizioni d'Uso sono regolate dalle norme della legge italiana e devono essere interpretate in conformità alle leggi italiane. Qualsiasi controversia derivante dalle presenti Condizioni d'Uso, incluse, a titolo esemplificativo ma non esaustivo, le controversie riguardanti la loro esistenza e validità, dovrà essere giudicata dai tribunali competenti di Napoli."
        }
      ]
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
    nav: { home: "Início", product: "O Limoncello", origins: "Nossas Origens", craft: "Processo Artesanal", cocktails: "Coquetéis e Etc.", contact: "Contato" },
    banner: { title: "Termos de Serviço", breadcrumb: "LIMONCELLO DI SORRENTO — TERMOS DE SERVIÇO" },
    content: {
      title: "Termos e Condições",
      intro: "A empresa Limoncello di Sorrento, com sede em Santa Fortunata St, 33, 80067 Sorrento NA, Itália, determina e publica o conteúdo deste site e dos sites que regista (doravante o \"Site\") a fim de promover o conhecimento dos produtos Limoncello di Sorrento.",
      acceptance: "Antes de navegar e utilizar o Site, leia atentamente os termos e condições de utilização abaixo, uma vez que a utilização do Site implica a plena aceitação dos mesmos. Se aceitar, ficará vinculado a eles. Se, no entanto, não concordar com o conteúdo destas condições ou não pretender ficar vinculado a elas, deverá abandonar o Site.",
      ageGate: "Solicita-se também que abandone o Site se tiver idade inferior à mínima exigida por lei para consumir bebidas alcoólicas no país onde se encontra, ou se estiver num país onde a utilização ou mesmo apenas a visualização dos conteúdos do Site não seja permitida por lei.",
      modifications: "Limoncello di Sorrento pode modificar livremente os termos e condições de acesso ao Site quando considerar apropriado, sem necessidade di qualquer aviso prévio, sendo, portanto, da responsabilidade de quem acede ao Site consultar os termos e condições em cada novo acesso.",
      sections: [
        {
          title: "Propriedade intelectual",
          text: "Os conteúdos do Site, incluindo, por exemplo, textos, imagens, áudio e vídeo, são propriedade da Limoncello di Sorrento, ou estão legitimamente à sua disposição. As marcas presentes, tanto nominativas como figurativas, são propriedade exclusiva da Limoncello di Sorrento ou das empresas por ela controladas, ou referem-se a produtos que a Limoncello di Sorrento distribui em nome de outras empresas, conforme regido por acordos comerciais. Todas as marcas estão registadas nas autoridades italianas ou internacionais competentes e estão protegidas pelas leis de propriedade intelectual aplicáveis. Na ausência de autorização por escrito dos titulares dos direitos sobre estas marcas, é proibida qualquer utilização ou reprodução das mesmas. Pode imprimir qualquer conteúdo deste Site diretamente ou através de terceiros apenas se a utilização do material descarregado for exclusivamente pessoal e não comercial e não for alterado de forma alguma."
        },
        {
          title: "Limitações de responsabilidade",
          text: "A utilização do Site e a navegação no mesmo são da exclusiva responsabilidade do utilizador que a ele acede. A Limoncello di Sorrento compromete-se a garantir que o acesso ao Site seja sempre possível para quem possa legitimamente navegar nele e que as informações nele contidas estejam atualizadas. No entanto, o Site e os seus conteúdos são fornecidos e aceites no estado em que se encontram e são apresentados sem qualquer garantia, implícita ou explícita, relativa à funcionalidade do Site ou à ausência de vírus, à exatidão dos serviços oferecidos, ou à correção e integridade das informações nele publicadas. A Limoncello di Sorrento não será, portanto, responsável por quaisquer erros, imprecisões ou omissões relativos ao material contido no Site, nem será responsável por quaisquer danos de qualquer natureza que derivem do acesso ou navegação no Site ou mesmo da impossibilidade de o utilizar, ou da confiança no material contido no Site. A Limoncello di Sorrento reserva-se o direito de interromper o acesso ao Site ou de desativar uma parte do mesmo, impossibilitando a consulta de um tópico ou secção do site em qualquer altura e sem aviso prévio."
        },
        {
          title: "Comunicações não solicitadas",
          text: "O envio de informações ou outros materiais, por e-mail ou qualquer outro meio, implica o reconhecimento da autorização livre e irrevogável da Limoncello di Sorrento para utilizar, reproduzir, modificar, publicar, distribuir ou mostrar o que foi recebido, inclusive de forma não exclusiva, isoladamente ou como parte de outro trabalho, em qualquer forma e por qualquer meio ou tecnologia. A Limoncello di Sorrento não seleciona nem controla qualquer conteúdo transmitido ao Site por terceiros e não é responsável pela seleção ou controlo destes materiais, não assumindo, portanto, qualquer responsabilidade ou obrigação em relação aos mesmos."
        },
        {
          title: "Links para outros sites",
          text: "O Site pode conter links para sites de terceiros. Estes links não implicam que a Limoncello di Sorrento endosse o conteúdo destes sites de forma alguma, não sendo de forma alguma responsável pelo seu conteúdo. Aceder e visualizar estes sites é da sua direta e exclusiva responsabilidade. A Limoncello di Sorrento não é responsável pelos termos e condições estabelecidos por outras empresas. Os utilizadores que pretendam inserir um link para este site na sua \"homepage\" devem solicitar expressamente autorização à Limoncello di Sorrento através do seguinte endereço de e-mail: contact@limoncellodisorrento.com."
        },
        {
          title: "Jurisdição legal aplicável",
          text: "Estes Termos de Utilização são regidos pelas normas da lei italiana e devem ser interpretados de acordo com as leis italianas. Qualquer litígio decorrente destes Termos de Utilização, incluindo, mas não se limitando a litígios relativos à sua existência e validade, deve ser julgado pelos tribunais competentes de Nápoles."
        }
      ]
    },
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

export default function Terms({ lang, setLang }: TermsProps) {
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
            backgroundImage: 'url(/images/hero-3.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#082B4F]/60 z-0" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-[120px] h-[2px] bg-[#F4D03F] mb-8 animate-[fadeIn_400ms_ease-in-out_both]" />
          <h1 className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] text-center max-w-4xl leading-tight mb-6 animate-[fadeInUp_800ms_ease-in-out_400ms_both]">
            {t.banner.title}
          </h1>
          <div className="text-[0.8rem] tracking-widest uppercase font-playfair animate-[fadeInUp_800ms_ease-in-out_800ms_both]">
            {t.banner.breadcrumb}
          </div>
        </div>
      </section>

      {/* 2. TERMS CONTENT */}
      <section className="py-24 lg:py-36 px-6 md:px-12 lg:px-24 bg-[#F9F9F9] max-w-[1600px] mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl mb-8 text-[#082B4F]">{t.content.title}</h2>
            <div className="text-lg leading-relaxed text-[#082B4F]/80 space-y-6">
              <p>{t.content.intro}</p>
              <p>{t.content.acceptance}</p>
              <p>{t.content.ageGate}</p>
              <p>{t.content.modifications}</p>
            </div>
          </div>

          <div className="space-y-12">
            {t.content.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-playfair text-2xl mb-4 text-[#082B4F]">{section.title}</h3>
                <p className="text-lg leading-relaxed text-[#082B4F]/80">{section.text}</p>
              </div>
            ))}
          </div>
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
