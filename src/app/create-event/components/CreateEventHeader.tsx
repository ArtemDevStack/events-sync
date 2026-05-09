'use client';

import { CalendarDays, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CreateEventHeader() {
	const router = useRouter();
	return (
		<header className="border-b border-gray-200 bg-white">
			<div className="container-1728 flex items-center justify-between gap-4 py-4">
				<button
					type="button"
					onClick={() => router.push('/')}
					className="flex items-center gap-2 text-indigo-700"
				>
					<CalendarDays className="h-5 w-5" />
					<span className="text-xl font-semibold leading-7">EventSync</span>
				</button>

				<button
					type="button"
					onClick={() => router.push('/')}
					className="flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium leading-6 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
				>
					Отменить и выйти
					<X className="h-3 w-3" />
				</button>
			</div>
		</header>
	);
}
