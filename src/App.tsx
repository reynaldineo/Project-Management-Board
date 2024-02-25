import AddModal from "./components/AddModal";
import BoardArea from "./container/BoardArea";

function App() {
  return (
    <main className="min-h-screen ">
      <div className="px-6 pt-10">
        <p className="text-3xl font-bold">TaskBoard</p>
        <div>Reynaldi Neo R</div>
      </div>
      <AddModal>
        {({ openModal }) => (
          <div className="flex items-center justify-end mr-10">
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg"
              onClick={openModal}
            >
              New Task
            </button>
          </div>
        )}
      </AddModal>
      <BoardArea />
      <p>Rey</p>
    </main>
  );
}

export default App;
