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
          <Link href="/momentos">Momentos</Link>
          <a href="#parcerias">Parcerias</a>
          <a href="#sobre">Sobre nós</a>
        </nav>
        <div className="header-actions">
          <a className="header-mail" href="mailto:hello@lactus.ao">hello@lactus.ao</a>
          <a className="button button--dark button--small" href="#contacto">Seja nosso parceiro <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <div className="mobile-nav">
          <a href="#lumi">Lumi</a>
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
            <p className="hero-lead">Tecnologia angolana para levar soluções energéticas sustentáveis a comunidades onde a rede eléctrica ainda não chega.</p>
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
          <div className="who-story"><p className="who-lead">A Lactus é uma startup angolana de tecnologia e energia sustentável. Desenvolvemos soluções inovadoras para responder aos desafios de acesso à electricidade em comunidades vulneráveis, zonas rurais e espaços onde a rede eléctrica é limitada, inexistente ou pouco fiável.</p><p className="who-problem"><strong>O problema é directo:</strong> em Angola, apenas 51,1% da população tinha acesso à electricidade em 2023. Onde a rede é limitada, inexistente ou pouco fiável, a falta de energia regular limita a iluminação, a segurança, os sensores agrícolas e pequenos projectos comunitários.</p><p>Depois de vencer o NASA Space Apps Challenge Luanda 2025 com o projecto Saúde+, Anabelmo Feijó, Israel Pedro e Catarina Monteiro formalizaram a Lactus em novembro de 2025 e iniciaram o desenvolvimento do Lumi. Em 2026, o projecto recebeu o Prémio Tigra Nova Garra pelo seu potencial de inovação e impacto social.</p><div className="who-signals" aria-label="Princípios de energia sustentável da Lactus"><div><Sprout size={21} /><strong>Solo vivo</strong><span>Raízes e microrganismos no ponto de partida.</span></div><div><CircuitBoard size={21} /><strong>Baixo consumo</strong><span>Energia para aplicações específicas.</span></div><div><Leaf size={21} /><strong>Contexto local</strong><span>Desenhada para pessoas e lugares reais.</span></div></div></div>
        </section>

        <div className="ticker" aria-label="Valores da Lactus"><div className="ticker-track"><span>Inovação local</span><b>✦</b><span>Bioenergia</span><b>✦</b><span>Impacto social</span><b>✦</b><span>Parcerias com propósito</span><b>✦</b><span>Inovação local</span></div></div>

        <section className="lumi-section section-pad" id="lumi">
          <div className="lumi-media"><div className="lumi-image-panel"><img src="/manus-storage/lumi-exhibition-detail_f6f88876.jpeg" alt="Protótipo Lumi num vaso de plantas ligado a uma luz LED durante uma exposição" /><div className="image-stamp"><span>LUMI</span><small>vaso de plantas que gera energia</small></div></div></div>
          <div className="lumi-copy"><FieldLabel light>03 / O PRIMEIRO PASSO</FieldLabel><h2>Conheça o <em>Lumi</em>.</h2><p className="section-lead section-lead--light">O Lumi é um vaso de plantas que gera energia.</p><p className="body-light">As raízes das plantas e os microrganismos do solo produzem electricidade naturalmente. O protótipo foi pensado para alimentar sinais LED e sensores ambientais, sem prejudicar a planta.</p><div className="lumi-uses"><span><Leaf size={16} /> Iluminar percursos</span><span><CircuitBoard size={16} /> Ler o ambiente</span></div><a className="button button--outline-light" href="#parcerias">Levar o Lumi ao terreno <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="compact-moments section-pad" aria-labelledby="momentos-lumi">
          <div className="compact-moments-head"><FieldLabel>04 / MOMENTOS LUMI</FieldLabel><h2 id="momentos-lumi">Do protótipo<br /><em>ao mundo real.</em></h2><p>Investigar, testar e partilhar: três momentos de uma solução que ainda está a crescer.</p></div>
          <div className="moments-strip">{moments.map((moment, index) => <figure key={moment.label}><img src={moment.image} alt={moment.alt} /><figcaption><span>0{index + 1}</span>{moment.label}</figcaption></figure>)}</div>
        </section>

        <section className="partner-journey section-pad" id="parcerias">
          <div className="partner-journey-media"><img src={communityTeamImage} alt="Membros da equipa Lactus num encontro de inovação e desenvolvimento comunitário" /><span>Lactus + parceiros locais</span></div>
          <div className="partner-journey-copy"><FieldLabel>05 / FAZEMOS COM QUEM CONHECE O TERRITÓRIO</FieldLabel><h2>Um piloto começa<br /><em>com uma conversa.</em></h2><p className="section-lead">A organização parceira conhece a comunidade. A Lactus leva a tecnologia e o acompanhamento técnico.</p><div className="partner-route"><div><span>01</span><strong>Mapear</strong><p>Identificamos uma necessidade e o melhor local.</p></div><div><span>02</span><strong>Instalar</strong><p>Adaptamos o Lumi ao contexto e acompanhamos o início.</p></div><div><span>03</span><strong>Medir</strong><p>Aprendemos com dados técnicos e impacto percebido.</p></div></div><a className="button button--dark" href="#contacto"><Handshake size={16} /> Construir um piloto</a></div>
        </section>

        <section className="compact-proof section-pad">
          <div className="proof-copy"><FieldLabel>06 / UMA IDEIA COM CAMINHO</FieldLabel><h2>Da curiosidade<br /><em>à credibilidade.</em></h2><p>A Lactus nasceu depois de a equipa vencer o NASA Space Apps Challenge Luanda 2025. Em 2026, o projecto recebeu o Prémio Tigra Nova Garra pelo potencial de impacto social.</p><div className="proof-awards"><span><strong>1.º lugar</strong>NASA Space Apps Challenge<br />Luanda 2025</span><span><strong>2026</strong>Prémio Tigra Nova Garra<br />Impacto social</span></div></div>
          <div className="proof-image"><img className="proof-image-main" src={awardPortraitImage} alt="Anabelmo Feijó com o troféu Nova Garra" /><img className="proof-image-inset" src={awardTeamImage} alt="Anabelmo Feijó com duas pessoas da equipa Lactus durante os Prémios Nova Garra" /><div><img src={markImage} alt="" />Equipa Lactus<br />Luanda, Angola</div></div>
        </section>

        <section className="contact section-pad" id="contacto"><div className="contact-inner"><div><FieldLabel light>07 / VAMOS CONSTRUIR IMPACTO</FieldLabel><h2>Tem uma comunidade.<br /><em>Nós temos um próximo teste.</em></h2></div><div className="contact-side"><p>Se a sua organização trabalha com desenvolvimento rural, educação, agricultura, sustentabilidade ou inovação social, podemos criar um projecto-piloto juntos.</p><div className="contact-actions"><a className="button button--lime" href="mailto:hello@lactus.ao?subject=Quero%20ser%20parceiro%20da%20Lactus">Seja nosso parceiro <ArrowUpRight size={17} /></a><a className="text-link text-link--light" href="mailto:hello@lactus.ao">Fale connosco <Mail size={16} /></a></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="brand brand--footer" href="#top"><img className="brand-logo-full" src={fullLogoImage} alt="Lactus" /></a><p>Energia sustentável para<br />comunidades com acesso limitado<br />à electricidade.</p><a className="footer-email" href="mailto:hello@lactus.ao"><Mail size={16} /> hello@lactus.ao</a></div><div className="footer-bottom"><span>© 2026 Lactus. Luanda, Angola.</span><div><a href="#sobre">Sobre nós</a><a href="#lumi">Lumi</a><Link href="/momentos">Momentos</Link><a href="#contacto">Contacto</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a></div></div></footer>
    </div>
  );
}
