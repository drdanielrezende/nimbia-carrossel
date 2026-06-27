import fs from 'fs';
import { randomUUID } from 'crypto';

const personas = JSON.parse(fs.readFileSync('./personas.json', 'utf-8'));
const persona = personas['drdaniel'];
const imgUrl = "https://pslsrwpdgsjapzjyygif.supabase.co/storage/v1/object/public/content-media/uploads/menopausa-plano-pratico-movimento-04.png";

const css = `<style>
  * { box-sizing: border-box; }
  .slide { width: 1080px; height: 1350px; background: #FFFFFF; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; padding: 100px 120px; }
  
  .tweet-header { display: flex; align-items: center; gap: 24px; margin-bottom: 50px; }
  .avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; }
  .user-info { display: flex; flex-direction: column; }
  .name-row { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 42px; color: #0F1419; }
  
  .verified { width: 36px; height: 36px; fill: ${persona.colors.dark1}; }
  .handle { font-size: 34px; color: #536471; font-weight: 400; margin-top: 5px; }
  
  .tweet-body { font-size: 54px; color: #0F1419; line-height: 1.45; letter-spacing: -1.5px; }
  .tweet-body p { margin: 0 0 50px 0; }
  .highlight { color: ${persona.colors.highlight1}; font-weight: 600; }
  
  .attachment { width: 100%; border-radius: 40px; border: 2px solid #EFF3F4; margin-top: 20px; overflow: hidden; display: flex; flex-grow: 1; }
  .attachment img { width: 100%; height: 100%; object-fit: cover; }
</style>`;

const verifiedIcon = `<svg class="verified" viewBox="0 0 24 24"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.827 2.766 2.057 3.415-.06.316-.095.64-.095.965 0 2.21 1.71 4 3.918 4 .505 0 .99-.1 1.436-.28.56.965 1.59 1.625 2.77 1.625 1.18 0 2.21-.66 2.77-1.625.446.18.93.28 1.436.28 2.21 0 3.918-1.79 3.918-4 0-.325-.035-.65-.095-.965 1.23-.65 2.057-1.955 2.057-3.415zm-11.838 5.1L6.152 13.09l1.458-1.39 3.053 3.203L16.2 9.07l1.396 1.458-6.934 7.072z"></path></svg>`;

const header = `
  <div class="tweet-header">
    <img class="avatar" src="${persona.avatar}">
    <div class="user-info">
      <div class="name-row">${persona.name} ${verifiedIcon}</div>
      <div class="handle">${persona.handle}</div>
    </div>
  </div>`;

function createSlide(index, content, includeImage = false) {
  const num = index.toString().padStart(2, '0');
  const imgHtml = includeImage ? `<div class="attachment"><img src="${imgUrl}" /></div>` : '';

  return {
    id: randomUUID(),
    html: `${css}
<div class="slide">
  ${header}
  <div class="tweet-body">
    ${content}
  </div>
  ${imgHtml}
</div>`,
    previousVersions: [],
    order: index - 1,
    notes: ""
  };
}

const c1 = {
  id: randomUUID(),
  name: "Mounjaro: Topo de Funil (Dor) - Twitter",
  aspectRatio: "4:5",
  isTemplate: false,
  tags: [],
  referenceImages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  slides: [
    createSlide(1, '<p>Começou a usar Mounjaro (ou similares) e as articulações <span class="highlight">começaram a doer?</span></p>', true),
    createSlide(2, '<p>É frustrante. Você finalmente encontra um tratamento que ajuda na balança, mas do nada o joelho ou o quadril começam a doer.</p><p>A primeira coisa que vem à mente: <span class="highlight">"A culpa é do remédio, vou parar."</span></p>'),
    createSlide(3, '<p>Mas cronologia não é causa.</p><p>Só porque a dor apareceu *depois* da caneta, não significa que ela *causou* a inflamação. O que acontece é que seu corpo mudou rápido, revelando uma articulação <span class="highlight">vulnerável.</span></p>'),
    createSlide(4, '<p>O maior erro é parar o tratamento no impulso e perder o controle metabólico.</p><p>Sua pequena vitória hoje: <span class="highlight">organize a informação.</span> Anote *quando* a dor aparece e leve ao médico antes de jogar a caneta fora.</p>'),
    createSlide(5, '<p>Existem outros fatores por trás dessa dor que você precisa investigar.</p><p>👉 <strong>Digite CANETA nos comentários</strong> e te envio no direct o meu artigo completo sobre Mounjaro e dor articular.</p>')
  ],
  caption: "Não jogue a caneta fora antes de investigar a fundo! Existem outros fatores...\n\n👉 Comente CANETA para receber o artigo completo no direct.\n\n" + persona.footer
};

