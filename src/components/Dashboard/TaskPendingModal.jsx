import React from 'react';

const TaskPendingModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-[#00246B] mb-4">Listen!!</h2>
        <p className="text-gray-600 text-sm">
          If your tasks are not complete by any chance, please complete your pending tasks.
          <br /> Thank you <span className="text-emerald-500">&#128522;</span>
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#00246B] hover:bg-[#001A56] text-white py-2 px-4 rounded-lg text-sm font-medium transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default TaskPendingModal;
