/**
 * Lactus visual direction: Organic Modernism with contemporary African editorial references.
 * Momentos reads as a living field journal: asymmetric imagery, mineral paper and restrained
 * botanical-circuit motifs make real team milestones feel documented rather than promotional.
 */
import { ArrowLeft, ArrowUpRight, Leaf, Mail, Sprout } from "lucide-react";
import { Link } from "wouter";

const STORAGE = "/manus-storage/";
const fullLogoImage = `${STORAGE}lactus-logo-full_a42554be.png`;
const markImage = `${STORAGE}lactus-logo-mark_7cd71d3c.png`;

const milestones = [
  {
    number: "01",
    title: "Prémio Tigra Nova Garra",
    date: "2026",
    description: "Um reconhecimento que reforça o potencial de impacto social da Lactus e dá mais força à validação do Lumi com parceiros locais.",
    images: [
      { src: `${STORAGE}tigra-nova-garra-equipa_ac399128.jpeg`, alt: "Equipa Lactus reunida no contexto do Prémio Tigra Nova Garra", note: "Reconhecimento que abre espaço para testar com mais parceiros" },
      { src: `${STORAGE}tigra-nova-garra-premio_9030545d.jpeg`, alt: "Momento de entrega do Prémio Tigra Nova Garra", note: "Potencial de impacto social" },
    ],
  },
  {
    number: "02",
    title: "NASA Space Apps Challenge",
    date: "Luanda 2025",
    description: "O ponto de partida: uma vitória que transformou uma ideia de equipa numa ambição maior — criar soluções de bioenergia pensadas para o contexto angolano.",
    images: [
      { src: `${STORAGE}nasa-space-apps-luanda_3a5a9604.jpeg`, alt: "Registo da participação da equipa Lactus no NASA Space Apps Challenge Luanda 2025", note: "Da ideia à pergunta que deu origem ao Lumi" },
    ],
  },
  {
    number: "03",
    title: "Desafio Genial",
    date: "Em movimento",
    description: "Um espaço de partilha, desafio e apresentação de ideias que ajudou a equipa a explicar, testar e amadurecer o caminho do Lumi.",
    images: [
      { src: `${STORAGE}desafio-genial-apresentacao_51b0b7ba.jpeg`, alt: "Apresentação da equipa num momento do Desafio Genial", note: "Explicar a ideia é também uma forma de a testar" },
      { src: `${STORAGE}desafio-genial-dupla_2419c082.jpeg`, alt: "Dois membros da equipa num momento do Desafio Genial", note: "Conversas que refinam o próximo passo" },
      { src: `${STORAGE}desafio-genial-grupo_ab7815d6.jpeg`, alt: "Participantes reunidos durante o Desafio Genial", note: "Partilhar conhecimento para ampliar o impacto" },
    ],
  },
  {
    number: "04",
    title: "Huawei",
    date: "Encontros que impulsionam",
    description: "Conversas e ligações que mantêm a aprendizagem, a colaboração e a visão da Lactus em movimento — para que a tecnologia esteja sempre ligada a necessidades reais.",
    images: [
      { src: `${STORAGE}huawei-edificio_109ef9d3.jpeg`, alt: "Edifício Huawei num dos momentos documentados pela equipa Lactus", note: "Um encontro com novas perspectivas" },
      { src: `${STORAGE}huawei-equipa_50de79d4.jpeg`, alt: "Equipa reunida durante um encontro ligado à Huawei", note: "Construir rede para construir melhor" },
      { src: `${STORAGE}huawei-fundador_2b7c44c1.jpeg`, alt: "Fundador da Lactus num encontro ligado à Huawei", note: "Aprendizagens que regressam ao projecto" },
      { src: `${STORAGE}digital-ao-representacao_8ea50691.jpeg`, alt: "Momento institucional adicional da trajectória da equipa Lactus", note: "Parcerias que alargam o campo de possibilidades" },
    ],
  },
];

function FieldLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`field-label${light ? " field-label--light" : ""}`}>{children}</span>;
}

export default function Moments() {
  return (
    <div className="lactus-site moments-page">
      <header className="moments-header">
        <Link className="brand" href="/" aria-label="Lactus — início"><img className="brand-logo-full" src={fullLogoImage} alt="Lactus" /></Link>
        <nav aria-label="Navegação Momentos"><Link href="/">Início</Link><a href="mailto:startuplactus@gmail.com">Contacto</a></nav>
        <Link className="moments-back" href="/"><ArrowLeft size={16} /> Voltar ao início</Link>
      </header>

      <main>
        <section className="moments-hero section-pad">
          <div className="moments-hero-copy"><FieldLabel>ARQUIVO / Lactus</FieldLabel><h1>Momentos que<br /><em>nos fizeram crescer.</em></h1><p>Uma selecção de prémios, desafios e encontros que acompanha o caminho da Lactus — da ideia partilhada à vontade de criar impacto.</p></div>
          <div className="moments-hero-art" aria-hidden="true"><img src={markImage} alt="" /><span className="moments-orbit moments-orbit--one" /><span className="moments-orbit moments-orbit--two" /><Leaf className="moments-leaf" size={35} /></div>
        </section>

        <section className="moments-intro section-pad"><div className="moments-intro-mark"><Sprout size={19} /><span>Notas de campo</span></div><p>Não são apenas fotografias. São marcas de uma equipa que testa, aprende, apresenta e volta ao terreno com mais perguntas e mais energia.</p></section>

        <section className="milestone-list" aria-label="Marcos da Lactus">
          {milestones.map((milestone, milestoneIndex) => (
            <article className={`milestone milestone--${milestoneIndex + 1}`} key={milestone.title}>
              <div className="milestone-copy section-pad"><span className="milestone-number">{milestone.number}</span><FieldLabel>{milestone.date}</FieldLabel><h2>{milestone.title}</h2><p>{milestone.description}</p><span className="milestone-line" /></div>
              <div className={`milestone-gallery milestone-gallery--${milestone.images.length}`}>
                {milestone.images.map((image, imageIndex) => <figure key={image.src} className={`milestone-photo milestone-photo--${imageIndex + 1}`}><img src={image.src} alt={image.alt} /><figcaption>{image.note}</figcaption></figure>)}
              </div>
            </article>
          ))}
        </section>

        <section className="moments-contact section-pad"><div><FieldLabel light>PRÓXIMO CAPÍTULO</FieldLabel><h2>Quer fazer parte<br /><em>do que vem a seguir?</em></h2></div><div><p>Se representa uma organização que acredita em soluções locais para desafios reais, fale com a Lactus.</p><a className="button button--lime" href="mailto:startuplactus@gmail.com?subject=Quero%20falar%20com%20a%20Lactus">Fale connosco <ArrowUpRight size={17} /></a></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><Link className="brand brand--footer" href="/"><img className="brand-logo-full" src={fullLogoImage} alt="Lactus" /></Link><p>Energia sustentável para<br />comunidades com acesso limitado<br />à electricidade.</p><a className="footer-email" href="mailto:startuplactus@gmail.com"><Mail size={16} /> startuplactus@gmail.com</a></div><div className="footer-bottom"><span>© 2026 Lactus. Luanda, Angola.</span><div><Link href="/">Início</Link><a href="mailto:startuplactus@gmail.com">Contacto</a></div></div></footer>
    </div>
  );
}
