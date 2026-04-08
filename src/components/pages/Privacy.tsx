import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp } from 'lucide-react';

type Language = 'en' | 'it' | 'pt';

interface PrivacyProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const translations = {
  en: {
    nav: { home: "Home", product: "The Limoncello", origins: "Our Origins", craft: "Craft Process", cocktails: "Cocktails and Etc.", contact: "Contact" },
    banner: { title: "Privacy Policy", breadcrumb: "LIMONCELLO DI SORRENTO — PRIVACY POLICY" },
    content: {
      title: "Privacy Policy",
      intro: "In compliance with the obligations prescribed by national legislation (Italian Legislative Decree No. 196 of 30 June 2003, the Data Protection Code, as amended) and European legislation (European General Data Protection Regulation No. 679/2016, GDPR), this site respects and protects the privacy of visitors and users, implementing every possible and proportionate effort not to infringe users' rights.",
      ownership: "The website is owned by Limoncello di Sorrento, Santa Fortunata St, 33, 80067 Sorrento NA, Itália.",
      scope: "The information is provided by Limoncello di Sorrento only for the website mentioned above and not for other websites or sections/pages/spaces owned by third parties that the user may consult through specific links.",
      readingPrompt: "Users/visitors are asked to read this Privacy Policy carefully before submitting any type of personal information and/or filling in any electronic form on the website itself.",
      detailedInfo: "If users/visitors are required to provide their personal data to access certain services, specific and detailed information on the relative processing will be published on the pages relating to the individual services, pursuant to Article 13 of Italian Legislative Decree 196/2003 and the GDPR, which will specify the limitations, purposes and methods of the processing itself.",
      sections: [
        {
          title: "1. Data controller",
          text: "The data controller is Limoncello di Sorrento with registered office in Santa Fortunata St, 33, 80067 Sorrento NA, Itália, Tax Code/Vat No. 10195214213. Any request relating to personal data processed by Limoncello di Sorrento can be addressed in writing to the email address contact@limoncellodisorrento.com."
        },
        {
          title: "2. Data processor",
          text: "Acoora S.r.l., in the person of its legal representative, with registered office in Rome, Via Luca Gaurico, 9 - VAT No. 11851441003 amministrazione@acoora.com."
        },
        {
          title: "3. Data voluntarily submitted by users",
          text: "If users/visitors connecting to this website submit their personal data to access certain services, or to make requests via email, the data will be acquired by Limoncello di Sorrento and/or third parties with which Limoncello di Sorrento may provide the service requested by the user/visitor; this data will be processed exclusively to respond to the request, or to provide the service in accordance with this Policy and the specific Privacy Policy provided at the time of subscription to individual services. The personal data expressly provided by users/visitors will be disclosed to third parties only if this is necessary to comply with the requests of the users/visitors themselves, without prejudice to the provisions of the specific Policies for the individual services."
        },
        {
          title: "a. Purpose of the processing for profiling purposes",
          text: "With the data subject's specific consent, Limoncello di Sorrento may use data provided voluntarily to improve the services offered according to its customers' needs and to obtain information on commercial behaviour and habits. The profiling activity concerning individuals or groups may be performed through processing customer identification data through a relationship between the data that enables identification of the data subjects and analytical indications relating to their personal sphere (tastes, preferences, habits, needs and consumer choices). The data will be processed electronically or digitally. The processing methods will be relevant and not excessive in relation to the type of services rendered. For processing data related to profiling, it is mandatory to acquire specific and separate consent from the data subject, who is informed as of now that this provision is entirely optional and any refusal will not entail any consequence (apart from preventing data processing for profiling purposes)."
        },
        {
          title: "b. Purpose of the processing for direct marketing purposes",
          text: "With the data subject's specific consent, Limoncello di Sorrento may use the data provided voluntarily for direct marketing activities, to develop studies, research or market statistics; send advertising and informational material; perform direct sales or placement of products or services; send commercial information; provide interactive commercial communications. For data processing aimed at conducting direct marketing activities, it is mandatory to acquire specific and separate consent from the data subject, who is informed as of now that this provision is entirely optional and any refusal will not entail any consequence (apart from preventing data processing for direct marketing purposes). For certain forms of communication by email, fax, automated call systems and MMS or SMS messages or other types, the need for specific and separate consent is also prescribed by specific provisions regarding unwanted communications or distance selling (Italian Legislative Decree 196/2003 and the GDPR). Also in the latter cases, data submission is entirely optional and any refusal will have no consequence (apart from preventing data processing)."
        },
        {
          title: "4. Rights of data subjects",
          text: "Data subjects have the right at any time to obtain confirmation of the existence of their data and to know its content and origin, verify its accuracy or request its integration, updating or rectification (Italian Legislative Decree 196/2003 and the GDPR). By virtue of this article, users have the right to obtain confirmation of the existence of personal data concerning them, even if not yet recorded, and its provision in an intelligible form. They also have the right to obtain information on the following aspects: (a) origin of the personal data; (b) purposes and methods of processing; (c) logic applied in the case of processing performed with the aid of electronic tools; (d) identification details of the data controllers, the data processors and the representative appointed pursuant to Article 5, paragraph 2; (e) parties or categories of parties to whom personal data may be communicated or who can learn about it as the appointed representative in the territory of the State, managers or agents."
        },
        {
          title: "The user also has the right to obtain:",
          text: "(a) updating, rectification or, when desired, integration of data; (b) cancellation, transformation into anonymous form or blocking of data processed in violation of the law, including data which need not be kept for the purposes for which it was collected or subsequently processed; (c) attestation that the operations referred to in points a) and b) have been brought to the attention, including, regarding their content, persons to whom the data has been disclosed or disseminated, except when this fulfilment proves impossible or involves using means that are manifestly disproportionate to the protected right."
        },
        {
          title: "Finally, the users have the right to object, in whole or in part:",
          text: "(a) for legitimate reasons, to the processing of personal data concerning them, even if pertinent to the purpose of collection; (b) to the processing of personal data concerning them for the purpose of sending advertising materials or direct selling or for conducting market research or commercial communication. The rights prescribed by Italian Legislative Decree 196/2003 and the GDPR may be exercised by writing to contact@limoncellodisorrento.com, Limoncello di Sorrento, Santa Fortunata St, 33, 80067 Sorrento NA, Itália."
        },
        {
          title: "5. Duration of processing",
          text: "The duration of the processing is to be understood as lasting until the request for its cancellation or restriction."
        },
        {
          title: "6. Processing methods",
          text: "Your personal data will be processed using suitable paper, electronic and/or digital methods, strictly for the aforementioned purposes and, in any case, in such a way as to guarantee the security and confidentiality of the data itself."
        },
        {
          title: "7. Data processing location",
          text: "The processing connected to the web services of this website is conducted at the aforementioned headquarters of the company Limoncello di Sorrento and is only handled by personnel assigned to processing, or by any persons assigned to occasional maintenance operations. Data deriving from the web service may be forwarded to the technological and instrumental partners used by the \"Data Controller\" to provide the services requested by visitors. The personal data provided by the visiting users, who send requests for informational material (requests for information, answers to questions, etc.) or other communications (orders), is used for the sole purpose of carrying out the service or provision requested and is disclosed to third parties only if necessary for this purpose (providing the requested services through the technological and instrumental partner)."
        },
        {
          title: "8. Consent",
          text: "Full awareness of this policy will be required from you when registering for a service and/or on the website if necessary. Here you will be asked to give your consent to the processing by Limoncello di Sorrento."
        },
        {
          title: "9. Browsing data and cookies",
          text: "Regarding the use of cookies, we refer you to the specific policy on their use."
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
    banner: { title: "Privacy Policy", breadcrumb: "LIMONCELLO DI SORRENTO — PRIVACY POLICY" },
    content: {
      title: "Privacy Policy",
      intro: "In conformità agli obblighi prescritti dalla normativa nazionale (D.Lgs. 30 giugno 2003 n. 196, Codice in materia di protezione dei dati personali, e successive modifiche) e dalla normativa europea (Regolamento Europeo per la protezione dei dati personali n. 679/2016, GDPR), questo sito rispetta e tutela la riservatezza dei visitatori e degli utenti, ponendo in essere ogni sforzo possibile e proporzionato per non ledere i diritti degli utenti.",
      ownership: "Il sito web è di proprietà di Limoncello di Sorrento, Santa Fortunata St, 33, 80067 Sorrento NA, Itália.",
      scope: "L'informativa è resa da Limoncello di Sorrento solo per il sito sopra menzionato e non per altri siti web o sezioni/pagine/spazi di proprietà di terzi che l'utente dovesse consultare tramite appositi link.",
      readingPrompt: "Si chiede agli utenti/visitatori di leggere attentamente la presente Privacy Policy prima di inoltrare qualsiasi tipo di informazione personale e/o compilare qualunque modulo elettronico presente sul sito stesso.",
      detailedInfo: "Qualora agli utenti/visitatori sia richiesto, per accedere a determinati servizi, di conferire i propri dati personali, sarà pubblicata nelle pagine relative ai singoli servizi apposita e dettagliata informativa sul relativo trattamento ai sensi dell'art. 13 del D.Lgs. 196/2003 e del GDPR, che specificherà limiti, finalità e modalità del trattamento stesso.",
      sections: [
        {
          title: "1. Titolare del trattamento",
          text: "Il titolare del trattamento è Limoncello di Sorrento con sede legale in Santa Fortunata St, 33, 80067 Sorrento NA, Itália, Codice Fiscale/P.IVA 10195214213. Qualsiasi richiesta relativa ai dati personali trattati da Limoncello di Sorrento può essere indirizzata per iscritto all'indirizzo email contact@limoncellodisorrento.com."
        },
        {
          title: "2. Responsabile del trattamento",
          text: "Acoora S.r.l., in persona del suo legale rappresentante, con sede legale in Roma, Via Luca Gaurico, 9 - P.IVA 11851441003 amministrazione@acoora.com."
        },
        {
          title: "3. Dati forniti volontariamente dagli utenti",
          text: "Qualora gli utenti/visitatori collegandosi a questo sito inviino i propri dati personali per accedere a determinati servizi, ovvero per effettuare richieste in posta elettronica, ciò comporta l'acquisizione da parte di Limoncello di Sorrento e/o di terzi unitamente ai quali Limoncello di Sorrento potrebbe fornire il servizio richiesto dall'utente/visitatore, di tali dati che verranno trattati esclusivamente per rispondere alla richiesta, ovvero per la fornitura del servizio in conformità alla presente Policy e alle specifiche informative Privacy rese in fase di adesione ai singoli servizi. I dati personali espressamente conferiti dagli utenti/visitatori verranno comunicati a terzi solo nel caso in cui la comunicazione sia necessaria per ottemperare alle richieste degli utenti/visitatori medesimi, fermo restando quanto previsto nelle specifiche informative dei singoli servizi."
        },
        {
          title: "a. Finalità del trattamento per scopi di profilazione",
          text: "Con lo specifico consenso dell'interessato, Limoncello di Sorrento potrà utilizzare i dati forniti volontariamente per migliorare i servizi offerti in base alle esigenze dei propri clienti e per ottenere informazioni sui comportamenti e le abitudini commerciali. L'attività di profilazione riguardante singoli individui o gruppi potrà essere effettuata attraverso il trattamento dei dati identificativi del cliente mediante una relazione tra i dati che consenta l'identificazione degli interessati e indicazioni analitiche relative alla loro sfera personale (gusti, preferenze, abitudini, bisogni e scelte di consumo). I dati saranno trattati in modalità elettronica o digitale. Le modalità di trattamento saranno pertinenti e non eccedenti rispetto al tipo di servizi resi. Per il trattamento dei dati relativi alla profilazione è obbligatorio acquisire il consenso specifico e separato dell'interessato, il quale è informato fin d'ora che tale conferimento è del tutto facoltativo e l'eventuale rifiuto non comporterà alcuna conseguenza (se non quella di impedire il trattamento dei dati per finalità di profilazione)."
        },
        {
          title: "b. Finalità del trattamento per scopi di marketing diretto",
          text: "Con lo specifico consenso dell'interessato, Limoncello di Sorrento potrà utilizzare i dati forniti volontariamente per attività di marketing diretto, per elaborare studi, ricerche o statistiche di mercato; inviare materiale pubblicitario e informativo; compiere vendite dirette o collocamento di prodotti o servizi; inviare informazioni commerciali; effettuare comunicazioni commerciali interattive. Per il trattamento dei dati finalizzato allo svolgimento di attività di marketing diretto è obbligatorio acquisire il consenso specifico e separato dell'interessato, il quale è informato fin d'ora che tale conferimento è del tutto facoltativo e l'eventuale rifiuto non comporterà alcuna conseguenza (se non quella di impedire il trattamento dei dati per finalità di marketing diretto). Per alcune forme di comunicazione via e-mail, fax, sistemi automatizzati di chiamata e messaggi di tipo MMS o SMS o di altro tipo, la necessità del consenso specifico e separato è inoltre prescritta da specifiche disposizioni in materia di comunicazioni indesiderate o vendite a distanza (D.Lgs. 196/2003 e GDPR). Anche in questi ultimi casi, il conferimento dei dati è del tutto facoltativo e l'eventuale rifiuto non avrà alcuna conseguenza (se non quella di impedire il trattamento dei dati)."
        },
        {
          title: "4. Diritti degli interessati",
          text: "Gli interessati hanno il diritto in qualunque momento di ottenere la conferma dell'esistenza dei propri dati e di conoscerne il contenuto e l'origine, verificarne l'esattezza o chiederne l'integrazione, l'aggiornamento, oppure la rettificazione (D.Lgs. 196/2003 e GDPR). In virtù di tale articolo si ha il diritto di ottenere la conferma dell'esistenza di dati personali che lo riguardano, anche se non ancora registrati, e la loro comunicazione in forma intelligibile. Si ha inoltre il diritto di ottenere l'indicazione: (a) dell'origine dei dati personali; (b) delle finalità e modalità del trattamento; (c) della logica applicata in caso di trattamento effettuato con l'ausilio di strumenti elettronici; (d) degli estremi identificativi del titolare, dei responsabili e del rappresentante designato ai sensi dell'articolo 5, comma 2; (e) dei soggetti o delle categorie di soggetti ai quali i dati personali possono essere comunicati o che possono venirne a conoscenza in qualità di rappresentante designato nel territorio dello Stato, di responsabili o incaricati."
        },
        {
          title: "L'utente ha inoltre il diritto di ottenere:",
          text: "(a) l'aggiornamento, la rettificazione ovvero, quando vi ha interesse, l'integrazione dei dati; (b) la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge, compresi quelli di cui non è necessaria la conservazione in relazione agli scopi per i quali i dati sono stati raccolti o successivamente trattati; (c) l'attestazione che le operazioni di cui alle lettere a) e b) sono state portate a conoscenza, anche per quanto riguarda il loro contenuto, di coloro ai quali i dati sono stati comunicati o diffusi, eccettuato il caso in cui tale adempimento si rivela impossibile o comporta un impiego di mezzi manifestamente sproporzionato rispetto al diritto tutelato."
        },
        {
          title: "Infine, l'utente ha il diritto di opporsi, in tutto o in parte:",
          text: "(a) per motivi legittimi al trattamento dei dati personali che lo riguardano, ancorché pertinenti allo scopo della raccolta; (b) al trattamento di dati personali che lo riguardano a fini di invio di materiale pubblicitario o di vendita diretta o per il compimento di ricerche di mercato o di comunicazione commerciale. I diritti prescritti dal D.Lgs. 196/2003 e dal GDPR possono essere esercitati scrivendo a contact@limoncellodisorrento.com, Limoncello di Sorrento, Santa Fortunata St, 33, 80067 Sorrento NA, Itália."
        },
        {
          title: "5. Durata del trattamento",
          text: "La durata del trattamento è da intendersi fino alla richiesta di cancellazione o limitazione dello stesso."
        },
        {
          title: "6. Modalità del trattamento",
          text: "I Suoi dati personali saranno trattati con idonei strumenti cartacei, elettronici e/o telematici, con logiche strettamente correlate alle finalità di cui sopra e, comunque, in modo tale da garantire la sicurezza e riservatezza dei dati stessi."
        },
        {
          title: "7. Luogo di trattamento dei dati",
          text: "I trattamenti connessi ai servizi web di questo sito hanno luogo presso la predetta sede della società Limoncello di Sorrento e sono curati solo da personale incaricato del trattamento, oppure da eventuali incaricati di occasionali operazioni di manutenzione. I dati derivanti dal servizio web potranno essere comunicati ai partner tecnologici e strumentali di cui il \"Titolare\" si avvale per l'erogazione dei servizi richiesti dagli utenti visitatori. I dati personali forniti dagli utenti visitatori che inoltrano richieste di invio di materiale informativo (richieste di informazioni, risposte a quesiti, ecc.) o altre comunicazioni (ordini) sono utilizzati al solo fine di eseguire il servizio o la prestazione richiesta e sono comunicati a terzi nel solo caso in cui ciò sia a tal fine necessario (erogazione dei servizi richiesti per il tramite del partner tecnologico e strumentale)."
        },
        {
          title: "8. Consenso",
          text: "La piena consapevolezza della presente informativa Le sarà richiesta in fase di registrazione ad un servizio e/o al sito qualora necessario. In tale sede Le sarà chiesto di prestare il Suo consenso al trattamento da parte di Limoncello di Sorrento."
        },
        {
          title: "9. Dati di navigazione e cookie",
          text: "In merito all'uso dei cookie, si rimanda alla specifica informativa sul loro utilizzo."
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
    banner: { title: "Política de Privacidade", breadcrumb: "LIMONCELLO DI SORRENTO — POLÍTICA DE PRIVACIDADE" },
    content: {
      title: "Política de Privacidade",
      intro: "Em conformidade com as obrigações prescritas pela legislação nacional (Decreto Legislativo Italiano n.º 196 de 30 de junho de 2003, o Código de Proteção de Dados, conforme alterado) e pela legislação europeia (Regulamento Geral de Proteção de Dados da União Europeia n.º 679/2016, RGPD), este site respeita e protege a privacidade dos visitantes e utilizadores, implementando todos os esforços possíveis e proporcionados para não infringir os direitos dos utilizadores.",
      ownership: "O site é propriedade da Limoncello di Sorrento, Santa Fortunata St, 33, 80067 Sorrento NA, Itália.",
      scope: "A informação é fornecida pela Limoncello di Sorrento apenas para o site acima mencionado e não para outros sites ou secções/páginas/espaços propriedade de terceiros que o utilizador possa consultar através de links específicos.",
      readingPrompt: "Solicita-se aos utilizadores/visitantes que leiam atentamente esta Política de Privacidade antes de submeterem qualquer tipo de informação pessoal e/ou preencherem qualquer formulário eletrónico no próprio site.",
      detailedInfo: "Caso os utilizadores/visitantes sejam obrigados a fornecer os seus dados pessoais para aceder a determinados serviços, será publicada nas páginas relativas aos serviços individuais informação específica e detalhada sobre o respetivo tratamento, nos termos do Artigo 13.º do Decreto Legislativo Italiano 196/2003 e do RGPD, que especificará as limitações, finalidades e métodos do próprio tratamento.",
      sections: [
        {
          title: "1. Responsável pelo tratamento de dados",
          text: "O responsável pelo tratamento de dados é a Limoncello di Sorrento, com sede em Santa Fortunata St, 33, 80067 Sorrento NA, Itália, Código Fiscal/NIF IT 10195214213. Qualquer pedido relativo a dados pessoais tratados pela Limoncello di Sorrento pode ser endereçado por escrito para o endereço de e-mail contact@limoncellodisorrento.com."
        },
        {
          title: "2. Subprocessador de dados",
          text: "Acoora S.r.l., na pessoa do seu representante legal, com sede em Roma, Via Luca Gaurico, 9 - NIF IT 11851441003 amministrazione@acoora.com."
        },
        {
          title: "3. Dados submetidos voluntariamente pelos utilizadores",
          text: "Se os utilizadores/visitantes que se ligam a este site submeterem os seus dados pessoais para aceder a determinados serviços, ou para fazerem pedidos via e-mail, os dados serão adquiridos pela Limoncello di Sorrento e/ou terceiros com os quais a Limoncello di Sorrento possa fornecer o serviço solicitado pelo utilizador/visitante; estes dados serão tratados exclusivamente para responder ao pedido, ou para fornecer o serviço de acordo com esta Política e a Política de Privacidade específica fornecida no momento da subscrição de serviços individuais. Os dados pessoais expressamente fornecidos pelos utilizadores/visitantes serão divulgados a terceiros apenas se tal for necessário para cumprir os pedidos dos próprios utilizadores/visitantes, sem prejuízo do disposto nas Políticas específicas para os serviços individuais."
        },
        {
          title: "a. Finalidade do tratamento para fins de definição de perfis",
          text: "Com o consentimento específico do titular dos dados, a Limoncello di Sorrento poderá utilizar dados fornecidos voluntariamente para melhorar os serviços oferecidos de acordo com as necessidades dos seus clientes e para obter informações sobre comportamentos e hábitos comerciais. A atividade de definição de perfis relativa a indivíduos ou grupos poderá ser realizada através do tratamento de dados de identificação de clientes através de uma relação entre os dados que permita a identificação dos titulares dos dados e indicações analíticas relativas à sua esfera pessoal (gostos, preferências, hábitos, necessidades e escolhas de consumo). Os dados serão tratados eletrónica ou digitalmente. Os métodos de tratamento serão pertinentes e não excessivos em relação ao tipo de serviços prestados. Para o tratamento de dados relacionados com a definição de perfis, é obrigatório obter o consentimento específico e separado do titular dos dados, que é informado desde já que esta disposição é inteiramente opcional e qualquer recusa não terá qualquer consequência (além de impedir o tratamento de dados para fins de definição de perfis)."
        },
        {
          title: "b. Finalidade do tratamento para fins de marketing direto",
          text: "Com o consentimento específico do titular dos dados, a Limoncello di Sorrento poderá utilizar os dados fornecidos voluntariamente para atividades de marketing direto, para desenvolver estudos, pesquisas ou estatísticas de mercado; enviar material publicitário e informativo; realizar vendas diretas ou colocação de produtos ou serviços; enviar informações comerciais; fornecer comunicações comerciais interativas. Para o tratamento de dados visando a realização de atividades de marketing direto, é obrigatório obter o consentimento específico e separado do titular dos dados, que é informado desde já que esta disposição é inteiramente opcional e qualquer recusa não terá qualquer consequência (além de impedir o tratamento de dados para fins de marketing direto). Para certas formas de comunicação por e-mail, fax, sistemas de chamadas automatizadas e mensagens MMS ou SMS ou outros tipos, a necessidade de consentimento específico e separado é também prescrita por disposições específicas relativas a comunicações indesejadas ou venda à distância (Decreto Legislativo Italiano 196/2003 e o RGPD). Também nestes últimos casos, a submissão de dados é inteiramente opcional e qualquer recusa não terá qualquer consequência (além de impedir o tratamento de dados)."
        },
        {
          title: "4. Direitos dos titulares dos dados",
          text: "Os titulares dos dados têm o direito de, a qualquer momento, obter a confirmação da existência dos seus dados e de conhecer o seu conteúdo e origem, verificar a sua exatidão ou solicitar a sua integração, atualização ou retificação (Decreto Legislativo Italiano 196/2003 e o RGPD). Por força deste artigo, os utilizadores têm o direito de obter a confirmação da existência de dados pessoais que lhes digam respeito, mesmo que ainda não registados, e a sua disponibilização de forma inteligível. Têm também o direito de obter informações sobre os seguintes aspetos: (a) origem dos dados pessoais; (b) finalidades e métodos de tratamento; (c) lógica aplicada no caso de tratamento realizado com o auxílio de ferramentas eletrónicas; (d) detalhes de identificação dos responsáveis pelo tratamento, dos subprocessadores e do representante nomeado nos termos do Artigo 5.º, parágrafo 2; (e) partes ou categorias de partes a quem os dados pessoais podem ser comunicados ou que podem ter conhecimento deles como representante nomeado no território do Estado, gestores ou agentes."
        },
        {
          title: "O utilizador tem também o direito de obter:",
          text: "(a) atualização, retificação ou, quando desejado, integração de dados; (b) cancelamento, transformação em forma anónima ou bloqueio de dados tratados em violação da lei, incluindo dados que não necessitem de ser mantidos para os fins para os quais foram recolhidos ou posteriormente tratados; (c) atestação de que as operações referidas nos pontos a) e b) foram levadas ao conhecimento, inclusive quanto ao seu conteúdo, das pessoas a quem os dados foram divulgados ou disseminados, exceto quando tal cumprimento se revele impossível ou envolva a utilização de meios manifestamente desproporcionados em relação ao direito protegido."
        },
        {
          title: "Finalmente, os utilizadores têm o direito de se opor, no todo ou em parte:",
          text: "(a) por motivos legítimos, ao tratamento de dados pessoais que lhes digam respeito, mesmo que pertinentes para a finalidade da recolha; (b) ao tratamento de dados pessoais que lhes digam respeito para efeitos de envio de materiais publicitários ou venda direta ou para a realização de pesquisas de mercado ou comunicação comercial. Os direitos prescritos pelo Decreto Legislativo Italiano 196/2003 e pelo RGPD podem ser exercidos escrevendo para contact@limoncellodisorrento.com, Limoncello di Sorrento, Santa Fortunata St, 33, 80067 Sorrento NA, Itália."
        },
        {
          title: "5. Duração do tratamento",
          text: "A duração do tratamento deve ser entendida como durando até ao pedido do seu cancelamento ou restrição."
        },
        {
          title: "6. Métodos de tratamento",
          text: "Os seus dados pessoais serão tratados utilizando métodos adequados em papel, eletrónicos e/ou digitais, estritamente para as finalidades acima mencionadas e, em qualquer caso, de forma a garantir a segurança e a confidencialità dos próprios dados."
        },
        {
          title: "7. Local de tratamento de dados",
          text: "O tratamento ligado aos serviços web deste site é realizado na referida sede da empresa Limoncello di Sorrento e é apenas manuseado por pessoal designado para o tratamento, ou por quaisquer pessoas designadas para operações de manutenção ocasional. Os dados derivados do serviço web podem ser encaminhados para os parceiros tecnológicos e instrumentais utilizados pelo \"Responsável pelo Tratamento\" para fornecer os serviços solicitados pelos visitantes. Os dados pessoais fornecidos pelos utilizadores visitantes, que enviam pedidos de material informativo (pedidos de informação, respostas a perguntas, etc.) or outras comunicações (encomendas), são utilizados com o único propósito de realizar o serviço ou prestação solicitada e são divulgados a terceiros apenas se necessário para este fim (fornecendo os serviços solicitados através do parceiro tecnológico e instrumental)."
        },
        {
          title: "8. Consentimento",
          text: "A plena consciência desta política ser-lhe-á exigida ao registar-se num serviço e/ou no site, se necessário. Aqui ser-lhe-á pedido que dê o seu consentimento ao tratamento pela Limoncello di Sorrento."
        },
        {
          title: "9. Dados de navegação e cookies",
          text: "Relativamente à utilização de cookies, remetemos para a política específica sobre a sua utilização."
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

export default function Privacy({ lang, setLang }: PrivacyProps) {
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

      {/* 2. PRIVACY CONTENT */}
      <section className="py-24 lg:py-36 px-6 md:px-12 lg:px-24 bg-[#F9F9F9] max-w-[1600px] mx-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-[#082B4F] font-medium">{t.content.intro}</p>
            <p className="text-lg leading-relaxed text-[#082B4F]/80">{t.content.ownership}</p>
            <p className="text-lg leading-relaxed text-[#082B4F]/80">{t.content.scope}</p>
            <p className="text-lg leading-relaxed text-[#082B4F]/80 italic">{t.content.readingPrompt}</p>
            <p className="text-lg leading-relaxed text-[#082B4F]/80">{t.content.detailedInfo}</p>
          </div>

          <div className="space-y-12 pt-8 border-t border-[#082B4F]/10">
            {t.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="font-playfair text-2xl text-[#082B4F]">{section.title}</h3>
                <p className="text-lg leading-relaxed text-[#082B4F]/80 whitespace-pre-line">{section.text}</p>
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
