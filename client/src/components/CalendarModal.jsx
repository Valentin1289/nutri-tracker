import { useEffect } from "react";
import { ReactDOM } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../App.css";
import App from "../App"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import MUICalendar from "./MUICalendar";

export default function CalendarModal({show, onHide, handleCustomDay, setModalShow}) {

  // useEffect(() => {

  //   // ReactDOM.findDOMNode(<App />).getElementsByClassName('MuiPickersPopper-root');
  //   // console.log(calendarPop);

  //   // const collection = document.getElementsByClassName('MuiPickersPopper-root');
  //   // // turn the collection into an array
  //   // const myElements = Array.from(collection);
  //   // console.log(myElements);

  //   // style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(287px, 222px, 0px);"
  // }, [])

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
              height:"580px",
              display:"flex",
              justifyContent:"center",
              alignItems: "flex-start"
            }}
          >

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MUICalendar isModalCalendar={true} handleCustomDay = {handleCustomDay} setModalShow={setModalShow}/>
          </LocalizationProvider>
            
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
