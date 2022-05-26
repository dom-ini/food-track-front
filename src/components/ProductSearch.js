import { Form } from "react-bootstrap";

const ProductSearch = ({ className, search, setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()} className={className || null}>
      <Form.Control
        value={search}
        onChange={handleSearchChange}
        placeholder="Szukaj produktu..."
      />
    </Form>
  );
};

export default ProductSearch;
