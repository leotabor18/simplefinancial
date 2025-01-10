'use client';

import React from 'react';

const ProgressBar: React.FC = () => {
  const tasks = {
    total: 4,
    completed: 2,
  };

  const percentage = tasks.total > 0 ? (tasks.completed / tasks.total) * 100 : 0; // useState

  return (
    <div className="flex flex-row items-center justify-between space-x-4">
      <h4 className="sr-only">Status</h4>

      <div aria-hidden="true" className="w-48">
        <div className="overflow-hidden rounded-full bg-[#d2d2d2]">
          <div style={{ width: `${percentage}%` }} className="h-2 rounded-full bg-success transition-all duration-300" />
        </div>
      </div>

      <p className="text-sm text-textLight font-semibold">{`${tasks.completed} / ${tasks.total}`}</p>
    </div>
  );
};

export default ProgressBar;
