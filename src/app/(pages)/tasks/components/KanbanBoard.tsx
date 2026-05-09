'use client';

import { useMemo, useState } from 'react';
import {
	DndContext,
	DragOverlay,
	closestCorners,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	useDroppable,
	type DragEndEvent,
	type DragStartEvent,
} from '@dnd-kit/core';
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useTasksStore, type Task, type ColumnId } from '@/app/core/store/tasksStore';

const COLUMNS: { id: ColumnId; label: string; color: string; icon: React.ReactNode }[] = [
	{
		id: 'planned',
		label: 'Запланировано',
		color: 'border-slate-300',
		icon: <Clock className="h-4 w-4 text-slate-500" />,
	},
	{
		id: 'in_progress',
		label: 'В работе',
		color: 'border-indigo-400',
		icon: <AlertCircle className="h-4 w-4 text-indigo-500" />,
	},
	{
		id: 'done',
		label: 'Готово',
		color: 'border-emerald-400',
		icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
	},
];

const PRIORITY_STYLES: Record<Task['priority'], { badge: string; label: string }> = {
	low: { badge: 'bg-slate-100 text-slate-600', label: 'Низкий' },
	medium: { badge: 'bg-amber-50 text-amber-600', label: 'Средний' },
	high: { badge: 'bg-red-50 text-red-600', label: 'Высокий' },
};

function KanbanTaskCard({
	task,
	isOverlay,
}: {
	task: Task;
	isOverlay?: boolean;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id, data: { task } });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
				isDragging ? 'opacity-50' : ''
			} ${isOverlay ? 'rotate-2 shadow-xl' : ''}`}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-2">
					<button
						type="button"
						{...attributes}
						{...listeners}
						className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
					>
						<GripVertical className="h-4 w-4" />
					</button>
					<span
						className={`rounded-full px-2 py-0.5 text-xs font-semibold leading-4 ${
							PRIORITY_STYLES[task.priority].badge
						}`}
					>
						{PRIORITY_STYLES[task.priority].label}
					</span>
				</div>
			</div>

			<h4 className="text-sm font-semibold leading-5 text-slate-800">{task.title}</h4>
			<p className="text-xs leading-4 text-slate-500">{task.description}</p>

			<div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
				<div className="flex items-center gap-1.5">
					<Calendar className="h-3 w-3" />
					{task.date}
				</div>
				{task.assignee ? (
					<div className="flex items-center gap-1.5">
						<img
							src={task.assignee}
							alt=""
							className="h-5 w-5 rounded-full object-cover"
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

function KanbanColumn({
	status,
	tasks,
	activeId,
}: {
	status: ColumnId;
	tasks: Task[];
	activeId: string | null;
}) {
	const column = COLUMNS.find((c) => c.id === status)!;
	const { setNodeRef: setDroppableRef, isOver } = useDroppable({
		id: status,
		data: { type: 'column', columnId: status },
	});

	return (
		<div
			ref={setDroppableRef}
			className={`flex flex-1 flex-col gap-4 rounded-xl border-t-4 ${column.color} bg-slate-100/50 p-4 transition-colors ${
				isOver ? 'bg-slate-200/80' : ''
			}`}
		>
			<div className="flex items-center gap-2 pb-2">
				{column.icon}
				<h3 className="text-sm font-semibold leading-5 text-slate-700">{column.label}</h3>
				<span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
					{tasks.length}
				</span>
			</div>

			<SortableContext
				items={tasks.map((t) => t.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className="flex min-h-[120px] flex-col gap-3">
					{tasks.map((task) =>
						task.id === activeId ? null : (
							<KanbanTaskCard key={task.id} task={task} />
						)
					)}
				</div>
			</SortableContext>
		</div>
	);
}

export function KanbanBoard({ tasks }: { tasks: Task[] }) {
	const moveTask = useTasksStore((s) => s.moveTask);
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const [activeId, setActiveId] = useState<string | null>(null);

	const activeTask = useMemo(
		() => tasks.find((t) => t.id === activeId) ?? null,
		[tasks, activeId]
	);

	const tasksByColumn = useMemo(() => {
		return COLUMNS.reduce(
			(acc, col) => {
				acc[col.id] = tasks.filter((t) => t.columnId === col.id);
				return acc;
			},
			{} as Record<ColumnId, Task[]>
		);
	}, [tasks]);

	function handleDragStart(event: DragStartEvent) {
		setActiveId(event.active.id as string);
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		setActiveId(null);

		if (!over) return;

		const overId = over.id as string;

		// If dropped over a column header (which is not sortable)
		const overColumn = COLUMNS.find((c) => c.id === overId);
		if (overColumn) {
			moveTask(active.id as string, overColumn.id, null);
			return;
		}

		// If dropped over another task
		const overTask = tasks.find((t) => t.id === overId);
		if (overTask && overTask.id !== active.id) {
			moveTask(active.id as string, overTask.columnId, overTask.id);
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{COLUMNS.map((col) => (
					<KanbanColumn
						key={col.id}
						status={col.id}
						tasks={tasksByColumn[col.id]}
						activeId={activeId}
					/>
				))}
			</div>
			<DragOverlay>
				{activeTask ? <KanbanTaskCard task={activeTask} isOverlay /> : null}
			</DragOverlay>
		</DndContext>
	);
}
