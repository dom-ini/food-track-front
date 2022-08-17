import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import pl from "date-fns/locale/pl";

import { MEALS } from "../globals/constants";
import ProductEntryAddContainer from "./ProductEntryAddContainer";

const LOCALE = pl;

const ProductEntryAddModal = ({
  isModalVisible,
  closeModal,
  date,
  meal,
  setDiaryEntries,
}) => {
  return (
    <Modal
      show={isModalVisible}
      onHide={closeModal}
      size="lg"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Dodaj wpis do dziennika - {MEALS[meal]},{" "}
          {format(date, "d. MMMM", { locale: LOCALE })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductEntryAddContainer
          date={date}
          meal={meal}
          closeModal={closeModal}
          setDiaryEntries={setDiaryEntries}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button as={Link} to="/dodaj-produkt" variant="outline-primary" role="button">
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
