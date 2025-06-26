import Link from "next/link";
import { format, parseISO } from "date-fns";


export default function Tasklist({ task, onDelete }) {
    console.log("Tasklist component rendered with task:", task);

    const isoString = task.due_date; // Ensure dueDate is a string
    const dateObj = parseISO(isoString);

    const formattedDate = format(dateObj, 'MMM d, yyyy'); // "Nov 11, 2025"
    const formattedTime = format(dateObj, 'KK:mm');

    return (
        <div className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
                <h2 className="font-semibold text-black text-lg capitalize mb-2">{task.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                    Due date: 
                        {formattedDate} at {formattedTime}
                        
                </p>
                <span
                    className={`mt-1 capitalize inline-block px-2 py-1 text-xs font-medium rounded ${
                        task.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {task.status}
                </span>
            </div>
            <div className="flex gap-2">
                <Link href={`/${task.id}`} className="text-blue-600 text-sm">View</Link>
                <Link href={`/${task.id}/edit`} className="text-green-600 text-sm">Edit</Link>
                <button onClick={() => onDelete(task.id)} className="text-red-500 text-sm">Delete</button>
            </div>
        </div>
    );
}
