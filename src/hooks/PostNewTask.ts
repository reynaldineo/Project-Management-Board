import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { PostTask } from "../types/task/PostTask";
import { toast } from "react-toastify";

export default function PostNewTask() {
  const { mutate: mutateNewTask, isPending } = useMutation({
    mutationFn: (newTask: PostTask) => {
      return api.post("/task", newTask);
    },
    onSuccess: () => toast.success("Task added succesfully"),
    onError: () => toast.error("Failed to add task"),
  });
  return { mutateNewTask, isPending };
}
