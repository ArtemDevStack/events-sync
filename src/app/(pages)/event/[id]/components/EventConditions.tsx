import { ShieldCheck, Shirt } from 'lucide-react';
import type { ComponentType } from 'react';
import type { EventCondition, EventModel } from '@/app/core/store/eventsStore';

const ICONS: Record<EventCondition['icon'], ComponentType<{ className?: string }>> = {
	shirt: Shirt,
	shield: ShieldCheck,
};

export function EventConditions({ event }: { event: EventModel }) {
	if (event.conditions.length === 0) return null;

	return (
		<section className="flex flex-col gap-4 pb-8">
			<h2 className="text-2xl font-bold leading-8 text-slate-800">Условия участия</h2>
			<ul className="flex flex-col">
				{event.conditions.map(({ icon, title, description }) => {
					const Icon = ICONS[icon];
					return (
						<li
							key={title}
							className="flex items-start gap-3 rounded-lg bg-violet-50 p-4 outline outline-1 -outline-offset-1 outline-gray-200/30"
						>
							<Icon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-700" />
							<div className="flex flex-col">
								<h3 className="text-base font-semibold leading-6 text-slate-800">
									{title}
								</h3>
								<p className="text-sm font-normal leading-5 text-slate-500">
									{description}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
