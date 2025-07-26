"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl text-foreground dark:border-primary/20">
      <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto px-4 @[700px]:px-6">
        <div className="flex items-center gap-6">
          <button
            className="md:hidden p-2 rounded-full hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <Cross1Icon className="h-5 w-5" />
            ) : (
              <HamburgerMenuIcon className="h-5 w-5" />
            )}
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-1 py-2 transition-colors ${
                  pathname === link.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-foreground/60 hover:text-foreground dark:text-foreground/60 dark:hover:text-foreground"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/NoJest"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground/60 hover:text-foreground dark:text-foreground/60 dark:hover:text-foreground rounded-full hover:bg-muted"
            aria-label="GitHub"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/justin-thomasson-09b7278a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground/60 hover:text-foreground dark:text-foreground/60 dark:hover:text-foreground rounded-full hover:bg-muted"
            aria-label="LinkedIn"
          >
            <LinkedInLogoIcon className="h-5 w-5" />
          </Link>
          
          {/* Theme Toggle */}
          {mounted ? (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted text-foreground/60 hover:text-foreground dark:text-foreground/60 dark:hover:text-foreground"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9"></div>
          )}
        </div>

        {/* Mobile menu - appears below header */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-t border-border shadow-lg md:hidden">
            <nav className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-3 hover:bg-muted text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}