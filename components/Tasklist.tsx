import Link from "next/link";
import { format, parseISO } from "date-fns";
import {motion} from "framer-motion";
import { Task } from "@/types/task";

export default function Tasklist({ task, onDelete }: { task: Task, onDelete: (id: string) => void }) {
    const isoString = task.dueDate; // Ensure dueDate is a string
    const dateObj = isoString ? parseISO(isoString) : null;

    const isValidDate = dateObj instanceof Date && !isNaN(dateObj.getTime());
    const formattedDate = isValidDate ? format(dateObj, 'MMM d, yyyy') : "Invalid date"; // "Nov 11, 2025"
    const formattedTime = isValidDate ? format(dateObj, 'KK:mm') : "";

    return (
        <motion.div  initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
                <h2 className="font-semibold text-black text-lg capitalize mb-2">{task.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                    Due date: 
                        {formattedDate} at {formattedTime}
                        
                </p>
                <motion.span initial={{x:-10}} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    className={`mt-1 capitalize inline-block px-2 py-1 text-xs font-medium rounded ${
                        task.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {task.status}
                </motion.span>
            </div>
            <motion.div initial={{y:-25}} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className="flex gap-2">
                <Link href={`/${task.id}`} className="text-blue-600 text-sm">View</Link>
                <Link href={`/${task.id}/edit`} className="text-green-600 text-sm">Edit</Link>
                <button onClick={() => onDelete(task.id)} className="text-red-500 text-sm">Delete</button>
            </motion.div>
        </motion.div>
    );
}
