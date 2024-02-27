// import { useState } from "react";
import AddTaskModal from "./components/modals/AddTaskModal";
import BoardArea from "./container/BoardArea";

function App() {
  return (
    <main className="min-h-screen ">
      <section className="px-6 pt-10 md:px-14">
        <div className="">
          <p className="text-3xl font-bold">TaskBoard</p>
          <p className="text-base mt-1.5">Reynaldi Neo R - 5025221265</p>
        </div>
      </section>
      <div className="flex items-center justify-end mr-10">
        <AddTaskModal />
      </div>
      <BoardArea />
    </main>
  );
}

export default App;
