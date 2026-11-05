export const SITE_ORIGIN = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "https://www.comet.ma";

export const SITE_NAME = "COMET Maroc";

export const SITE_NAME_FULL = "COMET Maroc — Nacelles élévatrices";

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

/** Open Graph form (underscore); pages use the BCP 47 form "fr-MA" */
export const DEFAULT_LOCALE = "fr_MA";
