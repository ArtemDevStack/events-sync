import { ChevronDown } from 'lucide-react';

export function CatalogToolbar() {
	return (
		<header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold leading-10 text-slate-800">Мероприятия</h1>
				<p className="text-sm font-normal leading-5 text-slate-500">
					Explore and manage upcoming events.
				</p>
			</div>

		</header>
	);
}
