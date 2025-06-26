import { Task } from "@/types/task";
import Link from "next/link";
import { format } from "date-fns";

interface Props {
    task: Task;
    onDelete: (id: string) => void;
}

export default function Tasklist({ task, onDelete }: Props) {
    return (
        <div className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
                <h2 className="font-semibold text-lg">{task.title}</h2>
                <p className="text-sm text-gray-500">
                    Due: {task.dueDate && !isNaN(new Date(task.dueDate).getTime())
                        ? format(new Date(task.dueDate), "MMM d, yyyy")
                        : "Invalid date"}
                </p>
                <span
                    className={`mt-1 inline-block px-2 py-1 text-xs font-medium rounded ${
                        task.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {task.status}
                </span>
            </div>
            <div className="flex gap-2">
                <Link href={`/tasks/${task.id}`} className="text-blue-600 text-sm">View</Link>
                <Link href={`/tasks/${task.id}/edit`} className="text-green-600 text-sm">Edit</Link>
                <button onClick={() => onDelete(task.id)} className="text-red-500 text-sm">Delete</button>
            </div>
        </div>
    );
}
