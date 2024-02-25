import * as React from "react";

import Modal from "./Modal";

type ModalReturnType = {
  openModal: () => void;
};

export default function DetailTaskModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Detail Task">
        <Modal.Section>
          <form className="flex-col space-y-4">
            <div>
              <label htmlFor="fname">Title :</label>
              <input
                type="text"
                id="title"
                name="title"
                className="border px-1 mt-1.5 w-full"
              />
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                id="description"
                name="description"
                className="border px-1 mt-1.5 w-full"
              />
            </div>
            <div>
              <label htmlFor="dueDate">Due Date : </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="border px-1 mt-1.5 w-full"
              />
            </div>
            <button
              type="submit"
              className="px-2 py-1 w-full mt-2 bg-blue-400 rounded-xl text-white"
            >
              Submit
            </button>
          </form>
        </Modal.Section>
      </Modal>
    </>
  );
}
