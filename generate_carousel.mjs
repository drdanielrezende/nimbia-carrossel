import fs from 'fs';

const slides = [
  {
    notes: 'Slide 1 - Hook',
    html: `<div style="width:1080px; height:1350px; background-color:#1B5366; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:80px; position:relative;">
  <h1 style="font-family:'Poppins', sans-serif; font-size:96px; font-weight:700; color:#F89F14; text-align:center; line-height:1.1; margin-bottom:40px;">4 MINUTOS<br>POR DIA<br>SALVAM SUA<br>MOBILIDADE?</h1>
  <p style="font-family:'Inter', sans-serif; font-size:32px; color:#FFFFFF; text-align:center;">Exercícios curtos e longevidade</p>
  <div style="position:absolute; bottom:80px; display:flex; align-items:center; gap:20px;">
    <img src="/uploads/0e3cf2d0-de11-4764-80b3-d2c48c1bc6bb.png" style="height:60px; filter:brightness(0) invert(1);" />
    <span style="font-family:'Inter', sans-serif; font-size:24px; color:#FFFFFF;">Arraste para o lado &rarr;</span>
  </div>
</div>`
  },
  {
    notes: 'Slide 2 - Setup',
    html: `<div style="width:1080px; height:1350px; background-color:#FFFFFF; display:flex; flex-direction:column; justify-content:center; padding:100px; position:relative;">
  <div style="width:120px; height:10px; background-color:#F89F14; margin-bottom:40px;"></div>
  <h2 style="font-family:'Poppins', sans-serif; font-size:64px; font-weight:700; color:#1B5366; line-height:1.2; margin-bottom:40px;">A MENTIRA DA ACADEMIA</h2>
  <p style="font-family:'Inter', sans-serif; font-size:36px; color:#333333; line-height:1.5;">Acreditar que idosos precisam passar horas na academia é um grande mito.</p>
  <p style="font-family:'Inter', sans-serif; font-size:36px; color:#333333; line-height:1.5; margin-top:30px;">O verdadeiro segredo para a longevidade e saúde está na <strong>consistência</strong>, não na duração extrema do exercício.</p>
  <img src="/uploads/0e3cf2d0-de11-4764-80b3-d2c48c1bc6bb.png" style="position:absolute; bottom:80px; right:100px; height:60px;" />
</div>`
  },
  {
    notes: 'Slide 3 - Value 1',
    html: `<div style="width:1080px; height:1350px; background-color:#8CACB6; display:flex; flex-direction:column; justify-content:center; padding:100px; position:relative;">
  <div style="background-color:#FFFFFF; padding:80px; border-radius:30px; box-shadow: 0 20px 40px rgba(27, 83, 102, 0.2);">
    <h2 style="font-family:'Poppins', sans-serif; font-size:56px; font-weight:700; color:#1B5366; line-height:1.2; margin-bottom:30px;">"SNACKS" DE EXERCÍCIO</h2>
    <p style="font-family:'Inter', sans-serif; font-size:32px; color:#1B5366; line-height:1.5;">Pequenas pílulas de movimento de 1 a 4 minutos ao longo do dia são poderosas.</p>
    <ul style="font-family:'Inter', sans-serif; font-size:32px; color:#1B5366; line-height:1.5; margin-top:30px; padding-left:40px;">
      <li style="margin-bottom:15px;">Quebram o sedentarismo</li>
      <li style="margin-bottom:15px;">Ativam a musculatura</li>
      <li>Melhoram a circulação sanguínea</li>
    </ul>
  </div>
  <img src="/uploads/0e3cf2d0-de11-4764-80b3-d2c48c1bc6bb.png" style="position:absolute; bottom:80px; right:100px; height:60px; filter:brightness(0) invert(1);" />
</div>`
  },
  {
    notes: 'Slide 4 - Value 2',
    html: `<div style="width:1080px; height:1350px; background-color:#FFFFFF; display:flex; flex-direction:column; justify-content:center; padding:100px; position:relative;">
  <div style="width:120px; height:10px; background-color:#F89F14; margin-bottom:40px;"></div>
  <h2 style="font-family:'Poppins', sans-serif; font-size:64px; font-weight:700; color:#1B5366; line-height:1.2; margin-bottom:40px;">PREVENINDO A SARCOPENIA</h2>
  <p style="font-family:'Inter', sans-serif; font-size:36px; color:#333333; line-height:1.5;">Com o envelhecimento, a perda de massa magra acelera consideravelmente.</p>
  <p style="font-family:'Inter', sans-serif; font-size:36px; color:#333333; line-height:1.5; margin-top:30px;">Ações simples (levantar da cadeira repetidas vezes ou fazer panturrilha na pia) ajudam a manter a força nas pernas de forma <strong>segura</strong> e eficaz.</p>
  <img src="/uploads/0e3cf2d0-de11-4764-80b3-d2c48c1bc6bb.png" style="position:absolute; bottom:80px; right:100px; height:60px;" />
</div>`
  },
  {
    notes: 'Slide 5 - Value 3',
    html: `<div style="width:1080px; height:1350px; background-color:#1B5366; display:flex; flex-direction:column; justify-content:center; padding:100px; position:relative;">
  <h2 style="font-family:'Poppins', sans-serif; font-size:64px; font-weight:700; color:#F89F14; line-height:1.2; margin-bottom:40px;">O MAIOR RISCO: QUEDAS</h2>
  <p style="font-family:'Inter', sans-serif; font-size:36px; color:#FFFFFF; line-height:1.5;">O maior risco para o idoso não é a falta de exercício intenso, mas sim as <strong>quedas</strong> acidentais.</p>
  <p style="font-family:'Inter', sans-serif; font-size:36px; color:#FFFFFF; line-height:1.5; margin-top:30px;">Ganhar força e equilíbrio através de 4 minutos diários melhora o tempo de reação, reduzindo drasticamente fraturas.</p>
  <img src="/uploads/0e3cf2d0-de11-4764-80b3-d2c48c1bc6bb.png" style="position:absolute; bottom:80px; right:100px; height:60px; filter:brightness(0) invert(1);" />
</div>`
  },
  {
    notes: 'Slide 6 - CTA',
    html: `<div style="width:1080px; height:1350px; background-color:#F89F14; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:80px; position:relative;">
  <h2 style="font-family:'Poppins', sans-serif; font-size:72px; font-weight:700; color:#1B5366; text-align:center; line-height:1.1; margin-bottom:40px;">4 MINUTOS<br>SÃO SUFICIENTES<br>PARA COMEÇAR.</h2>
  <p style="font-family:'Inter', sans-serif; font-size:32px; color:#1B5366; text-align:center; margin-bottom:60px;">Mude a rotina de quem você ama com pequenos hábitos.</p>
  <div style="display:flex; gap:30px; margin-bottom:60px;">
    <div style="background-color:#1B5366; color:#FFFFFF; padding:20px 40px; border-radius:50px; font-family:'Poppins', sans-serif; font-size:24px; font-weight:600;">SALVE ESTE POST</div>
    <div style="background-color:#FFFFFF; color:#1B5366; padding:20px 40px; border-radius:50px; font-family:'Poppins', sans-serif; font-size:24px; font-weight:600;">COMPARTILHE</div>
  </div>
  <div style="display:flex; align-items:center; gap:20px; margin-top:40px;">
    <img src="/uploads/0e3cf2d0-de11-4764-80b3-d2c48c1bc6bb.png" style="height:80px;" />
    <span style="font-family:'Poppins', sans-serif; font-size:32px; font-weight:700; color:#1B5366;">Dr. Daniel Rezende</span>
  </div>
</div>`
  }
];

