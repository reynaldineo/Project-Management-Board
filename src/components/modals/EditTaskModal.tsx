import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import ReactModal from "react-modal";
import UpdateTask from "../../hooks/UpdateTask";
import { UpdateTaskData } from "../../types/task/UpdateTask";
import Tag from "../Tag";
import EditAttachmentModal from "../modals/EditAttachmentModal";
import { Task } from "../../types/task/Task";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import GetTaskData from "../../hooks/GetTaskData";
import Input from "../form/Input";

import "./editTaskModal.css";
import "./../form/input.css";
import clsx from "clsx";

export default function EditTaskModal({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * ===== Edit Form =====
  const [isEdit, setIsEdit] = useState(false);

  // * ===== Form =====
  const methods = useForm<UpdateTaskData>();
  const { register, handleSubmit } = methods;

  // * ===== Handle Form =====
  const { mutateUpdatTask, isPending } = UpdateTask();
  const { refetch } = GetTaskData();
  const onSubmit: SubmitHandler<UpdateTaskData> = async (data) => {
    await mutateUpdatTask({ taskId: task._id, taskData: data });
    await refetch();
    if (!isEdit) setIsEdit(true);
    else if (isEdit) {
      setIsEdit(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="btn-edit-outside">
        <MdEdit size={15} />
      </div>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Edit Task Modal"
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
        <div className="div-add-editTask">
          <p className="p-add-editTask">Edit Task</p>
          <button type="button" onClick={() => setIsOpen(false)}>
            <IoClose size={20} />
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <Input
              id="title"
              label="Title"
              disabled={!isEdit}
              defaultValue={task.title}
            />
            <Input
              id="description"
              label="Description"
              disabled={!isEdit}
              defaultValue={task.description}
            />
            <Input
              id="dueDate"
              type="date"
              label="Due Date"
              disabled={!isEdit}
              defaultValue={task.dueDate}
            />
            <div>
              <label htmlFor="status">Status</label>
              <select
                {...register("status")}
                disabled={!isEdit}
                defaultValue={task.status}
                id="status"
                name="status"
                className="input"
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
              <label>Tag</label>
              <div className="tag-container">
                {task.tags.map((tag) => (
                  <Tag title={tag} key={tag} />
                ))}
                <button type="button" className="btn-tag">
                  <FaPlus className="icon-plus" /> Add Tag
                </button>
              </div>
            </div>

            <div>
              <label>Attachment</label>
              <div className="tag-container">
                {task.attachments.map((attachment) => (
                  <EditAttachmentModal
                    attachment={attachment}
                    taskId={task._id}
                    key={attachment._id}
                  />
                ))}
                <button type="button" className="btn-tag">
                  <FaPlus className="icon-plus" /> Add Attachment
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={clsx(
                  "btn-submit",
                  isEdit ? "btn-update" : "btn-edit"
                )}
              >
                {isPending && " Loading..."}
                {isEdit ? "Update" : "Edit"}
              </button>
            </div>
          </form>
        </FormProvider>
      </ReactModal>
    </div>
  );
}
