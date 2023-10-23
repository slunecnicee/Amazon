import { FaGlobe } from "react-icons/fa";

const ComponentB = () => {
  return (
    <div className="footer2">
      <img
        src="https://wildfiresocial.com/wp-content/uploads/2019/01/amazon-logo-white._cb1509666198_.png"
        alt="logo"
      />
      <button>
        <FaGlobe />
        English
      </button>

      <button>$USD-U.S. Dollar</button>

      <button>
        <img
          src="https://www.freeiconspng.com/thumbs/american-us-flag-icon/us-flag-icon-5.png"
          alt="us flag"
        />
        united states
      </button>
    </div>
  );
};

export default ComponentB;
