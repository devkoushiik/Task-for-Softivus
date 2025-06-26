"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTask, updateTask } from "@/lib/api";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Task } from "@/types/task";
export default function EditTaskPage() {
    
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data: Task = await getTask(id as string);
        setForm({
          title: data.title,
          description: data.description,
          due_date: new Date(data.dueDate ?? "").toISOString().slice(0, 16),
          status: data.status.toLowerCase(),
        });
      } catch {
        setError("Task not found");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.due_date || !form.status) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await updateTask(id as string, {
        title: form.title,
        description: form.description,
        dueDate: new Date(form.due_date).toISOString(),
        status: form.status === "pending" ? "Pending" : "Completed",
      });
      toast.success("Task updated successfully");
      router.push("/");
      
    } catch (err) {
      setError("Failed to update task");
    }
  };

  if (loading) return <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 mt-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500 text-lg">Loading ...</p>
      </div>

  if (error) return <p className="p-4 text-red-500 font-medium">{error}</p>;

  return (
    <main className="max-w-2xl mx-auto p-4 mt-20">
      <h1 className="text-xl font-bold mb-4">Edit Task</h1>

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Task
        </button>

       
      </form>
        <button
          onClick={() => router.push("/")}
          className="border px-4 ml-[33%] py-2 rounded-xl"
        >
          Back to Dashboard
        </button>
    </main>
  );
}
