import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[] | string;
  /** When true, skip the root title template (use on the homepage). */
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

/**
 * Consistent title, description, absolute canonical, Open Graph, and Twitter
 * metadata. Relies on layout `metadataBase` as a fallback for relative URLs.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords,
  absoluteTitle = false,
  ogType = "website",
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = image
    ? [{ url: image, alt: imageAlt || title }]
    : undefined;
  const keywordValue = Array.isArray(keywords)
    ? keywords.filter(Boolean)
    : keywords;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywordValue,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      title,
      description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
