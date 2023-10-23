import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../servises/updateUser";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { handleLogIn, handleSetAddress } from "../features/user";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Pagefooter";
import Sliders from "../components/Home/homepageSliders";
import AccountModal from "../components/Account/AccountModal";
import AdressModal from "../components/Account/AdressModal";

const UpdatePage = () => {
  const { unique_name, nameid, email, addresses } = useSelector(
    (state) => state.user
  );
  const { demanded, isLoading } = useSelector((state) => state.demanded);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [adresModal, setAdresModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingField, setUpdatingField] = useState(null);
  const [type, setType] = useState("");
  const [val, setval] = useState(null);
  const [name, setName] = useState("");
  const [inputs, setInputs] = useState({
    email: email,
    name: unique_name,
    password: "",
  });

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    country: "",
    zip: "",
    phone: "",
  });

  useEffect(() => {
    const adressData = JSON.parse(localStorage.getItem("addresses"));
    setData(adressData);
    console.log(adressData);
  }, [addresses]);

  const handleDeleteAddress = (id) => {
    const updatedAddresses = data.filter((address) => address.id !== id);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setData(updatedAddresses);
    toast.success("Address deleted successfully");
  };

  const handleAddressClick = () => {
    dispatch(handleSetAddress(address));
    setAdresModal(false);
    toast.success("Address added successfully");
    console.log(addresses);
  };

  const onchange = (e) => {
    if (e.target.name === "email") {
      setInputs({
        email: e.target.value,
        name: inputs.name,
        password: inputs.password,
      });
    } else if (e.target.name === "name") {
      setInputs({
        email: inputs.email,
        name: e.target.value,
        password: inputs.password,
      });
    } else {
      setInputs({
        email: inputs.email,
        name: inputs.name,
        password: e.target.value,
      });
    }
  };

  const handleEmailEditClick = () => {
    setUpdatingField("email");
    setType("text");
    setval(inputs.email);
    setName("email");
    setModalOpen(true);
  };

  const handleNameEditClick = () => {
    setUpdatingField("username");
    setType("text");
    setval(inputs.name);
    setName("name");
    setModalOpen(true);
  };

  const handlePasswordEditClick = () => {
    setUpdatingField("Password");
    setType("password");
    setval(inputs.password);
    setName("password");
    setModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      inputs.password.length < 6 ||
      inputs.password === "" ||
      !/[a-zA-Z]/.test(inputs.password)
    ) {
      toast.error(
        "Password must be at least 6 characters and include one letter"
      );
    } else {
      const { data } = await updateUserData({
        userName: inputs.name,
        id: nameid,
        email: inputs.email,
        newPassword: inputs.password,
      });
      if (data.jwt) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.jwt);
        console.log(data);
        const decoded = jwt_decode(data.jwt);
        dispatch(handleLogIn(decoded));
        toast.success("Changes Saved Successfully");
        setModalOpen(false);
      } else {
        toast.error("OOPSIE...! Something went wrong");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Header />
      {modalOpen && (
        <AccountModal
          setModalOpen={setModalOpen}
          updatingField={updatingField}
          val={val}
          type={type}
          name={name}
          handleChange={onchange}
          setUpdatingField={setUpdatingField}
          setType={setType}
          setName={setName}
          setval={setval}
          setInputs={setInputs}
          unique_name={unique_name}
          email={email}
          inputs={inputs}
          handleUpdate={handleUpdate}
        />
      )}

      {adresModal && (
        <AdressModal
          adresses={address}
          setadresses={setAddress}
          setAdresModal={setAdresModal}
          handleSave={handleAddressClick}
        />
      )}
      <article className="updateWrp">
        <div className="update">
          <h2>Manage your Profile</h2>
          <div className="updateForm">
            <div onClick={handleNameEditClick} className="name">
              <h3>
                {unique_name}{" "}
                <span>
                  <EditIcon style={{ fontSize: "15px" }} />
                </span>
              </h3>
              <p>Account holder </p>
            </div>
            <div onClick={handleEmailEditClick} className="email">
              <h3>
                {email}{" "}
                <span>
                  <EditIcon style={{ fontSize: "15px" }} />
                </span>
              </h3>
              <p>Email</p>
            </div>
            <div onClick={handlePasswordEditClick} className="pass">
              <h3>
                Password
                <span>
                  <EditIcon style={{ fontSize: "15px" }} />
                </span>
              </h3>
              <p>Change Password</p>
            </div>

            <div className="adresses">
              <h3>Your adresses</h3>
              {data.length > 0 ? (
                <>
                  <ul>
                    {data.map((addres) => (
                      <li>
                        <p>Full Name: {addres.name}</p>
                        <p>Coundtry: {addres.country}</p>
                        <p>City: {addres.city}</p>
                        <p>Street: {addres.street}</p>
                        <p>Zip: {addres.zip}</p>
                        <p>phone: {addres.phone}</p>
                        <span onClick={() => handleDeleteAddress(addres.id)}>
                          <CloseIcon />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button className="add" onClick={() => setAdresModal(true)}>
                    Add New Adress
                  </button>
                </>
              ) : (
                <div className="noadresses">
                  <h4>No Adresses Added</h4>
                  <button onClick={() => setAdresModal(true)}>
                    Add Adress
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {!isLoading && (
        <Sliders products={demanded} title={"Frequently Purchaised Products"} />
      )}

      <Footer />
    </div>
  );
};

export default UpdatePage;
