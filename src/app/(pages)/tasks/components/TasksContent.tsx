'use client';

import { useTasksStore } from '@/app/core/store/tasksStore';
import { KanbanBoard } from './KanbanBoard';

export function TasksContent() {
	const tasks = useTasksStore((s) => s.tasks);

	return (
		<section className="bg-slate-50 py-8 lg:py-12">
			<div className="container-1728 flex flex-col gap-8">
				<header className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold leading-8 text-slate-800">
						Доска задач
					</h1>
					<p className="text-base leading-6 text-slate-500">
						Перетаскивайте задачи между колонками, чтобы менять их статус.
					</p>
				</header>
				<KanbanBoard tasks={tasks} />
			</div>
		</section>
	);
}
