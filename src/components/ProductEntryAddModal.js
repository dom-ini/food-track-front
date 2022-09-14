import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";

import ProductEntryAddContainer from "./ProductEntryAddContainer";

import useDiary from "../hooks/useDiary";

import { MEALS, DATE_LOCALE as LOCALE } from "../globals/constants";

const ProductEntryAddModal = ({ isModalVisible, closeModal }) => {
  const { state } = useDiary();

  return (
    <Modal
      show={isModalVisible}
      onHide={closeModal}
      size="lg"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Dodaj wpis do dziennika - {MEALS[state.selectedMeal]},{" "}
          {format(state.selectedDay, "d. MMMM", { locale: LOCALE })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductEntryAddContainer closeModal={closeModal} />
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button
          as={Link}
          to="/dodaj-produkt"
          variant="outline-primary"
          role="button"
        >
          Dodaj produkt do bazy
        </Button>
        <Button variant="secondary" onClick={closeModal} role="button">
          Anuluj
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductEntryAddModal;
