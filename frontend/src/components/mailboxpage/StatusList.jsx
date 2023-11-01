import React from 'react';
import StatusItem from './StatusItem';


const StatusList = ({ isOpen, onClose, statusList, changeStatus }) => {
  if (!isOpen) return null;

  const statusArray = statusList
  console.log(statusArray[0].status)

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="modal-content bg-white p-4 rounded shadow-lg w-96 transform translate-y-1/2 transition-transform duration-300">
        <span className="close-button absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={onClose}>X</span>


        {statusList.map((status, index) => (
          <StatusItem key={index} status={status} changeStatus={changeStatus} />
        ))}
      </div>
    </div>
  );
};

export default StatusList;