/**
 * Lactus visual direction: Organic Modernism with contemporary African editorial references.
 * This compact landing page uses a short, asymmetric conversion journey: context, Lumi,
 * proof and partnership. Every section earns its place; secondary detail is intentionally quiet.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowDown,
  ArrowUpRight,
  CircuitBoard,
  ChevronDown,
  Handshake,
  Leaf,
  Linkedin,
  Mail,
  Menu,
  Sprout,
  X,
} from "lucide-react";

const STORAGE = "/manus-storage/";
const contourImage = `${STORAGE}lactus-topography_de3fb0ce.jpg`;
const markImage = `${STORAGE}lactus-logo-mark_7cd71d3c.png`;
const fullLogoImage = `${STORAGE}lactus-logo-full_a42554be.png`;
const communityTeamImage = `${STORAGE}lactus-community-team_c2fec649.webp`;
const awardTeamImage = `${STORAGE}lactus-award-team_2bceef86.jpg`;
const awardPortraitImage = `${STORAGE}lactus-award-portrait_d9780e0e.jpg`;

const moments = [
  {
    image: "/manus-storage/lumi-working-prototype_8f300466.jpeg",
    alt: "Equipa a trabalhar no protótipo Lumi sobre uma mesa",
    label: "Desenvolvimento",
  },
  {
    image: "/manus-storage/lumi-exhibition_626e7ff6.jpeg",
    alt: "Protótipo Lumi apresentado numa exposição",
    label: "Em exposição",
  },
  {
    image: "/manus-storage/lumi-development_c859ad61.jpeg",
    alt: "Equipa a testar o vaso Lumi com instrumentos electrónicos",
    label: "Em teste",
  },
];

const faqs = [
  {
    question: "O que é a Lactus?",
    answer: "A Lactus é uma startup angolana de tecnologia e energia sustentável. Desenvolvemos, testamos e implementamos soluções para desafios de acesso à electricidade em comunidades, zonas rurais e espaços onde a rede é limitada, inexistente ou pouco fiável.",
  },
  {
    question: "O que é o Lumi?",
    answer: "O Lumi é a primeira solução desenvolvida pela Lactus. É uma tecnologia de bioenergia que utiliza a interacção natural entre plantas, solo e microrganismos para gerar electricidade para aplicações de baixo consumo.",
  },
  {
    question: "O Lumi substitui a rede eléctrica?",
    answer: <>Não. O Lumi não foi concebido para substituir a rede eléctrica, painéis solares ou geradores em aplicações de grande escala.<br /><br />Nesta fase, é desenvolvido para necessidades específicas de baixo consumo, como sinalização LED, iluminação de orientação e sensores agrícolas ou ambientais.</>,
  },
  {
    question: "A Lactus trabalha apenas com bioenergia?",
    answer: "Não. A bioenergia, através do Lumi, é o nosso ponto de partida. A visão da Lactus é desenvolver diferentes soluções de energia sustentável, acessíveis e adaptadas à realidade africana.",
  },
  {
    question: "Como funciona uma parceria com a Lactus?",
    answer: <>A organização parceira identifica uma necessidade concreta numa comunidade ou espaço. A Lactus avalia o local, desenvolve ou adapta a solução, realiza a implementação e acompanha o desempenho técnico do projecto.<br /><br />Os projectos podem incluir instalação, manutenção, monitorização e medição de impacto.</>,
  },
  {
    question: "O Lumi já está disponível?",
    answer: "O Lumi encontra-se em fase de validação e preparação para projectos-piloto em condições reais. Procuramos organizações parceiras interessadas em implementar, testar e acompanhar a solução de forma responsável e orientada por dados.",
  },
];

function FieldLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`field-label${light ? " field-label--light" : ""}`}>{children}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a href="#servicos">Serviços</a>
          <a href="#faq">FAQ</a>
          <Link href="/momentos">Momentos</Link>
          <a href="#parcerias">Parcerias</a>
          <a href="#sobre">Sobre nós</a>
        </nav>
        <div className="header-actions">
          <a className="header-mail" href="mailto:startuplactus@gmail.com">startuplactus@gmail.com</a>
          <a className="button button--dark button--small" href="#contacto">Seja nosso parceiro <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <div className="mobile-nav">
          <a href="#lumi">Lumi</a>
          <a href="#servicos">Serviços</a>
          <a href="#faq">FAQ</a>
          <Link href="/momentos" onClick={() => setMenuOpen(false)}>Momentos</Link>
          <a href="#parcerias">Parcerias</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contacto">Contacto</a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <FieldLabel>01 / ENERGIA QUE CRIA RAÍZES</FieldLabel>
            <h1>A energia pode <em>começar</em> no solo.</h1>
            <p className="hero-lead">Tecnologia angolana para desenvolver soluções de energia sustentável para comunidades e espaços onde a electricidade é limitada, inexistente ou pouco fiável.</p>
            <p className="hero-support">Começamos com o Lumi, a nossa primeira solução de bioenergia para aplicações de baixo consumo.</p>
            <div className="hero-actions">
              <a className="button button--lime" href="#lumi">Conheça o Lumi <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#parcerias">Criar um piloto <ArrowDown size={16} /></a>
            </div>
            <div className="hero-meta"><span><span className="dot" />Luanda, Angola</span><span>Bioenergia · Impacto local</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap hero-photo-wrap--founders"><img src={awardTeamImage} alt="Israel Pedro, Catarina Monteiro e Anabelmo Feijó, fundadores da Lactus, juntos durante os Prémios Nova Garra" className="hero-photo hero-photo--founders" /><span className="photo-caption"><strong>Israel Pedro · Catarina Monteiro · Anabelmo Feijó</strong><small>Fundadores Lactus · Luanda</small></span></div>
            <div className="hero-note hero-note--top"><Sprout size={18} /><span>uma ideia<br /><strong>em equipa</strong></span></div>
            <span className="hero-orbit orbit-one" /><span className="hero-orbit orbit-two" />
          </div>
        </section>

        <section className="who-section section-pad" id="sobre">
          <div className="who-heading"><FieldLabel>02 / QUEM SOMOS</FieldLabel><h2>Energia sustentável<br /><em>para desafios reais.</em></h2></div>
          <div className="who-story"><p className="who-lead">A Lactus é uma startup angolana de tecnologia e energia sustentável. Desenvolvemos soluções inovadoras para responder aos desafios de acesso à electricidade em comunidades vulneráveis, zonas rurais e espaços onde a rede eléctrica é limitada, inexistente ou pouco fiável.</p><p className="who-problem"><strong>O problema é directo:</strong> em Angola, apenas 51,1% da população tinha acesso à electricidade em 2023. Onde a rede é limitada, inexistente ou pouco fiável, a falta de energia regular limita a iluminação, a segurança, os sensores agrícolas e pequenos projectos comunitários.<small className="source-credit">Fonte: Banco Mundial, 2023.</small></p><p>Depois de vencer o NASA Space Apps Challenge Luanda 2025 com o projecto Saúde+, Anabelmo Feijó, Israel Pedro e Catarina Monteiro formalizaram a Lactus em novembro de 2025 e iniciaram o desenvolvimento do Lumi. Em 2026, o projecto recebeu o Prémio Tigra Nova Garra pelo seu potencial de inovação e impacto social. O Lumi é a nossa primeira solução, mas a nossa ambição é desenvolver um portefólio de tecnologias energéticas sustentáveis, acessíveis e adequadas à realidade africana.</p><div className="who-signals" aria-label="Princípios de energia sustentável da Lactus"><div><Sprout size={21} /><strong>Solo vivo</strong><span>Raízes e microrganismos no ponto de partida.</span></div><div><CircuitBoard size={21} /><strong>Baixo consumo</strong><span>Energia para aplicações específicas.</span></div><div><Leaf size={21} /><strong>Contexto local</strong><span>Desenhada para pessoas e lugares reais.</span></div></div></div>
        </section>

        <div className="ticker" aria-label="Valores da Lactus"><div className="ticker-track"><span>Inovação local</span><b>✦</b><span>Bioenergia</span><b>✦</b><span>Impacto social</span><b>✦</b><span>Parcerias com propósito</span><b>✦</b><span>Inovação local</span></div></div>

        <section className="lumi-section section-pad" id="lumi">
          <div className="lumi-media"><div className="lumi-image-panel"><img src="/manus-storage/lumi-exhibition-detail_f6f88876.jpeg" alt="Protótipo Lumi num vaso de plantas ligado a uma luz LED durante uma exposição" /><div className="image-stamp"><span>LUMI</span><small>vaso de plantas que gera energia</small></div></div></div>
          <div className="lumi-copy"><FieldLabel light>03 / A NOSSA PRIMEIRA SOLUÇÃO</FieldLabel><h2>Conheça o <em>Lumi</em>.</h2><p className="section-lead section-lead--light">O Lumi é a primeira solução desenvolvida pela Lactus: um sistema de bioenergia inspirado na relação entre plantas, solo e microrganismos.</p><p className="body-light">Na sua forma actual, o Lumi funciona através de um vaso de plantas que gera energia, pensado para alimentar sinais LED e sensores ambientais, sem prejudicar a planta.</p><div className="lumi-uses"><span><Leaf size={16} /> Iluminar percursos</span><span><CircuitBoard size={16} /> Ler o ambiente</span></div><a className="button button--outline-light" href="#parcerias">Levar o Lumi ao terreno <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="compact-moments section-pad" aria-labelledby="momentos-lumi">
          <div className="compact-moments-head"><FieldLabel>04 / MOMENTOS LUMI</FieldLabel><h2 id="momentos-lumi">Do protótipo<br /><em>ao mundo real.</em></h2><p>Investigar, testar e partilhar: três momentos de uma solução que ainda está a crescer.</p></div>
          <div className="moments-strip">{moments.map((moment, index) => <figure key={moment.label}><img src={moment.image} alt={moment.alt} /><figcaption><span>0{index + 1}</span>{moment.label}</figcaption></figure>)}</div>
        </section>

        <section className="services-section section-pad" id="servicos" aria-labelledby="servicos-titulo">
          <div className="services-heading"><FieldLabel>05 / SERVIÇOS LACTUS</FieldLabel><h2 id="servicos-titulo">Energia que<br /><em>chega ao terreno.</em></h2><p>Da identificação do desafio à implementação e acompanhamento, trabalhamos com organizações para desenvolver soluções energéticas sustentáveis, adequadas a cada contexto.</p><span className="services-field-note"><Sprout size={15} aria-hidden="true" />Planeamento · implementação · acompanhamento · aprendizagem</span></div>
          <div className="services-list">
            <article className="service-row"><span>01</span><CircuitBoard size={20} aria-hidden="true" /><div><h3>Desenvolvimento de soluções energéticas personalizadas</h3><p>Criamos e adaptamos soluções tecnológicas de energia às necessidades de comunidades, organizações e projectos em locais com acesso limitado, instável ou inexistente à electricidade.</p></div></article>
            <article className="service-row"><span>02</span><Leaf size={20} aria-hidden="true" /><div><h3>Implementação de sistemas energéticos</h3><p>Planeamos, fornecemos e instalamos soluções para iluminação, sinalização, monitorização e outras aplicações de baixo consumo.</p></div></article>
            <article className="service-row"><span>03</span><Sprout size={20} aria-hidden="true" /><div><h3>Monitorização e manutenção técnica</h3><p>Acompanhamos o desempenho das soluções, realizamos manutenção e recolhemos dados para reforçar a sua fiabilidade, aprendizagem e continuidade.</p></div></article>
            <article className="service-row"><span>04</span><Handshake size={20} aria-hidden="true" /><div><h3>Projectos-piloto, investigação e inovação</h3><p>Desenvolvemos pilotos com organizações parceiras para testar, validar e melhorar tecnologias em condições reais, medindo impacto técnico, social e ambiental.</p></div></article>
          </div>
        </section>

        <section className="partner-journey section-pad" id="parcerias">
          <div className="partner-journey-media"><img src={communityTeamImage} alt="Membros da equipa Lactus num encontro de inovação e desenvolvimento comunitário" /><span>Lactus + parceiros locais</span></div>
          <div className="partner-journey-copy"><FieldLabel>06 / FAZEMOS COM QUEM CONHECE O TERRITÓRIO</FieldLabel><h2>Um piloto começa<br /><em>com uma conversa.</em></h2><p className="section-lead">A organização parceira conhece a comunidade. A Lactus leva a tecnologia e o acompanhamento técnico.</p><div className="partner-route"><div><span>01</span><strong>Mapear</strong><p>Identificamos uma necessidade e o melhor local.</p></div><div><span>02</span><strong>Instalar</strong><p>Adaptamos e instalamos a solução mais adequada ao contexto, acompanhando o início da implementação.</p></div><div><span>03</span><strong>Medir</strong><p>Aprendemos com dados técnicos e impacto percebido.</p></div></div><a className="button button--dark" href="#contacto"><Handshake size={16} /> Construir um piloto</a></div>
        </section>

        <section className="compact-proof section-pad">
          <div className="proof-copy"><FieldLabel>07 / UMA IDEIA COM CAMINHO</FieldLabel><h2>Da curiosidade<br /><em>à credibilidade.</em></h2><p>A Lactus nasceu depois de a equipa vencer o NASA Space Apps Challenge Luanda 2025. Em 2026, o projecto recebeu o Prémio Tigra Nova Garra pelo potencial de impacto social.</p><div className="proof-awards"><span><strong>1.º lugar</strong>NASA Space Apps Challenge<br />Luanda 2025</span><span><strong>2026</strong>Prémio Tigra Nova Garra<br />Impacto social</span></div></div>
          <div className="proof-image"><img className="proof-image-main" src={awardPortraitImage} alt="Anabelmo Feijó com o troféu Nova Garra" /><img className="proof-image-inset" src={awardTeamImage} alt="Anabelmo Feijó com duas pessoas da equipa Lactus durante os Prémios Nova Garra" /><div><img src={markImage} alt="" />Equipa Lactus<br />Luanda, Angola</div></div>
        </section>

        <section className="faq-section section-pad" id="faq" aria-labelledby="faq-titulo">
          <div className="faq-heading"><FieldLabel>08 / PERGUNTAS FREQUENTES</FieldLabel><h2 id="faq-titulo">Dúvidas claras,<br /><em>parcerias melhores.</em></h2><p>Algumas respostas para organizações que querem explorar um projecto-piloto ou conhecer melhor o trabalho da Lactus.</p></div>
          <div className="faq-list">{faqs.map((faq, index) => <details className="faq-item" key={faq.question}><summary><span>0{index + 1}</span><strong>{faq.question}</strong><ChevronDown size={19} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className="contact section-pad" id="contacto"><div className="contact-inner"><div><FieldLabel light>09 / VAMOS CONSTRUIR IMPACTO</FieldLabel><h2>Onde a rede não chega,<br /><em>a Lactus chega.</em></h2></div><div className="contact-side"><p>Se a sua organização trabalha com desenvolvimento rural, educação, agricultura, sustentabilidade ou inovação social, podemos desenhar e implementar um projecto-piloto adequado ao seu contexto.</p><div className="contact-actions"><a className="button button--lime" href="mailto:startuplactus@gmail.com?subject=Quero%20ser%20parceiro%20da%20Lactus">Seja nosso parceiro <ArrowUpRight size={17} /></a><a className="text-link text-link--light" href="mailto:startuplactus@gmail.com">Fale connosco <Mail size={16} /></a></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="brand brand--footer" href="#top"><img className="brand-logo-full" src={fullLogoImage} alt="Lactus" /></a><p>Energia sustentável para<br />comunidades com acesso limitado<br />à electricidade.</p><a className="footer-email" href="mailto:startuplactus@gmail.com"><Mail size={16} /> startuplactus@gmail.com</a></div><div className="footer-bottom"><span>© 2026 Lactus. Luanda, Angola.</span><div><a href="#sobre">Sobre nós</a><a href="#lumi">Lumi</a><a href="#servicos">Serviços</a><a href="#faq">FAQ</a><Link href="/momentos">Momentos</Link><a href="#contacto">Contacto</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a></div></div></footer>
    </div>
  );
}
