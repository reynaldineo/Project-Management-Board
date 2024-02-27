import { Task } from "../types/task/Task";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import Tag from "./Tag";
import { format } from "date-fns";
import { useDragTaskStore } from "../store/useDragTaskStore";
import EditTaskModal from "./modals/EditTaskModal";
import "./card.css";
import clsx from "clsx";

export default function Card({ cardData }: { cardData: Task }) {
  const taskDueDate = format(new Date(cardData.dueDate), "dd/MM/yyyy");
  const { setDraggedTaskId } = useDragTaskStore();

  return (
    <div
      className={clsx(
        "card-container",
        cardData.status === "To Do" && "card-red",
        cardData.status === "In Progress" && "card-blue",
        cardData.status === "Done" && "card-green"
      )}
      draggable
      onDragStart={() => setDraggedTaskId(cardData._id)}
    >
      <div className="card-modal-container">
        <p className="card-title-text">{cardData.title}</p>
        <div className="card-modal-container-inside">
          <DeleteTaskModal taskId={cardData._id} />
          <EditTaskModal task={cardData} />
        </div>
      </div>
      <div className="card-tag-container">
        {cardData.tags.map((tag) => (
          <Tag title={tag} key={tag} />
        ))}
      </div>
      <div className="card-duedate-container">
        <p className="text-duedate">{taskDueDate}</p>
      </div>
    </div>
  );
}
