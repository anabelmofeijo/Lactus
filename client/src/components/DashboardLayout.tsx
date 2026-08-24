import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, LayoutDashboard, Leaf, LockKeyhole, LogOut, PanelLeft, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";

export type DashboardNavigationItem = {
  icon: LucideIcon;
  label: string;
  path: string;
};

const defaultMenuItems: DashboardNavigationItem[] = [
  { icon: LayoutDashboard, label: "Page 1", path: "/" },
  { icon: Users, label: "Page 2", path: "/some-path" },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 200;
const MAX_WIDTH = 480;

export default function DashboardLayout({
  children,
  menuItems = defaultMenuItems,
  title = "Navigation",
}: {
  children: React.ReactNode;
  menuItems?: DashboardNavigationItem[];
  title?: string;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  if (!user) {
    return <DashboardAccessGate />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth} menuItems={menuItems} title={title}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}

function DashboardAccessGate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const utils = trpc.useUtils();
  const login = trpc.auth.passwordLogin.useMutation();
  const errorMessage = login.error?.message ?? null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login.mutateAsync({ username, password });
      await utils.auth.me.invalidate();
      window.location.reload();
    } catch {
      setPassword("");
    }
  }

  return <main className="min-h-screen bg-[#e9e5d9] p-3 text-[#073e32] sm:p-5 lg:p-8">
    <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1440px] overflow-hidden rounded-[2rem] border border-[#073e32]/10 bg-[#f4f1e8] shadow-[0_24px_80px_rgba(7,62,50,0.16)] lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative isolate min-h-[440px] overflow-hidden bg-[#073e32] p-6 sm:p-9 lg:min-h-0 lg:p-12">
        <img src="/manus-storage/lactus-award-team_2bceef86.jpg" alt="Israel Pedro, Catarina Monteiro e Anabelmo Feijó, fundadores da Lactus" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-75" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(4,49,39,0.96)_4%,rgba(7,62,50,0.69)_48%,rgba(7,62,50,0.23)_100%)]" />
        <div className="absolute -left-20 bottom-[-10rem] -z-10 h-80 w-80 rounded-full border border-[#c7f36b]/40" />
        <div className="flex h-full flex-col justify-between text-[#f4f1e8]"><header className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c7f36b] text-[#073e32]"><Leaf className="h-6 w-6" /></span><div><p className="text-lg font-semibold tracking-[0.17em]">LACTUS</p><p className="mt-0.5 text-xs text-[#c7f36b]">Tecnologia que cria raízes</p></div></header><div className="my-16 max-w-xl lg:my-0"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c7f36b]">Espaço da equipa</p><h1 className="mt-5 max-w-lg font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">A energia que criamos também se gere com cuidado.</h1><p className="mt-6 max-w-md text-base leading-7 text-[#f4f1e8]/82">Acompanhe cada pedido de parceria, guarde o contexto e construa relações que levem a inovação onde ela faz falta.</p></div><div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#f4f1e8]/88"><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#c7f36b]" />Acesso seguro da Lactus</span><span className="hidden h-1 w-1 rounded-full bg-[#c7f36b] sm:block" /><span>Israel · Catarina · Anabelmo</span></div></div>
      </section>
      <section className="flex items-center bg-[#f4f1e8] px-6 py-10 sm:px-12 lg:px-16"><div className="mx-auto w-full max-w-md"><a className="inline-flex items-center gap-2 text-sm font-medium text-[#073e32]/75 transition-colors hover:text-[#073e32]" href="/"><ArrowLeft className="h-4 w-4" />Voltar ao site</a><div className="mt-10"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#073e32] text-[#c7f36b]"><LockKeyhole className="h-5 w-5" /></span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#a86445]">Gestão de parcerias</p><h2 className="mt-3 font-serif text-5xl leading-[0.95]">Bem-vindo de volta.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-[#073e32]/70">Use as credenciais administrativas da Lactus para aceder aos pedidos recebidos.</p></div><form className="mt-9 space-y-5" onSubmit={handleSubmit} noValidate><div><label className="text-sm font-semibold" htmlFor="admin-username">Utilizador</label><input id="admin-username" name="username" autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} required disabled={login.isPending} className="mt-2 h-12 w-full rounded-xl border border-[#073e32]/20 bg-white px-4 text-sm outline-none transition placeholder:text-[#073e32]/35 focus:border-[#073e32] focus:ring-4 focus:ring-[#c7f36b]/35 disabled:cursor-not-allowed disabled:opacity-60" placeholder="O seu utilizador" /></div><div><label className="text-sm font-semibold" htmlFor="admin-password">Palavra-passe</label><div className="relative mt-2"><input id="admin-password" name="password" type={passwordVisible ? "text" : "password"} autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required disabled={login.isPending} className="h-12 w-full rounded-xl border border-[#073e32]/20 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-[#073e32]/35 focus:border-[#073e32] focus:ring-4 focus:ring-[#c7f36b]/35 disabled:cursor-not-allowed disabled:opacity-60" placeholder="A sua palavra-passe" /><button type="button" onClick={() => setPasswordVisible(value => !value)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-[#073e32]/55 transition hover:text-[#073e32]" aria-label={passwordVisible ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}>{passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>{errorMessage ? <p className="rounded-xl border border-[#a86445]/30 bg-[#a86445]/10 px-4 py-3 text-sm leading-5 text-[#7d3e26]" role="alert">{errorMessage}</p> : null}<Button type="submit" size="lg" disabled={login.isPending || !username || !password} className="mt-2 h-13 w-full justify-between rounded-xl bg-[#073e32] px-5 text-[#f4f1e8] shadow-lg shadow-[#073e32]/15 transition hover:bg-[#0a4b3d] disabled:opacity-60"><span>{login.isPending ? "A validar acesso…" : "Entrar na gestão"}</span><ArrowUpRight className="h-4 w-4" /></Button></form><p className="mt-6 max-w-sm text-xs leading-5 text-[#073e32]/55">Este espaço é reservado à equipa autorizada. As tentativas repetidas são protegidas para salvaguardar os pedidos de parceria.</p></div></section>
    </div>
  </main>;
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
  menuItems: DashboardNavigationItem[];
  title: string;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
  menuItems,
  title,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = menuItems.find(item => item.path === location);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r-0"
          disableTransition={isResizing}
        >
          <SidebarHeader className="h-16 justify-center">
            <div className="flex items-center gap-3 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center hover:bg-accent rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
                aria-label="Toggle navigation"
              >
                <PanelLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              {!isCollapsed ? (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold tracking-tight truncate">
                    {title}
                  </span>
                </div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0">
            <SidebarMenu className="px-2 py-1">
              {menuItems.map(item => {
                const isActive = location === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className={`h-10 transition-all font-normal`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${isActive ? "text-primary" : ""}`}
                      />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-accent/50 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border shrink-0">
                    <AvatarFallback className="text-xs font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none">
                      {user?.name || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1.5">
                      {user?.email || "-"}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset>
        {isMobile && (
          <div className="flex border-b h-14 items-center justify-between bg-background/95 px-2 backdrop-blur supports-[backdrop-filter]:backdrop-blur sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9 rounded-lg bg-background" />
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span className="tracking-tight text-foreground">
                    {activeMenuItem?.label ?? "Menu"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </>
  );
}
