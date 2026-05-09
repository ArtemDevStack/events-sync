

import { create } from 'zustand';

export type TaskPriority = 'low' | 'medium' | 'high';
export type ColumnId = 'planned' | 'in_progress' | 'done';

export type Task = {
	id: string;
	columnId: ColumnId;
	title: string;
	description: string;
	priority: TaskPriority;
	date: string;
	assignee?: string;
};

type State = {
	tasks: Task[];
	moveTask: (id: string, targetColumn: ColumnId, beforeTaskId?: string | null) => void;
};

const INITIAL: Task[] = [
	{
		id: 't1',
		columnId: 'planned',
		title: 'Finalize Keynote Speaker Contracts',
		description: 'Ensure all technical requirements and travel arrangements are confirmed.',
		priority: 'high',
		date: 'Oct 15',
		assignee: 'https://placehold.co/24x24?text=A',
	},
	{
		id: 't2',
		columnId: 'planned',
		title: 'Order VIP Swag Bags',
		description: 'Coordinate with vendor for custom branded items for 50 VIP attendees.',
		priority: 'medium',
		date: 'Oct 20',
		assignee: 'https://placehold.co/24x24?text=B',
	},
	{
		id: 't3',
		columnId: 'planned',
		title: 'Draft Post-Event Survey',
		description: 'Create Typeform for attendee feedback regarding sessions and catering.',
		priority: 'low',
		date: 'Nov 01',
	},
	{
		id: 't4',
		columnId: 'in_progress',
		title: 'Negotiate Catering Contract',
		description: 'Finalize menu options and dietary restrictions for 1500 attendees.',
		priority: 'medium',
		date: 'Oct 18',
		assignee: 'https://placehold.co/24x24?text=C',
	},
	{
		id: 't5',
		columnId: 'in_progress',
		title: 'Set Up Event Website',
		description: 'Deploy landing page and registration form on event domain.',
		priority: 'high',
		date: 'Oct 16',
		assignee: 'https://placehold.co/24x24?text=D',
	},
	{
		id: 't6',
		columnId: 'done',
		title: 'Approve Sponsor Pitch Deck',
		description: 'Reviewed by marketing and legal teams. Ready for distribution.',
		priority: 'high',
		date: 'Oct 10',
		assignee: 'https://placehold.co/24x24?text=E',
	},
	{
		id: 't7',
		columnId: 'done',
		title: 'Book Conference Venue',
		description: 'Main hall and 4 breakout rooms confirmed at Expocentre.',
		priority: 'high',
		date: 'Sep 28',
		assignee: 'https://placehold.co/24x24?text=F',
	},
];

export const useTasksStore = create<State>((set) => ({
	tasks: INITIAL,
	moveTask: (id, targetColumn, beforeTaskId) =>
		set((state) => {
			const moved = state.tasks.find((t) => t.id === id);
			if (!moved) return state;

			const without = state.tasks.filter((t) => t.id !== id);
			const updated: Task = { ...moved, columnId: targetColumn };

			if (!beforeTaskId) {
				return { tasks: [...without, updated] };
			}

			const idx = without.findIndex((t) => t.id === beforeTaskId);
			if (idx === -1) return { tasks: [...without, updated] };

			return { tasks: [...without.slice(0, idx), updated, ...without.slice(idx)] };
		}),
}));
