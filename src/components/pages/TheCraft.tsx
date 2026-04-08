import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUp, ChevronLeft, ChevronRight, Leaf, Hand, Recycle, Sun, Users, Droplet } from 'lucide-react';

type Language = 'en' | 'it' | 'pt';

interface TheCraftProps {
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
      breadcrumb: "LIMONCELLO DI SORRENTO — CRAFT PROCESS",
      title: "Where every lemon is touched by hand"
    },
    philosophy: {
      label: "OUR AZIENDA",
      title: "Made by hand, as it has always been",
      p1: "Every bottle of Limoncello di Sorrento carries the patience of a family tradition that refuses to rush.",
      p2: "Our workshop sits steps away from the lemon groves. This is not an industrial operation — it is a place where the same family that tends the trees also peels the fruit, watches over the infusion, and fills the bottles. The methods are unchanged because there is no better way. The scale is small by choice: every lemon is known, every batch is personal."
    },
    ingredient: {
      label: "OUR FIRST AND MAIN INGREDIENT",
      title: "The Ovale di Sorrento",
      p1: "The P.G.I. certification guarantees what locals have known for centuries: there is no lemon quite like the Ovale di Sorrento. Present in the region since the 16th century, evidenced in paintings and botanical treatises, it is distinguished by its medium-to-large oval shape, its extraordinarily aromatic yellow peel, and its juicy, tart pulp. These are not ordinary lemons. They are the product of a specific land, climate, and centuries of care.",
      p2: "Our lemons are grown by local farming families who know each tree. They are cultivated under pagliarelle — traditional chestnut-wood pergolas draped with nets. This creates a micro-climate that slows the ripening process, giving the fruit time to develop its extraordinary depth of flavor. Every lemon undergoes a double selection: first in the groves during harvest (by eye — shape, color, flawlessness), then again at the Azienda during peeling (by touch — only the finest peels proceed)."
    },
    terroir: {
      label: "FROM THE GROVE TO THE BOTTLE",
      title: "A craft rooted in the land",
      text: "At our Azienda, the distance between the lemon grove and the worktable is measured in steps, not kilometers. Limoncello di Sorrento is made where the lemons grow — a short chain that preserves freshness and keeps the craft inseparable from the soil that feeds it."
    },
    quote: "Somewhere there's always the yellow of a lemon tree to remind us of light.",
    process: {
      label: "OUR PROCESS",
      title: "The making of Limoncello di Sorrento",
      steps: [
        {
          title: "Growing",
          desc: "The Ovale di Sorrento grows on the sun-drenched slopes of the peninsula, tended by farming families who know each tree by name. Branches are hand-grafted onto hardier rootstock to strengthen the orchard. From blossom to harvest, each fruit takes 11 to 14 months of patient care.",
          imgDesc: "[Terraced lemon grove on a steep coastal slope, morning mist, a farmer tending to a young tree by hand, wooden pergola structure overhead]",
          img: "/images/craft-04-1.png"
        },
        {
          title: "The Groves",
          desc: "The groves are called giardini — gardens. Their defining feature: the pagliarelle, handmade chestnut-wood pergolas draped with nets that shelter the trees from cold and wind. This creates a micro-climate that slows ripening, giving each lemon time to develop its extraordinary depth of aroma.",
          imgDesc: "[Close-up of a pagliarella — chestnut-wood pergola with woven nets casting dappled light on lemon trees below, volcanic soil visible between roots]",
          img: "/images/craft-04-2.png"
        },
        {
          title: "Harvesting",
          desc: "The trees bloom up to four times a year. Fruit is picked by hand between February and October, following the tree's own rhythm. P.G.I. guidelines require rest phases between harvests — the land gives generously, but only when treated with respect.",
          imgDesc: "[A farmer's weathered hands reaching into foliage to twist a ripe lemon free, a woven basket half-full beside them, golden morning light]",
          img: "/images/craft-04-3.png"
        },
        {
          title: "Selection",
          desc: "Every lemon is inspected twice. First in the grove: shape, color, flawlessness — only the best are picked. Then again at the Azienda: each fruit is handled, assessed, and either selected or set aside. This double selection, done entirely by eye and by hand, ensures that only exceptional lemons enter the process.",
          imgDesc: "[Lemons spread across a rustic wooden table, hands turning one to inspect its shape and color, some set aside in a separate basket]",
          img: "/images/craft-04-4.png"
        },
        {
          title: "Peeling",
          desc: "Within 48 hours of harvest, the lemons are washed and peeled by hand. The craft is in the precision: the paper-thin yellow peel — rich in essential oils — must be separated cleanly from the bitter white pith beneath. Too deep, and bitterness enters. Too shallow, and flavor is lost. Each cut is a judgment call, made by feel.",
          imgDesc: "[Close-up of skilled hands drawing a knife along a lemon, lifting a paper-thin curl of bright yellow peel away from the white pith, a pile of curled peels on a cutting board]",
          img: "/images/craft-04-5.png"
        },
        {
          title: "Infusion",
          desc: "The precious peels are submerged in pure grain alcohol and left to infuse for one week at a constant, cool temperature. Slowly, the essential oils release into the spirit — the color deepens, the aroma intensifies. There is no way to rush this step. It takes exactly as long as it takes.",
          imgDesc: "[A glass demijohn filled with golden liquid and floating lemon peels, sitting on a stone shelf in a cool room, warm amber light from a small window]",
          img: "/images/craft-04-6.png"
        },
        {
          title: "Mixing",
          desc: "The infused alcohol is gently filtered, then mixed with cold purified water and sugar. Nothing else is added: no artificial colorings, no preservatives, no stabilizers. The Limoncello di Sorrento is now complete — 100% natural, as it was when the first batch was made for family and friends.",
          imgDesc: "[Hands pouring a stream of clear liquid from a ceramic jug into a large glass vessel, golden infusion already inside, a wooden spoon nearby]",
          img: "/images/craft-04-7.png"
        },
        {
          title: "Bottling",
          desc: "Before bottling, each batch passes through careful quality checks. Only after meeting the standard does the limoncello enter the bottle — each one a small vessel carrying the scent and warmth of Sorrento to tables around the world.",
          imgDesc: "[Bottles being filled by hand from a spigot, golden liquid catching the light, a careful hand placing a label, a row of finished bottles on a wooden shelf]",
          img: "/images/craft-04-8.png"
        }
      ]
    },
    credentials: {
      label: "OUR CREDENTIALS",
      title: "What guarantees authenticity",
      text: "Limoncello di Sorrento is made exclusively with P.G.I.-certified Sorrento Lemons — a protected designation that guarantees provenance and quality. The production follows an entirely artisanal method: 100% natural, with no artificial colorings, preservatives, or stabilizers. The recipe has never changed because it has never needed to.",
      badges: [
        "P.G.I. SORRENTO LEMONS",
        "100% NATURAL",
        "ARTISANAL METHOD"
      ]
    },
    values: {
      label: "ROOTED IN THE LAND",
      title: "Our way of making",
      text: "Our commitment to quality is inseparable from our commitment to the land, the community, and the rhythm of the seasons.",
      cards: [
        {
          title: "SHORT CHAIN",
          desc: "From grove to bottle on the same family farm. The lemons travel steps, not kilometers. Freshness is preserved, waste is minimized."
        },
        {
          title: "ZERO WASTE",
          desc: "Every part of the lemon finds its purpose. Spent peels return to the land as compost or go to energy recovery. Nothing is discarded."
        },
        {
          title: "SEASONAL RHYTHM",
          desc: "We harvest when the trees are ready, not when the calendar says so. Rest phases between harvests protect the groves for future generations."
        },
        {
          title: "LOCAL COMMUNITY",
          desc: "Our growers are our neighbors. We source exclusively from local P.G.I.-registered farming families, sustaining the traditions and livelihoods of the Sorrento peninsula."
        }
      ]
    }
  },
  it: {
    nav: {
      home: "Home",
      product: "Il Limoncello",
      origins: "Le Origini",
      craft: "Processo Artigianale",
      cocktails: "Cocktail e Altro",
      contact: "Contatti"
    },
    footer: {
      drinkResponsibly: "Bevi responsabilmente. Non condividere con persone al di sotto dell'età legale per il consumo di alcolici.",
      address: "Santa Fortunata St, 33, 80067 Sorrento NA, Itália",
      vat: "P.IVA 10195214213",
      privacy: "Privacy Policy",
      terms: "Termini di Servizio",
      developedBy: "Sviluppato da"
    },
    banner: {
      breadcrumb: "LIMONCELLO DI SORRENTO — PROCESSO ARTIGIANALE",
      title: "Dove ogni limone è toccato a mano"
    },
    philosophy: {
      label: "LA NOSTRA AZIENDA",
      title: "Fatto a mano, come è sempre stato",
      p1: "Ogni bottiglia di Limoncello di Sorrento porta con sé la pazienza di una tradizione familiare che si rifiuta di affrettare i tempi.",
      p2: "Il nostro laboratorio si trova a pochi passi dai limoneti. Questa non è un'operazione industriale — è un luogo dove la stessa famiglia che cura gli alberi sbuccia anche i frutti, sorveglia l'infusione e riempie le bottiglie. I metodi sono invariati perché non c'è modo migliore. Le dimensioni sono ridotte per scelta: ogni limone è conosciuto, ogni lotto è personale."
    },
    ingredient: {
      label: "IL NOSTRO PRIMO E PRINCIPALE INGREDIENTE",
      title: "L'Ovale di Sorrento",
      p1: "La certificazione I.G.P. garantisce ciò che la gente del posto sa da secoli: non esiste un limone come l'Ovale di Sorrento. Presente nella regione fin dal XVI secolo, testimoniato in dipinti e trattati di botanica, si distingue per la sua forma ovale medio-grande, la buccia gialla straordinariamente aromatica e la polpa succosa e aspra. Questi non sono limoni comuni. Sono il prodotto di una terra specifica, di un clima e di secoli di cure.",
      p2: "I nostri limoni sono coltivati da famiglie di agricoltori locali che conoscono ogni albero. Vengono coltivati sotto le pagliarelle — tradizionali pergolati in legno di castagno ricoperti da reti. Questo crea un microclima che rallenta il processo di maturazione, dando al frutto il tempo di sviluppare la sua straordinaria profondità di sapore. Ogni limone subisce una doppia selezione: prima nei giardini durante il raccolto (a occhio — forma, colore, perfezione), poi di nuovo in Azienda durante la sbucciatura (al tatto — solo le bucce migliori procedono)."
    },
    terroir: {
      label: "DAL GIARDINO ALLA BOTTIGLIA",
      title: "Un mestiere radicato nella terra",
      text: "Nella nostra Azienda, la distanza tra il limoneto e il tavolo di lavoro si misura in passi, non in chilometri. Il Limoncello di Sorrento è fatto dove crescono i limoni — una filiera corta che preserva la freschezza e mantiene l'artigianato inseparabile dalla terra che lo nutre."
    },
    quote: "Da qualche parte c'è sempre il giallo di un albero di limoni a ricordarci la luce.",
    process: {
      label: "IL NOSTRO PROCESSO",
      title: "La creazione del Limoncello di Sorrento",
      steps: [
        {
          title: "La Coltivazione",
          desc: "L'Ovale di Sorrento cresce sui pendii soleggiati della penisola, curato da famiglie di agricoltori che conoscono ogni albero per nome. I rami vengono innestati a mano su portainnesti più resistenti per rafforzare il frutteto. Dal fiore al raccolto, ogni frutto richiede da 11 a 14 mesi di cure pazienti.",
          imgDesc: "[Limoneto terrazzato su un ripido pendio costiero, nebbia mattutina, un contadino che cura un giovane albero a mano, struttura a pergola in legno in alto]",
          img: "/images/craft-04-1.png"
        },
        {
          title: "I Giardini",
          desc: "I limoneti sono chiamati giardini. La loro caratteristica distintiva: le pagliarelle, pergolati in legno di castagno fatti a mano e ricoperti da reti che riparano gli alberi dal freddo e dal vento. Questo crea un microclima che rallenta la maturazione, dando a ogni limone il tempo di sviluppare la sua straordinaria profondità di aroma.",
          imgDesc: "[Primo piano di una pagliarella — pergolato in legno di castagno con reti intrecciate che proiettano luce screziata sugli alberi di limoni sottostanti, terreno vulcanico visibile tra le radici]",
          img: "/images/craft-04-2.png"
        },
        {
          title: "Il Raccolto",
          desc: "Gli alberi fioriscono fino a quattro volte l'anno. La frutta viene raccolta a mano tra febbraio e ottobre, seguendo il ritmo dell'albero. Le linee guida I.G.P. richiedono fasi di riposo tra i raccolti — la terra dona generosamente, ma solo se trattata con rispetto.",
          imgDesc: "[Le mani segnate dal tempo di un contadino che raggiungono il fogliame per staccare un limone maturo, un cesto intrecciato mezzo pieno accanto a loro, luce dorata del mattino]",
          img: "/images/craft-04-3.png"
        },
        {
          title: "La Selezione",
          desc: "Ogni limone viene ispezionato due volte. Prima nel giardino: forma, colore, perfezione — vengono scelti solo i migliori. Poi di nuovo in Azienda: ogni frutto viene maneggiato, valutato e selezionato o messo da parte. Questa doppia selezione, fatta interamente a occhio e a mano, assicura che solo limoni eccezionali entrino nel processo.",
          imgDesc: "[Limoni sparsi su un tavolo di legno rustico, mani che ne girano uno per ispezionarne forma e colore, alcuni messi da parte in un cesto separato]",
          img: "/images/craft-04-4.png"
        },
        {
          title: "La Sbucciatura",
          desc: "Entro 48 ore dal raccolto, i limoni vengono lavati e sbucciati a mano. L'arte sta nella precisione: la sottilissima buccia gialla — ricca di oli essenziali — deve essere separata in modo netto dal midollo bianco e amaro sottostante. Troppo profondo e subentra l'amarezza. Troppo superficiale e si perde sapore. Ogni taglio è una decisione, presa a sensazione.",
          imgDesc: "[Primo piano di mani esperte che fanno scorrere un coltello lungo un limone, sollevando un ricciolo sottilissimo di buccia giallo brillante dal midollo bianco, un mucchio di bucce arricciate su un tagliere]",
          img: "/images/craft-04-5.png"
        },
        {
          title: "L'Infusione",
          desc: "Le preziose bucce vengono immerse in alcol puro di cereali e lasciate in infusione per una settimana a temperatura costante e fresca. Lentamente, gli oli essenziali si rilasciano nello spirito — il colore si scurisce, l'aroma si intensifica. Non c'è modo di affrettare questo passaggio. Ci vuole esattamente il tempo che ci vuole.",
          imgDesc: "[Una damigiana di vetro piena di liquido dorato e bucce di limone galleggianti, appoggiata su una mensola di pietra in una stanza fresca, calda luce ambrata da una piccola finestra]",
          img: "/images/craft-04-6.png"
        },
        {
          title: "La Miscelazione",
          desc: "L'alcol infuso viene filtrato delicatamente, poi mescolato con acqua fredda purificata e zucchero. Non viene aggiunto nient'altro: nessun colorante artificiale, nessun conservante, nessuno stabilizzante. Il Limoncello di Sorrento è ora completo — 100% naturale, come quando il primo lotto fu fatto per la famiglia e gli amici.",
          imgDesc: "[Mani che versano un flusso di liquido limpido da una brocca di ceramica in un grande recipiente di vetro, infusione dorata già all'interno, un cucchiaio di legno nelle vicinanze]",
          img: "/images/craft-04-7.png"
        },
        {
          title: "L'Imbottigliamento",
          desc: "Prima dell'imbottigliamento, ogni lotto passa attraverso accurati controlli di qualità. Solo dopo aver soddisfatto gli standard il limoncello entra nella bottiglia — ognuna un piccolo vascello che porta il profumo e il calore di Sorrento sulle tavole di tutto il mondo.",
          imgDesc: "[Bottiglie riempite a mano da un rubinetto, liquido dorato che cattura la luce, una mano attenta che posiziona un'etichetta, una fila di bottiglie finite su uno scaffale di legno]",
          img: "/images/craft-04-8.png"
        }
      ]
    },
    credentials: {
      label: "LE NOSTRE CREDENZIALI",
      title: "Cosa garantisce l'autenticità",
      text: "Il Limoncello di Sorrento è fatto esclusivamente con Limoni di Sorrento I.G.P. — una denominazione protetta che garantisce provenienza e qualità. La produzione segue un metodo interamente artigianale: 100% naturale, senza coloranti artificiali, conservanti o stabilizzanti. La ricetta non è mai cambiata perché non ne ha mai avuto bisogno.",
      badges: [
        "LIMONI DI SORRENTO I.G.P.",
        "100% NATURALE",
        "METODO ARTIGIANALE"
      ]
    },
    values: {
      label: "RADICATI NELLA TERRA",
      title: "Il nostro modo di fare",
      text: "Il nostro impegno per la qualità è inseparabile dal nostro impegno per la terra, la comunità e il ritmo delle stagioni.",
      cards: [
        {
          title: "FILIERA CORTA",
          desc: "Dal giardino alla bottiglia nella stessa azienda agricola familiare. I limoni viaggiano per passi, non per chilometri. La freschezza è preservata, gli sprechi sono ridotti al minimo."
        },
        {
          title: "ZERO SPRECHI",
          desc: "Ogni parte del limone trova il suo scopo. Le bucce esaurite tornano alla terra come compost o vanno al recupero energetico. Non si scarta nulla."
        },
        {
          title: "RITMO STAGIONALE",
          desc: "Raccogliamo quando gli alberi sono pronti, non quando lo dice il calendario. Le fasi di riposo tra i raccolti proteggono i giardini per le generazioni future."
        },
        {
          title: "COMUNITÀ LOCALE",
          desc: "I nostri coltivatori sono i nostri vicini. Ci riforniamo esclusivamente da famiglie di agricoltori locali registrate I.G.P., sostenendo le tradizioni e i mezzi di sussistenza della penisola sorrentina."
        }
      ]
    }
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
      breadcrumb: "LIMONCELLO DI SORRENTO — PROCESSO ARTESANAL",
      title: "Onde cada limão é tocado à mão"
    },
    philosophy: {
      label: "NOSSA AZIENDA",
      title: "Feito à mão, como sempre foi",
      p1: "Cada garrafa de Limoncello di Sorrento carrega a paciência de uma tradição familiar que se recusa a ter pressa.",
      p2: "Nossa oficina fica a poucos passos dos limoeiros. Esta não é uma operação industrial — é um lugar onde a mesma família que cuida das árvores também descasca as frutas, vigia a infusão e enche as garrafas. Os métodos permanecem inalterados porque não há maneira melhor. A escala é pequena por escolha: cada limão é conhecido, cada lote é pessoal."
    },
    ingredient: {
      label: "NOSSO PRIMEIRO E PRINCIPAL INGREDIENTE",
      title: "O Ovale di Sorrento",
      p1: "A certificação I.G.P. garante o que os habitantes locais sabem há séculos: não existe limão como o Ovale di Sorrento. Presente na região desde o século XVI, evidenciado em pinturas e tratados botânicos, distingue-se pela sua forma oval média a grande, pela sua casca amarela extraordinariamente aromática e pela sua polpa suculenta e ácida. Estes não são limões comuns. Eles são o produto de uma terra específica, clima e séculos de cuidado.",
      p2: "Nossos limões são cultivados por famílias de agricultores locais que conhecem cada árvore. Eles são cultivados sob pagliarelle — pérgulas tradicionais de madeira de castanheiro cobertas com redes. Isso cria um microclima que retarda o processo de amadurecimento, dando à fruta tempo para desenvolver sua extraordinária profundidade de sabor. Cada limão passa por uma dupla seleção: primeiro nos pomares durante a colheita (a olho — forma, cor, perfeição), depois novamente na Azienda durante o descascamento (pelo toque — apenas as melhores cascas prosseguem)."
    },
    terroir: {
      label: "DO POMAR PARA A GARRAFA",
      title: "Um ofício enraizado na terra",
      text: "Na nossa Azienda, a distância entre o limoeiro e a mesa de trabalho é medida em passos, não em quilômetros. O Limoncello di Sorrento é feito onde os limões crescem — uma cadeia curta que preserva a frescura e mantém o ofício inseparável do solo que o alimenta."
    },
    quote: "Em algum lugar há sempre o amarelo de um limoeiro para nos lembrar a luz.",
    process: {
      label: "NOSSO PROCESSO",
      title: "A fabricação do Limoncello di Sorrento",
      steps: [
        {
          title: "O Cultivo",
          desc: "O Ovale di Sorrento cresce nas encostas ensolaradas da península, cuidado por famílias de agricultores que conhecem cada árvore pelo nome. Os galhos são enxertados à mão em porta-enxertos mais resistentes para fortalecer o pomar. Da flor à colheita, cada fruta leva de 11 a 14 meses de cuidados pacientes.",
          imgDesc: "[Pomar de limões em socalcos numa encosta costeira íngreme, névoa matinal, um agricultor a cuidar de uma árvore jovem à mão, estrutura de pérgula de madeira por cima]",
          img: "/images/craft-04-1.png"
        },
        {
          title: "Os Pomares",
          desc: "Os pomares are chamados de giardini — jardins. Sua característica definidora: as pagliarelle, pérgulas de madeira de castanheiro feitas à mão e cobertas com redes que abrigam as árvores do frio e do vento. Isso cria um microclima que retarda o amadurecimento, dando a cada limão tempo para desenvolver sua extraordinária profundidade de aroma.",
          imgDesc: "[Grande plano de uma pagliarella — pérgula de madeira de castanheiro com redes tecidas que lançam luz manchada sobre os limoeiros abaixo, solo vulcânico visível entre as raízes]",
          img: "/images/craft-04-2.png"
        },
        {
          title: "A Colheita",
          desc: "As árvores florescem até quatro vezes por ano. A fruta é colhida à mão entre fevereiro e outubro, seguindo o próprio ritmo da árvore. As diretrizes da I.G.P. exigem fases de descanso entre as colheitas — a terra dá generosamente, mas apenas quando tratada com respeito.",
          imgDesc: "[As mãos calejadas de um agricultor a alcançar a folhagem para soltar um limão maduro, um cesto de vime meio cheio ao lado, luz dourada da manhã]",
          img: "/images/craft-04-3.png"
        },
        {
          title: "A Seleção",
          desc: "Cada limão é inspecionado duas vezes. Primeiro no pomar: forma, cor, perfeição — apenas os melhores são colhidos. Depois, novamente na Azienda: cada fruta é manuseada, avaliada e selecionada ou deixada de lado. Esta dupla seleção, feita inteiramente a olho e à mão, garante que apenas limões excepcionais entrem no processo.",
          imgDesc: "[Limões espalhados sobre uma mesa de madeira rústica, mãos a virar um para inspecionar a sua forma e cor, alguns postos de lado num cesto separado]",
          img: "/images/craft-04-4.png"
        },
        {
          title: "O Descascamento",
          desc: "Nas 48 horas seguintes à colheita, os limões são lavados e descascados à mão. O ofício está na precisão: a casca amarela fina como papel — rica em óleos essenciais — deve ser separada de forma limpa da medula branca e amarga por baixo. Muito fundo, e a amargura entra. Muito raso, e o sabor se perde. Cada corte é uma decisão, tomada pelo tato.",
          imgDesc: "[Grande plano de mãos habilidosas a passar uma faca ao longo de um limão, levantando um cacho fino como papel de casca amarela brilhante da medula branca, uma pilha de cascas enroladas numa tábua de cortar]",
          img: "/images/craft-04-5.png"
        },
        {
          title: "A Infusão",
          desc: "As preciosas cascas são submersas em álcool de cereais puro e deixadas em infusão durante uma semana a uma temperatura constante e fresca. Lentamente, os óleos essenciais são libertados na bebida — a cor escurece, o aroma intensifica-se. Não há como apressar este passo. Demora exatamente o tempo que demora.",
          imgDesc: "[Um garrafão de vidro cheio de líquido dourado e cascas de limão flutuantes, pousado numa prateleira de pedra numa sala fresca, luz âmbar quente de uma pequena janela]",
          img: "/images/craft-04-6.png"
        },
        {
          title: "A Mistura",
          desc: "O álcool infundido é suavemente filtrado, depois misturado com água purificada fria e açúcar. Nada mais é adicionado: sem corantes artificiais, sem conservantes, sem estabilizadores. O Limoncello di Sorrento está agora completo — 100% natural, como era quando o primeiro lote foi feito para a família e amigos.",
          imgDesc: "[Mãos a derramar um fluxo de líquido claro de um jarro de cerâmica para um grande recipiente de vidro, infusão dourada já no interior, uma colher de pau por perto]",
          img: "/images/craft-04-7.png"
        },
        {
          title: "O Engarrafamento",
          desc: "Antes do engarrafamento, cada lote passa por cuidadosos controlos de qualidade. Só depois de cumprir o padrão é que o limoncello entra na garrafa — cada uma um pequeno recipiente que transporta o aroma e o calor de Sorrento para mesas em todo o mundo.",
          imgDesc: "[Garrafas a serem enchidas à mão a partir de uma torneira, líquido dourado a captar a luz, uma mão cuidadosa a colocar um rótulo, uma fila de garrafas acabadas numa prateleira de madeira]",
          img: "/images/craft-04-8.png"
        }
      ]
    },
    credentials: {
      label: "NOSSAS CREDENCIAIS",
      title: "O que garante a autenticidade",
      text: "O Limoncello di Sorrento é feito exclusivamente com Limões de Sorrento I.G.P. — uma denominação protegida que garante proveniência e qualidade. A produção segue um método inteiramente artesanal: 100% natural, sem corantes artificiais, conservantes ou estabilizadores. A receita nunca mudou porque nunca precisou.",
      badges: [
        "LIMÕES DE SORRENTO I.G.P.",
        "100% NATURAL",
        "MÉTODO ARTESANAL"
      ]
    },
    values: {
      label: "ENRAIZADO NA TERRA",
      title: "Nossa maneira de fazer",
      text: "Nosso compromisso com a qualidade é inseparável do nosso compromisso com a terra, a comunidade e o ritmo das estações.",
      cards: [
        {
          title: "CADEIA CURTA",
          desc: "Do pomar para a garrafa na mesma fazenda familiar. Os limões viajam passos, não quilômetros. A frescura é preservada, o desperdício é minimizado."
        },
        {
          title: "DESPERDÍCIO ZERO",
          desc: "Cada parte do limão encontra o seu propósito. As cascas gastas regressam à terra como composto ou vão para recuperação de energia. Nada é descartado."
        },
        {
          title: "RITMO SAZONAL",
          desc: "Colhemos quando as árvores estão prontas, não quando o calendário diz. As fases de descanso entre as colheitas protegem os pomares para as gerações futuras."
        },
        {
          title: "COMUNIDADE LOCAL",
          desc: "Nossos produtores são nossos vizinhos. Abastecemo-nos exclusivamente de famílias de agricultores locais registadas na I.G.P., sustentando as tradições e os meios de subsistência da península de Sorrento."
        }
      ]
    }
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
      if (ref.current) {
        observer.unobserve(ref.current);
      }
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

