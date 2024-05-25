import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * ConfirmModal component for task deletion confirmation.
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="mb-4 font-medium">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded focus:outline-none focus:shadow-outline hover:bg-red-700"
                onClick={onConfirm}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 font-bold text-gray-700 bg-gray-300 rounded focus:outline-none focus:shadow-outline hover:bg-gray-500"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
