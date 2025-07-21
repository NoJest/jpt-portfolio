"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 @[700px]:px-6">
        <nav className="flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-1 py-2 transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="size-5" />
          ) : (
            <MoonIcon className="size-5" />
          )}
        </button>
      </div>
    </header>
  );
}