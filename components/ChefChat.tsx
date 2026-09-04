"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Msg = { role: "bot" | "user"; text: string };

const STARTER: Msg[] = [
  {
    role: "bot",
    text: "Hi — I am locked to Uncommon Kitchen technique. Ask about the duck, a swap, or how to make tonight faster.",
  },
  {
    role: "user",
    text: "I do not have fermented plum — what can I use instead?",
  },
  {
    role: "bot",
    text: "You want acid + a little sweetness to cut the duck richness. Try a quick pickle of chopped ripe plum with rice vinegar and salt, cherry mostarda with lemon, or cornichons + shallot + honey. Keep the brown sugar light.",
  },
];

const REPLIES: Record<string, string> = {
  "Substitute for fermented plum?":
    "Use chopped ripe plum or plum jam thinned with rice vinegar and a pinch of salt. Cherry mostarda or cranberry + lemon also works.",
  "Scale to 2 servings":
    "For 2 servings use 1 large breast (or 2 small). Render 7–8 min, flip + honey, pull at 57°C. Relish while the pan heats.",
  "Make it weeknight-fast":
    "Skip the fridge dry — pat very dry instead. Total active time about 25 minutes. Open Cook Mode on the recipe for the shortened list.",
  "What pan do I need?":
    "A 10–12 inch cast-iron or heavy stainless skillet. Even heat matters more than brand.",
  "Generate a shopping list":
    "Duck breasts, wildflower honey, smoked paprika, fermented plums (or ripe plums + vinegar), shallot, soft herbs, optional wood chips.",
};

export function ChefChat() {
  const [messages, setMessages] = useState<Msg[]>(STARTER);
  const [input, setInput] = useState("");

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const reply =
      REPLIES[q] ||
      "Mock Chef AI: I can help with swaps, scaling, gear, and shopping lists for Uncommon Kitchen recipes. Try a suggestion chip.";
    setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: reply }]);
    setInput("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="bot-layout">
      <section className="chat-panel" aria-label="Chef AI chat">
        <div className="chat-header">
          <div className="chat-avatar" aria-hidden="true">
            ★
          </div>
          <div>
            <h1>Uncommon Chef</h1>
            <p>Ask substitutions, scaling, gear, or weeknight shortcuts</p>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={`${m.role}-${i}`} className={`msg msg-${m.role}`}>
              <div className="msg-meta">{m.role === "bot" ? "Uncommon Chef" : "You"}</div>
              {m.text}
            </div>
          ))}
        </div>
        <div className="suggestion-chips">
          {Object.keys(REPLIES).map((q) => (
            <button key={q} type="button" className="chip" onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>
        <form className="chat-input-bar" onSubmit={onSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Uncommon Chef…"
            aria-label="Message"
            autoComplete="off"
          />
          <button type="submit" className="chat-send" aria-label="Send">
            Send
          </button>
        </form>
      </section>
      <aside className="bot-side">
        <h2>Context</h2>
        <p className="page-sub">
          Mock assistant locked to Uncommon Kitchen recipes — try the{" "}
          <Link href="/recipes/smoked-honey-duck-with-fermented-plum">
            Smoked Honey Duck
          </Link>
          .
        </p>
      </aside>
    </div>
  );
}
