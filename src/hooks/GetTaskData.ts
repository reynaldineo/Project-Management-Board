import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { TaskData } from "../types/task/Task";
import { ApiResponse } from "../types/api";

export default function GetTaskData() {
  const { data: taskData, isLoading, refetch } = useQuery({
    queryKey: ["/task"],
    queryFn: () => {
      return api.get<ApiResponse<TaskData>>("/task");
    },
  });
  return { taskData, isLoading, refetch };
}
