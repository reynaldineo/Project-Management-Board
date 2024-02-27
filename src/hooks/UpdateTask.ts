import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { UpdateTaskData } from "../types/task/UpdateTask";
import { toast } from "react-toastify";

export default function UpdateTask() {
  const { mutate: mutateUpdatTask, isPending } = useMutation({
    mutationFn: ({
      taskId,
      taskData,
    }: {
      taskId: string;
      taskData: UpdateTaskData;
    }) => {
      return api.put(`/task/${taskId}`, taskData);
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
