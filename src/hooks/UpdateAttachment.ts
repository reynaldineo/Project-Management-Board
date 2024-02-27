import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { UpdateAttachmentType } from "../types/task/UpdateAttachment";
import { toast } from "react-toastify";

export default function UpdateAttachment() {
  const { mutate: mutateUpdateAttachment, isPending } = useMutation({
    mutationFn: async ({
      attachmentId,
      taskId,
      data,
    }: {
      attachmentId: string;
      taskId: string;
      data: UpdateAttachmentType;
    }) => {
      return await api.put(`/task/${taskId}/attachment/${attachmentId}`, data);
    },
    onSuccess: () => toast.success("Attachment updated succedfully"),
    onError: () => "Failed to update attachment",
  });
  return { mutateUpdateAttachment, isPending };
}
