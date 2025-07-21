'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
const pathname = usePathname();

const links = [
{ name: 'Home', path: '/' },
{ name: 'About', path: '/about' },
{ name: 'Projects', path: '/projects' },
{ name: 'Contact', path: '/contact' },
];

return (
<header className="py-6 border-b border-gray-200 dark:border-gray-700">
<nav className="flex gap-6">
{links.map((link) => (
<Link
key={link.path}
href={link.path}
className={`${pathname === link.path ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
>
{link.name}
</Link>
))}
</nav>
</header>
);
}