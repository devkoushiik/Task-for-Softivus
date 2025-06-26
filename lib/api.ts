import { Task } from "@/types/task";

const BASE_URL = "https://685bbc9189952852c2dac199.mockapi.io/api/v1";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`, { cache: "no-store" });
  return res.json();
}

export async function getTask(id: string): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`);
  if (!res.ok) throw new Error("Task not found");
  return res.json();
}

export async function createTask(data: Partial<Task>) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(id: string, data: Partial<Task>) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id: string) {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}
