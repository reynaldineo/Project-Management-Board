import { useState } from "react";
import ReactModal from "react-modal";
import DeleteTask from "../../hooks/DeleteTask";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function DeleteTaskModal({ taskId }: { taskId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // * React Hook Form
  const { mutateDeletTask } = DeleteTask();
  const handleDelete = (taskId: string) => {
    mutateDeletTask(taskId);
    setIsOpen(false);
  };
  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-full p-1.5 bg-red-500 text-white hover:bg-red-900"
      >
        <MdDelete size={15} />
      </div>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Add Task Modal"
        style={{
          content: {
            left: "50%",
            top: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="flex justify-between">
          <p className="text-xl font-bold pb-1">Delete Task</p>
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={20} />
          </button>
        </div>
        <p className="mt-2 md:mt-0 mb-3">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-gray-400 text-white rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(taskId)}
            className="p-2 bg-red-500 text-white rounded-xl"
          >
            Delete
          </button>
        </div>
      </ReactModal>
    </div>
  );
}
