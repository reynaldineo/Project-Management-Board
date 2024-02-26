import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { PostTask } from "../types/task/PostTask";

export default function PostNewTask() {
  const { mutate: mutateNewTask, isPending } = useMutation({
    mutationFn: (newTask: PostTask) => {
      return api.post("/task", newTask);
    },
  });
  return { mutateNewTask, isPending };
}
