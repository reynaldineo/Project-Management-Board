import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export default function DeleteAttachment() {
  const { mutate: mutateDeleteAttachment, isPending } = useMutation({
    mutationFn: ({
      attachmentId,
      taskId,
    }: {
      attachmentId: string;
      taskId: string;
    }) => {
      return api.delete(`/task/${taskId}/attachment/${attachmentId}`);
    },
  });
  return { mutateDeleteAttachment, isPending };
}
