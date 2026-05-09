'use client';

'use client';

import { CatalogFilters } from './CatalogFilters';
import { CatalogList } from './CatalogList';
import { CatalogToolbar } from './CatalogToolbar';

export function CatalogContent() {
	return (
		<section className="bg-slate-50 py-8 lg:py-12">
			<div className="container-1728 flex flex-col gap-8">
				<CatalogToolbar />
				<div className="grid gap-6 lg:grid-cols-[300px_1fr]">
					<aside className="lg:sticky lg:top-24 lg:h-fit">
						<CatalogFilters />
					</aside>
					<CatalogList />
				</div>
			</div>
		</section>
	);
}
