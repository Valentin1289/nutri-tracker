import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../App.css";

import LoginForm from "./LoginForm";

// import { useAtom } from "jotai";
// import state from "./test";

export default function MyVerticallyCenteredModal({show, onHide, isLogin, setIsLogin, handleModalButton}) {

  return (
    <>
   <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="m"
    >
        <Modal.Header closeButton style={{ backgroundColor: "white", color: "black" }}>
          {/* <Modal.Title style={{width: "100%", display: "flex", justifyContent: "center"}}> {isLogin ? "Login" : "Sign Up" }</Modal.Title> */}
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "white",}}>
          <div
            style={{
              width: "100%",
              height:"550px",
            }}
          >

          <LoginForm setIsLogin = {setIsLogin} isLogin ={isLogin}/>
          </div>

        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "white" }}>
      
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                {/* <Button variant="outline-primary">Save changes</Button> */}
            </div>
            {/* <Button variant="outline-danger" onClick={handleModalButton}>
                    Close
            </Button> */}
          </div>
        </Modal.Footer>
    </Modal>
    </>
  )
}
