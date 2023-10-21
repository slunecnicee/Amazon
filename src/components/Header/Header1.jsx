import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogOut } from "../../features/user";

const url =
  "data:image/png;base64,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";

const Header1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { person } = useSelector((state) => state.user);

  const onLogOut = () => {
    dispatch(handleLogOut());
  };

  return (
    <header>
      <div onClick={() => navigate("/")} className="image-div">
        <img src={url} alt="amazon logo" />
      </div>

      <button className="btn1">
        <p>Deliver to</p>
        <h3>
          <FaMapMarkerAlt /> Georgia
        </h3>
      </button>

      <div className="search">
        <select>
          <option value="">ALL</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

        <input type="text" placeholder="Search..." />

        <button className="header-btn-2">
          <FaSearch />
        </button>
      </div>

      <button className="btn2">
        <p>🇺🇸 EN▼</p>
      </button>

      <button className="btn3">
        {person.unique_name === "" ? (
          <p>Hello, Sign in</p>
        ) : (
          <p>Hello, {person.unique_name}</p>
        )}
        <h3>Account&Lists▼</h3>
        <section className="signIn-options">
          <NavLink to="/register">
            {" "}
            <h2>Register</h2>{" "}
          </NavLink>
          <NavLink to="/login">
            {" "}
            <h2>Sign in</h2>{" "}
          </NavLink>
          <button onClick={onLogOut}>Log Out</button>
        </section>
      </button>

      <button className="btn4">
        <p>Returns</p>
        <h2>&Orders</h2>
      </button>

      <button className="btn5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="bi bi-handbag-fill"
        >
          <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
        </svg>
        <span>0</span>
      </button>

      <button className="btn6">
        Sign in
        <h2>
          <IoMdPerson />
        </h2>{" "}
      </button>
      <div className="header-overlay"></div>
    </header>
  );
};

export default Header1;
