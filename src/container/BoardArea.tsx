import Board from "../components/Board";
import "./boardArea.css";

export default function BoardArea() {
  return (
    <section className="board-area-container">
      <Board title="To Do" />
      <Board title="In Progress" />
      <Board title="Done" />
    </section>
  );
}
