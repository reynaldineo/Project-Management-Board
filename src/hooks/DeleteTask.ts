import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { toast } from "react-toastify";

export default function DeleteTask() {
  const { mutate: mutateDeletTask, isPending } = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/task/${id}`);
    },
    onSuccess: () => toast.success("Attachment deleted successfully"),
    onError: () => toast.error("Failed to delete attachment"),
  });
  return { mutateDeletTask, isPending };
}