const c2 = {
  id: randomUUID(),
  name: "Mounjaro: Meio de Funil (Mecanismo) - Twitter",
  aspectRatio: "4:5",
  isTemplate: false,
  tags: [],
  referenceImages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  slides: [
    createSlide(1, '<p>O <span class="highlight">perigo invisível</span> de emagrecer rápido (e por que o seu joelho sofre nesse processo).</p>', true),
    createSlide(2, '<p>Na teoria, menos peso = menos carga no joelho. Certo?</p><p><span class="highlight">Nem sempre.</span></p><p>Se você emagrece rápido e não bate a meta de proteína, você perde *músculo* junto com a gordura.</p>'),
    createSlide(3, '<p>Músculo é <span class="highlight">amortecedor.</span></p><p>Se você perde o seu amortecedor e, animado com o novo peso, começa a caminhar mais ou subir escadas... a conta chega direto na cartilagem.</p>'),
    createSlide(4, '<p>A solução não é parar o GLP-1. É dar ao corpo o que ele precisa para sustentar a nova rotina.</p><p>Ajuste sua proteína hoje e inclua exercícios de <span class="highlight">fortalecimento.</span> Fortalecer protege.</p>'),
    createSlide(5, '<p>Quer entender exatamente como equilibrar a perda de peso com a proteção das suas articulações?</p><p>👉 <strong>Digite PROTETOR nos comentários</strong> e te mando meu artigo.</p>')
  ],
  caption: "Emagrecer rápido pode tirar o seu principal amortecedor: o músculo.\n\n👉 Comente PROTETOR para ler o artigo completo.\n\n" + persona.footer
};

const c3 = {
  id: randomUUID(),
  name: "Mounjaro: Twitter do Paciente - Twitter",
  aspectRatio: "4:5",
  isTemplate: false,
  tags: [],
  referenceImages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  slides: [
    createSlide(1, '<p>"Emagreci 10kg com a medicação, mas agora <span class="highlight">mal consigo subir uma escada</span> de tanta dor no joelho."</p>', true),
    createSlide(2, '<p>Ouço isso toda semana no consultório:</p><p>"Doutor, tô mais leve, decidi voltar a caminhar... mas meu joelho apitou de um jeito que nunca apitou. O remédio estragou minha articulação?"</p>'),
    createSlide(3, '<p>A medicação <span class="highlight">não estragou</span> sua cartilagem.</p><p>O que aconteceu foi que o seu corpo sedentário estava "escondendo" o problema. Ao se movimentar mais sem ter preparado a força, você acelerou o atrito.</p>'),
    createSlide(4, '<p>Não volte para o sofá! Essa dor não é um aviso para você parar, é o seu corpo pedindo <span class="highlight">músculo.</span></p><p>Faça hoje 5 minutos de exercícios de perna sentada (sem impacto).</p>'),
    createSlide(5, '<p>Não deixe a dor te desanimar justo agora que você está no caminho certo.</p><p>👉 <strong>Digite Twitter nos comentários</strong> e te envio meu texto sobre como conduzir isso da forma certa.</p>')
  ],
  caption: "A ironia da dor articular após o emagrecimento tem uma explicação muito clara.\n\n👉 Comente Twitter para receber o guia no direct.\n\n" + persona.footer
};

// Ler e atualizar o JSON
const jsonPath = 'data/carousels.json';
let fileData = {};
try {
  fileData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch(e) {
  console.log("Creating new object");
}

const firstKey = Object.keys(fileData)[0] || "default";
if(!fileData[firstKey]) fileData[firstKey] = [];

fileData[firstKey].push(c1);
fileData[firstKey].push(c2);
fileData[firstKey].push(c3);

fs.writeFileSync(jsonPath, JSON.stringify(fileData, null, 2));
console.log("3 Twitter Carousels successfully added!");