async function main() {
  console.log("Creating carousel...");
  const createRes = await fetch('http://localhost:3000/api/carousels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '4 minutos por dia: Exercícios para Idosos' })
  });
  
  const carousel = await createRes.json();
  const carouselId = carousel.id;
  console.log("Created carousel:", carouselId);

  for (let i = 0; i < slides.length; i++) {
    console.log("Creating slide", i + 1);
    await fetch(`http://localhost:3000/api/carousels/${carouselId}/slides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slides[i])
    });
  }

  // Update caption
  await fetch(`http://localhost:3000/api/carousels/${carouselId}/caption`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      caption: "Acreditar que idosos precisam passar horas na academia é um grande mito. O verdadeiro segredo para a longevidade está na consistência! \n\nConhecidos como 'snacks de exercício', pílulas de movimento de 1 a 4 minutos ao longo do dia são poderosas para quebrar o sedentarismo e evitar a perda de massa magra (sarcopenia).\n\nLevantar e sentar da cadeira ou fazer panturrilha na pia ajudam a manter a força nas pernas. O maior risco para o idoso é a queda! Ganhar força e equilíbrio melhora o tempo de reação e reduz fraturas.\n\nVocê tem 4 minutos hoje? Salve este post e comece! 👇",
      hashtags: ["#Longevidade", "#SaúdeDoIdoso", "#ExercícioNaTerceiraIdade", "#Ortopedia", "#QualidadeDeVida", "#DrDanielRezende", "#EnvelhecimentoSaudável", "#MedicinaEsportiva"]
    })
  });

  console.log("Done!");
}

main().catch(console.error);
