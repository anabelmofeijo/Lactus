import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout, { type DashboardNavigationItem } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ClipboardList, ExternalLink, Home, MapPinned, Plus, ShieldAlert, Trash2, UsersRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "wouter";

const adminNavigation: DashboardNavigationItem[] = [
  { icon: ClipboardList, label: "Pedidos de parceria", path: "/gestao-parcerias" },
  { icon: UsersRound, label: "Equipa e acessos", path: "/gestao-equipa" },
  { icon: MapPinned, label: "Pontos Lumi", path: "/gestao-lumi" },
  { icon: Home, label: "Ver site", path: "/" },
];

const initialForm = { pointName: "", companyName: "", contactName: "", contactEmail: "", location: "", installedAt: "", status: "operacional" as const, notes: "" };
const statusLabels = { operacional: "Operacional", manutencao: "Em manutenção", retirado: "Retirado" } as const;
type LumiStatus = keyof typeof statusLabels;

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("pt-PT", { dateStyle: "medium" }).format(new Date(value)) : "Data não indicada";
}

export default function LumiManagement() {
  const { user } = useAuth();
  const utils = trpc.useUtils();
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState("");
  const installationsQuery = trpc.lumi.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const createInstallation = trpc.lumi.create.useMutation({
    onSuccess: async () => {
      setForm(initialForm);
      setSuccess("Ponto Lumi registado com sucesso.");
      await utils.lumi.list.invalidate();
    },
  });
  const deleteInstallation = trpc.lumi.delete.useMutation({
    onSuccess: async () => {
      setSuccess("Ponto Lumi eliminado.");
      await utils.lumi.list.invalidate();
    },
  });
  const installations = installationsQuery.data?.installations ?? [];

  function updateField(field: keyof typeof initialForm, value: string) {
    setSuccess("");
    setForm(current => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createInstallation.mutate({
      ...form,
      installedAt: form.installedAt ? new Date(`${form.installedAt}T12:00:00`) : undefined,
      status: form.status as LumiStatus,
    });
  }

  function handleDelete(id: number, pointName: string) {
    if (window.confirm(`Eliminar o ponto Lumi “${pointName}”? Esta acção não pode ser anulada.`)) {
      deleteInstallation.mutate({ id });
    }
  }

  return <DashboardLayout menuItems={adminNavigation} title="Lactus — Gestão"><div className="mx-auto w-full max-w-6xl space-y-7 pb-10">
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Lumi</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Pontos instalados</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Mantenha um mapa operacional dos vasos Lumi, dos locais onde estão instalados e das empresas que acompanham cada ponto.</p></div><Link href="/"><Button variant="outline" className="gap-2"><ExternalLink className="h-4 w-4" />Ver site</Button></Link></header>

    {user?.role !== "admin" ? <section className="rounded-2xl border border-border bg-card p-8 text-center"><ShieldAlert className="mx-auto h-8 w-8 text-destructive" /><h2 className="mt-4 text-xl font-semibold">Acesso restrito</h2><p className="mt-2 text-sm text-muted-foreground">Apenas administradores da Lactus podem gerir pontos instalados.</p></section> : <>
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"><div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></span><div><h2 className="font-semibold">Adicionar ponto Lumi</h2><p className="text-xs text-muted-foreground">Registe onde está instalado e quem o acompanha.</p></div></div><form className="mt-6 grid gap-4" onSubmit={handleSubmit}><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-medium">Nome ou referência do ponto<input value={form.pointName} onChange={event => updateField("pointName", event.target.value)} required minLength={2} maxLength={180} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="ex.: Lumi — Escola de Viana" /></label><label className="grid gap-1.5 text-sm font-medium">Empresa associada<input value={form.companyName} onChange={event => updateField("companyName", event.target.value)} required minLength={2} maxLength={180} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="Nome da empresa ou organização" /></label></div><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-medium">Pessoa de contacto<input value={form.contactName} onChange={event => updateField("contactName", event.target.value)} maxLength={180} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="Nome do responsável" /></label><label className="grid gap-1.5 text-sm font-medium">E-mail de contacto<input type="email" value={form.contactEmail} onChange={event => updateField("contactEmail", event.target.value)} maxLength={320} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="contacto@organizacao.ao" /></label></div><div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr_0.8fr]"><label className="grid gap-1.5 text-sm font-medium">Localização<input value={form.location} onChange={event => updateField("location", event.target.value)} required minLength={2} maxLength={180} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="Município, província ou comunidade" /></label><label className="grid gap-1.5 text-sm font-medium">Data de instalação<input type="date" value={form.installedAt} onChange={event => updateField("installedAt", event.target.value)} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" /></label><label className="grid gap-1.5 text-sm font-medium">Estado<select value={form.status} onChange={event => updateField("status", event.target.value)} className="h-10 rounded-lg border border-input bg-background px-3 text-sm"><option value="operacional">Operacional</option><option value="manutencao">Em manutenção</option><option value="retirado">Retirado</option></select></label></div><label className="grid gap-1.5 text-sm font-medium">Observações<textarea value={form.notes} onChange={event => updateField("notes", event.target.value)} maxLength={5000} rows={3} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Notas técnicas, próximos passos ou contexto do projecto" /></label>{createInstallation.error ? <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">{createInstallation.error.message}</p> : null}{success ? <p className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary" role="status">{success}</p> : null}<Button type="submit" disabled={createInstallation.isPending} className="w-full gap-2 sm:w-fit">{createInstallation.isPending ? "A guardar…" : "Guardar ponto Lumi"}</Button></form></div><aside className="rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Registo operacional</p><h2 className="mt-2 text-2xl font-semibold">Uma instalação, uma história.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Associe cada ponto à organização e ao contexto onde o Lumi está a criar aprendizagem. Assim, a equipa encontra rapidamente os locais que precisam de acompanhamento.</p><div className="mt-6 grid gap-3 text-sm"><p className="rounded-xl bg-background p-3"><strong>Operacional:</strong> instalação em funcionamento.</p><p className="rounded-xl bg-background p-3"><strong>Manutenção:</strong> requer acompanhamento técnico.</p><p className="rounded-xl bg-background p-3"><strong>Retirado:</strong> mantém o histórico sem aparecer como activo.</p></div></aside></section>

      <section className="rounded-2xl border border-border bg-card shadow-sm"><div className="border-b border-border p-5 sm:p-6"><h2 className="text-2xl font-semibold">Pontos Lumi registados</h2><p className="mt-1 text-sm text-muted-foreground">{installations.length} instalação(ões) no registo operacional.</p></div>{installationsQuery.isLoading ? <p className="p-6 text-sm text-muted-foreground">A carregar pontos…</p> : installationsQuery.error ? <p className="p-6 text-sm text-destructive">Não foi possível carregar os pontos Lumi. Tente novamente.</p> : installations.length === 0 ? <p className="p-6 text-sm text-muted-foreground">Ainda não existem pontos registados. Adicione o primeiro acima.</p> : <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">{installations.map(point => <article className="rounded-xl border border-border p-4" key={point.id}><div className="flex items-start justify-between gap-4"><div className="min-w-0"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${point.status === "operacional" ? "bg-primary/10 text-primary" : point.status === "manutencao" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{statusLabels[point.status]}</span><h3 className="mt-3 text-lg font-semibold">{point.pointName}</h3><p className="mt-1 text-sm text-muted-foreground">{point.companyName} · {point.location}</p></div><Button variant="ghost" size="icon" aria-label={`Eliminar ${point.pointName}`} disabled={deleteInstallation.isPending} onClick={() => handleDelete(point.id, point.pointName)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div><div className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground"><p>{point.contactName || "Sem pessoa de contacto"}{point.contactEmail ? ` · ${point.contactEmail}` : ""}</p><p>Instalado em {formatDate(point.installedAt)} · Registado em {formatDate(point.createdAt)}</p>{point.notes ? <p className="whitespace-pre-wrap pt-2 text-sm leading-5">{point.notes}</p> : null}</div></article>)}</div>}</section>
    </>}
  </div></DashboardLayout>;
}
