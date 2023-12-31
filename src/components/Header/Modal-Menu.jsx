import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogOut } from "../../features/user";

const ModalMenu = ({ setModalOpen, setAnimating, animating }) => {
  const { categories } = useSelector((state) => state.categories);
  const push = useNavigate();
  const { unique_name, isSignedIn } = useSelector((state) => state.user);
  const [seeMore, setSeeMore] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(handleLogOut());
  };

  const handleSeeMore = () => {
    setSeeMore((prev) => !prev);
  };

  const handleCategoryClick = (id) => {
    push(`/categorypage/${id}`);
  };

  const handleClose = () => {
    setAnimating(false);
    setTimeout(() => {
      setModalOpen(false);
    }, 500);
  };

  return (
    <div className={`modal ${animating ? "open-modal" : "close-modal"}`}>
      <button onClick={handleClose} className="close-btn">
        X
      </button>

      <div className="Hello-user">
        <FaUser />
        <h3>
          Hello,{" "}
          {isSignedIn ? <span>{unique_name}</span> : <span> Sign in </span>}{" "}
        </h3>
      </div>

      <div className="departmentwrp">
        <section className="shop-by-department">
          <h3>Shop by department</h3>
          <ul>
            {categories.slice(0, 5).map((c) => {
              return (
                <li key={c.id} onClick={() => handleCategoryClick(c.id)}>
                  {c.name} <span>&#8250;</span>
                </li>
              );
            })}
            {seeMore && (
              <section className="seemore">
                <ul>
                  {categories.slice(5, 12).map((c) => {
                    return (
                      <li key={c.id} onClick={() => handleCategoryClick(c.id)}>
                        {c.name} <span>&#8250;</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
            <button onClick={handleSeeMore}>
              {" "}
              {seeMore ? "See less" : "See all"}{" "}
              <span
                style={
                  seeMore
                    ? { transform: "rotate(-90deg)" }
                    : { transform: "rotate(90deg)" }
                }
              >
                &#8250;
              </span>{" "}
            </button>
          </ul>
        </section>

        <section className="help-settings">
          <h3>Help & settings</h3>
          <ul>
            <li onClick={() => push("/updatePage")}>your account</li>
            <li> English 🇺🇸</li>
            <li>costumer service</li>
            {isSignedIn ? (
              <li style={{ cursor: "pointer" }} onClick={handleSignOut}>
                Sign out
              </li>
            ) : (
              <li
                onClick={() => {
                  push("/login");
                  document.body.style.height = "auto";
                  document.body.style.overflow = "auto";
                }}
              >
                Sign in
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ModalMenu;
