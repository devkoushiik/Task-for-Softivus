'use client';
import { Task } from '@/types/task';
import React from 'react';

const TaskStats = ({ tasks }: { tasks: Task[] }) => {

  const completedCount = tasks.filter(task => task.status === 'Completed');
  const pendingCount = tasks.filter(task => task.status === 'Pending');

  return (
    <div className="flex gap-4">
         <div className=" p-2 rounded mb-3">
        <h2 className="text-2xl font-semibold">Total : {tasks.length}</h2>
       
      </div>
      <div className="bg-green-100 text-green-800 p-2 rounded mb-3">
        <h2 className="text-xl">Completed {completedCount.length}</h2>
       
      </div>
      <div className="bg-yellow-100 text-yellow-800 shadow p-2 rounded mb-3">
        <h2 className="text-xl">Pending {pendingCount.length}</h2>
        
      </div>
    </div>
  );
};

export default TaskStats;
