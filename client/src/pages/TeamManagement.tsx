import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout, { type DashboardNavigationItem } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ClipboardList, ExternalLink, Home, KeyRound, ShieldAlert, UserPlus, UsersRound } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const adminNavigation: DashboardNavigationItem[] = [
  { icon: ClipboardList, label: "Pedidos de parceria", path: "/gestao-parcerias" },
  { icon: UsersRound, label: "Equipa e acessos", path: "/gestao-equipa" },
  { icon: Home, label: "Ver site", path: "/" },
];

const initialForm = { name: "", email: "", username: "", password: "" };

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("pt-PT", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function TeamManagement() {
  const { user } = useAuth();
  const utils = trpc.useUtils();
  const [form, setForm] = useState(initialForm);
  const accountsQuery = trpc.team.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const accounts = accountsQuery.data?.accounts ?? [];
  const createAccount = trpc.team.create.useMutation({
    onSuccess: async () => {
      setForm(initialForm);
      await utils.team.list.invalidate();
    },
  });
  const updateAccount = trpc.team.setActive.useMutation({
    onSuccess: async () => utils.team.list.invalidate(),
  });

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm(current => ({ ...current, [field]: field === "username" ? value.toLowerCase() : value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createAccount.mutate(form);
  }

  return <DashboardLayout menuItems={adminNavigation} title="Lactus — Gestão"><div className="mx-auto w-full max-w-6xl space-y-7 pb-10">
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Equipa</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Contas e acessos</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Crie acessos individuais para a equipa gerir pedidos de parceria. Cada conta tem utilizador, palavra-passe e sessão próprios.</p></div><Link href="/"><Button variant="outline" className="gap-2"><ExternalLink className="h-4 w-4" />Ver site</Button></Link></header>

    {user?.role !== "admin" ? <section className="rounded-2xl border border-border bg-card p-8 text-center"><ShieldAlert className="mx-auto h-8 w-8 text-destructive" /><h2 className="mt-4 text-xl font-semibold">Acesso restrito</h2><p className="mt-2 text-sm text-muted-foreground">Apenas administradores da Lactus podem gerir contas da equipa.</p></section> : <>
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"><div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"><UserPlus className="h-5 w-5" /></span><div><h2 className="font-semibold">Adicionar membro</h2><p className="text-xs text-muted-foreground">O acesso é criado imediatamente.</p></div></div><form className="mt-6 grid gap-4" onSubmit={handleSubmit}><label className="grid gap-1.5 text-sm font-medium">Nome completo<input value={form.name} onChange={event => updateField("name", event.target.value)} required minLength={2} maxLength={180} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="Nome do membro" /></label><label className="grid gap-1.5 text-sm font-medium">E-mail profissional<input type="email" value={form.email} onChange={event => updateField("email", event.target.value)} required maxLength={320} className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="nome@lactus.ao" /></label><label className="grid gap-1.5 text-sm font-medium">Utilizador<input value={form.username} onChange={event => updateField("username", event.target.value)} required minLength={3} maxLength={96} pattern="[a-z0-9._-]+" autoCapitalize="none" autoComplete="off" className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="ex.: catarina.monteiro" /></label><label className="grid gap-1.5 text-sm font-medium">Palavra-passe temporária<input type="password" value={form.password} onChange={event => updateField("password", event.target.value)} required minLength={12} maxLength={128} autoComplete="new-password" className="h-10 rounded-lg border border-input bg-background px-3 text-sm" placeholder="Mínimo 12 caracteres, letra e número" /></label>{createAccount.error ? <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">{createAccount.error.message}</p> : null}<Button type="submit" disabled={createAccount.isPending} className="mt-2 gap-2"><KeyRound className="h-4 w-4" />{createAccount.isPending ? "A criar conta…" : "Criar conta de acesso"}</Button></form></div>
        <aside className="rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Boas práticas</p><h2 className="mt-2 text-xl font-semibold">Um acesso para cada pessoa.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Partilhe a palavra-passe inicial apenas por um canal privado. O painel guarda apenas uma derivação criptográfica, nunca a palavra-passe em texto simples.</p><div className="mt-6 grid gap-3 text-sm"><p className="rounded-xl bg-background p-3"><strong>Conta principal:</strong> mantém-se protegida pelas credenciais configuradas do projecto.</p><p className="rounded-xl bg-background p-3"><strong>Desactivar:</strong> interrompe o acesso da conta e invalida a sessão no próximo pedido.</p></div></aside></section>

      <section className="rounded-2xl border border-border bg-card shadow-sm"><div className="flex flex-col gap-2 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">Contas individuais</h2><p className="text-xs text-muted-foreground">{accounts.length} conta(s) criada(s) para a equipa.</p></div></div>{accountsQuery.isLoading ? <p className="p-6 text-sm text-muted-foreground">A carregar contas…</p> : accountsQuery.error ? <p className="p-6 text-sm text-destructive">Não foi possível carregar as contas. Tente novamente.</p> : accounts.length === 0 ? <p className="p-6 text-sm text-muted-foreground">Ainda não existem contas individuais. Use o formulário para adicionar o primeiro membro.</p> : <div className="divide-y divide-border">{accounts.map(account => <article className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between" key={account.id}><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{account.name}</h3><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${account.isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{account.isActive ? "Activa" : "Desactivada"}</span></div><p className="mt-1 text-sm text-muted-foreground">{account.username} · {account.email}</p><p className="mt-1 text-xs text-muted-foreground">Criada em {formatDate(account.createdAt)} · Última sessão: {formatDate(account.lastSignedIn)}</p></div><Button variant={account.isActive ? "outline" : "default"} disabled={updateAccount.isPending} onClick={() => updateAccount.mutate({ id: account.id, isActive: !account.isActive })}>{account.isActive ? "Desactivar acesso" : "Reactivar acesso"}</Button></article>)}</div>}</section>
    </>}
  </div></DashboardLayout>;
}
