import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { toast } from "react-toastify";

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
    onSuccess: () => toast.success("Attachment deleted successfully"),
    onError: () => toast.error("Failed to delete attachment"),
  });
  return { mutateDeleteAttachment, isPending };
}
