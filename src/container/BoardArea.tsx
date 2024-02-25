import Board from "../components/Board";
import clsxm from "../lib/clxsm";

export default function BoardArea() {
  return (
    <section
      className={clsxm(
        "mt-10  min-h-full px-6",
        "flex gap-6 lg:gap-12",
        "overflow-x-scroll overflow-y-hidden md:overflow-visible"
      )}
    >
      <Board title="To Do" />
      <Board title="In Progress" />
      <Board title="Done" />
    </section>
  );
}
