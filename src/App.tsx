import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useRevealObserver } from "@/hooks/useReveal";
import { ContactDock } from "@/components/ContactDock";
import Index from "./pages/Index";
import Azienda from "./pages/Azienda";
import Produits from "./pages/Produits";
import Usato from "./pages/Usato";
import Assistenza from "./pages/Assistenza";
import NewsEFiere from "./pages/NewsEFiere";
import Contact from "./pages/Contact";
import History from "./pages/History";
import Certifications from "./pages/Certifications";
import Policy from "./pages/Policy";
import CodeOfEthics from "./pages/CodeOfEthics";
import WorkWithUs from "./pages/WorkWithUs";
import DynamicTargetPage from "./pages/DynamicTargetPage";
import UsatoDetail from "./pages/UsatoDetail";
import AdminInventory from "./pages/AdminInventory";

const queryClient = new QueryClient();

/**
 * Each new page opens at its top, or at the #anchor it was asked for
 * (/contact#devis), once that part is on the page.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    let timer = 0;
    const find = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: tries === 0 ? "auto" : "smooth", block: "start" });
        return;
      }
      if (tries++ < 20) timer = window.setTimeout(find, 50);
    };
    find();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

/** Titles and blocks come in as they reach the screen, on every page. */
const RevealRoot = () => {
  useRevealObserver();
  return null;
};

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = i18n.resolvedLanguage === "en" ? "en" : "fr";
    root.dir = "ltr";
  }, [i18n.resolvedLanguage]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollManager />
          <RevealRoot />
          <Routes>
            <Route path="/" element={<Index />} />

            {/* the company */}
            <Route path="/a-propos" element={<Azienda />} />
            <Route path="/azienda" element={<Azienda />} />
            <Route path="/about" element={<Azienda />} />
            <Route path="/histoire" element={<History />} />
            <Route path="/history" element={<History />} />
            <Route path="/la-storia" element={<History />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/certificazioni" element={<Certifications />} />
            <Route path="/politique-entreprise" element={<Policy />} />
            <Route path="/politica-aziendale" element={<Policy />} />
            <Route path="/company-policy" element={<Policy />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/code-ethique" element={<CodeOfEthics />} />
            <Route path="/codice-etico" element={<CodeOfEthics />} />
            <Route path="/code-of-ethics" element={<CodeOfEthics />} />
            <Route path="/nous-rejoindre" element={<WorkWithUs />} />
            <Route path="/lavora-con-noi" element={<WorkWithUs />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />

            {/* the machines */}
            <Route path="/produits" element={<Produits />} />
            <Route path="/piattaforme-aeree" element={<Produits />} />
            <Route path="/products" element={<Produits />} />
            <Route path="/occasion" element={<Usato />} />
            <Route path="/usato" element={<Usato />} />
            <Route path="/used" element={<Usato />} />
            {/* router v6 cannot match a prefix like /aerial-platform-*, so each stock page is listed */}
            <Route path="/aerial-platform-in-stock-new-eurosky-18-2-7-5-hq" element={<UsatoDetail />} />
            <Route path="/aerial-platform-in-stock-new-eurosfilo-17-2-9-11-hq" element={<UsatoDetail />} />
            <Route path="/aerial-platform-in-stock-new-eurosfilo-22-2-12-15-hq" element={<UsatoDetail />} />
            <Route path="/aerial-platform-in-stock-new-eurosky-21-2-7-9-hq" element={<UsatoDetail />} />
            <Route path="/aerial-platform-pre-owned-new-eurosfilo-17-2-7-8-5-hq" element={<UsatoDetail />} />

            {/* service, news, contact */}
            <Route path="/service" element={<Assistenza />} />
            <Route path="/assistenza" element={<Assistenza />} />
            <Route path="/actualites" element={<NewsEFiere />} />
            <Route path="/news" element={<NewsEFiere />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contatti" element={<Contact />} />

            <Route path="/__comet-inventory-portal" element={<AdminInventory />} />
            <Route path="*" element={<DynamicTargetPage />} />
          </Routes>
          <ContactDock />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
