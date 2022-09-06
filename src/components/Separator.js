import "../styles/components/Separator.scss";

const Separator = ({ className, content }) => {
  return (
    <div
      className={`separator d-flex align-items-center text-center ${
        className || ""
      }`}
    >
      <span>{content}</span>
    </div>
  );
};

export default Separator;
