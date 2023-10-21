import { useState } from "react";
import Header1 from "./Header1";
import Header2 from "./Header2";
import ModalMenu from "./Modal-Menu";
const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  return (
    <>
      <Header1 />
      <Header2
        setModalOpen={setModalOpen}
        setAnimating={setAnimating}
        modalOpen={modalOpen}
      />

      {modalOpen && (
        <ModalMenu
          setModalOpen={setModalOpen}
          setAnimating={setAnimating}
          animating={animating}
        />
      )}
    </>
  );
};

export default Header;
