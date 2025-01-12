import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { updateTaskStatus } from './taskUtils';
import { showSuccessToast } from '../../utils/toastConfig';

const NewTask = ({ element }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleAcceptTask = () => {
    const updatedData = updateTaskStatus(userData, element, 'active');
    setUserData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedData));
    showSuccessToast('Task accepted successfully!');
  };

  // Function to render priority stars
  const renderPriorityStars = (priority) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`text-xl ${index < priority ? 'text-yellow-400' : 'text-gray-500'
              }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-shrink-0 w-[300px] bg-[#1E293B] border-2 border-[#4F46E5] rounded-xl p-5 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-[#4F46E5]/50 text-[#A5B4FC] rounded-lg text-sm font-medium">
          {element.category}
        </span>
        <span className="text-sm text-[#94A3B8]">Assigned: {element.taskDate}</span>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-[#E2E8F0]">{element.taskTitle}</h2>
      <p className="mt-2 text-sm text-[#CBD5E1]">{element.taskDescription}</p>
      <div className="text-sm text-[#94A3B8] mt-2">
        <p>
          <strong>Deadline:</strong> {element.deadlineDate || 'No deadline set'}
        </p>
      </div>
      {/* Priority Display */}
      <div className="mt-3">
        <strong className="text-sm text-[#A5B4FC]">Priority:</strong>
        {renderPriorityStars(element.priority)}
      </div>
      <div className="mt-5">
        <button
          onClick={handleAcceptTask}
          className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
