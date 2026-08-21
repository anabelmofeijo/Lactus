import { useLanguage, type Language } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const label = language === "pt" ? "Seleccionar idioma" : "Choose language";

  return (
    <div className="language-toggle" role="group" aria-label={label}>
      {(["pt", "en"] as Language[]).map((option) => (
        <button
          type="button"
          key={option}
          className={language === option ? "language-toggle__option language-toggle__option--active" : "language-toggle__option"}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
        >
          {option === "pt" ? "PT" : "EN"}
        </button>
      ))}
    </div>
  );
}
