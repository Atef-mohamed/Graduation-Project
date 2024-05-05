// src\components\Protfolio\ProtfolioEdit.js
import React, { useRef, useState } from "react";
import uploadLlogo from "../../assets/Upload-pro.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProtfolio, updatePortfolio } from "../../rtk/Protfolio";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import url from "../../url.json";

const ProtfolioEdit = ({ portfolio, onClose }) => {
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState(portfolio.description);
  const [img_before, setImg_before] = useState(
    url.url + "/img/" + portfolio.img_before
  );
  const [img_after, setImg_after] = useState(
    url.url + "/img/" + portfolio.img_after
  );
  const { loading, error, userProtfolioData } = useSelector(
    (state) => state.Profile
  );
  const imgBefore = useRef();
  const imgAfter = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // for textArea
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setDescription((prevValue) => prevValue + "\n");
    }
  };

  const handleDescriptionChange = (e) => {
    const input = e.target.value;
    const minLength = 30;
    if (input.length < minLength) {
      e.target.setCustomValidity(
        `Description must be at least ${30} characters long`
      );
      // } else if (input.length > maxLength) {
      //   e.target.setCustomValidity(`Description must not exceed ${maxLength} characters`);
    } else {
      e.target.setCustomValidity(""); // Reset custom validity
    }
    setDescription(input);
  };

  const handelFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select Image after ",
      });
    } else {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (
        !(
          fileExtension === "jpg" ||
          fileExtension === "jpeg" ||
          fileExtension === "png"
        )
      ) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please select image as JPG,JPEG,PNG file",
        });
      } else {
        e.target.setCustomValidity("");
        const imga = URL.createObjectURL(file); // Create URL for preview
        // const image = document.getElementById("output");
        imgBefore.current.src = imga;
        console.log(file);
        setImg_before(imga);
      }
    }
  };
  const handelFileAfter = (e) => {
    const file = e.target.files[0];
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select  Image before ",
      });
    } else {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (
        !(
          fileExtension === "jpg" ||
          fileExtension === "jpeg" ||
          fileExtension === "png"
        )
      ) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please select image as JPG,JPEG,PNG file",
        });
      } else {
        e.target.setCustomValidity("");
        const imga = URL.createObjectURL(file); // Create URL for preview
        // const image = document.getElementById("after");
        imgAfter.current.src = imga;
        console.log(file);
        setImg_after(imga);
      }
    }
  };
  //
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      // Gather form data
      const formData = new FormData(form);
      formData.append("id", portfolio.id);
      formData.append("description", description);
      formData.append("img_before", img_before);
      formData.append("img_after", img_after);
      formData.append("token", token);
      // Dispatch form data
      dispatch(updatePortfolio(formData));
      dispatch(getProtfolio({ token }));
      onClose();
    }
  };
  return (
    <>
      <div id="protfolio">
        <form validated={validated} onSubmit={handleSubmit}>
          <div className="upload-img ">
            <div className="col-12 col-md-6">
              <label htmlFor="fileBefore" id="custom-file-upload">
                <img src={uploadLlogo} alt="" id="upload-logo" />
                <img id="output-before" ref={imgBefore} src={img_before} />
                <input
                  id="fileBefore"
                  type="file"
                  name="img_before"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handelFile}
                />
              </label>
              <h4 className="after-bef">Choose Image Before</h4>
            </div>
            <div className="col-12 col-md-5 text-center">
              <label htmlFor="fileAfter" id="custom-file-upload">
                <img src={uploadLlogo} alt="" id="upload-logo" />
                <img id="after" ref={imgAfter} src={img_after} />
                <input
                  id="fileAfter"
                  type="file"
                  name="img_after"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handelFileAfter}
                />
              </label>
              <h4 className="after-bef">Choose Image After</h4>
            </div>
          </div>
          <div id="add-description" className="d-flex flex-column mt-4">
            <label>Add description</label>
            <textarea
              required
              value={description}
              onChange={handleDescriptionChange}
              onKeyDown={handleKeyDown}
              rows={5}
              style={{ resize: "none", width: "100%", overflow: "auto" }}
            />
          </div>
          <div className="row mt-5 ">
            {userProtfolioData && userProtfolioData.status === false ? (
              // <h2 className="text-danger text-center txt-res phone">
              <Alert variant="danger" dismissible>
                <Alert.Heading>Oh! You got an error!</Alert.Heading>
                {Object.keys(userProtfolioData.msg).map((key) => (
                  <div key={key}>
                    {userProtfolioData.msg[key].map((msg, index) => (
                      <p key={index}>{msg}</p>
                    ))}
                  </div>
                ))}{" "}
                {userProtfolioData.error_msg}
              </Alert>
            ) : // </h2>
            null}

            {error && (
              <h4 className="text-danger txt-res text-center">{error}</h4>
            )}
          </div>
          <div className="d-flex justify-content-around mt-5">
            <button id="save-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProtfolioEdit;
