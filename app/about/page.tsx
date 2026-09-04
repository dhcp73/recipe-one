import type { Metadata } from "next";
import { JsonLd } from "@/lib/seo/JsonLd";
import { webPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "About";
const DESCRIPTION =
  "Uncommon Kitchen pairs clear recipe structure with the technique depth of a cooking school.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="wrap">
      <JsonLd
        data={webPageJsonLd({
          title: TITLE,
          description: DESCRIPTION,
          path: "/about",
          type: "AboutPage",
        })}
      />
      <h1>About Uncommon Kitchen</h1>
      <p className="page-sub">
        A solid cooking site for people who want restaurant-level results — with
        beginner detail and modern tools.
      </p>

      <div className="about-prose">
        <p>
          Uncommon Kitchen pairs clear recipe structure with the technique depth
          of a cooking school. We publish <strong>unique recipes</strong> — not
          clones of the same weeknight chicken — and we explain <em>why</em> each
          method works.
        </p>
        <p>
          Every recipe is beginner-friendly: grouped ingredients, titled steps,
          thermometer targets, and tips when things go sideways. Affiliate gear
          links help fund the project.
        </p>
        <p>
          We are building <strong>AI-assisted photos, technique video, Cook Mode,
          and Chef AI chat</strong>{" "}
          so every plate is easy to visualize and cook from — on phone or
          desktop. Until the media library is complete, the teaching still lives
          in the words.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-stat">
          <strong>Unique</strong>
          <span>Recipes you will not find cloned everywhere</span>
        </div>
        <div className="about-stat">
          <strong>Teal</strong>
          <span>Brand accent #0F6B5C — clear, calm, credible</span>
        </div>
        <div className="about-stat">
          <strong>AI media</strong>
          <span>Plating stills + technique clips in progress</span>
        </div>
      </div>

      <div className="about-pillars">
        <div className="about-pillar">
          <h3>Beginner detail</h3>
          <p>
            Sensory cues, exact temps, and what to do if the pan is too hot or the
            relish tastes flat.
          </p>
        </div>
        <div className="about-pillar">
          <h3>Why it works</h3>
          <p>
            Every featured recipe opens with the science and craft behind the
            method — not fluff.
          </p>
        </div>
        <div className="about-pillar">
          <h3>Cook Mode + Chef AI</h3>
          <p>
            Step-focused phone UI and a chat that answers swaps, scaling, and
            shopping lists.
          </p>
        </div>
        <div className="about-pillar">
          <h3>Scale, pantry, shop</h3>
          <p>
            Servings scaler, pantry check, and kit commerce so the recipe becomes
            dinner without friction.
          </p>
        </div>
      </div>
    </main>
  );
}
