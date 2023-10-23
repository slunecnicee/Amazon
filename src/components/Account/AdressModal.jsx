import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AdressModal = ({ adresses, setadresses, setAdresModal, handleSave }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setadresses((prevAdresses) => ({
      ...prevAdresses,
      [name]: value,
    }));
  };

  return (
    <div className="adressModal">
      <h3>Add New Adress</h3>
      <div>
        <TextField
          label="Full Name"
          sx={{ margin: "10px " }}
          type="text"
          onChange={handleChange}
          name="name"
          value={adresses.name}
        />
        <TextField
          label="Street"
          sx={{ margin: "10px " }}
          type="text"
          onChange={handleChange}
          name="street"
          value={adresses.street}
        />
        <TextField
          label="City"
          sx={{ margin: "10px " }}
          type="text"
          onChange={handleChange}
          name="city"
          value={adresses.city}
        />
        <TextField
          label="Country"
          sx={{ margin: "10px " }}
          type="text"
          onChange={handleChange}
          name="country"
          value={adresses.country}
        />
        <TextField
          label="Zip Code"
          sx={{ margin: "10px " }}
          type="text"
          onChange={handleChange}
          name="zip"
          value={adresses.zip}
        />
        <TextField
          label="Phone"
          sx={{ margin: "10px " }}
          type="text"
          onChange={handleChange}
          name="phone"
          value={adresses.phone}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <span className="closebtn" onClick={() => setAdresModal(false)}>
        {" "}
        <CloseIcon />
      </span>
    </div>
  );
};

export default AdressModal;
