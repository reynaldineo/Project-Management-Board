import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { UpdateAttachmentType } from "../types/task/UpdateAttachment";

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
  });
  return { mutateUpdateAttachment, isPending };
}
