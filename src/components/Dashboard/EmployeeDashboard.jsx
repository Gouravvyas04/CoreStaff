import React, { useContext, useEffect, useState } from 'react';
import Header from '../../other/Header';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from '../../context/AuthProvider';
import TaskPendingModal from './TaskPendingModal'; // Import the Modal

const EmployeeDashboard = ({ data, changeUser }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false); // State to show the TaskPendingModal
  const [loading, setLoading] = useState(true); // State to handle preloader visibility

  useEffect(() => {
    if (userData) {
      const updatedEmployee = userData.find((emp) => emp.id === data.id);
      if (updatedEmployee) {
        const updatedData = { role: 'employee', data: updatedEmployee };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
      }
    }

    // Show modal when the employee logs in
    setShowModal(true);

    // Set loading state to false after a short delay to show preloader
    setTimeout(() => setLoading(false), 3000); // Preloader duration

    // Show the TaskPendingModal after 5 seconds of loading
    const modalTimeout = setTimeout(() => {
      setShowModal(true); // Show the modal after 5 seconds
    }, 30000);

    // Cleanup timeout when component unmounts
    return () => clearTimeout(modalTimeout);
  }, [userData, data.id]);

  const currentEmployeeData =
    userData?.find((emp) => emp.id === data.id) || data;

  // Function to handle task completion and update task counts
  const handleTaskCompletion = (taskId) => {
    // Update task status to completed
    const updatedTasks = currentEmployeeData.tasks.map((task) => {
      if (task.id === taskId) {
        task.status = 'completed'; // or any other status you're using
      }
      return task;
    });

    // Update task counts based on task status
    let completedCount = 0;
    let failedCount = 0;
    let activeCount = 0;

    updatedTasks.forEach((task) => {
      if (task.status === 'completed') completedCount++;
      if (task.status === 'failed') failedCount++;
      if (task.status === 'active') activeCount++;
    });

    // Update the context with the new counts
    const updatedEmployee = {
      ...currentEmployeeData,
      tasks: updatedTasks,
      taskCounts: {
        completed: completedCount,
        newTask: 0, // Pending tasks are removed, set this to 0
        failed: failedCount,
        active: activeCount,
      },
    };

    // Update the context
    setUserData((prevData) =>
      prevData.map((emp) => (emp.id === data.id ? updatedEmployee : emp))
    );

    // Also update localStorage if necessary
    const updatedData = { role: 'employee', data: updatedEmployee };
    localStorage.setItem('loggedInUser', JSON.stringify(updatedData));
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] text-white">
      {/* Preloader Section */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-10 z-50">
          <div className="text-left text-white">
            <p className="text-3xl font-semibold">
              Welcome, {currentEmployeeData.name}!
            </p>
            <p className="mt-2 text-xl">Loading your dashboard...</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="bg-[#202225] shadow-lg p-6 rounded-lg mb-8">
        <Header data={currentEmployeeData} changeUser={changeUser} />
      </header>

      <main className="px-6 md:px-10 space-y-10">
        {/* Task Numbers Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card for Completed Tasks */}
          <div className="bg-[#2b2d31] p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-indigo-400">
              Completed Tasks
            </h3>
            <p className="mt-2 text-4xl font-bold text-green-500">
              {currentEmployeeData.taskCounts.completed || 0}
            </p>
          </div>

          {/* Card for Active Tasks */}
          <div className="bg-[#2b2d31] p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-indigo-400">
              Active Tasks
            </h3>
            <p className="mt-2 text-4xl font-bold text-blue-500">
              {currentEmployeeData.taskCounts.active || 0}
            </p>
          </div>

          {/* Card for Failed Tasks */}
          <div className="bg-[#2b2d31] p-6 rounded-lg shadow-md text-center transition-all transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-indigo-400">
              Failed Tasks
            </h3>
            <p className="mt-2 text-4xl font-bold text-red-500">
              {currentEmployeeData.taskCounts.failed || 0}
            </p>
          </div>
        </section>

        {/* Task List Section */}
        <section className="bg-[#2b2d31] p-6 rounded-lg shadow-md transition-all transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-100 border-b border-gray-600 pb-4 mb-6">
            Your Tasks
          </h2>
          <TaskList
            data={currentEmployeeData}
            onTaskComplete={handleTaskCompletion}
          />
        </section>
      </main>

      {/* Modal Section */}
      {showModal && <TaskPendingModal onClose={closeModal} />}
    </div>
  );
};

export default EmployeeDashboard;
