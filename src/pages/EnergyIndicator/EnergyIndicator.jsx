import React, { useState } from "react";
import { Data } from "../../utils/Data";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Carousel from "react-bootstrap/Carousel";
import Offcanvas from "react-bootstrap/Offcanvas";
import DoughnutChart from "../../components/GaugeChart";
import HorizontalBarChart from "../../components/HorizontalBarChart";

export default function EnergyIndicator() {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Energia consumida ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "#009a60",
                    "#92b73a",
                    "#edbd02",
                    "#fc6114",
                    "#ed0022",
                ],
                borderColor: "black",
                borderWidth: 2,
                borderRadius: 5,
                barThickness: 40,
            },
        ],
    });

    return (
        <div className="App">
            {/* Navbar block */}
            {
                /*
                <Navbar key={false} bg="AliceBlue" expand={false}>
                <Container fluid style={{ height: "1vh" }}>
                    <Navbar.Brand href="#"></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${false}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                                MENU
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
                */
            }
            {/* Cards block */}
            <Container fluid>
                <Row style={{ height: "100vh" }}>
                    <Col style={{ height: "90%" }} xs={3} className="align-self-center">
                        <Card style={{ height: "40%" }} className="mb-2 shadow text-center">
                            <Card.Header>
                                <h3>Energia consumida en edificio 1</h3>
                            </Card.Header>
                            <Card.Body>
                                <div
                                    style={{
                                        width: "70%",
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,

                                        margin: "auto",
                                    }}
                                >
                                    <DoughnutChart />
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <h1 style={{ color: "#009a60" }}>16.5KWh</h1>
                            </Card.Footer>
                        </Card>
                        <Card style={{ height: "59%" }} className="shadow text-center">
                            <Card.Header>
                                <h3>Energia consumida por edificio</h3>
                            </Card.Header>
                            <Card.Body>
                                <div
                                    style={{
                                        width: "90%",
                                        position: "absolute",
                                        top: 60,
                                        bottom: 10,
                                        left: 0,
                                        right: 0,

                                        margin: "auto",
                                    }}
                                >
                                    <HorizontalBarChart
                                        chartData={chartData}
                                    ></HorizontalBarChart>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={9} style={{ height: "90%" }} className="align-self-center">
                        <Card style={{ height: "70%" }} className="shadow mb-2">
                            <video controls height={"100%"}>
                                Sorry, your browser doesn't support videos.
                            </video>
                        </Card>
                        <Card style={{ height: "29%" }} className="shadow text-center">
                            <Card.Body>
                                <Card.Text>
                                    <Carousel
                                        variant="dark"
                                        controls={false}
                                        indicators={false}
                                        interval={3000}
                                    >
                                        <Carousel.Item>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "12rem",
                                                    overflow: "hidden",
                                                    display: "block",
                                                }}
                                            ></div>
                                            <Carousel.Caption>
                                                <h3>First slide label</h3>
                                                <p>
                                                    Nulla vitae elit libero, a pharetra augue mollis
                                                    interdum.
                                                </p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "12rem",
                                                    overflow: "hidden",
                                                    display: "block",
                                                }}
                                            ></div>
                                            <Carousel.Caption>
                                                <h3>Second slide label</h3>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                    elit.
                                                </p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "12rem",
                                                    overflow: "hidden",
                                                    display: "block",
                                                }}
                                            ></div>
                                            <Carousel.Caption>
                                                <h3>Third slide label</h3>
                                                <p>
                                                    Praesent commodo cursus magna, vel scelerisque nisl
                                                    consectetur.
                                                </p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}