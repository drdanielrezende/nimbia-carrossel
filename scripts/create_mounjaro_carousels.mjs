import fs from 'fs';
import { randomUUID } from 'crypto';

const personas = JSON.parse(fs.readFileSync('./personas.json', 'utf-8'));
const persona = personas['drdaniel'];
const imgUrl = "https://pslsrwpdgsjapzjyygif.supabase.co/storage/v1/object/public/content-media/uploads/menopausa-plano-pratico-movimento-04.png";

const css = `<style>
  * { box-sizing: border-box; }
  .slide { width: 1080px; height: 1350px; position: relative; overflow: hidden; display: flex; flex-direction: column; font-family: 'Inter', sans-serif; }
  .bg-dark { background: linear-gradient(145deg, ${persona.colors.dark1} 0%, ${persona.colors.dark2} 100%); }
  .bg-light { background: #F8FAFC; }
  
  .glow-top-right { position: absolute; width: 800px; height: 800px; background: radial-gradient(circle, ${persona.colors.highlight1}33 0%, ${persona.colors.highlight1}00 70%); top: -300px; right: -300px; z-index: 1; border-radius: 50%; }
  
  .content { z-index: 10; padding: 120px 100px; display: flex; flex-direction: column; flex-grow: 1; justify-content: center; }
  
  .tag { align-self: flex-start; padding: 12px 24px; border-radius: 100px; font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 50px; }
  .tag-accent { background: ${persona.colors.highlight1}33; color: ${persona.colors.highlight1}; border: 1px solid ${persona.colors.highlight1}55; }
  .tag-dark { background: ${persona.colors.dark1}1A; color: ${persona.colors.dark1}; border: 1px solid ${persona.colors.dark1}33; }
  
  h1 { font-family: 'Poppins', sans-serif; font-size: 80px; font-weight: 800; color: #FFFFFF; line-height: 1.1; margin: 0 0 40px 0; }
  h1 span.highlight { color: ${persona.colors.highlight1}; }
  h2 { font-family: 'Poppins', sans-serif; font-size: 64px; font-weight: 700; color: ${persona.colors.dark1}; line-height: 1.15; margin: 0 0 40px 0; }
  h2.dark { color: #FFFFFF; }
  h2 span.highlight { color: ${persona.colors.highlight1}; }
  
  p { font-size: 38px; color: rgba(255,255,255,0.85); line-height: 1.6; font-weight: 400; margin: 0; }
  p.dark { color: #4A5568; }
  
  .glass-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); backdrop-filter: blur(20px); border-radius: 40px; padding: 60px; position: relative; overflow: hidden; }
  .glass-card-light { background: #FFFFFF; border: 1px solid ${persona.colors.dark1}1A; box-shadow: 0 30px 60px ${persona.colors.dark1}14; border-radius: 40px; padding: 60px; position: relative; overflow: hidden; }
  
  .img-container { margin-top: 40px; border-radius: 30px; overflow: hidden; border: 4px solid rgba(255,255,255,0.1); }
  .img-container img { width: 100%; height: auto; display: block; object-fit: cover; }
  
  .footer { height: 140px; padding: 0 100px; display: flex; justify-content: space-between; align-items: center; z-index: 10; border-top: 1px solid rgba(255,255,255,0.1); }
  .footer.dark { border-top: 1px solid ${persona.colors.dark1}1A; }
  .footer-logo { display: flex; align-items: center; gap: 20px; }
  .footer-logo img { height: 50px; border-radius: 5px; }
  .footer-name { font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 600; color: rgba(255,255,255,0.8); }
  .footer-name.dark { color: ${persona.colors.dark1}; }
  
  .watermark { position: absolute; font-family: 'Poppins', sans-serif; font-size: 500px; font-weight: 900; color: rgba(255,255,255,0.03); top: 50%; transform: translateY(-50%); right: -50px; z-index: 0; line-height: 0; letter-spacing: -20px; }
  .watermark-light { color: ${persona.colors.dark1}08; }
</style>`;

const footerDark = `<div class="footer"><div class="footer-logo"><img src="${persona.logo}" /><span class="footer-name">${persona.name}</span></div></div>`;
const footerLight = `<div class="footer dark"><div class="footer-logo dark"><img src="${persona.logo}" style="filter: brightness(0) sepia(1) hue-rotate(150deg) saturate(300%) contrast(100%);" /><span class="footer-name dark">${persona.name}</span></div></div>`;

function createSlide(type, index, tag, title, text, includeImage = false) {
  const isDark = type === 'dark';
  const bgClass = isDark ? 'bg-dark' : 'bg-light';
  const tagClass = isDark ? 'tag-accent' : 'tag-dark';
  const titleHtml = isDark ? `<h1>${title}</h1>` : `<h2>${title}</h2>`;
  const textHtml = isDark ? `<p>${text}</p>` : `<p class="dark">${text}</p>`;
  const cardClass = isDark ? 'glass-card' : 'glass-card-light';
  const watermarkClass = isDark ? 'watermark' : 'watermark watermark-light';
  const footer = isDark ? footerDark : footerLight;
  const num = index.toString().padStart(2, '0');
  
  const imgHtml = includeImage ? `<div class="img-container"><img src="${imgUrl}" /></div>` : '';

  return {
    id: randomUUID(),
    html: `${css}
<div class="slide ${bgClass}">
  ${isDark ? '<div class="glow-top-right"></div>' : ''}
  <div class="${watermarkClass}">${num}</div>
  <div class="content">
    <div class="tag ${tagClass}">${tag}</div>
    ${titleHtml}
    <div class="${cardClass}">
      ${textHtml}
    </div>
    ${imgHtml}
  </div>
  ${footer}
</div>`
  };
}

