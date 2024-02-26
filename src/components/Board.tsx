import clsxm from "../lib/clxsm";
import Card from "./Card";
import GetTaskData from "../hooks/GetTaskData";
import { BoardTitle } from "../types/task/Task";
import AddModal from "./modal/AddModal";
import { FaPlus } from "react-icons/fa6";
import { useDragTaskStore } from "../store/useDragTaskStore";
import UpdateTask from "../hooks/UpdateTask";
import Loading from "./Loading";

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
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    draggedTaskId &&
      mutateUpdatTask({
        taskId: draggedTaskId,
        taskData: { status: title },
      });
    resetDraggedTaskId();
    refetch();
  };

  return (
    <section className="w-full min-h-[60vh]  ">
      <p
        className={clsxm(
          "text-xl font-semibold",
          "py-2 px-3.5 rounded-xl w-fit ",
          title === "To Do" && "bg-red-400",
          title === "In Progress" && "bg-blue-400",
          title === "Done" && "bg-green-400"
        )}
      >
        {title}
      </p>

      <div
        className={clsxm(
          "mt-4 rounded-xl bg-gray-700/50 p-4 h-full pb-10 flex flex-col gap-4 min-w-[300px]"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {SpessificData.map((cardData) => (
          <Card cardData={cardData} key={cardData._id} />
        ))}
        <AddModal defaultStatus={title}>
          {({ openModal }) => (
            <button
              type="button"
              className="p-1.5 bg-gray-300 hover:bg-gray-500 text-white rounded-lg flex items-center justify-center"
              onClick={openModal}
            >
              <FaPlus className="mr-1.5" /> New Task
            </button>
          )}
        </AddModal>
      </div>
    </section>
  );
}
