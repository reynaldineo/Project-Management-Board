import Card from "./Card";
import GetTaskData from "../hooks/GetTaskData";
import { BoardTitle } from "../types/task/Task";
import { useDragTaskStore } from "../store/useDragTaskStore";
import UpdateTask from "../hooks/UpdateTask";
import Loading from "./Loading";
import AddTaskModal from "./modals/AddTaskModal";
import "./board.css";
import clsx from "clsx";

export default function Board({ title }: { title: keyof typeof BoardTitle }) {
  const { taskData, refetch } = GetTaskData();
  const { draggedTaskId, resetDraggedTaskId } = useDragTaskStore();
  const { mutateUpdatTask } = UpdateTask();

  if (!taskData) {
    return <Loading />;
  }

  const SpessificData = taskData.data.data.tasks.filter(
    (task) => task.status === title && !task.deletedAt
  );

  // * Handle Dropped Task
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    draggedTaskId &&
      (await mutateUpdatTask({
        taskId: draggedTaskId,
        taskData: { status: title },
      }));
    await resetDraggedTaskId();
    await refetch();
  };

  return (
    <section className="board-container">
      <p
        className={clsx(
          "board-title",
          title === "To Do" && "board-title-red",
          title === "In Progress" && "board-title-blue",
          title === "Done" && "board-title-green"
        )}
      >
        {title}
      </p>

      <div
        className="board-card-container"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {SpessificData.map((cardData) => (
          <Card cardData={cardData} key={cardData._id} />
        ))}
        <AddTaskModal defaultStatus={title} />
      </div>
    </section>
  );
}
