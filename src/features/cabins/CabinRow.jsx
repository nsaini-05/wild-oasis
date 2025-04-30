import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDelteCabin";
import Row from "../../ui/Row";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useEditCabin } from "./useEditCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { name, maxCapacity, image, discount, regularPrice, id, description } =
    cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing } = useEditCabin();

  const duplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      image,
      discount,
      regularPrice,
      description,
    });
  };

  return (
    <Table.Row>
      <Img src={image}></Img>
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Row>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id}></Menus.Toggle>
            <Menus.List id={cabin.id}>
              <Menus.Button
                onClick={() => duplicateCabin()}
                disabled={isCreating}
              >
                <HiSquare2Stack />
                Duplicate
              </Menus.Button>
              <Modal.Open opens="edit-row">
                <Menus.Button>
                  <HiPencil />
                  Edit
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete-row">
                <Menus.Button>
                  <HiTrash />
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-row">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window name="delete-row">
              <ConfirmDelete
                resourceName={"Cabins"}
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Row>
    </Table.Row>
  );
}

export default CabinRow;
