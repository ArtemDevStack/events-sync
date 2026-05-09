'use client';

import { Bell, Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
	{ href: '/', label: 'Главная', match: (p: string) => p === '/' },
	{ href: '/catalog', label: 'Мероприятия', match: (p: string) => p.startsWith('/catalog') },
	{ href: '/profile', label: 'Профиль', match: (p: string) => p.startsWith('/profile') },
	{ href: '/tasks', label: 'Доска задач', match: (p: string) => p.startsWith('/tasks') },
];

export function Header() {
	const pathname = usePathname();
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
			<div className="container-1728 flex items-center justify-between gap-6 py-3">
				<button
					type="button"
					onClick={() => router.push('/')}
					className="text-xl font-extrabold leading-7 text-indigo-600"
				>
					EventSync
				</button>

				<nav className="hidden items-center gap-8 lg:flex">
					{NAV_ITEMS.map((item) => {
						const isActive = item.match(pathname ?? '');
						return (
							<button
								key={item.href}
								type="button"
								onClick={() => router.push(item.href)}
								className={cn(
									'cursor-pointer border-b-2 border-transparent rounded px-2 py-1 text-base leading-6 transition-colors',
									isActive
										? 'border-indigo-600 font-semibold text-indigo-600'
										: 'font-normal text-slate-600 hover:bg-slate-100 hover:text-slate-800',
								)}
							>
								{item.label}
							</button>
						);
					})}
				</nav>

				<div className="flex items-center gap-2 sm:gap-4">
					<button
						type="button"
						aria-label="Поиск"
						className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
					>
						<Search className="h-5 w-5" />
					</button>
					<button
						type="button"
						aria-label="Уведомления"
						className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
					>
						<Bell className="h-5 w-5" />
					</button>
					<img
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces"
						alt="Аватар"
						className="h-8 w-8 rounded-full border border-slate-200 object-cover"
					/>
					<button
						type="button"
						aria-label="Меню"
						className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
						onClick={() => setIsMenuOpen(true)}
					>
						<Menu className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Mobile burger menu overlay */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 bg-white lg:hidden">
					<div className="container-1728 flex items-center justify-between py-3">
						<span className="text-xl font-extrabold leading-7 text-indigo-600">EventSync</span>
						<button
							type="button"
							aria-label="Закрыть меню"
							className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
							onClick={() => setIsMenuOpen(false)}
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					<nav className="flex flex-col items-center gap-6 pt-12">
						{NAV_ITEMS.map((item) => {
							const isActive = item.match(pathname ?? '');
							return (
								<button
									key={item.href}
									type="button"
									onClick={() => {
										router.push(item.href);
										setIsMenuOpen(false);
									}}
									className={cn(
										'cursor-pointer text-lg transition-colors',
										isActive
											? 'font-semibold text-indigo-600'
											: 'rounded px-2 py-1 font-normal text-slate-600 hover:bg-slate-100 hover:text-slate-800',
									)}
								>
									{item.label}
								</button>
							);
						})}
					</nav>
				</div>
			)}
		</header>
	);
}
