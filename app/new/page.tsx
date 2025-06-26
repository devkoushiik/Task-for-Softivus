"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/lib/api";

export default function AddTaskPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.description || !form.due_date || !form.status) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await createTask({
        title: form.title,
        description: form.description,
        dueDate: new Date(form.due_date).toISOString(),
        status: form.status === "pending" ? "Pending" : "Completed",
      });
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Task</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="datetime-local"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Task
        </button>
      </form>
    </main>
  );
}
