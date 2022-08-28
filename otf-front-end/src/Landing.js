import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

function ListRegisters() {
  return axios.get("http://localhost:8080/", {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000/",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

function DeleteRegister(id) {
  return axios.delete(`http://localhost:8080/delete/${id}`);
}

const Landing = () => {
  const fetchData = async () => {
    const registers = await ListRegisters();
    setRegisters(registers.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ReLoad = async (id) => {
    const deletedreg = await DeleteRegister(id);
    if ((deletedreg.status === 200)) {
      fetchData();
    }
  };
  const [registers, setRegisters] = useState([]);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{ paddingLeft: "20px" }} href="/">
          OTF Back-End Developer Test
        </Navbar.Brand>
      </Navbar>
      <div style={{ padding: "25px 200px 75px 20px" }}>
        <Table striped bordered hover variant="light">
          <thead variant="dark">
            <tr style={{ backgroundColor: "#212529", color: "white" }}>
              <th
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  textAlign: "center",
                }}
              >
                #
              </th>
              <th
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Name
              </th>
              <th
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Last Name
              </th>
              <th
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Document ID
              </th>
              <th
                style={{
                  backgroundColor: "#212529",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {registers.map((register, i) => {
              return (
                <tr>
                  <th style={{ textAlign: "center" }}>{i + 1}</th>
                  <td style={{ textAlign: "center" }}>
                    {register.values.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {register.values.last_name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {register.values.document_id}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <FontAwesomeIcon
                      onClick={() => ReLoad(register.id)}
                      icon={faTrashCan}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    <Link to={{ pathname: `/update/${register.id}` }}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "blue" }}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Link to="/create">
          <Button variant="success">Add New</Button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Landing;
