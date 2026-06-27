import fs from 'fs';

// Lê direto do brand.json — não depende mais de personas.json
const brand = JSON.parse(fs.readFileSync('./data/brand.json', 'utf-8'));

if (!brand.name || brand.name.trim() === '') {
  console.error('Erro: brand.json não foi configurado. Complete o onboarding primeiro em http://localhost:3000');
  process.exit(1);
}

// Mapeia os campos do brand para o formato esperado pelos slides
const persona = {
  name:   brand.name,
  handle: brand.handle || '@' + brand.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9.]/g, ''),
  avatar: brand.avatarPath || brand.logoPath || '',
  colors: {
    highlight1: brand.colors.accent,
  },
  fonts: {
    body: brand.fonts?.body || 'Inter',
  },
};

const bodyFont    = persona.fonts.body;
const accentColor = persona.colors.highlight1;

const verifiedIcon = `<svg class="verified" viewBox="0 0 24 24"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.827 2.766 2.057 3.415-.06.316-.095.64-.095.965 0 2.21 1.71 4 3.918 4 .505 0 .99-.1 1.436-.28.56.965 1.59 1.625 2.77 1.625 1.18 0 2.21-.66 2.77-1.625.446.18.93.28 1.436.28 2.21 0 3.918-1.79 3.918-4 0-.325-.035-.65-.095-.965 1.23-.65 2.057-1.955 2.057-3.415zm-11.838 5.1L6.152 13.09l1.458-1.39 3.053 3.203L16.2 9.07l1.396 1.458-6.934 7.072z"></path></svg>`;

const css = `<style>
  * { box-sizing: border-box; }
  .slide { width: 1080px; height: 1350px; background: #FFFFFF; font-family: '${bodyFont}', sans-serif; display: flex; flex-direction: column; padding: 100px 120px; }

  .tweet-header { display: flex; align-items: center; gap: 24px; margin-bottom: 50px; }
  .avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; }
  .user-info { display: flex; flex-direction: column; }
  .name-row { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 42px; color: #0F1419; }

  .verified { width: 36px; height: 36px; fill: ${accentColor}; }
  .handle { font-size: 34px; color: #536471; font-weight: 400; margin-top: 5px; }

  .tweet-body { font-size: 54px; color: #0F1419; line-height: 1.45; letter-spacing: -1.5px; }
  .tweet-body p { margin: 0 0 50px 0; }
  .highlight { color: ${accentColor}; font-weight: 600; }

  .attachment { width: 100%; border-radius: 40px; border: 2px solid #EFF3F4; margin-top: 20px; overflow: hidden; display: flex; flex-grow: 1; }
  .attachment img { width: 100%; height: 100%; object-fit: cover; }
</style>`;

const header = `
  <div class="tweet-header">
    ${persona.avatar ? `<img class="avatar" src="${persona.avatar}">` : ''}
    <div class="user-info">
      <div class="name-row">${persona.name} ${verifiedIcon}</div>
      <div class="handle">${persona.handle}</div>
    </div>
  </div>`;

const slides = [
  {
    notes: 'Slide 1 - Hook com imagem',
    html: `${css}
<div class="slide">
  ${header}
  <div class="tweet-body">
    <p>Escreva aqui o seu <span class="highlight">hook principal</span> com uma pergunta ou afirmação impactante. 🤔</p>
  </div>
  <div class="attachment">
    <!-- Substitua por uma imagem: <img src="/uploads/sua-imagem.jpg"> -->
    <div style="width:100%;height:100%;background:#f0f0f0;display:flex;align-items:center;justify-content:center;color:#aaa;font-size:28px;">Adicione uma imagem aqui</div>
  </div>
</div>`
  },
  {
    notes: 'Slide 2 - Ponto 1',
    html: `${css}
<div class="slide">
  ${header}
  <div class="tweet-body">
    <p>Antes de tudo: <span class="highlight">contextualize o tema</span> para o seu público.</p>
    <p>Desenvolva o primeiro ponto de forma clara e educativa.</p>
  </div>
</div>`
  },
  {
    notes: 'Slide 3 - Ponto 2',
    html: `${css}
<div class="slide">
  ${header}
  <div class="tweet-body">
    <p>Segundo ponto importante: aprofunde com <span class="highlight">dados ou exemplos concretos</span>.</p>
    <p>Lembre-se: seja didático e use linguagem acessível.</p>
  </div>
</div>`
  },
  {
    notes: 'Slide 4 - CTA',
    html: `${css}
<div class="slide">
  ${header}
  <div class="tweet-body">
    <p>Curtiu? <span class="highlight">Salva este post</span> para não esquecer e compartilha com quem precisa saber disso! 💙</p>
    <p>Me siga para mais conteúdo como esse todo dia.</p>
  </div>
</div>`
  }
];

async function main() {
  console.log(`✅ Criando carrossel Twitter para ${persona.name} (${persona.handle})...`);
  const createRes = await fetch('http://localhost:3000/api/carousels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: `Twitter: ${persona.name}` })
  });

  if (!createRes.ok) {
    console.error('❌ Falha ao criar carrossel. Verifique se o servidor está rodando em http://localhost:3000');
    return;
  }

  const carousel = await createRes.json();
  const carouselId = carousel.id;
  console.log('📋 Carrossel criado:', carouselId);

  for (let i = 0; i < slides.length; i++) {
    console.log(`🖼️  Criando slide ${i + 1}/${slides.length}`);
    await fetch(`http://localhost:3000/api/carousels/${carouselId}/slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slides[i])
    });
  }

  // Legenda com dados do CFM
  let captionText = '';
  if (brand.specialty) captionText += `${brand.name} | ${brand.specialty}\n`;
  if (brand.crm)       captionText += `CRM ${brand.crm}`;
  if (brand.rqe)       captionText += ` | RQE ${brand.rqe}`;

  await fetch(`http://localhost:3000/api/carousels/${carouselId}/caption`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      caption: captionText.trim(),
      hashtags: ['#NimbiaCarrossel', '#Twitter']
    })
  });

  console.log(`🎉 Pronto! Acesse http://localhost:3000/carousel/${carouselId}`);
}

main().catch(console.error);
