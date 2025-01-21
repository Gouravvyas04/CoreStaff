import React, { useContext, useEffect } from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';
import { AuthContext } from '../../context/AuthProvider';

const TaskList = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees && JSON.stringify(storedEmployees) !== JSON.stringify(userData)) {
      setUserData(storedEmployees);
    }
  }, [userData, setUserData]);

  const renderTask = (task, id) => {
    if (task.active) return <AcceptTask element={task} key={id} />;
    if (task.newTask) return <NewTask element={task} key={id} />;
    if (task.completed) return <CompleteTask element={task} key={id} />;
    if (task.failed) return <FailedTask element={task} key={id} />;
    return null;
  };

  return (
    <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-600 pb-4">
        Your Tasks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.tasks?.length > 0 ? (
          data.tasks.map((task, id) => (
            <div
              key={id}
              className="relative p-6 rounded-lg bg-[#334155] shadow-md hover:shadow-xl border border-gray-600 transition-transform transform hover:-translate-y-1"
            >
              {/* Render the specific task component */}
              {renderTask(task, id)}

              {/* Task Status Label */}
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${task.active
                    ? 'bg-blue-500 text-white'
                    : task.newTask
                      ? 'bg-yellow-500 text-white'
                      : task.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                  }`}
              >
                {task.active
                  ? 'Active'
                  : task.newTask
                    ? 'New'
                    : task.completed
                      ? 'Completed'
                      : 'Failed'}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg col-span-full text-center">
            No tasks assigned yet. Enjoy your free time!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
