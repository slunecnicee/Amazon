import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header2 = ({ setModalOpen, setAnimating, modalOpen }) => {
  const navigate = useNavigate();
  const handleOpen = () => {
    setModalOpen(true);
    setAnimating(true);
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  };

  return (
    <section className="nav-header">
      <div className="menu-icon-box" onClick={handleOpen}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </div>

      <button className="btn7">
        {" "}
        <FaMapMarkerAlt /> Deliver to Georgia
      </button>

      {modalOpen && <div className="overlay"></div>}

      <div className="header-nav">
        <ul>
          <li onClick={() => navigate("/allproducts")}>All</li>
          <li>Today's Deals</li>
          <li> Costumer Servise</li>
          <li>Registery</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
      </div>
    </section>
  );
};

export default Header2;
