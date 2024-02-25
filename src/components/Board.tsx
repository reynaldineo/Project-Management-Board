import clsxm from "../lib/clxsm";
import Card from "./Card";
import { dummyData } from "../dummy/data";
import DetailTaskModal from "./DetailTaskModal";

enum BoardTitle {
  "To Do",
  "In Progress",
  "Done",
}

export default function Board({ title }: { title: keyof typeof BoardTitle }) {
  const SpessificData = dummyData.data.tasks.filter(
    (todo) => todo.status === title
  );

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
          "mt-4 rounded-xl bg-gray-700/50 p-4 h-full pb-10 flex flex-col gap-4"
        )}
      >
        {SpessificData.map((cardData) => (
          <DetailTaskModal>
            {({ openModal }) => (
              <div onClick={openModal}>
                <Card cardData={cardData} key={cardData._id} />
              </div>
            )}
          </DetailTaskModal>
        ))}
        {/* <Card cardData={SpessificData[0]} />
        <Card cardData={SpessificData[0]} /> */}

        {/* < Card cardData={SpessificData[0]} />
        < Card cardData={SpessificData[0]} />
        < Card cardData={SpessificData[0]} />
        < Card cardData={SpessificData[0]} />
        < Card cardData={SpessificData[0]} />
        < Card cardData={SpessificData[0]} /> */}
      </div>
    </section>
  );
}
