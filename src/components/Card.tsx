import { Task } from "../dummy/data";
import clsxm from "../lib/clxsm";
import Tag from "./Tag";

export default function Card({ cardData }: { cardData: Task }) {
  const handeClick = (id: string) => {
    console.log(id);
  };
  return (
    <div
      className={clsxm(
        "bg-white rounded-xl p-3  hover:bg-slate-300 w-[300px] md:w-full border-[2.5px]",
        cardData.status === "To Do" && "border-red-500",
        cardData.status === "In Progress" && "border-blue-500",
        cardData.status === "Done" && "border-green-500"
      )}
      onClick={() => handeClick(cardData._id)}
    >
      <p className="text-xl font-semibold">{cardData.title}</p>
      <div className="flex flex-row flex-wrap gap-1.5">
        {cardData.tags.map((tag) => (
          <Tag title={tag} />
        ))}
      </div>
      <div className="flex justify-end">
        <p className="mt-2 text-sm">{cardData.dueDate}</p>
      </div>
    </div>
  );
}
