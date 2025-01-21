import React, { useState } from 'react';
import Header from '../../other/Header';
import CreateTask from '../../other/CreateTask';
import AllTask from '../../other/AllTask';

const AdminDashboard = ({ changeUser }) => {
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false); // State to show/hide the form

    // Toggle function for the form visibility
    const toggleCreateTaskForm = () => {
        setShowCreateTaskForm(prevState => !prevState);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0A0B1F] via-[#2D2F48] to-[#1C1D34] text-white p-8 md:p-12">
            {/* Header Component */}
            <Header changeUser={changeUser} />

            <div className="mt-10 space-y-12">
                {/* Create Task Button */}
                {!showCreateTaskForm && (
                    <div className="flex justify-center">
                        <button
                            onClick={toggleCreateTaskForm}
                            className="bg-[#222636] text-[#F4F7FF] py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Create New Task
                        </button>
                    </div>
                )}

                {/* Show the Create Task form when button is clicked */}
                {showCreateTaskForm && (
                    <section className="bg-[#222636] p-10 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                        <h2 className="text-4xl font-semibold text-[#F4F7FF] mb-8">Create New Task</h2>
                        <CreateTask />
                    </section>
                )}

                {/* All Tasks Section */}
                <section className="bg-[#222636] p-10 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    <h2 className="text-4xl font-semibold text-[#F4F7FF] mb-8">All Tasks</h2>
                    <AllTask />
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
