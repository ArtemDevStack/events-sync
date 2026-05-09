import { Check, Coffee, Mic, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import type { EventModel, ProgramItem } from '@/app/core/store/eventsStore';
import { cn } from '@/lib/cn';

const ICONS: Record<ProgramItem['icon'], ComponentType<{ className?: string }>> = {
	coffee: Coffee,
	mic: Mic,
	users: Users,
};

export function EventProgram({ event }: { event: EventModel }) {
	if (event.program.length === 0) return null;

	return (
		<section className="flex flex-col gap-6">
			<h2 className="text-2xl font-bold leading-8 text-slate-800">Программа</h2>

			<ol className="relative flex flex-col gap-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-gray-200/0 before:via-gray-200 before:to-gray-200/0 sm:before:left-1/2 sm:before:-translate-x-1/2">
				{event.program.map((item, idx) => (
					<ProgramRow key={item.id} item={item} side={idx % 2 === 0 ? 'right' : 'left'} />
				))}
			</ol>
		</section>
	);
}

function ProgramRow({ item, side }: { item: ProgramItem; side: 'left' | 'right' }) {
	const Icon = ICONS[item.icon];
	const { time, title, description, done } = item;

	return (
		<li className="relative grid grid-cols-[40px_1fr] items-start gap-4 sm:grid-cols-2 sm:gap-10">
			<div
				className={cn(
					'order-1 row-start-1 flex justify-center sm:order-none',
					side === 'left' ? 'sm:col-start-1 sm:justify-end' : 'sm:col-start-2',
				)}
			>
				<div className="w-full rounded-xl bg-white p-5 shadow-[0px_4px_15px_-3px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-gray-200/50 sm:max-w-sm">
					<div className="flex flex-col gap-1">
						<span className="text-xs font-bold uppercase leading-3 tracking-wide text-indigo-700">
							{time}
						</span>
						<h3 className="text-xl font-semibold leading-7 text-slate-800">{title}</h3>
						<p className="pt-1 text-sm font-normal leading-5 text-slate-500">
							{description}
						</p>
					</div>
				</div>
			</div>

			<div className="order-0 row-start-1 flex justify-start pt-6 sm:absolute sm:left-1/2 sm:top-12 sm:-translate-x-1/2 sm:pt-0">
				<div
					className={cn(
						'flex h-10 w-10 items-center justify-center rounded-full outline outline-4 -outline-offset-4 outline-slate-50 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]',
						done ? 'bg-indigo-700 text-white' : 'bg-white text-slate-500',
					)}
				>
					{done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
				</div>
			</div>
		</li>
	);
}
