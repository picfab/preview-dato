export type SiteLocale = "en" | "fr" | "es";

export const findProductionUri = (
  locale: SiteLocale,
  postType: string,
  slug: string,
): string | undefined => {
  if (!locale || !postType || !slug) return;

  const i18nLocalePath = locale === "en" ? "" : `${locale}/`;
  if (slug === "home") {
    return i18nLocalePath;
  }

  if (
    [
      "blog_home",
      "category_page",
      "sub_category_page",
      "blog_article",
    ].includes(postType)
  ) {
    if ("blog_home" === postType) return `${i18nLocalePath}${slug}/`;
    let originSlug = "blog";
    if (locale === "fr") originSlug = "fiches-pratiques";
    if (locale === "es") originSlug = "contenido-practico";
    return `${i18nLocalePath}${originSlug}/${slug}/`;
  }

  if (["client_page"].includes(postType)) {
    let originSlug = "clients";
    if (locale === "fr") originSlug = "clients";
    if (locale === "es") originSlug = "clientes";
    return `${i18nLocalePath}${originSlug}/${slug}/`;
  }

  if (["fr", "es"].includes(locale)) {
    return `${i18nLocalePath}${slug}/`;
  } else {
    return `${i18nLocalePath}${slug}/`;
  }
};
