import { CheckCircle2, Download, Ticket } from 'lucide-react';
import type { EventModel } from '@/app/core/store/eventsStore';

export function TicketCard({ event }: { event: EventModel }) {
	return (
		<div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-[0px_8px_30px_-4px_rgba(0,0,0,0.10)] outline outline-1 -outline-offset-1 outline-gray-200">
			<div className="flex flex-col items-center gap-4 border-b border-gray-200/50 pb-6">
				<div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
					<CheckCircle2 className="h-7 w-7 text-emerald-500" />
				</div>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="text-2xl font-bold leading-8 text-slate-800">
						Вы зарегистрированы
					</h3>
					<p className="text-sm font-normal leading-5 text-slate-500">
						Ваш билет отправлен на email.
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<dl className="flex flex-col gap-3">
					<div className="flex items-center justify-between border-b border-gray-200/30 pb-3">
						<dt className="text-sm font-normal leading-5 text-slate-500">Стоимость</dt>
						<dd className="text-sm font-semibold leading-5 text-slate-800">
							{event.price}
						</dd>
					</div>
					<div className="flex items-center justify-between border-b border-gray-200/30 pb-3">
						<dt className="text-sm font-normal leading-5 text-slate-500">Участник</dt>
						<dd className="text-sm font-semibold leading-5 text-slate-800">
							Иван Иванов
						</dd>
					</div>
				</dl>

				<button
					type="button"
					className="flex items-center justify-center gap-2 rounded-lg bg-violet-50 px-4 py-3 text-base font-semibold leading-6 text-slate-500"
					disabled
				>
					<Ticket className="h-4 w-4" />
					Место забронировано
				</button>
				<button
					type="button"
					className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold leading-6 text-indigo-700 outline outline-1 -outline-offset-1 outline-gray-500/30 transition-colors hover:bg-indigo-50"
				>
					<Download className="h-3.5 w-3.5" />
					Скачать билет
				</button>
			</div>
		</div>
	);
}
