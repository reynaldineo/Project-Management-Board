import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import ReactModal from "react-modal";
import UpdateTask from "../../hooks/UpdateTask";
import clsxm from "../../lib/clxsm";
import { UpdateTaskData } from "../../types/task/UpdateTask";
import Tag from "../Tag";
import EditAttachmentModal from "../modals/EditAttachmentModal";
import { Task } from "../../types/task/Task";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function EditTaskModal({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * ===== Edit Form =====
  const [isEdit, setIsEdit] = useState(false);

  // * ===== Form =====
  const { register, handleSubmit } = useForm<UpdateTaskData>();

  // * ===== Handle Form =====
  const { mutateUpdatTask } = UpdateTask();
  const onSubmit: SubmitHandler<UpdateTaskData> = (data) => {
    mutateUpdatTask({ taskId: task._id, taskData: data });
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-full p-1.5 bg-blue-500 text-white hover:bg-blue-900"
      >
        <MdEdit size={15} />
      </div>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Add Task Modal"
        style={{
          content: {
            width: "500px",
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
          <p className="text-xl font-bold pb-1.5">Edit Task</p>
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
          <div>
            <label htmlFor="title">Title</label>
            <input
              {...register("title")}
              id="title"
              disabled={!isEdit}
              defaultValue={task.title}
              className="border px-1 mt-1.5 w-full"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              {...register("description")}
              id="description"
              disabled={!isEdit}
              defaultValue={task.description}
              className="border px-1 mt-1.5 w-full"
            />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input
              {...register("dueDate")}
              disabled={!isEdit}
              type="date"
              defaultValue={task.dueDate}
              id="dueDate"
              name="dueDate"
              className="border px-1 mt-1.5 w-full"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              {...register("status")}
              disabled={!isEdit}
              defaultValue={task.status}
              id="status"
              name="status"
              className="border px-1 mt-1.5 w-full"
            >
              <option value="" hidden>
                Select Status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label htmlFor="status">Tag</label>
            <div className="flex items-center flex-row flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <Tag title={tag} key={tag} />
              ))}
              <button className="flex items-center bg-gray-200 hover:bg-gray-400 w-fit rounded-lg px-2.5 py-1 text-sm mt-2 ml-2">
                <FaPlus className="mr-2" /> Add Tag
              </button>
            </div>
          </div>

          <div>
            <label>Attachment</label>
            <div className="flex items-center flex-row flex-wrap gap-1.5">
              {task.attachments.map((attachment) => (
                <EditAttachmentModal
                  attachment={attachment}
                  taskId={task._id}
                  key={attachment._id}
                />
              ))}
              <button className="flex items-center bg-gray-200 hover:bg-gray-400 w-fit rounded-lg px-2.5 py-1 text-sm mt-2 ml-2">
                <FaPlus className="mr-2" /> Add Attachment
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                if (!isEdit) setIsEdit(true);
                else if (isEdit) {
                  setIsEdit(false);
                  setIsOpen(false);
                }
              }}
              type="submit"
              className={clsxm(
                "px-2 py-1 w-full mt-4 rounded-xl text-white",
                isEdit ? "bg-green-400" : "bg-blue-400"
              )}
            >
              {isEdit ? "Update" : "Edit"}
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}
