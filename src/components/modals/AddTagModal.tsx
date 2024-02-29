import { useState } from "react";
import ReactModal from "react-modal";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Input from "../form/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import UpdateTask from "../../hooks/UpdateTask";
import { Task } from "../../types/task/Task";

type Tag = {
  tags: string;
};
export default function AddTagModal({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const methods = useForm<Tag>();
  const { handleSubmit } = methods;

  const { mutateUpdatTask } = UpdateTask();
  const onSubmit: SubmitHandler<Tag> = (data: Tag) => {
    const tags = task.tags;
    tags.push(data.tags);
    const dataTag = { tags };
    mutateUpdatTask({ taskId: task._id, taskData: dataTag });
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="btn-Attach">
        <FaPlus className="icon-plus" /> Add Tag
      </div>
      <ReactModal
        isOpen={isOpen}
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
        <div className="delete-container">
          <p className="modal-title">Add Tag</p>
          <button type="button" onClick={() => setIsOpen(false)}>
            <IoClose size={20} />
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input id="tags" label="Tag" />
            <button className="btn-submit">Submit</button>
          </form>
        </FormProvider>
      </ReactModal>
    </div>
  );
}
