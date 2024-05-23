export interface Task {
  id: string;
  title: string;
  tags: string[];
  status: 'todo' | 'in-progress' | 'done';
}
