import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { CONTACT, WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { useLang } from "@/lib/locale";
import { WhatsAppIcon } from "@/components/icons";
import "./ContactDock.css";

/**
 * The ways to reach COMET Maroc, kept at hand once the visitor scrolls past
 * the top of the page: a bar of three actions on phones, the WhatsApp button
 * on larger screens. Steps aside at the very end of the page, where the
 * footer gives the same lines.
 */
export const ContactDock = () => {
  const { pick } = useLang();
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const nearEnd = y + vh > document.documentElement.scrollHeight - 220;
      setShown(y > vh * 0.55 && !nearEnd);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // the phone bar's height, for the footer to keep its last line clear of it
  useEffect(() => {
    const root = document.documentElement;
    const phone = window.matchMedia("(max-width: 899px)").matches;
    root.style.setProperty("--dock-h", shown && phone ? "72px" : "0px");
  }, [shown]);

  if (pathname.startsWith("/__comet")) return null;

  const wa = whatsappHref(pick(WHATSAPP_HELLO));

  return (
    <>
      <a className="wa-fab" data-shown={shown || undefined} href={wa} target="_blank" rel="noopener noreferrer" aria-label={pick({ fr: "Écrire sur WhatsApp", en: "Message us on WhatsApp" })}>
        <WhatsAppIcon />
      </a>

      <nav className="dock" data-shown={shown || undefined} aria-label={pick({ fr: "Nous joindre", en: "Get in touch" })}>
        <a href={CONTACT.phoneHref}>
          <Phone aria-hidden="true" />
          {pick({ fr: "Appeler", en: "Call" })}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp
        </a>
        <Link to="/contact#devis" className="dock-main">
          {pick({ fr: "Devis", en: "Quote" })}
        </Link>
      </nav>
    </>
  );
};

export default ContactDock;
