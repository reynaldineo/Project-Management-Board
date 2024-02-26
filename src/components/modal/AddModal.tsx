import * as React from "react";

import Modal from "../Modal";
import { PostTask } from "../../types/task/PostTask";
import { SubmitHandler, useForm } from "react-hook-form";
import PostNewTask from "../../hooks/PostNewTask";
import RequiredLabel from "../RequiredLabel";

type ModalReturnType = {
  openModal: () => void;
};

export default function AddModal({
  children,
  defaultStatus,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  defaultStatus?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  // * React Hook Form
  const { register, handleSubmit } = useForm<PostTask>({
    mode: "onSubmit",
  });
  const { mutateNewTask } = PostNewTask();

  const onSubmit: SubmitHandler<PostTask> = (data) => {
    mutateNewTask(data);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Add New Task">
        <Modal.Section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-col space-y-4"
          >
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
              onClick={() => setOpen(false)}
              type="submit"
              className="px-2 py-1 w-full mt-2 bg-blue-400 rounded-xl text-white"
            >
              Submit
            </button>
          </form>
        </Modal.Section>
      </Modal>
    </>
  );
}
