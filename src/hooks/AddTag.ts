import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { toast } from "react-toastify";

type Tag = {
  tags: string[];
};

export default function AddTag() {
  const { mutate: mutateUpdatTask, isPending } = useMutation({
    mutationFn: ({ taskId, tagData }: { taskId: string; tagData: Tag }) => {
      return api.put(`/task/${taskId}`, tagData);
    },
    onSuccess: () => {
      toast.success("Task updated successfully");
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });
  return { mutateUpdatTask, isPending };
}
