import type { Metadata } from "next";
import { ChefChat } from "@/components/ChefChat";
import { JsonLd } from "@/lib/seo/JsonLd";
import { webPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Chef AI";
const DESCRIPTION =
  "Ask Uncommon Chef about substitutions, scaling, gear, and weeknight shortcuts.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/chef",
});

export default function ChefPage() {
  return (
    <main className="wrap">
      <JsonLd
        data={webPageJsonLd({
          title: TITLE,
          description: DESCRIPTION,
          path: "/chef",
        })}
      />
      <ChefChat />
    </main>
  );
}
