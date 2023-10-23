import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Fragment, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const AccountModal = ({
  setModalOpen,
  updatingField,
  val,
  name,
  handleChange,
  setName,
  setval,
  setUpdatingField,
  setType,
  handleUpdate,
  inputs,
  setInputs,
  unique_name,
  email,
}) => {
  const handleClose = () => {
    setUpdatingField("");
    setType("");
    setval(null);
    setName("");
    setModalOpen(false);
    setInputs({
      email: email,
      name: unique_name,
      password: "",
    });
  };

  const [visibility, setVisibility] = useState(false);

  return (
    <div className="updateModal">
      <h3>updating {updatingField} </h3>
      <p>
        Changes made to your profile name here, will be shown anywhere your
        profile is used.
      </p>

      <TextField
        sx={{ margin: "10px " }}
        type={name !== "password" || visibility ? "text" : "password"}
        onChange={handleChange}
        name={name}
        placeholder={val}
      />

      {name === "password" && (
        <span className="visibility">
          <RemoveRedEyeIcon onClick={() => setVisibility(!visibility)} />
        </span>
      )}

      {name !== "password" && (
        <TextField
          sx={{ margin: "10px " }}
          type={visibility ? "text" : "password"}
          onChange={(e) => {
            setInputs({
              email: inputs.email,
              name: inputs.name,
              password: e.target.value,
            });
          }}
          value={inputs.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setVisibility(!visibility)}
                  edge="end"
                >
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      <button onClick={handleUpdate} className="savebtn">
        Save Changes{" "}
      </button>
      <span className="closebtn" onClick={handleClose}>
        {" "}
        <CloseIcon />
      </span>
    </div>
  );
};

export default AccountModal;