const c1 = {
  id: randomUUID(),
  name: "Mounjaro: Topo de Funil (Dor)",
  aspectRatio: "4:5",
  slides: [
    createSlide('dark', 1, 'Mounjaro e Dores', 'Começou a usar Mounjaro e as articulações <span class="highlight">começaram a doer?</span>', 'A dúvida e a frustração de quem iniciou o tratamento.', true),
    createSlide('light', 2, 'A Dúvida', 'É <span class="highlight">frustrante.</span>', 'Você finalmente encontra um tratamento que ajuda na balança, mas do nada o joelho, o quadril ou o ombro começam a doer. A primeira coisa que vem à mente é: "A culpa é do remédio, vou parar de tomar".'),
    createSlide('light', 3, 'A Realidade', 'Cronologia <span class="highlight">não é causa.</span>', 'Só porque a dor apareceu *depois* da caneta, não significa que ela *causou* a inflamação. O que acontece é que o seu corpo mudou muito rápido, e essa mudança revelou uma articulação que já estava vulnerável.'),
    createSlide('light', 4, 'Vitória de Hoje', 'Não pare o tratamento no <span class="highlight">impulso.</span>', 'Sua vitória hoje é organizar a informação: anote *quando* a dor aparece (ao acordar? depois de andar?) e leve isso ao seu médico antes de jogar a caneta fora.'),
    createSlide('dark', 5, 'Próximo Passo', 'Entenda o quadro <span class="highlight">completo.</span>', 'Existem outros fatores por trás dessa dor que você precisa investigar.<br><br>👉 <strong>Digite CANETA nos comentários</strong> e te envio no direct o meu artigo completo sobre Mounjaro e dor articular.')
  ],
  caption: "Não jogue a caneta fora antes de investigar a fundo! Existem outros fatores...\n\n👉 Comente CANETA para receber o artigo completo no direct.\n\n" + persona.footer
};

const c2 = {
  id: randomUUID(),
  name: "Mounjaro: Meio de Funil (Mecanismo)",
  aspectRatio: "4:5",
  slides: [
    createSlide('dark', 1, 'Emagrecimento', 'O perigo invisível de <span class="highlight">emagrecer rápido</span>', 'E por que o seu joelho sofre nesse processo.', true),
    createSlide('light', 2, 'O Mecanismo', 'A Falsa <span class="highlight">Segurança</span>', 'Na teoria, menos peso = menos carga no joelho. Certo? Nem sempre. Se você emagrece rápido usando Mounjaro e não bate a meta de proteína, você perde *músculo* junto com a gordura.'),
    createSlide('light', 3, 'A Sobrecarga', 'Músculo é <span class="highlight">amortecedor.</span>', 'Se você perde o seu amortecedor e, animado com a perda de peso, começa a caminhar mais, subir mais escadas ou mudar o treino... a conta chega direto na cartilagem e no tendão.'),
    createSlide('light', 4, 'Vitória de Hoje', 'Proteja sua <span class="highlight">articulação.</span>', 'A solução não é parar o GLP-1. É dar ao corpo o que ele precisa para sustentar a rotina. Ajuste sua ingestão de proteína hoje e inclua exercícios de fortalecimento.'),
    createSlide('dark', 5, 'Próximo Passo', 'Aprenda a <span class="highlight">proteger-se.</span>', 'Quer entender exatamente como equilibrar a perda de peso com a proteção das suas articulações?<br><br>👉 <strong>Digite PROTETOR nos comentários</strong> e te mando meu artigo detalhado.')
  ],
  caption: "Emagrecer rápido pode tirar o seu principal amortecedor: o músculo.\n\n👉 Comente PROTETOR para ler o artigo completo.\n\n" + persona.footer
};

const c3 = {
  id: randomUUID(),
  name: "Mounjaro: Twitter do Paciente",
  aspectRatio: "4:5",
  slides: [
    createSlide('dark', 1, 'Twitter Real', '"Emagreci 10kg, mas mal consigo <span class="highlight">subir uma escada</span>"', 'O corpo pedindo socorro através da dor.', true),
    createSlide('light', 2, 'O Twitter Clínico', 'Ouço isso toda <span class="highlight">semana:</span>', '"Doutor, eu tô mais leve, me sentindo bem, decidi voltar a caminhar... mas meu joelho apitou de um jeito que nunca apitou quando eu estava pesado. O remédio estragou minha articulação?"'),
    createSlide('light', 3, 'O Erro', 'A medicação não <span class="highlight">estragou.</span>', 'O que aconteceu foi que o seu corpo sedentário estava "escondendo" o problema. Ao se movimentar mais sem ter preparado a força das pernas, você acelerou o atrito.'),
    createSlide('light', 4, 'Vitória de Hoje', 'Seu corpo pede <span class="highlight">músculo.</span>', 'Essa dor não é um aviso para você parar e voltar para o sofá. Hoje, faça 5 minutos de exercícios de perna sentada (sem impacto). Avise ao joelho que o reforço está chegando.'),
    createSlide('dark', 5, 'Próximo Passo', 'Continue no <span class="highlight">caminho certo.</span>', 'Não deixe a dor te desanimar justo agora que você está no caminho certo.<br><br>👉 <strong>Digite Twitter nos comentários</strong> e te envio meu texto sobre como conduzir isso.')
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

// O JSON usa chaves, vamos colocar na primeira chave que existir, ou "default"
const firstKey = Object.keys(fileData)[0] || "default";
if(!fileData[firstKey]) fileData[firstKey] = [];

fileData[firstKey].push(c1);
fileData[firstKey].push(c2);
fileData[firstKey].push(c3);

fs.writeFileSync(jsonPath, JSON.stringify(fileData, null, 2));
console.log("3 Carousels successfully added!");
