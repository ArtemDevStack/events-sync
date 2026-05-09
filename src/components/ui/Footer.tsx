const LINKS = [
	{ label: 'Политика конфиденциальности', href: '/policy' },
	{ label: 'Условия использования', href: '/terms' },
	{ label: 'Центр поддержки', href: '/help' },
	{ label: 'API Docs', href: '/api-docs' },
];

export function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-slate-50">
			<div className="container-1728 flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
				<span className="text-lg font-extrabold leading-7 text-slate-400">EventSync</span>

				<div className="flex flex-wrap items-center justify-center gap-6">
					{LINKS.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-xs leading-4 text-slate-500 underline transition-colors hover:text-slate-700"
						>
							{link.label}
						</a>
					))}
				</div>

				<span className="text-xs leading-4 text-slate-500">
					© 2024 EventSync SaaS. Built for reliability.
				</span>
			</div>
		</footer>
	);
}
