import Link from "next/link";
import { SubscribeForm } from "./SubscribeForm";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-col footer-brand">
          <Link className="footer-logo" href="/">
            Uncommon Kitchen
          </Link>
          <p>
            Technique-forward recipes that teach why they work — Cook Mode, Chef
            AI, and kits that turn a plate into dinner.
          </p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link href="/recipes">Recipes</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/chef">Chef AI</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-col">
          <h4>Browse</h4>
          <Link href="/categories/continent">Continent</Link>
          <Link href="/categories/country">Country</Link>
          <Link href="/categories/type">Food type</Link>
          <Link href="/categories/diet-occasion">Diet &amp; occasion</Link>
        </div>
        <div className="footer-col">
          <h4>Popular</h4>
          <Link href="/categories/country/india">India</Link>
          <Link href="/categories/country/italy">Italy</Link>
          <Link href="/categories/diet-occasion/vegan">Vegan</Link>
          <Link href="/categories/type/breakfast">Breakfast</Link>
          <Link href="/categories/diet-occasion/summer">Summer</Link>
          <Link href="/categories/diet-occasion/for-kids">For kids</Link>
        </div>
        <div className="footer-col footer-news">
          <h4>Newsletter</h4>
          <p>Weekly technique notes — mock signup.</p>
          <SubscribeForm idPrefix="footer" compact />
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© 2026 Uncommon Kitchen</span>
        <span className="footer-sep">·</span>
        <span>
          Affiliate disclosure: product links may earn a commission at no extra
          cost to you.
        </span>
      </div>
    </footer>
  );
}
