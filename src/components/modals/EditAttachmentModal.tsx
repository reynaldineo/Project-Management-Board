import { useState } from "react";
import ReactModal from "react-modal";
import { UpdateAttachmentType } from "../../types/task/UpdateAttachment";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import DeleteAttachment from "../../hooks/DeleteAttachment";
import UpdateAttachment from "../../hooks/UpdateAttachment";
import { IoClose } from "react-icons/io5";
import GetTaskData from "../../hooks/GetTaskData";
import Input from "../form/Input";
import "./editAttachmentModal.css";
import clsx from "clsx";

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
  const methods = useForm<UpdateAttachmentType>();
  const { handleSubmit } = methods;

  // * ===== Handle Form =====
  const { mutateUpdateAttachment, isPending } = UpdateAttachment();
  const { refetch } = GetTaskData();
  const onSubmit: SubmitHandler<UpdateAttachmentType> = async (data) => {
    if (isEdit) {
      await mutateUpdateAttachment({
        attachmentId: attachment._id,
        taskId,
        data,
      });
      await refetch();
    }
    if (!isEdit) setIsEdit(true);
    else if (isEdit) {
      setIsEdit(false);
      setIsOpen(false);
    }
  };

  const { mutateDeleteAttachment, isPending: isPendingDelete } =
    DeleteAttachment();
  const handleDelete = async (attachmentId: string) => {
    await mutateDeleteAttachment({ attachmentId, taskId });
    await refetch();
  };
  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="btn-outside-atachment">
        {attachment.displayText}
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
        <div className="title-container">
          <p className="text-edit">Edit Attachment</p>
          <button
            onClick={() => {
              setIsEdit(false);
              setIsOpen(false);
            }}
          >
            <IoClose size={20} />
          </button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <Input
              id="displayText"
              label="Display Text"
              disabled={!isEdit}
              defaultValue={attachment.displayText}
              required
            />
            <Input
              id="link"
              label="Link"
              disabled={!isEdit}
              defaultValue={attachment.link}
              required
            />
            <div>
              <button
                type="submit"
                className={clsx(
                  "btn-submit",
                  isEdit ? "btn-update" : "btn-edit"
                )}
              >
                {isPending ? "Loading..." : isEdit ? "Update" : "Edit"}
              </button>
            </div>
          </form>
        </FormProvider>
        <button
          type="button"
          onClick={() => handleDelete(attachment._id)}
          className="btn-delete"
        >
          {isPendingDelete ? "Loading..." : "Delete"}
        </button>
      </ReactModal>
    </div>
  );
}
