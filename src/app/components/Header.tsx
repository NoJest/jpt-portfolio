"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme} = useTheme(); 


  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl text-foreground dark:border-primary/20">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 @[700px]:px-6">
        <nav className="flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
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
        
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="
            retro-btn 
            dark:bg-transparent 
            dark:text-primary 
            dark:border-primary 
            dark:border 
            dark:shadow-[0_0_10px_var(--primary)] 
            dark:hover:bg-primary/10"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            <SunIcon className="size-5" />
          ) : (
            <MoonIcon className="size-5" />
          )}
        </button>
      </div>
    </header>
  );
}