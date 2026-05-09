import { ArrowRight, Calendar, ChevronRight, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ProfileEventStatus = 'published' | 'draft' | 'completed';

type ProfileEvent = {
	id: string;
	title: string;
	date: string;
	description: string;
	image?: string;
	status: ProfileEventStatus;
	footer:
		| { kind: 'attendance'; current: number; max: number }
		| { kind: 'progress'; percent: number }
		| { kind: 'visited'; count: number };
};

const EVENTS: ProfileEvent[] = [
	{
		id: '1',
		title: 'Ежегодная Конференция Разработчиков 2024',
		date: '24 Октября, 2024',
		description: 'Масштабное событие для frontend и backend инженеров с…',
		image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=302&h=170&fit=crop',
		status: 'published',
		footer: { kind: 'attendance', current: 1200, max: 1500 },
	},
	{
		id: '2',
		title: 'Мастер-класс по Product Design',
		date: 'Дата не назначена',
		description: 'Практический воркшоп по созданию пользовательских…',
		status: 'draft',
		footer: { kind: 'progress', percent: 60 },
	},
	{
		id: '3',
		title: 'Осенний Нетворкинг Миксер',
		date: '12 Сентября, 2024',
		description: 'Закрытая встреча для инвесторов и стартапов серии А',
		image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=302&h=170&fit=crop',
		status: 'completed',
		footer: { kind: 'visited', count: 340 },
	},
];

const STATUS_BADGE: Record<ProfileEventStatus, { label: string; dot: string; bg: string; text: string }> = {
	published: {
		label: 'Опубликовано',
		dot: 'bg-emerald-500',
		bg: 'bg-white/90',
		text: 'text-slate-800',
	},
	draft: {
		label: 'Черновик',
		dot: 'bg-slate-400',
		bg: 'bg-slate-200/90',
		text: 'text-slate-500',
	},
	completed: {
		label: 'Завершено',
		dot: 'bg-red-500',
		bg: 'bg-white/90',
		text: 'text-slate-800',
	},
};

export function ProfileEvents() {
	const router = useRouter();
	return (
		<section className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold leading-8 text-slate-800">Недавние мероприятия</h2>
				<button
					type="button"
					onClick={() => router.push('/catalog')}
					className="flex items-center gap-1 text-sm font-normal leading-5 text-indigo-700 transition-colors hover:text-indigo-900"
				>
					Смотреть все
					<ChevronRight className="h-3 w-3" />
				</button>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{EVENTS.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</div>
		</section>
	);
}

function EventCard({ event }: { event: ProfileEvent }) {
	const badge = STATUS_BADGE[event.status];

	return (
		<article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_15px_-5px_rgba(0,0,0,0.05)] outline outline-1 -outline-offset-1 outline-slate-300/20">
			<div className="relative h-44 bg-violet-100">
				{event.image && (
					<img
						src={event.image}
						alt={event.title}
						className={`h-full w-full object-cover ${event.status === 'completed' ? 'opacity-80' : ''}`}
					/>
				)}
				<span
					className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold leading-3 tracking-wide shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] backdrop-blur-sm ${badge.bg} ${badge.text}`}
				>
					<span className={`h-2 w-2 rounded-full ${badge.dot}`} />
					{badge.label}
				</span>
			</div>

			<div className="flex flex-1 flex-col p-6">
				<div className="flex items-center gap-2 pb-2 text-sm font-normal leading-5 text-slate-500">
					<Calendar className="h-3.5 w-3.5" />
					{event.date}
				</div>
				<h3 className="pb-2 text-xl font-semibold leading-7 text-slate-800">{event.title}</h3>
				<p className="pb-4 text-base font-normal leading-6 text-slate-500">
					{event.description}
				</p>

				<div className="mt-auto flex items-center justify-between border-t border-slate-300/20 pt-4">
					<EventFooter footer={event.footer} />
					<EventAction status={event.status} />
				</div>
			</div>
		</article>
	);
}

function EventFooter({ footer }: { footer: ProfileEvent['footer'] }) {
	if (footer.kind === 'attendance') {
		return (
			<span className="flex items-center gap-1.5 text-sm font-normal leading-5 text-slate-800">
				<Users className="h-3.5 w-3.5 text-slate-500" />
				{footer.current.toLocaleString('ru-RU')} / {footer.max.toLocaleString('ru-RU')}
			</span>
		);
	}
	if (footer.kind === 'progress') {
		return (
			<span className="text-sm font-normal leading-5 text-slate-500">
				Заполнено на {footer.percent}%
			</span>
		);
	}
	return (
		<span className="flex items-center gap-1.5 text-sm font-normal leading-5 text-slate-800">
			<Users className="h-3.5 w-3.5 text-slate-500" />
			{footer.count} посетили
		</span>
	);
}

function EventAction({ status }: { status: ProfileEventStatus }) {
	if (status === 'draft') {
		return (
			<button
				type="button"
				className="rounded-lg px-3 py-1.5 text-sm font-normal leading-5 text-indigo-700 hover:bg-indigo-50"
			>
				Продолжить
			</button>
		);
	}
	if (status === 'completed') {
		return (
			<button
				type="button"
				className="rounded-lg px-3 py-1.5 text-sm font-normal leading-5 text-slate-500 hover:bg-slate-100"
			>
				Отчет
			</button>
		);
	}
	return (
		<button
			type="button"
			aria-label="Открыть мероприятие"
			className="rounded-lg p-2 text-indigo-700 hover:bg-indigo-50"
		>
			<ArrowRight className="h-4 w-4" />
		</button>
	);
}
