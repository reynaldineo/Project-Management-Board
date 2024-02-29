import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import ReactModal from "react-modal";
import PostNewTask from "../../hooks/PostNewTask";
import { PostTask } from "../../types/task/PostTask";
import RequiredLabel from "../RequiredLabel";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import GetTaskData from "../../hooks/GetTaskData";
import Input from "../form/Input";

import "./addTaskModal.css";
import "./../form/input.css";

export default function AddTaskModal({
  defaultStatus,
}: {
  defaultStatus?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * React Hook Form
  const methods = useForm<PostTask>({
    mode: "onSubmit",
  });
  const { register, handleSubmit } = methods;

  // * Handle On Submit
  const { mutateNewTask, isPending } = PostNewTask();
  const { refetch } = GetTaskData();
  const onSubmit: SubmitHandler<PostTask> = async (data) => {
    await mutateNewTask(data);
    await refetch();
    setIsOpen(false);
  };
  return (
    <div>
      {defaultStatus ? (
        <button
          type="button"
          className="button-newTask-bottom"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus className="icon-plus-addTask" /> New Task
        </button>
      ) : (
        <button
          type="button"
          className="button-newTask-top"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus className="icon-plus-addTask" /> Add New Task
        </button>
      )}
      <ReactModal
        isOpen={isOpen}
        contentLabel="Add Task Modal"
        ariaHideApp={false}
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="div-add-newtask">
              <p className="p-add-newtask">Add New Task</p>
              <button type="button" onClick={() => setIsOpen(false)}>
                <IoClose size={20} />
              </button>
            </div>
            <Input id="title" label="Title" required />
            <Input id="description" label="Description" required />
            <Input id="dueDate" type="date" label="Due Date" required />
            <div>
              <label htmlFor="status" className="label">
                Status <RequiredLabel />
              </label>
              <select
                {...register("status")}
                defaultValue={defaultStatus}
                id="status"
                name="status"
                className="input"
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
            <button type="submit" className="btn-submit">
              {isPending ? "Loading..." : "Submit"}
            </button>
          </form>
        </FormProvider>
      </ReactModal>
    </div>
  );
}
