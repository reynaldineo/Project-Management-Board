import { useState } from "react";
import ReactModal from "react-modal";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Attachment } from "../../../types/task/Attachment";
import Input from "../../form/Input";

import "./addAttachmentModal.css";
import AddAttachment from "../../../hooks/AddAttachment";
import GetTaskData from "../../../hooks/GetTaskData";
import { Task } from "../../../types/task/Task";

export default function AddAttachmentModal({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * React Hook Form
  const methods = useForm<Attachment[]>();
  const { handleSubmit } = methods;

  // * Handle On Submit
  const { mutateAddAttachment } = AddAttachment();
  const { refetch } = GetTaskData();
  const onSubmit: SubmitHandler<Attachment[]> = async (data) => {
    await mutateAddAttachment({ data: data, taskId: task._id });
    await refetch;
    await setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="btn-Attach">
        <FaPlus className="icon-plus" /> Add Attachment
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
          <p className="text-xl font-bold pb-1">Add Attachment</p>
          <button type="button" onClick={() => setIsOpen(false)}>
            <IoClose size={20} />
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <Input id="displayText" label="Display Text" required />
            <Input id="link" label="Link" required />
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </FormProvider>
      </ReactModal>
    </div>
  );
}
