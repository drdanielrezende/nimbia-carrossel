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
    dark1:      brand.colors.primary,
    dark2:      brand.colors.secondary || brand.colors.primary,
    highlight1: brand.colors.accent,
    highlight2: brand.colors.accent,
  },
  fonts: {
    heading: brand.fonts?.heading || 'Poppins',
    body:    brand.fonts?.body    || 'Inter',
  },
  cta:    brand.crm   ? `CRM ${brand.crm}${brand.rqe ? ' | RQE ' + brand.rqe : ''}` : '',
  footer: brand.specialty || '',
};

const headingFont = persona.fonts.heading;
const bodyFont    = persona.fonts.body;

const css = `<style>
  * { box-sizing: border-box; }
  .slide { width: 1080px; height: 1350px; position: relative; overflow: hidden; display: flex; flex-direction: column; font-family: '${bodyFont}', sans-serif; padding: 120px 100px 160px 100px; }

  /* Color Themes */
  .bg-dark {
    background: radial-gradient(circle at top right, ${persona.colors.dark1} 0%, #081114 100%);
    color: #FFFFFF;
  }
  .bg-dark .arrow-element { color: ${persona.colors.highlight1}; }
  .bg-dark .highlight-box { background: ${persona.colors.highlight1}; color: #FFFFFF; box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
  .bg-dark .header-text { color: rgba(255, 255, 255, 0.6); }
  .bg-dark .swipe-text { color: rgba(255, 255, 255, 0.4); }

  .bg-accent {
    background: radial-gradient(circle at bottom left, ${persona.colors.highlight1} 0%, ${persona.colors.highlight2 || '#b36b00'} 100%);
    color: #FFFFFF;
  }
  .bg-accent .arrow-element { color: ${persona.colors.dark1 || '#0F1419'}; }
  .bg-accent .highlight-box { background: ${persona.colors.dark1 || '#0F1419'}; color: #FFFFFF; box-shadow: 0 15px 35px rgba(0,0,0,0.2); }
  .bg-accent .header-text { color: rgba(255, 255, 255, 0.8); }
  .bg-accent .swipe-text { color: rgba(255, 255, 255, 0.6); }

  /* Header */
  .header { display: flex; justify-content: space-between; align-items: center; width: 100%; height: 60px; font-size: 26px; font-weight: 500; margin-bottom: 40px; }
  .header-left { display: flex; align-items: center; gap: 20px; }
  .avatar { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.2); }

  /* Typography */
  .step-number { font-family: '${headingFont}', sans-serif; font-size: 240px; font-weight: 800; line-height: 0.75; letter-spacing: -6px; margin: 0; opacity: 0.95; }
  .step-title { font-family: '${headingFont}', sans-serif; font-size: 80px; font-weight: 700; line-height: 1.1; margin: 0px 0 30px 0; letter-spacing: -2px; }

  .content-text { font-size: 44px; line-height: 1.4; font-weight: 400; padding-right: 20px; margin-top: 30px; letter-spacing: -1px; }
  .content-text strong { font-weight: 700; }

  /* Geometric Arrow Divider */
  .arrow-wrapper { display: flex; align-items: center; margin-left: -100px; margin-bottom: 25px; margin-top: 25px; }
  .arrow-line { flex-grow: 1; height: 18px; background: currentColor; }
  .arrow-head { width: 50px; height: 50px; color: currentColor; margin-left: -5px; }

  /* Layout boxes */
  .highlight-block { display: inline-block; padding: 18px 45px; font-size: 80px; font-family: '${headingFont}', sans-serif; font-weight: 800; margin-bottom: 12px; line-height: 1.1; border-radius: 8px; letter-spacing: -2px; }

  /* Footer */
  .footer { position: absolute; bottom: 130px; right: 100px; width: 100%; display: flex; justify-content: flex-end; align-items: center; z-index: 10; }
  .swipe-text { font-family: '${bodyFont}', sans-serif; font-size: 24px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 10px; }
  .swipe-text svg { width: 24px; height: 24px; }
</style>`;

const headerHtml = `
  <div class="header">
    <div class="header-left">
      ${persona.avatar ? `<img src="${persona.avatar}" class="avatar">` : ''}
      <span class="header-text">${persona.handle}</span>
    </div>
  </div>
`;