export default function TheCraft({ lang, setLang }: TheCraftProps) {
  const t = content[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  const nextStep = useCallback(() => setCurrentStep(prev => (prev + 1) % t.process.steps.length), [t.process.steps.length]);
  const prevStep = useCallback(() => setCurrentStep(prev => (prev - 1 + t.process.steps.length) % t.process.steps.length), [t.process.steps.length]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevStep();
      } else if (e.key === 'ArrowRight') {
        nextStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-rotate carousel every 8.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextStep();
    }, 8500);
    return () => clearInterval(interval);
  }, [nextStep]);

  // Touch handling for carousel
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (diff > 50) nextStep();
    if (diff < -50) prevStep();
    touchStartX.current = null;
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
      <section className="relative h-[40vh] md:h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#082B4F]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/hero-craft.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#082B4F]/80 z-10 mix-blend-multiply" />

        <div className="relative z-20 text-center px-6 flex flex-col items-center">
          <div 
            className="w-[120px] h-[2px] bg-[#F4D03F] mb-8 transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '400ms' }}
          />
          <h1 
            className="font-playfair text-[#F9F9F9] text-[clamp(2.5rem,6vw,4.5rem)] leading-tight mb-6 max-w-4xl transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '800ms' }}
          >
            {t.banner.title}
          </h1>
          <div 
            className="text-sm tracking-widest transition-all duration-800 ease-in-out"
            style={{ opacity: bannerLoaded ? 1 : 0, transform: bannerLoaded ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '1000ms' }}
          >
            <span className="text-[#F9F9F9] font-bold uppercase">{t.banner.breadcrumb}</span>
          </div>
        </div>
      </section>

      {/* 2. ARTISANAL PHILOSOPHY */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[55%] order-2 lg:order-1">
            <FadeIn direction="left" delay={0}>
              <span className="block text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">{t.philosophy.label}</span>
            </FadeIn>
            <FadeIn direction="left" delay={150}>
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F] leading-snug mb-8">{t.philosophy.title}</h2>
            </FadeIn>
            <FadeIn direction="left" delay={300}>
              <p className="text-lg md:text-xl leading-relaxed max-w-[60ch] mb-6 font-bold text-[#082B4F]">
                {t.philosophy.p1}
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={450}>
              <p className="text-lg md:text-xl leading-relaxed max-w-[60ch] text-[#082B4F]/80">
                {t.philosophy.p2}
              </p>
            </FadeIn>
          </div>
          <div className="w-full lg:w-[45%] order-1 lg:order-2">
            <FadeIn direction="right" delay={200}>
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#082B4F] relative border border-white/10">
                <img 
                  src="/images/craft-01.png" 
                  alt="The Azienda workshop" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. INGREDIENT DEEP-DIVE */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[58%] order-2 lg:order-2">
            <FadeIn direction="left" delay={0}>
              <span className="block text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">{t.ingredient.label}</span>
            </FadeIn>
            <FadeIn direction="left" delay={150}>
              <h2 className="font-playfair text-[clamp(1.5rem,4vw,2.75rem)] text-[#082B4F] leading-snug mb-8">{t.ingredient.title}</h2>
            </FadeIn>
            <FadeIn direction="left" delay={300}>
              <p className="text-base lg:text-lg leading-relaxed max-w-[60ch] mb-6 text-[#082B4F]/80" dangerouslySetInnerHTML={{ __html: t.ingredient.p1.replace('P.G.I.', '<span class="font-bold text-[#082B4F]">P.G.I.</span>').replace('I.G.P.', '<span class="font-bold text-[#082B4F]">I.G.P.</span>').replace('Ovale di Sorrento', '<span class="font-bold text-[#082B4F]">Ovale di Sorrento</span>') }} />
            </FadeIn>
            <FadeIn direction="left" delay={450}>
              <p className="text-base lg:text-lg leading-relaxed max-w-[60ch] text-[#082B4F]/80" dangerouslySetInnerHTML={{ __html: t.ingredient.p2.replace('pagliarelle', '<span class="font-bold italic text-[#082B4F]">pagliarelle</span>') }} />
            </FadeIn>
          </div>
          <div className="w-full lg:w-[42%] order-1 lg:order-1">
            <FadeIn direction="right" delay={200}>
              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#082B4F] relative border border-white/10">
                <img 
                  src="/images/craft-02.png" 
                  alt="Ovale di Sorrento lemon" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. TERROIR BRIDGE */}
      <section className="py-20 lg:py-28 bg-[#F9F9F9] px-6">
        <div className="max-w-[720px] mx-auto text-center">
          <FadeIn delay={0}>
            <span className="block text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">{t.terroir.label}</span>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F] mb-6">{t.terroir.title}</h2>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-base lg:text-lg leading-relaxed text-[#082B4F]/80" dangerouslySetInnerHTML={{ __html: t.terroir.text.replace('made where the lemons grow', '<span class="font-bold text-[#082B4F]">made where the lemons grow</span>').replace('fatto dove crescono i limoni', '<span class="font-bold text-[#082B4F]">fatto dove crescono i limoni</span>').replace('feito onde os limões crescem', '<span class="font-bold text-[#082B4F]">feito onde os limões crescem</span>') }} />
          </FadeIn>
        </div>
      </section>

      {/* 5. POETIC INTERLUDE */}
      <section className="py-24 lg:py-36 bg-[#ffffff] px-6 relative overflow-hidden">
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

        <div className="max-w-[700px] mx-auto flex flex-col items-center relative z-10">
          <FadeIn delay={0}>
            <div className="w-[60px] h-[2px] bg-[#F4D03F] mb-12" />
          </FadeIn>
          <FadeIn delay={400}>
            <p className="font-playfair italic text-[clamp(1.15rem,3vw,1.85rem)] text-[#082B4F] text-center leading-relaxed">
              {t.quote}
            </p>
          </FadeIn>
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

      {/* 6. 8-STEP PRODUCTION TIMELINE */}
      <section className="py-24 lg:py-36 bg-[#F9F9F9] px-6 border-y border-[#F4D03F]/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0}>
            <div className="text-center mb-12 lg:mb-16">
              <span className="block text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">{t.process.label}</span>
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F]">{t.process.title}</h2>
            </div>
          </FadeIn>

          <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {/* Carousel Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 lg:-left-16 z-10 hidden md:block">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="w-10 h-10 flex items-center justify-center text-[#F4D03F] disabled:opacity-30 transition-opacity"
              >
                <ChevronLeft size={32} strokeWidth={1} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 lg:-right-16 z-10 hidden md:block">
              <button 
                onClick={nextStep}
                disabled={currentStep === t.process.steps.length - 1}
                className="w-10 h-10 flex items-center justify-center text-[#F4D03F] disabled:opacity-30 transition-opacity"
              >
                <ChevronRight size={32} strokeWidth={1} />
              </button>
            </div>

            {/* Carousel Content */}
            <div className="relative min-h-[500px] lg:min-h-[400px]">
              {t.process.steps.map((step, idx) => {
                const isActive = idx === currentStep;
                const isPrev = idx < currentStep;
                
                return (
                  <div 
                    key={idx}
                    className={`absolute inset-0 w-full flex flex-col lg:flex-row gap-8 lg:gap-12 transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}
                    style={{
                      transform: isActive ? 'translateX(0)' : isPrev ? 'translateX(-40px)' : 'translateX(40px)'
                    }}
                  >
                    <div className="w-full lg:w-1/2">
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#082B4F] relative border border-white/10 flex items-center justify-center">
                        {step.img ? (
                          <img 
                            src={step.img} 
                            alt={step.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <p className="text-sm text-[#F9F9F9]/70 text-center p-8">{step.imgDesc}</p>
                        )}
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col justify-center relative">
                      <div className="absolute -top-6 lg:-top-10 left-0 font-playfair text-6xl lg:text-8xl text-[#F4D03F] opacity-15 pointer-events-none select-none">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <h3 className="font-playfair text-2xl lg:text-3xl text-[#082B4F] mb-4 relative z-10">{step.title}</h3>
                      <p className="text-base leading-relaxed text-[#082B4F]/80 max-w-[50ch] relative z-10">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex justify-between items-center mt-8 md:hidden">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="w-10 h-10 flex items-center justify-center text-[#F4D03F] disabled:opacity-30"
              >
                <ChevronLeft size={32} strokeWidth={1} />
              </button>
              <div className="font-mono text-sm text-[#082B4F]/50">
                {String(currentStep + 1).padStart(2, '0')} / {String(t.process.steps.length).padStart(2, '0')}
              </div>
              <button 
                onClick={nextStep}
                disabled={currentStep === t.process.steps.length - 1}
                className="w-10 h-10 flex items-center justify-center text-[#F4D03F] disabled:opacity-30"
              >
                <ChevronRight size={32} strokeWidth={1} />
              </button>
            </div>

            {/* Desktop Progress Indicators */}
            <div className="hidden md:flex flex-col items-center mt-16">
              <div className="font-mono text-sm text-[#082B4F]/50 mb-4">
                {String(currentStep + 1).padStart(2, '0')} / {String(t.process.steps.length).padStart(2, '0')}
              </div>
              <div className="flex gap-3">
                {t.process.steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'bg-[#F4D03F] scale-125' : 'bg-transparent border border-[#082B4F]/30'}`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CRAFT CREDENTIALS */}
      <section className="py-20 lg:py-28 bg-[#ffffff] px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn delay={0}>
            <span className="block text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">{t.credentials.label}</span>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F] mb-8">{t.credentials.title}</h2>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-base lg:text-lg leading-relaxed text-[#082B4F]/80 mb-16" dangerouslySetInnerHTML={{ __html: t.credentials.text.replace('P.G.I.-certified Sorrento Lemons', '<span class="font-bold text-[#082B4F]">P.G.I.-certified Sorrento Lemons</span>').replace('Limoni di Sorrento I.G.P.', '<span class="font-bold text-[#082B4F]">Limoni di Sorrento I.G.P.</span>').replace('100% natural', '<span class="font-bold text-[#082B4F]">100% natural</span>').replace('100% naturale', '<span class="font-bold text-[#082B4F]">100% naturale</span>') }} />
          </FadeIn>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12">
            {[
              { icon: <Droplet size={28} />, label: t.credentials.badges[0] },
              { icon: <Leaf size={28} />, label: t.credentials.badges[1] },
              { icon: <Hand size={28} />, label: t.credentials.badges[2] }
            ].map((badge, idx) => (
              <div key={idx}>
                <FadeIn delay={450 + (idx * 150)} direction="up">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mb-6">
                      {badge.icon}
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-widest text-[#082B4F] font-semibold max-w-[120px]">{badge.label}</span>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR VALUES */}
      <section className="py-20 lg:py-28 bg-[#F9F9F9] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-16 lg:mb-24">
            <FadeIn delay={0}>
              <span className="block text-xs tracking-[0.2em] uppercase text-[#F4D03F] mb-4 font-semibold">{t.values.label}</span>
            </FadeIn>
            <FadeIn delay={150}>
              <h2 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] text-[#082B4F] mb-6">{t.values.title}</h2>
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-base leading-relaxed text-[#082B4F]/80">
                {t.values.text}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { icon: <Leaf size={24} />, title: t.values.cards[0].title, desc: t.values.cards[0].desc },
              { icon: <Recycle size={24} />, title: t.values.cards[1].title, desc: t.values.cards[1].desc },
              { icon: <Sun size={24} />, title: t.values.cards[2].title, desc: t.values.cards[2].desc },
              { icon: <Users size={24} />, title: t.values.cards[3].title, desc: t.values.cards[3].desc }
            ].map((card, idx) => (
              <div key={idx}>
                <FadeIn delay={400 + (idx * 120)} direction="up">
                  <div className="flex flex-col items-center border-b border-[#082B4F]/5 pb-8 lg:border-none lg:pb-0">
                    <div className="w-14 h-14 rounded-full border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mb-6">
                      {card.icon}
                    </div>
                    <h3 className="text-xs tracking-widest uppercase text-[#082B4F] font-bold mb-4 text-center">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-[#082B4F]/70 text-center max-w-[260px]">
                      {card.desc}
                    </p>
                  </div>
                </FadeIn>
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
