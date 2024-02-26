import AddModal from "./components/modal/AddModal";
import BoardArea from "./container/BoardArea";
import { FaPlus } from "react-icons/fa";

function App() {
  return (
    <main className="min-h-screen ">
      <section className="px-6 pt-10 md:px-14">
        <div className="">
          <p className="text-3xl font-bold">TaskBoard</p>
          <p className="text-base mt-1.5">Reynaldi Neo R - 5025221265</p>
        </div>
      </section>
      <AddModal>
        {({ openModal }) => (
          <div className="flex items-center justify-end mr-10">
            <button
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg flex items-center"
              onClick={openModal}
            >
              <FaPlus className="mr-2" /> Add New Task
            </button>
          </div>
        )}
      </AddModal>
      <BoardArea />
    </main>
  );
}

export default App;
