/**
 * Lactus visual direction: Organic Modernism with contemporary African editorial references.
 * This page treats nature as a system, balances warmth with technical clarity, and uses
 * asymmetrical field-note compositions instead of generic centred landing-page blocks.
 */
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircuitBoard,
  Handshake,
  Leaf,
  Linkedin,
  Mail,
  Menu,
  Sprout,
  Sun,
  Users,
  X,
} from "lucide-react";

const STORAGE = "/manus-storage/";
const heroImage = `${STORAGE}lactus-hero-roots_abc84794.jpg`;
const lumiImage = `${STORAGE}lactus-lumi-product_0de7c59e.jpg`;
const communityImage = `${STORAGE}lactus-community_f52f747d.jpg`;
const contourImage = `${STORAGE}lactus-topography_de3fb0ce.jpg`;
const markImage = `${STORAGE}lactus-logo-mark_7cd71d3c.png`;
const fullLogoImage = `${STORAGE}lactus-logo-full_a42554be.png`;
const communityTeamImage = `${STORAGE}lactus-community-team_c2fec649.webp`;
const awardTeamImage = `${STORAGE}lactus-award-team_2bceef86.jpg`;
const awardPortraitImage = `${STORAGE}lactus-award-portrait_d9780e0e.jpg`;
const awardStageImage = `${STORAGE}lactus-award-stage_def66bca.jpg`;

const partners = [
  {
    title: "ONGs e desenvolvimento comunitário",
    text: "Organizações com projectos activos em comunidades rurais, periféricas ou vulneráveis.",
  },
  {
    title: "Administrações locais",
    text: "Entidades responsáveis por escolas, centros comunitários, jardins e caminhos de acesso.",
  },
  {
    title: "Cooperativas agrícolas",
    text: "Associações onde sensores de baixo consumo e iluminação de orientação podem gerar valor.",
  },
  {
    title: "Programas de cooperação",
    text: "Instituições focadas em acesso energético, sustentabilidade, inovação social e desenvolvimento rural.",
  },
];

const steps = [
  ["01", "Identificar", "A organização parceira identifica uma necessidade concreta e o local onde a solução pode gerar valor."],
  ["02", "Avaliar", "A equipa Lactus estuda o contexto ambiental e propõe uma instalação Lumi adaptada."],
  ["03", "Implementar", "A Lactus fornece, instala e testa o sistema em conjunto com a organização local."],
  ["04", "Acompanhar", "O desempenho, os custos e o impacto social são acompanhados ao longo do piloto."],
];

const team = [
  ["Anabelmo Feijó", "CEO e Fundador"],
  ["Israel Pedro", "CTO e Fundador"],
  ["Catarina Monteiro", "Gestora de Projectos e Fundadora"],
  ["João Tambue", "Desenvolvedor"],
  ["Leria Bumba", "Desenvolvedora"],
  ["Luísa Timóteo", "Desenvolvedora"],
  ["Paulo Sanguli", "Programador"],
  ["Lourenço Cardoso", "Programador"],
];

function FieldLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`field-label${light ? " field-label--light" : ""}`}>{children}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPartner, setOpenPartner] = useState<number | null>(null);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const close = () => setMenuOpen(false);
    links.forEach((link) => link.addEventListener("click", close));
    return () => links.forEach((link) => link.removeEventListener("click", close));
  }, []);

  return (
    <div className="lactus-site">
      <header className={`site-header${menuOpen ? " site-header--open" : ""}`}>
        <a className="brand" href="#top" aria-label="Lactus — início">
          <img className="brand-logo-full" src={fullLogoImage} alt="Lactus" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#lumi">Lumi</a>
          <a href="#parcerias">Parcerias</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#equipa">Equipa</a>
        </nav>
        <div className="header-actions">
          <a className="header-mail" href="mailto:hello@lactus.ao">hello@lactus.ao</a>
          <a className="button button--dark button--small" href="#contacto">Seja nosso parceiro <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <div className="mobile-nav">
          <a href="#lumi">Lumi</a><a href="#parcerias">Parcerias</a><a href="#sobre">Sobre nós</a><a href="#equipa">Equipa</a><a href="#contacto">Contacto</a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <FieldLabel>01 / ENERGIA QUE CRIA RAÍZES</FieldLabel>
            <h1>A energia pode <em>começar</em> no solo.</h1>
            <p className="hero-lead">Tecnologia angolana para levar soluções energéticas sustentáveis a comunidades onde a rede eléctrica ainda não chega.</p>
            <div className="hero-actions">
              <a className="button button--lime" href="#lumi">Conheça o Lumi <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#manifesto">Descobrir a Lactus <ArrowDown size={16} /></a>
            </div>
            <div className="hero-meta"><span><span className="dot" />Luanda, Angola</span><span>Bioenergia · Impacto local</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap"><img src={heroImage} alt="Raízes de uma planta em solo rico, com uma pequena luz" className="hero-photo" /><span className="photo-caption">Estudo Lumi · 2026</span></div>
            <div className="hero-note hero-note--top"><Sprout size={18} /><span>inovação<br /><strong>enraizada</strong></span></div>
            <div className="hero-note hero-note--bottom"><span className="note-number">5V</span><span>por planta<br /><strong>protótipo validado</strong></span></div>
            <span className="hero-orbit orbit-one" /><span className="hero-orbit orbit-two" />
          </div>
        </section>

        <div className="ticker" aria-label="Valores da Lactus"><div className="ticker-track"><span>Inovação</span><b>✦</b><span>Sustentabilidade</span><b>✦</b><span>Impacto social</span><b>✦</b><span>Tecnologia para todos</span><b>✦</b><span>Futuro mais verde</span><b>✦</b><span>Inovação</span><b>✦</b><span>Sustentabilidade</span></div></div>

        <section className="manifesto section-pad" id="manifesto">
          <div className="section-intro"><FieldLabel>02 / PORQUÊ EXISTIMOS</FieldLabel><p className="display-copy">Criamos soluções para problemas reais — com o contexto africano no centro de cada decisão.</p></div>
          <div className="manifesto-grid">
            <div className="manifesto-stat"><span className="stat-number">51,1<span>%</span></span><span className="stat-label">da população angolana tinha acesso à electricidade em 2023.</span><small>Fonte: Banco Mundial</small></div>
            <div className="manifesto-text"><p>Milhões de pessoas ainda vivem sem acesso regular à energia, sobretudo em comunidades rurais, periféricas e vulneráveis.</p><p>A falta de electricidade limita a iluminação de escolas e caminhos, a segurança depois do anoitecer e o acesso a sensores agrícolas e soluções tecnológicas de baixo consumo.</p><a className="text-link text-link--dark" href="#parcerias">Ver como respondemos <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="challenge-list"><div><Sun size={19} /><span>Iluminação de orientação</span></div><div><CircuitBoard size={19} /><span>Sensores agrícolas</span></div><div><Users size={19} /><span>Espaços comunitários</span></div><div><Leaf size={19} /><span>Menos dependência de combustível</span></div></div>
        </section>

        <section className="lumi-section section-pad" id="lumi">
          <div className="lumi-image-panel"><img src={lumiImage} alt="Protótipo Lumi integrado num vaso com planta e luz LED" /><div className="image-stamp"><span>LUMI</span><small>bioenergia de baixo consumo</small></div></div>
          <div className="lumi-copy"><FieldLabel light>03 / O PRIMEIRO PASSO</FieldLabel><h2>Conheça o <em>Lumi</em>.</h2><p className="section-lead section-lead--light">O Lumi é um vaso de plantas que gera energia.</p><p className="body-light">Dentro do vaso, as raízes das plantas interagem naturalmente com os microrganismos do solo para produzir electricidade. Sem prejudicar a planta, o sistema foi pensado para alimentar LEDs de sinalização e sensores ambientais — necessidades pequenas, mas decisivas em lugares onde as alternativas convencionais são caras ou pouco adequadas.</p><div className="lumi-specs"><div><strong>5V</strong><span>por planta</span></div><div><strong>4</strong><span>LEDs de alto brilho</span></div><div><strong>01</strong><span>protótipo em validação</span></div></div><a className="button button--outline-light" href="#pilotos">Ver o caminho do piloto <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="applications section-pad"><div className="applications-heading"><FieldLabel>04 / ONDE PODE AJUDAR</FieldLabel><h2>Pequena energia.<br /><em>Diferença concreta.</em></h2></div><div className="application-rows"><div className="application-row"><span>01</span><h3>Orientar caminhos</h3><p>Iluminação LED para jardins, escolas, centros comunitários e zonas rurais.</p><ArrowUpRight size={20} /></div><div className="application-row"><span>02</span><h3>Ler o ambiente</h3><p>Sensores de humidade, temperatura e outras variáveis agrícolas.</p><ArrowUpRight size={20} /></div><div className="application-row"><span>03</span><h3>Aprender fazendo</h3><p>Projectos educativos, ambientais e demonstrativos que aproximam ciência e comunidade.</p><ArrowUpRight size={20} /></div></div><p className="small-note">O Lumi não pretende substituir a rede eléctrica nem alimentar sistemas de grande escala. O seu foco actual é responder a necessidades energéticas específicas e de baixo consumo.</p></section>

        <section className="partnerships section-pad" id="parcerias"><div className="partnerships-media"><img src={communityTeamImage} alt="Membros da equipa Lactus num encontro de inovação e desenvolvimento comunitário" /><div className="media-tag">Lactus + parceiros locais</div></div><div className="partnerships-copy"><FieldLabel>05 / COMO TRABALHAMOS</FieldLabel><h2>Impacto não se instala sozinho.</h2><p className="section-lead">Trabalhamos num modelo B2B2C: a organização parceira conhece o território; a Lactus fornece a tecnologia e o acompanhamento técnico; a comunidade beneficia de uma solução sustentável.</p><div className="quote">“A organização parceira apoia a comunidade. A Lactus fornece a tecnologia.”</div><a className="button button--dark" href="#contacto">Construir um piloto <ArrowUpRight size={17} /></a></div></section>

        <section className="partner-types section-pad"><div className="partner-types-head"><FieldLabel>06 / PARA QUEM É</FieldLabel><h2>Parceiros com território,<br /><em>propósito e vontade.</em></h2><p>Procuramos organizações comprometidas com o desenvolvimento comunitário, sustentabilidade e acesso à energia.</p></div><div className="accordion-list">{partners.map((partner, index) => <div className={`accordion-item${openPartner === index ? " accordion-item--open" : ""}`} key={partner.title}><button onClick={() => setOpenPartner(openPartner === index ? null : index)} aria-expanded={openPartner === index}><span className="accordion-index">0{index + 1}</span><strong>{partner.title}</strong><ChevronDown size={20} /></button><div className="accordion-content"><p>{partner.text}</p></div></div>)}</div></section>

        <section className="process section-pad" id="pilotos"><div className="process-head"><FieldLabel light>07 / O PRÓXIMO PASSO</FieldLabel><h2>Um piloto é mais<br />do que uma demonstração.</h2><p>É uma prova de impacto, confiança e viabilidade para comunidades, parceiros, financiadores e investidores.</p></div><div className="steps">{steps.map(([number, title, text]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div><div className="pilot-callout"><span>Prioridade 2026</span><strong>Implementar 1–2 projectos-piloto.</strong><a href="#contacto">Falar sobre uma parceria <ArrowUpRight size={17} /></a></div></section>

        <section className="difference section-pad"><div className="difference-heading"><FieldLabel>08 / O QUE NOS MOVE</FieldLabel><h2>Inovação com<br /><em>os pés no chão.</em></h2></div><div className="difference-grid"><article><span>01</span><h3>Inspirada na natureza</h3><p>O Lumi explora a relação entre plantas, solo e microrganismos para gerar electricidade de baixo consumo.</p></article><article><span>02</span><h3>Feita para o contexto</h3><p>A Lactus nasce em Angola e responde a desafios reais de custo, infraestrutura e manutenção.</p></article><article><span>03</span><h3>Medida no terreno</h3><p>Cada piloto recolhe dados técnicos e sociais para transformar uma ideia numa solução responsável.</p></article><article><span>04</span><h3>Com visão de longo prazo</h3><p>O Lumi é o primeiro passo de uma investigação contínua sobre energia sustentável em África.</p></article></div></section>

        <section className="story section-pad" id="sobre"><div className="story-visual" style={{ backgroundImage: `url(${awardStageImage})` }}><div className="story-seal"><img src={markImage} alt="" /><span>Luanda<br />2025</span></div></div><div className="story-copy"><FieldLabel>09 / A NOSSA HISTÓRIA</FieldLabel><h2>Começámos por<br /><em>resolver o inesperado.</em></h2><p>Durante o NASA Space Apps Challenge Luanda 2025, a equipa Lactus conquistou o 1.º lugar com o Saúde+, uma plataforma de previsão de surtos de doenças baseada em dados climáticos e de saúde pública.</p><p>Em novembro de 2025, formalizámos a Lactus como startup e iniciámos o desenvolvimento do Lumi. Em 2026, o projecto recebeu o Prémio Tigra Nova Garra pelo seu potencial de inovação e impacto social.</p><div className="awards"><div><strong>1.º lugar</strong><span>NASA Space Apps<br />Challenge Luanda 2025</span></div><div><strong>2026</strong><span>Prémio Tigra Nova Garra<br />Potencial de impacto social</span></div></div></div></section>

        <section className="recognitions section-pad"><div className="recognitions-head"><FieldLabel>10 / REGISTOS DO CAMINHO</FieldLabel><h2>Reconhecimento que<br /><em>nos dá raízes.</em></h2><p>Alguns momentos que fazem parte da história da Lactus — vistos por inteiro, como aconteceram.</p></div><div className="recognitions-grid"><figure><div className="recognition-image"><img src={awardTeamImage} alt="Anabelmo Feijó e equipa a receber o prémio Nova Garra" /></div><figcaption><strong>Prémios Tigra Nova Garra</strong><span>Vitória na categoria Ciência & Tecnologia</span></figcaption></figure><figure><div className="recognition-image"><img src={awardPortraitImage} alt="Anabelmo Feijó com o troféu Nova Garra e o prémio de um milhão de kwanzas" /></div><figcaption><strong>Uma vitória colectiva</strong><span>Inovação com impacto social</span></figcaption></figure><figure><div className="recognition-image"><img src={awardStageImage} alt="Anabelmo Feijó a apresentar o projecto no palco com o troféu" /></div><figcaption><strong>Da ideia ao palco</strong><span>O momento de partilhar a visão</span></figcaption></figure></div></section>

        <section className="team section-pad" id="equipa"><div className="team-heading"><FieldLabel>11 / A EQUIPA</FieldLabel><h2>Jovem, multidisciplinar<br /><em>e comprometida.</em></h2><p>Uma equipa que combina tecnologia, investigação, gestão de projectos e vontade de criar soluções que ficam.</p></div><div className="team-list">{team.map(([name, role], index) => <div className="team-member" key={name}><span>0{index + 1}</span><div><strong>{name}</strong><small>{role}</small></div><ArrowUpRight size={17} /></div>)}</div></section>

        <section className="contact section-pad" id="contacto"><div className="contact-inner"><div><FieldLabel light>12 / VAMOS CONSTRUIR IMPACTO</FieldLabel><h2>Tem uma comunidade.<br /><em>Nós temos um próximo teste.</em></h2></div><div className="contact-side"><p>Se a sua organização trabalha com comunidades vulneráveis, desenvolvimento rural, educação, agricultura, sustentabilidade ou inovação social, podemos construir um projecto-piloto juntos.</p><a className="button button--lime" href="mailto:hello@lactus.ao?subject=Quero%20ser%20parceiro%20da%20Lactus">Seja nosso parceiro <ArrowUpRight size={17} /></a></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="brand brand--footer" href="#top"><img className="brand-logo-full" src={fullLogoImage} alt="Lactus" /></a><p>Energia sustentável para<br />comunidades com acesso limitado<br />à electricidade.</p><a className="footer-email" href="mailto:hello@lactus.ao"><Mail size={16} /> hello@lactus.ao</a></div><div className="footer-bottom"><span>© 2026 Lactus. Luanda, Angola.</span><div><a href="#sobre">Sobre nós</a><a href="#lumi">Lumi</a><a href="#contacto">Contacto</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a></div></div></footer>
    </div>
  );
}
