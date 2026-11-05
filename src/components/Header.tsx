import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Mail, Phone } from "lucide-react";
import logo from "@/assets/brand/comet-maroc-white.png";
import { CONTACT, WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { NAV_LINKS, isActivePath } from "@/config/navigation";
import { useLang } from "@/lib/locale";
import { LanguageSelector } from "@/components/LanguageSelector";
import { WhatsAppIcon } from "@/components/icons";
import "./Header.css";

/**
 * The floating nav: see-through over the dark top of each page, frosted once
 * the page moves, out of the way while scrolling down and back on the way up.
 * Under 1100px it opens a full-screen menu.
 */
export const Header = () => {
  const { pick } = useLang();
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > 24);
      if (Math.abs(y - lastY) < 8) return;
      setHidden(y > lastY && y > 180);
      lastY = y;
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      window.removeEventListener("scroll", queue);
      cancelAnimationFrame(frame);
    };
  }, []);

  // a new page closes the menu
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const menu = menuRef.current;
    if (menu) menu.inert = !open;
    root.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    menu?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("menu-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="nav" data-solid={solid || undefined} data-hidden={(hidden && !open) || undefined} data-open={open || undefined}>
        <div className="nav-bar">
          <Link to="/" className="nav-logo" aria-label={pick({ fr: "COMET Maroc, accueil", en: "COMET Morocco, home" })} onClick={close}>
            <img src={logo} alt="COMET Maroc" width={87} height={40} />
          </Link>

          <nav className="nav-links" aria-label={pick({ fr: "Navigation principale", en: "Main navigation" })}>
            {NAV_LINKS.map((item) => (
              <Link key={item.to} to={item.to} aria-current={isActivePath(pathname, item.match) ? "page" : undefined}>
                {pick(item.label)}
              </Link>
            ))}
          </nav>

          <div className="nav-side">
            <a className="nav-phone" href={CONTACT.phoneHref}>
              <Phone aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <LanguageSelector className="nav-lang" />
            <Link to="/contact#devis" className="btn btn--light btn--sm nav-cta" onClick={close}>
              {pick({ fr: "Devis", en: "Quote" })}
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="nav-burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? pick({ fr: "Fermer le menu", en: "Close the menu" }) : pick({ fr: "Ouvrir le menu", en: "Open the menu" })}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" ref={menuRef} className={`mnav${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="mnav-links" aria-label={pick({ fr: "Menu", en: "Menu" })}>
          {[{ to: "/", label: { fr: "Accueil", en: "Home" }, match: ["/"] as const }, ...NAV_LINKS].map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              style={{ "--i": i } as CSSProperties}
              aria-current={(item.to === "/" ? pathname === "/" : isActivePath(pathname, item.match)) ? "page" : undefined}
            >
              <span>{pick(item.label)}</span>
            </Link>
          ))}
        </nav>

        <div className="mnav-foot">
          <Link to="/contact#devis" className="btn btn--light mnav-cta" onClick={close}>
            {pick({ fr: "Demander un devis", en: "Request a quote" })}
            <ArrowRight aria-hidden="true" />
          </Link>
          <ul className="mnav-contact">
            <li>
              <a href={CONTACT.phoneHref}>
                <Phone aria-hidden="true" />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref(pick(WHATSAPP_HELLO))} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <Mail aria-hidden="true" />
                {CONTACT.email}
              </a>
            </li>
          </ul>
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};

export default Header;
