import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProtfolio, getProtfolio } from "../../../../rtk/Protfolio";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import editIcon from "../../../../assets/edit.svg";
import Swal from "sweetalert2";
import AddProtfolio from "./AddProtfolio";
import url from "../../../../url.json";
import { Alert } from "react-bootstrap";

const CardProtfolio = () => {
  console.log(url.url);
  const { clientProtfolioData } = useSelector((state) => state.Profile);
  const { loading, error } = useSelector((state) => state.Profile);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null); // Store the selected portfolio

  useEffect(() => {
    dispatch(getProtfolio({ token }));
  }, [dispatch, token]);

  const handeldelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProtfolio({ id, token }));
        Swal.fire({
          title: "Deleted!",
          text: "Your Protfolio has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleEdit = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      id="cards-protfolio"
    >
      {clientProtfolioData &&
        clientProtfolioData.msg.map((portfolio) => (
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
                style={{ flex: "1", marginRight: "10px", overflow: "hidden" }}
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
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Oh! You got an error!</Alert.Heading>
          <h3>{error}</h3>
        </Alert>
      )}
      {selectedPortfolio && (
        <div>
          <AddProtfolio
            portfolio={selectedPortfolio}
            onClose={() => setSelectedPortfolio(null)}
          />
        </div>
      )}
    </div>
  );
};

export default CardProtfolio;
