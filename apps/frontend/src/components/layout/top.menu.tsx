'use client';

import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useUser } from '@gitroom/frontend/components/layout/user.context';

export const menuItems = [
  {
    name: 'Analytics',
    icon: 'analytics',
    path: '/analytics',
  },
  {
    name: 'Launches',
    icon: 'launches',
    path: '/launches',
  },
  {
    name: 'Settings',
    icon: 'settings',
    path: '/settings',
    role: ['ADMIN', 'SUPERADMIN'],
  },
  {
    name: 'Marketplace',
    icon: 'marketplace',
    path: '/marketplace',
  },
  {
    name: 'Messages',
    icon: 'messages',
    path: '/messages',
  },
  {
    name: 'Billing',
    icon: 'billing',
    path: '/billing',
    role: ['ADMIN', 'SUPERADMIN'],
    requireBilling: true,
  },
];

export const TopMenu: FC = () => {
  const path = usePathname();
  const user = useUser();

  return (
    <div className="flex flex-col h-full animate-normalFadeDown">
      <ul className="gap-5 flex flex-1 items-center text-[18px]">
        {menuItems
          .filter((f) => {
            if (f.requireBilling && process.env.isBillingEnabled === 'false') {
              return false;
            }
            if (f.role) {
              return f.role.includes(user?.role!);
            }
            return true;
          })
          .map((item, index) => (
            <li key={item.name}>
              <Link
                prefetch={true}
                href={item.path}
                className={clsx(
                  'flex gap-2 items-center box',
                  menuItems
                    .filter((f) => {
                      if (f.role) {
                        return f.role.includes(user?.role!);
                      }
                      return true;
                    })
                    .map((p) => (path.indexOf(p.path) > -1 ? index : -1))
                    .indexOf(index) === index
                    ? 'text-primary showbox'
                    : 'text-gray'
                )}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
