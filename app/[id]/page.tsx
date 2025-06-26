"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTask } from "@/lib/api";
import { Task } from "@/types/task";
import { format, parseISO } from "date-fns";

export default function ViewTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

      const isoString = task?.dueDate;
      const dateObj = isoString ? parseISO(isoString) : new Date();
  
      const formattedDate = format(dateObj, 'MMM d, yyyy'); // "Nov 11, 2025"
      const formattedTime = format(dateObj, 'HH:mm');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTask(id as string);
        setTask(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
      <p className="text-gray-500 text-lg">Loading task...</p>
      </div>
    );
  }

  if (error || !task) {
    return <p className="p-4 text-red-500 font-medium">Task not found</p>;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 mt-8">
      <h1 className="text-2xl font-bold mb-2 capitalize">{task.title}</h1>
      <p className="text-gray-300 text-base p-5 capitalize mb-4 border rounded-xl">{task.description}</p>

      <div className="mb-2">
        <span className="font-semibold">Status: </span>
        <span
          className={`px-2 py-1 rounded text-sm ${
            task.status === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div>
        <span className="font-semibold">Due Date: </span>
        {formattedDate} at {formattedTime}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push(`/${task.id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => router.push("/")}
          className="border px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}
