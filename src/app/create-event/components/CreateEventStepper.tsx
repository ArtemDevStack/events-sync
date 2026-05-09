import { cn } from '@/lib/cn';

const STEPS = [
	{ id: 1, label: 'Основная' },
	{ id: 2, label: 'Дата и место' },
	{ id: 3, label: 'Участники' },
	{ id: 4, label: 'Публикация' },
];

export function CreateEventStepper({ currentStep }: { currentStep: number }) {
	return (
		<div className="relative flex items-start justify-between px-2">
			<div
				aria-hidden
				className="absolute left-2 right-2 top-4 h-1 -translate-y-1/2 rounded-full bg-gray-200"
			/>
			{STEPS.map((step) => {
				const isActive = step.id === currentStep;
				const isDone = step.id < currentStep;
				return (
					<div
						key={step.id}
						className="relative z-10 flex flex-col items-center gap-2 bg-slate-50 px-1"
					>
						<div
							className={cn(
								'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold leading-5 shadow-[0px_0px_0px_4px_rgba(248,250,252,1.00)] transition-colors',
								isActive || isDone
									? 'bg-indigo-700 text-white'
									: 'bg-gray-200 text-slate-500',
							)}
						>
							{step.id}
						</div>
						<span
							className={cn(
								'text-xs font-bold uppercase leading-3 tracking-wide',
								isActive || isDone ? 'text-indigo-700' : 'text-slate-500',
							)}
						>
							{step.label}
						</span>
					</div>
				);
			})}
		</div>
	);
}
