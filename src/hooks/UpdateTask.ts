import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { UpdateTaskData } from "../types/task/UpdateTask";

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
  });
  return { mutateUpdatTask, isPending };
}
