import ComponentA from "./ComponentA";
import CcomponentB from "./ComponentB";
import ComponentC from "./ComponentC";
import { ComponentD } from "./ComponentC";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  if (
    location.pathname.includes("/login") ||
    location.pathname.includes("/register")
  ) {
    return null;
  }
  const scrolltop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonStyles = {
    width: "100%",
    padding: "20px",
    color: "white",
    backgroundColor: "#273546",
    border: "none",
    fontWeight: "900",
    fontSize: "15px",
  };

  return (
    <div>
      <button style={buttonStyles} onClick={scrolltop}>
        {" "}
        Back to top
      </button>
      <ComponentA />
      <CcomponentB />
      <ComponentC />
      <ComponentD />
    </div>
  );
};

export default Footer;
