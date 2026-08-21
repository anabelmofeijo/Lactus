import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Handshake, Leaf, Mail, Sprout } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const STORAGE = "/manus-storage/";
const fullLogoImage = `${STORAGE}lactus-logo-full_a42554be.png`;

type RequestType = "parceria" | "patrocinio" | "ambos" | "outro";

type PartnershipFormState = {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  requestType: RequestType;
  location: string;
  projectContext: string;
  objectives: string;
  consentToContact: boolean;
};

const initialForm: PartnershipFormState = {
  organizationName: "",
  contactName: "",
  email: "",
  phone: "",
  requestType: "parceria",
  location: "",
  projectContext: "",
  objectives: "",
  consentToContact: false,
};

function FieldLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`field-label${light ? " field-label--light" : ""}`}>{children}</span>;
}

export default function Partnership() {
  const [form, setForm] = useState<PartnershipFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const submitRequest = trpc.partnership.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm(initialForm);
    },
    onError: () => {
      toast.error("Não foi possível enviar o pedido agora. Tente novamente ou escreva-nos por e-mail.");
    },
  });

  const update = <Key extends keyof PartnershipFormState>(key: Key, value: PartnershipFormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitRequest.mutate(form);
  };

  return (
    <div className="lactus-site partnership-page">
      <header className="partnership-header">
        <Link className="brand" href="/" aria-label="Lactus — início">
          <img className="brand-logo-full" src={fullLogoImage} alt="Lactus" />
        </Link>
        <Link className="partnership-back" href="/"><ArrowLeft size={16} /> Voltar ao site</Link>
      </header>

      <main className="partnership-main">
        <section className="partnership-intro">
          <FieldLabel>PARCERIAS / PROJECTOS-PILOTO</FieldLabel>
          <h1>Uma boa parceria<br /><em>começa no contexto.</em></h1>
          <p>Conte-nos onde a energia faz falta e o que a sua organização pretende alcançar. A equipa Lactus analisará o pedido e entrará em contacto consigo.</p>
          <div className="partnership-signals" aria-label="Como trabalhamos">
            <div><Sprout size={18} /><span>Escutamos<br /><strong>o território</strong></span></div>
            <div><Handshake size={18} /><span>Desenhamos<br /><strong>em conjunto</strong></span></div>
            <div><Leaf size={18} /><span>Medimos<br /><strong>a aprendizagem</strong></span></div>
          </div>
          <a className="partnership-email" href="mailto:startuplactus@gmail.com"><Mail size={16} />Prefere escrever-nos? startuplactus@gmail.com</a>
        </section>

        <section className="partnership-form-panel" aria-labelledby="partnership-form-title">
          {submitted ? (
            <div className="form-success" role="status">
              <CheckCircle2 size={44} aria-hidden="true" />
              <FieldLabel>PEDIDO RECEBIDO</FieldLabel>
              <h2>Obrigado por<br /><em>nos procurar.</em></h2>
              <p>O seu pedido foi registado. A Lactus entrará em contacto através do e-mail indicado para perceber os próximos passos.</p>
              <Link className="button button--dark" href="/">Voltar ao início <ArrowUpRight size={16} /></Link>
            </div>
          ) : (
            <form className="partnership-form" onSubmit={handleSubmit}>
              <div className="form-heading">
                <FieldLabel>FORMULÁRIO DE CONTACTO</FieldLabel>
                <h2 id="partnership-form-title">Vamos conhecer<br /><em>o seu desafio.</em></h2>
                <p>Os campos assinalados com <b>*</b> são obrigatórios.</p>
              </div>

              <div className="form-grid">
                <label className="form-field form-field--full"><span>Organização <b>*</b></span><input value={form.organizationName} onChange={(event) => update("organizationName", event.target.value)} autoComplete="organization" required placeholder="Nome da organização" /></label>
                <label className="form-field"><span>Pessoa responsável <b>*</b></span><input value={form.contactName} onChange={(event) => update("contactName", event.target.value)} autoComplete="name" required placeholder="Nome completo" /></label>
                <label className="form-field"><span>E-mail profissional <b>*</b></span><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" required placeholder="nome@organizacao.org" /></label>
                <label className="form-field"><span>Telefone</span><input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" placeholder="+244 …" /></label>
                <label className="form-field"><span>Interesse <b>*</b></span><select value={form.requestType} onChange={(event) => update("requestType", event.target.value as RequestType)} required><option value="parceria">Parceria para projecto-piloto</option><option value="patrocinio">Patrocínio</option><option value="ambos">Parceria e patrocínio</option><option value="outro">Outro pedido</option></select></label>
                <label className="form-field form-field--full"><span>Localização do projecto ou comunidade <b>*</b></span><input value={form.location} onChange={(event) => update("location", event.target.value)} required placeholder="Província, município ou comunidade" /></label>
                <label className="form-field form-field--full"><span>Qual é o contexto ou necessidade? <b>*</b></span><textarea value={form.projectContext} onChange={(event) => update("projectContext", event.target.value)} required minLength={20} rows={5} placeholder="Descreva o desafio, o espaço ou a comunidade onde pretende actuar." /></label>
                <label className="form-field form-field--full"><span>Que resultados pretende alcançar?</span><textarea value={form.objectives} onChange={(event) => update("objectives", event.target.value)} rows={4} placeholder="Ex.: melhorar orientação nocturna, apoiar monitorização agrícola, testar uma solução…" /></label>
              </div>

              <label className="consent-field"><input type="checkbox" checked={form.consentToContact} onChange={(event) => update("consentToContact", event.target.checked)} required /><span>Autorizo a Lactus a contactar-me sobre este pedido de parceria ou patrocínio. <b>*</b></span></label>
              <button className="button button--dark form-submit" type="submit" disabled={submitRequest.isPending}>{submitRequest.isPending ? "A enviar pedido…" : <>Enviar pedido <ArrowUpRight size={17} /></>}</button>
            </form>
          )}
        </section>
      </main>

      <footer className="partnership-footer"><span>© 2026 Lactus. Luanda, Angola.</span><span>Energia sustentável para contextos reais.</span></footer>
    </div>
  );
}
