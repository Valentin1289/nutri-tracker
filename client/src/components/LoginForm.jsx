import React, { useState, useRef, useEffect } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBValidation,
} from "mdb-react-ui-kit";
import { checking } from "./Utils";
import { useAtom } from "jotai";
import state from "./AtomStates";

import Form from "react-bootstrap/Form";

function LoginForm({ setIsLogin, isLogin }) {
  const [justifyActive, setJustifyActive] = useState(isLogin ? "tab1" : "tab2");
  const [formValue, setFormValue] = useState({
    email: "matei.bar@gmail.com",
    password: "mateimatei",
    fName: "",
    lName: "",
  });
  const { email, password, fName, lName } = formValue;
  
  const emailRef = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const passwordRef = useRef(null);

  const [user, setUser] = useAtom(state.user);
  const [isLoggedIn, setisLoggedIn] = useAtom(state.isLoggedIn);
  const [modalShow, setModalShow] = useAtom(state.modalShow);

  const handleSignInSubmit = () => {
    if (
      emailRef.current.checkValidity() &&
      fnameRef.current.checkValidity() &&
      lnameRef.current.checkValidity() &&
      passwordRef.current.checkValidity()
    ) {
      fetch("http://localhost:3001/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.verify) alert(data.verify)
          else alert("Account created!");
        });
    }
  };

  const handleLogInSubmit = () => {
    fetch(`http://localhost:3001/api/user/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(() => data);
        if (data.message) {
          alert(data.message);
        } else if (password === data.password) {
          setisLoggedIn(true);
          setModalShow(false);
        } else {
          alert("Incorect password");
        }
      })
      .catch((err) => console.error(err));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
    setIsLogin((prev) => !prev);
  };

  return (
    <MDBContainer
      className="p-3 d-flex flex-column"
      style={{ backgroundColor: "none ", width: "80%" }}
    >
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBValidation onSubmit={handleLogInSubmit}>
            <div className="text-center mb-3">
              <p>Sign in with:</p>

              <div
                className="d-flex justify-content-between mx-auto"
                style={{ width: "40%" }}
              >
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>

              <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
              value={email}
              name="email"
              onChange={onChangeInput}
              required
              onInput={checking.email}
              // validation = "Plsease provide an email adress"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              value={password}
              name="password"
              onChange={(e) => {
                onChangeInput(e);
                checking.password(e);
              }}
              required
              // onInput={checking.password}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" type="submit">
              Sign in
            </MDBBtn>
            <p className="text-center">
              Not a member? <a href="#!">Register</a>
            </p>
          </MDBValidation>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBValidation onSubmit={handleSignInSubmit}>
            <div className="text-center mb-3">
              <p>Sign up with:</p>

              <div
                className="d-flex justify-content-between mx-auto"
                style={{ width: "40%" }}
              >
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>

              <p className="text-center mt-3">or:</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="First Name"
              id="form1"
              type="text"
              value={fName}
              name="fName"
              ref={fnameRef}
              onChange={onChangeInput}
              onInput={checking.name}
              required
              // validation = "Plsease provide an "
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Last Name"
              id="form1"
              type="text"
              value={lName}
              name="lName"
              ref={lnameRef}
              onChange={onChangeInput}
              onInput={checking.name}
              required
              // validation = "Plsease provide an "
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
              value={email}
              ref={emailRef}
              name="email"
              onChange={onChangeInput}
              onInput={checking.email}
              required
              // validation = "Plsease provide an "
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
              value={password}
              name="password"
              ref={passwordRef}
              onChange={onChangeInput}
              onInput={checking.password}
              required
              // validation = "Plsease provide an "
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I have read and agree to the terms"
              />
            </div>

            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
          </MDBValidation>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default LoginForm;
