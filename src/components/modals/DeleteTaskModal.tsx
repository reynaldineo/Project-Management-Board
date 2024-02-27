import { useState } from "react";
import ReactModal from "react-modal";
import DeleteTask from "../../hooks/DeleteTask";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import GetTaskData from "../../hooks/GetTaskData";
import "./deleteTaskModal.css";

export default function DeleteTaskModal({ taskId }: { taskId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * Handle Delete Task
  const { mutateDeletTask, isPending } = DeleteTask();
  const { refetch } = GetTaskData();
  const handleDelete = async (taskId: string) => {
    await mutateDeletTask(taskId);
    await refetch();
    setIsOpen(false);
  };
  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="btn-delete-outside">
        <MdDelete size={15} />
      </div>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Delete Task Modal"
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
        <div className="delete-container">
          <p className="text-xl font-bold pb-1">Delete Task</p>
          <button type="button" onClick={() => setIsOpen(false)}>
            <IoClose size={20} />
          </button>
        </div>
        <p className="text-makesure-delete">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn-cancel-click"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(taskId)}
            className="btn-delete-click"
          >
            {isPending ? "Loading..." : "Delete"}
          </button>
        </div>
      </ReactModal>
    </div>
  );
}
