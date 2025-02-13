import { Tag } from './Tag';

export type Task = {
    id: number;
    title: string;
    description?: string;
    dueOn: string;
    priority: number;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
};
