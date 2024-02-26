import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";

export default function DeleteTask() {
  const { mutate: mutateDeletTask } = useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/task/${id}`);
    },
  });
  return { mutateDeletTask };
}
