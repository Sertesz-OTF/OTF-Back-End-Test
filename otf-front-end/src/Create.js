import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const CreateRegister = async (e) => {
    e.preventDefault();
    const body = {
      name: e.target[0].value,
      last_name: e.target[1].value,
      document_id: e.target[2].value,
    };
    const res = await axios.post(`http://localhost:8080/create`, body);
    if (res.status === 200) {
      navigate("/");
    }
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{ paddingLeft: "20px" }} href="/">
          OTF Back-End Developer Test
        </Navbar.Brand>
      </Navbar>
      <div style={{ padding: "25px 200px 75px 20px" }}>
        <Card style={{ width: "30vw" }}>
          <Card.Header style={{ padding: "10px 20px 10px 20px" }}>
            Create Register
          </Card.Header>
          <div>
            <Form onSubmit={CreateRegister}>
              <Form.Label
                style={{ padding: "10px 20px 2px 20px" }}
                htmlFor="basic-url"
              >
                Name
              </Form.Label>
              <InputGroup
                style={{ padding: "2px 20px 2px 20px" }}
                className="mb-3"
              >
                <Form.Control
                  id="name"
                  name="name"
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
              <Form.Label
                style={{ padding: "2px 20px 2px 20px" }}
                htmlFor="basic-url"
              >
                Last Name
              </Form.Label>
              <InputGroup
                style={{ padding: "2px 20px 2px 20px" }}
                className="mb-3"
              >
                <Form.Control
                  id="last_name"
                  name="last_name"
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
              <Form.Label
                style={{ padding: "2px 20px 2px 20px" }}
                htmlFor="basic-url"
              >
                Document ID
              </Form.Label>
              <InputGroup
                style={{ padding: "2px 20px 2px 20px" }}
                className="mb-3"
              >
                <Form.Control
                  id="document_id"
                  name="document_id"
                  aria-describedby="basic-addon3"
                />
              </InputGroup>
              <div style={{ padding: "2px 20px 20px 20px" }}>
                <Button type="submit" variant="success">
                  Create
                </Button>{" "}
                <Link to="/">
                  <Button variant="danger">Cancel</Button>{" "}
                </Link>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Create;
