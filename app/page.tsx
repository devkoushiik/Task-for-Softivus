"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import Tasklist from "@/components/Tasklist";
import toast from "react-hot-toast";
import DarkModeToggle from "@/components/DarkModeToggle";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      loadTasks();
    }
  };

  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter);

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
        <div className="mb-2">
          <DarkModeToggle />
        </div>
      
      </div>
      

      <div className="flex justify-between mb-4">
        <motion.div initial={{x:-15}} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className="space-x-2">
          {["All", "Pending", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 rounded text-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <a href="/new" className="bg-green-600 text-white px-3 py-1 rounded text-sm">
          + New Task
        </a>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((task) => (
              <Tasklist key={task.id} task={task} onDelete={handleDelete} />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks found.</p>
          )}
        </div>
      )}
    </main>
  );
}
