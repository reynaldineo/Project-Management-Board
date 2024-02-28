import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { toast } from "react-toastify";
import { Attachment } from "../types/task/Attachment";

export default function AddAttachment() {
  const { mutate: mutateAddAttachment, isPending } = useMutation({
    mutationFn: ({ data, taskId }: { data: Attachment[]; taskId: string }) => {
      const attachData = [data];
      return api.post(`task/${taskId}/attachment`, attachData);
    },
    onSuccess: () => toast.success("Attachment added succesfully"),
    onError: () => toast.error("Failed to add attachment"),
  });
  return { mutateAddAttachment, isPending };
}
