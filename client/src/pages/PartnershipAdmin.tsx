import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout, { type DashboardNavigationItem } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ClipboardList, ExternalLink, Home, ShieldAlert, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

const statusOptions = [
  { value: "novo", label: "Novo" },
  { value: "em_analise", label: "Em análise" },
  { value: "contactado", label: "Contactado" },
  { value: "em_conversa", label: "Em conversa" },
  { value: "concluido", label: "Concluído" },
  { value: "arquivado", label: "Arquivado" },
] as const;

type PartnershipStatus = (typeof statusOptions)[number]["value"];
type StatusFilter = PartnershipStatus | "todos";

const adminNavigation: DashboardNavigationItem[] = [
  { icon: ClipboardList, label: "Pedidos de parceria", path: "/gestao-parcerias" },
  { icon: UsersRound, label: "Equipa e acessos", path: "/gestao-equipa" },
  { icon: Home, label: "Ver site", path: "/" },
];

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("pt-PT", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function statusLabel(status: PartnershipStatus) {
  return statusOptions.find(option => option.value === status)?.label ?? status;
}

export default function PartnershipAdmin() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<StatusFilter>("todos");
  const queryInput = useMemo(() => (filter === "todos" ? {} : { status: filter }), [filter]);
  const utils = trpc.useUtils();
  const requestsQuery = trpc.partnership.list.useQuery(queryInput, { enabled: user?.role === "admin" });
  const updateStatus = trpc.partnership.updateStatus.useMutation({
    onSuccess: async () => {
      await utils.partnership.list.invalidate();
    },
  });

  return <DashboardLayout menuItems={adminNavigation} title="Lactus — Gestão"><div className="mx-auto w-full max-w-6xl space-y-7 pb-10">
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Operações</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Pedidos de parceria</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Acompanhe os contactos recebidos, registe o estado de cada conversa e responda através dos dados partilhados pela organização.</p></div>
      <Link href="/"><Button variant="outline" className="gap-2"><ExternalLink className="h-4 w-4" />Ver site</Button></Link>
    </header>

    {user?.role !== "admin" ? <section className="rounded-2xl border border-border bg-card p-8 text-center"><ShieldAlert className="mx-auto h-8 w-8 text-destructive" /><h2 className="mt-4 text-xl font-semibold">Acesso restrito</h2><p className="mt-2 text-sm text-muted-foreground">Esta área está disponível apenas para administradores da Lactus.</p></section> : <>
      <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium">{requestsQuery.data?.requests.length ?? 0} pedido(s) apresentado(s)</p><p className="text-xs text-muted-foreground">Os pedidos mais recentes aparecem primeiro.</p></div><label className="text-sm font-medium">Filtrar por estado<select value={filter} onChange={event => setFilter(event.target.value as StatusFilter)} className="mt-1 block min-w-44 rounded-lg border border-input bg-background px-3 py-2 text-sm"><option value="todos">Todos os estados</option>{statusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label></section>

      {requestsQuery.isLoading ? <p className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">A carregar pedidos…</p> : requestsQuery.error ? <p className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-sm text-destructive">Não foi possível carregar os pedidos. Tente novamente.</p> : requestsQuery.data?.requests.length === 0 ? <p className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">Ainda não existem pedidos neste estado.</p> : <div className="grid gap-4">{requestsQuery.data?.requests.map(request => <article className="rounded-2xl border border-border bg-card p-5 shadow-sm" key={request.id}><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{request.requestType}</p><h2 className="mt-1 text-xl font-semibold">{request.organizationName}</h2><p className="mt-1 text-sm text-muted-foreground">{request.contactName} · {request.location} · {formatDate(request.createdAt)}</p></div><label className="text-sm font-medium">Estado<select value={request.status} disabled={updateStatus.isPending} onChange={event => updateStatus.mutate({ id: request.id, status: event.target.value as PartnershipStatus })} className="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm disabled:opacity-60">{statusOptions.map(option => <option key={option.value} value={option.value}>{statusLabel(option.value)}</option>)}</select></label></div><div className="mt-5 grid gap-4 border-t border-border pt-4 md:grid-cols-2"><div><h3 className="text-sm font-semibold">Contexto</h3><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{request.projectContext}</p></div><div><h3 className="text-sm font-semibold">Objectivos</h3><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{request.objectives || "Não indicado."}</p></div></div><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm"><a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${request.email}`}>{request.email}</a>{request.phone ? <a className="font-medium text-primary underline-offset-4 hover:underline" href={`tel:${request.phone}`}>{request.phone}</a> : null}<span className="text-muted-foreground">Consentimento para contacto: {request.consentToContact ? "confirmado" : "não confirmado"}</span></div></article>)}</div>}
    </>}
  </div></DashboardLayout>;
}