const footerHtml = `
  <div class="footer">
    <div class="swipe-text">
      Deslize
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>
  </div>
`;

const slides = [
  {
    notes: 'Slide 1 - Capa Escura',
    html: `${css}
<div class="slide bg-dark">
  ${headerHtml}

  <div style="display: flex; gap: 50px; height: 100%; align-items: center; margin-top: -60px;">
    <div style="flex: 1.1; z-index: 2;">
      <div style="margin-bottom: 40px;">
        <div class="highlight-block highlight-box" style="font-size: 90px; padding: 15px 30px;">Microblog</div><br>
        <div class="highlight-block highlight-box" style="font-size: 90px; padding: 15px 30px;">Template</div>
      </div>

      <div class="content-text" style="font-size: 65px; font-weight: 800; line-height: 1.15; margin-top: 0; color: #fff; text-shadow: 0 4px 15px rgba(0,0,0,0.4);">
        Escreva aqui o seu <span style="color: ${persona.colors.highlight1}">hook principal!</span>
      </div>
    </div>

    <div style="flex: 0.9; height: 750px; border-radius: 40px; overflow: hidden; border: 6px solid ${persona.colors.highlight1}; box-shadow: 0 20px 50px rgba(0,0,0,0.5); z-index: 1;">
      <!-- Adicione uma imagem aqui -->
      <div style="width: 100%; height: 100%; background: #333; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 30px;">Imagem</div>
    </div>
  </div>

  ${footerHtml}
</div>`
  },
  {
    notes: 'Slide 2 - Conteúdo 01',
    html: `${css}
<div class="slide bg-dark">
  ${headerHtml}
  <div class="step-number">01</div>
  <div class="step-title">Título do ponto</div>

  <div class="arrow-wrapper arrow-element" style="width: 55%;">
    <div class="arrow-line"></div>
    <svg class="arrow-head" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9z"/></svg>
  </div>

  <div class="content-text">
    Desenvolva aqui o primeiro ponto do seu conteúdo de forma clara e didática.
  </div>
  ${footerHtml}
</div>`
  },
  {
    notes: 'Slide 3 - Conteúdo 02',
    html: `${css}
<div class="slide bg-accent">
  ${headerHtml}
  <div class="step-number">02</div>
  <div class="step-title">Título do ponto</div>

  <div class="arrow-wrapper arrow-element" style="width: 65%;">
    <div class="arrow-line"></div>
    <svg class="arrow-head" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9z"/></svg>
  </div>

  <div class="content-text">
    Desenvolva aqui o segundo ponto. Use a alternância de cores para manter o ritmo visual.
  </div>
  ${footerHtml}
</div>`
  },
  {
    notes: 'Slide 4 - CTA',
    html: `${css}
<div class="slide bg-dark">
  ${headerHtml}
  <div class="step-number">03</div>
  <div class="step-title">CTA</div>

  <div class="arrow-wrapper arrow-element" style="width: 45%;">
    <div class="arrow-line"></div>
    <svg class="arrow-head" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9z"/></svg>
  </div>

  <div style="margin-top: 60px;">
    <div class="highlight-block highlight-box">Curtir</div><br>
    <div class="highlight-block highlight-box">Salvar</div><br>
    <div class="highlight-block highlight-box">Compartilhar</div>
  </div>
</div>`
  }
];

async function main() {
  console.log(`✅ Criando carrossel Microblog para ${persona.name} (${persona.handle})...`);
  const createRes = await fetch('http://localhost:3000/api/carousels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: `Microblog: ${persona.name}` })
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
  let captionText = ``;
  if (brand.specialty) captionText += `${brand.name} | ${brand.specialty}\n`;
  if (brand.crm)       captionText += `CRM ${brand.crm}`;
  if (brand.rqe)       captionText += ` | RQE ${brand.rqe}`;

  await fetch(`http://localhost:3000/api/carousels/${carouselId}/caption`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      caption: captionText.trim(),
      hashtags: ['#NimbiaCarrossel', '#Microblog']
    })
  });

  console.log(`🎉 Pronto! Acesse http://localhost:3000/carousel/${carouselId}`);
}

main().catch(console.error);
