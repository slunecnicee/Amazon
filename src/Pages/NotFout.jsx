import puppy from "../images/puppy.avif";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const push = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "gray", fontSize: "40px" }}> 404 </h1>
      <h2>This Page Doesnt Exists</h2>
      <h2>But Enjoy this cute picture of my puppy</h2>
      <img style={{ mixBlendMode: "multiply" }} src={puppy} alt="Bonnie" />
      <p
        onClick={() => push("/")}
        style={{
          color: "steelblue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        Back to homepage
      </p>
    </div>
  );
};

export default NotFound;
