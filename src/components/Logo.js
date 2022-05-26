import { Image } from "react-bootstrap";

import logo from "../assets/img/logo-big.png";

const Logo = ({ height, width, className }) => {
  return (
    <Image
      src={logo}
      height={height}
      width={width}
      className={className}
      alt="Food Track logo"
    />
  );
};

export default Logo;
