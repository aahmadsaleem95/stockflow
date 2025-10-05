import React, { useState } from "react";

interface DeleteConfirmationProps {
  onConfirm: (id: number) => void;
  itemId: number;
  itemTitle: string;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onConfirm,
  itemId,
  itemTitle,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = async () => {
    await onConfirm(itemId);
    setShowPopup(false);
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500 transition"
      >
        Delete
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this item with name {itemTitle}?
            </h3>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                OK
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
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
