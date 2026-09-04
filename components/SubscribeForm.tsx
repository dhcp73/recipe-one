"use client";

import { FormEvent, useState } from "react";

export function SubscribeForm({
  idPrefix = "sub",
  compact = false,
}: {
  idPrefix?: string;
  compact?: boolean;
}) {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="page-sub" role="status">
        Thanks — this is a mock signup. Nothing was sent.
      </p>
    );
  }

  if (compact) {
    return (
      <form className="footer-news-form" onSubmit={onSubmit}>
        <label className="visually-hidden" htmlFor={`${idPrefix}-email`}>
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <button type="submit" className="btn-primary footer-news-btn">
          Join
        </button>
      </form>
    );
  }

  return (
    <form className="subscribe-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={`${idPrefix}-name`}>
        Name
      </label>
      <input
        id={`${idPrefix}-name`}
        type="text"
        name="name"
        placeholder="Your name"
        autoComplete="name"
      />
      <label className="sr-only" htmlFor={`${idPrefix}-email`}>
        Email
      </label>
      <input
        id={`${idPrefix}-email`}
        type="email"
        name="email"
        placeholder="Email address"
        autoComplete="email"
        required
      />
      <button className="btn-primary" type="submit">
        Subscribe
      </button>
    </form>
  );
}
