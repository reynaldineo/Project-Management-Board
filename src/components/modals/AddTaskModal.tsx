import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactModal from "react-modal";
import PostNewTask from "../../hooks/PostNewTask";
import { PostTask } from "../../types/task/PostTask";
import RequiredLabel from "../RequiredLabel";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function AddTaskModal({
  defaultStatus,
}: {
  defaultStatus?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // * React Hook Form
  const { register, handleSubmit } = useForm<PostTask>({
    mode: "onSubmit",
  });
  const { mutateNewTask } = PostNewTask();

  const onSubmit: SubmitHandler<PostTask> = (data) => {
    mutateNewTask(data);
  };
  return (
    <div>
      {defaultStatus ? (
        <button
          type="button"
          className="w-full p-1.5 bg-gray-300 hover:bg-gray-500 text-white rounded-lg flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus className="mr-1.5" /> New Task
        </button>
      ) : (
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded-lg flex items-center"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus className="mr-2" /> Add New Task
        </button>
      )}
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
          <div className="flex justify-between">
            <p className="text-xl font-bold">Add New Task</p>
            <button onClick={() => setIsOpen(false)}>
              <IoClose size={20} />
            </button>
          </div>
          <div>
            <label htmlFor="fname">
              Title <RequiredLabel />
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              name="title"
              className="border px-1 mt-1.5 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="description">
              Description <RequiredLabel />
            </label>
            <input
              {...register("description")}
              type="text"
              id="description"
              name="description"
              className="border px-1 mt-1.5 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="dueDate">
              Due Date <RequiredLabel />
            </label>
            <input
              {...register("dueDate")}
              type="date"
              id="dueDate"
              name="dueDate"
              className="border px-1 mt-1.5 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="status">
              Status <RequiredLabel />
            </label>
            <select
              {...register("status")}
              defaultValue={defaultStatus}
              id="status"
              name="status"
              className="border px-1 mt-1.5 w-full"
              required
            >
              <option value="" hidden>
                Select Status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            type="submit"
            className="px-2 py-1 w-full mt-2 bg-blue-400 rounded-xl text-white"
          >
            Submit
          </button>
        </form>
        {/* <button onClick={() => setIsOpen(false)}>Close Modal</button> */}
        {/* di dalam modalnya */}
      </ReactModal>
    </div>
  );
}
