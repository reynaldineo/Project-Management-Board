import AddTaskModal from "./components/modals/AddTaskModal";
import BoardArea from "./container/BoardArea";
import "./app.css";

function App() {
  return (
    <main className="app-container">
      <section className="top-section">
        <p className="text-title">TaskBoard</p>
        <p className="text-myname">Reynaldi Neo R - 5025221265</p>
      </section>
      <section className="add-task-modal-container">
        <AddTaskModal />
      </section>
      <BoardArea />
    </main>
  );
}

export default App;
