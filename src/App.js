import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "./components/Styles/styles.css"
import { AllRoutes } from "./components/Routes/AllRoutes";

function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
        <AllRoutes />          
        </Col>
      </Row>
    </Container>
  );
}

export default App;
