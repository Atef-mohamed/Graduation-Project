// src\components\Protfolio\pages\AddProtflio\CardProtfolio.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// start
import { deleteProtfolio, getProtfolio } from "../../../../rtk/Protfolio";
// end
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import editIcon from "../../../../assets/edit.svg";
import deleteIcon from "../../../../assets/delete.svg";
import Swal from "sweetalert2";
import url from "../../../../url.json";
import { Alert } from "react-bootstrap";
import ProtfolioEdit from "../../ProtfolioEdit";

const CardProtfolio = () => {
  console.log(url.url);
  const { clientProtfolioData } = useSelector((state) => state.Profile);
  const { loading, error } = useSelector((state) => state.Profile);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null); // Store the selected portfolio
  //start
  useEffect(() => {
    dispatch(getProtfolio({ token }));
  }, []);
  //end
  const handeldelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this protfolio ?",
      showDenyButton: true,
      confirmButtonText: "yes",
      denyButtonText: `No`,
      customClass: {
        title: "swal-title",
        confirmButton: "swal-deny-button",
        denyButton: " swal-confirm-button",
        popup: "swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProtfolio({ id, token }));
        //start
        dispatch(getProtfolio({ token }));
        //end
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500,
          customClass: {
            title: "swal-title-green",
            popup: "swal-popup",
          },
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: "protfolio not deleted",
          icon: "info",
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1500,
          customClass: {
            title: "swal-title-green",
            confirmButton: "swal-confirm-button",
            popup: "swal-popup",
          },
        });
      }
    });
  };

  const handleEdit = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  {
    return selectedPortfolio ? (
      <div>
        <ProtfolioEdit
          portfolio={selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
        />
      </div>
    ) : (
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        id="cards-protfolio"
      >
        {clientProtfolioData &&
          clientProtfolioData.msg.map((portfolio) => (
            <>
              <Card
                id="card-protfolio"
                key={portfolio.id}
                style={{
                  width: "50rem",
                  borderRadius: "20px",
                  boxShadow: "0 0 7px rgba(0, 0, 0, 0.5)",
                  marginTop: "20px",
                  flex: "auto",
                }}
              >
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      marginRight: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "wrap",
                      }}
                    >
                      <Card.Text id="card-txt" className="">
                        {portfolio.description}
                      </Card.Text>
                    </div>
                  </div>
                  <div className="d-flex flex-row gap-2">
                    <Card.Img
                      variant="top"
                      src={`${url.url}/img/${portfolio.img_before}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "20px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Img
                      variant="bottom"
                      src={`${url.url}/img/${portfolio.img_after}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                  <div style={{ position: "absolute", top: "0", left: "0" }}>
                    <Button
                      variant="link"
                      id="edit-card"
                      onClick={() => handleEdit(portfolio)}
                    >
                      <img src={editIcon} alt="Edit" />
                    </Button>
                  </div>
                  <div style={{ position: "absolute", top: "0", left: "60px" }}>
                    <Button
                      variant="link"
                      id="del-card"
                      className="text-danger"
                      onClick={() => handeldelete(portfolio.id)}
                    >
                      <img src={deleteIcon} alt=""  width={"50px"}/>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          ))}
        {error && (
          <Alert variant="danger" dismissible>
            <Alert.Heading>Oh! You got an error!</Alert.Heading>
            <h3>{error}</h3>
          </Alert>
        )}
      </div>
    );
  }
};

export default CardProtfolio;
