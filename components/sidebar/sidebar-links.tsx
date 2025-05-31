import { CheckCircle2, House, Users } from 'lucide-react';
import Link from 'next/link';

const sidebarLinks = [
  {
    label: 'Home',
    icon: <House className='size-4' />,
    href: '/dashboard',
  },
  {
    label: 'My Tasks',
    icon: <CheckCircle2 className='size-4' />,
    href: '/tasks',
  },
  {
    label: 'Members',
    icon: <Users className='size-4' />,
    href: '/members',
  },
];

export default function SidebarLinks({
  closeSidebar,
}: {
  closeSidebar?: () => void;
}) {
  return (
    <ul>
      {sidebarLinks.map((link) => (
        <Link
          href={link.href}
          key={link.label}
          className='flex items-center gap-2 p-2 text-muted-foreground hover:text-neutral-100 rounded transition-colors duration-200'
          onClick={closeSidebar} // Close sidebar on click if closeSidebar is provided
        >
          <li className='flex items-center gap-3'>
            {link.icon}
            <span>{link.label}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
