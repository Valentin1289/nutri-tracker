import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "./Modal";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { searchByName, searchByBarcode } from "./Utils";
import state from "./AtomStates";
import { useAtom } from "jotai";

export default function SearchBar(props) {
  const [modalShow, setModalShow] = useAtom(state.modalShow);
  const [isLogin, setIsLogin] = useState(false);
  const inputValue = useRef(null);
  const [searchNames, setSearchNames] = useAtom(state.searchNames);
  const [product, setProduct] = useAtom(state.product);
  const [isLoggedIn, setisLoggedIn] = useAtom(state.isLoggedIn);
  const [user] = useAtom(state.user);
  const [showMyProfile, setShowMyProfile] = useAtom(state.showMyProfile);
  const [showDiary, setShowDiary] = useAtom(state.showDiary);

  const handleLoginClick = () => {
    setModalShow(true);
    setIsLogin(true);
  };

  const handleSignUpClick = () => {
    setModalShow(true);
    setIsLogin(false);
  };

  const handleModalButton = () => {
    setModalShow(false);
    setIsLogin(false);
  };

  const handleDiaryClick = (e) => {
    const today = new Date().toISOString().substring(0, 10);

    switch (e.target.innerText) {
      case "Diary":
        if (!user) {
          alert("Please register first!");
        } else if (!user.days || !user.days[today]) {
          alert("No food added today");
        } else if (!user.informations) {
          alert("You have to calculate your calories first, go to My profile");
        } else {
          setShowDiary(true);
          e.target.innerText = "Back";
        }
        break;
      case "Back":
        setShowDiary(false);
        e.target.innerText = "Diary";
        break;
    }
  };

  return (
    <>
      <Navbar
        className="navbar"
        variant="dark"
        expand="lg"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Container fluid>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={handleDiaryClick}>Diary</Nav.Link>
          </Nav>
          {!showDiary && (
            <Form className="d-flex">
              <div className="search-bar--container">
                <div className="test">
                  <Form.Control
                    ref={inputValue}
                    list="search-bar--datalist"
                    id="search-bar--input"
                    type="search"
                    placeholder="products search"
                    style={{ width: "13vw", marginLeft: "5vw" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        searchByName(
                          inputValue.current.value,
                          setSearchNames,
                          setProduct
                        );
                      }
                    }}
                  />
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                  ></div>
                  <NavDropdown
                    title="Search by"
                    id="basic-nav-dropdown"
                    style={{ width: "17vw", marginLeft: "1vw" }}
                  >
                    <NavDropdown.Item
                      style={{ backgroundColor: "rgba(0,0,0,0)" }}
                    >
                      <Button
                        onClick={() =>
                          searchByName(
                            inputValue.current.value,
                            setSearchNames,
                            setProduct
                          )
                        }
                        variant="secondary"
                        style={{ width: "100%", fontSize: "0.8rem" }}
                      >
                        name
                      </Button>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      style={{ backgroundColor: "rgba(0,0,0,0)" }}
                    >
                      <Button
                        onClick={() =>
                          searchByBarcode(
                            inputValue.current.value,
                            setSearchNames,
                            setProduct
                          )
                        }
                        variant="secondary"
                        style={{ width: "100%", fontSize: "0.8rem" }}
                      >
                        barcode
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                {isLoggedIn ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowMyProfile(true);
                    }}
                  >
                    My profile
                  </button>
                ) : (
                  <>
                    <Button
                      variant="dark"
                      style={{ width: "7vw", marginLeft: "15vw" }}
                      onClick={handleLoginClick}
                    >
                      Login
                    </Button>
                    <Button
                      variant="light"
                      style={{ width: "7vw", marginLeft: "1vw" }}
                      onClick={handleSignUpClick}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Container>
      </Navbar>

      <datalist id="search-bar--datalist">
        {/* {pokemonCollection?.map((pokemon, index) => (
          <option value={pokemon} key={index}></option>
        ))} */}

        <option value={"banana"} key={1}></option>
        <option value={"musli"} key={2}></option>
        <option value={"pasta, cooked"} key={3}></option>
        <option value={"5201360674503"} key={3}></option>
        <option value={"5949040201181"} key={3}></option>
        <option value={"5941209012690"} key={3}></option>
        <option value={"5449000236623"} key={3}></option>
      </datalist>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleModalButton={handleModalButton}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </>
  );
}
