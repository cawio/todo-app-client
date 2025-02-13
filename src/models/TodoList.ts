import { Task } from './Task';

export type TodoList = {
    id: number;
    userId: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    tasks: Task[];
};
