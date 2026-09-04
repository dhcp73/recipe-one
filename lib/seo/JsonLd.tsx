import type { JsonLdObject } from "./jsonld";

/**
 * Server component that emits a JSON-LD script tag.
 * Stringifies safely so recipe text cannot break out of the <script> (XSS).
 */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const json = serializeJsonLd(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
