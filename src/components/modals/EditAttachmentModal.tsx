import { useState } from "react";
import ReactModal from "react-modal";
import { UpdateAttachmentType } from "../../types/task/UpdateAttachment";
import { useForm, SubmitHandler } from "react-hook-form";
import DeleteAttachment from "../../hooks/DeleteAttachment";
import UpdateAttachment from "../../hooks/UpdateAttachment";
import clsxm from "../../lib/clxsm";
import { IoClose } from "react-icons/io5";

export default function EditAttachmentModal({
  attachment,
  taskId,
}: {
  attachment: UpdateAttachmentType;
  taskId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // * ===== Edit Form =====
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // * ===== Form =====
  const { register, handleSubmit } = useForm<UpdateAttachmentType>();

  // * ===== Handle Form =====
  const { mutateUpdateAttachment } = UpdateAttachment();
  const onSubmit: SubmitHandler<UpdateAttachmentType> = (data) => {
    console.log(data);

    mutateUpdateAttachment({ attachmentId: attachment._id, taskId, data });
  };

  const { mutateDeleteAttachment } = DeleteAttachment();
  const handleDelete = (attachmentId: string) => {
    mutateDeleteAttachment({ attachmentId, taskId });
  };
  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="px-2.5 py-1.5 bg-teal-500 rounded-lg text-white w-fit text-sm"
      >
        {attachment.displayText}
      </div>
      <ReactModal
        isOpen={isOpen}
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
          <p className="text-xl font-bold pb-1">Edit Attachment</p>
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
          <div>
            <label htmlFor="displayText">Display Text</label>
            <input
              {...register("displayText")}
              id="displayText"
              disabled={!isEdit}
              defaultValue={attachment.displayText}
              className="border px-1 mt-1.5 w-full"
            />
          </div>
          <div>
            <label htmlFor="link">Title</label>
            <input
              {...register("link")}
              id="link"
              disabled={!isEdit}
              defaultValue={attachment.link}
              className="border px-1 mt-1.5 w-full"
            />
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
                isEdit
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-blue-400 hover:bg-blue-500"
              )}
            >
              {isEdit ? "Update" : "Edit"}
            </button>
          </div>
        </form>
        <button
          onClick={() => handleDelete(attachment._id)}
          className="mt-2 px-2 py-1 w-full bg-red-500 hover:bg-red-700 rounded-xl text-white"
        >
          Delete
        </button>
      </ReactModal>
    </div>
  );
}
