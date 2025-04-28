import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddCabin;

//  {/* <Button onClick={() => setIsOpenModal((open) => !open)}>
//         Create New Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={handleClose}>
//           <CreateCabinForm onClose={handleClose} />
//         </Modal>
//       )} */}
