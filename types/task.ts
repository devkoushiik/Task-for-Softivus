export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  dueDate: string; // ISO format
}