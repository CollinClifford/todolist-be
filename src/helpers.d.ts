export interface Err extends Error {
  status: number;
}

export interface toDo {
  id: number;
  title: string;
  description: string;
  due_date: string;
  tags?: string;
}
