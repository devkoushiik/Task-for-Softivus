"use client";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import Tasklist from "@/components/Tasklist";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import TaskStats from "@/components/Stats";

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
        <TaskStats tasks={tasks} />
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
        <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500 text-lg">Loading ...</p>
      </div>
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
