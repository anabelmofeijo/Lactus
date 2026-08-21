import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const copy = language === "pt" ? { title: "Página não encontrada", text: "Lamentamos, mas a página que procura não existe.", note: "Pode ter sido movida ou eliminada.", home: "Ir para o início" } : { title: "Page not found", text: "Sorry, the page you are looking for does not exist.", note: "It may have been moved or deleted.", home: "Go home" };
  return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 relative"><div className="not-found-language"><LanguageToggle /></div><Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm"><CardContent className="pt-8 pb-8 text-center"><div className="flex justify-center mb-6"><div className="relative"><div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" /><AlertCircle className="relative h-16 w-16 text-red-500" /></div></div><h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1><h2 className="text-xl font-semibold text-slate-700 mb-4">{copy.title}</h2><p className="text-slate-600 mb-8 leading-relaxed">{copy.text}<br />{copy.note}</p><div id="not-found-button-group" className="flex flex-col sm:flex-row gap-3 justify-center"><Button onClick={() => setLocation("/")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"><Home className="w-4 h-4 mr-2" />{copy.home}</Button></div></CardContent></Card></div>;
}
