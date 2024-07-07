'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';
import { siteConfig } from '@/config/site';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { Button } from '../ui/button';
import { useSigninModal } from '@/hooks/use-signin-modal';
import { MarketingMenu } from './mobile-menu';
import { User } from 'next-auth';
import { MainNavItem } from '@/types';
import { UserAccountNav } from './user-account-nav';

interface NavBarProps {
    user: Pick<User, 'name' | 'image' | 'email'> | undefined;
    items?: MainNavItem[];
    children?: React.ReactNode;
    rightElements?: React.ReactNode;
    scroll?: boolean;
}

export default function SiteHeader({
    user,
    items,
    children,
    rightElements,
    scroll = false,
}: NavBarProps) {
    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();
    const signInModal = useSigninModal();

    return (
        <header
            className={cn('grid w-full grid-cols-2 gap-2 md:grid-cols-5 py-5')}
        >
            <div className="flex items-center md:col-span-1 mx-10">
                <Link href="/" className="items-center space-x-2 md:flex">
                    <Icons.brain className="text-primary" />
                    <span className="hidden mx-2 font-urban text-xl font-bold sm:inline-block">
                        {siteConfig.name}
                    </span>
                </Link>
            </div>
            <div className="border-border mx-auto hidden items-center justify-center rounded-full border px-2 backdrop-blur-[2px] md:col-span-3 md:flex md:gap-1">
                {items.map(({ href, title }) => {
                    const isExternal = href.startsWith('http');
                    const externalProps = isExternal
                        ? { target: '_blank' }
                        : {};
                    const isActive = pathname.startsWith(href);
                    return (
                        <Button
                            key={title}
                            variant="link"
                            className={isActive ? 'font-semibold' : undefined}
                            asChild
                        >
                            <Link href={href} {...externalProps}>
                                <span className="text-black">{title}</span>
                            </Link>
                        </Button>
                    );
                })}
            </div>
            <div className="flex items-center gap-3 md:col-span-1">
                <div className="block md:hidden">
                    <MarketingMenu items={items} />
                </div>
                {user ? (
                    <UserAccountNav user={user} />
                ) : (
                    <Button
                        className="rounded-full"
                        onClick={signInModal.onOpen}
                    >
                        <span>Sign In</span>
                    </Button>
                )}
            </div>
        </header>
    );
}