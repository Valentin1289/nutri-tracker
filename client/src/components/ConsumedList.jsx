import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MUICalendar from "./MUICalendar";
import { useAtom } from "jotai";
import state from "./AtomStates";

export default function ConsumedList() {
  const [user] = useAtom(state.user);

  const today = new Date().toISOString().substring(0, 10);
  const [displayCustomDay, setDisplayCustomDay] = useAtom(state.displayCustomDay);

  const displayProductsFn = () => { 

    return (user.days[displayCustomDay || today]?.map((el) => (
      <div style={{ display: "flex" }}>
        <p
          style={{ gap: "10px" }}
          className="consumed-list--el-name"
        >
          {el.name}
        </p>
        <p>{el.grams}g</p>
      </div>
    )))
  }

  return (
    <div className="consumed-container">
      <MDBCard className="prod-container" alignment="center">
        <MDBCardHeader>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={displayCustomDay} onChange={(newValue) => setDisplayCustomDay(newValue)}/>
            </DemoContainer>
          </LocalizationProvider> */}
          <MUICalendar displayCustomDay = {displayCustomDay} setDisplayCustomDay={setDisplayCustomDay} />
          </LocalizationProvider>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCard>
            <MDBListGroup flush>
              <MDBListGroupItem
                className="prod-list"
                style={{
                  display: "inline-block",
                  justifyContent: "space-around",
                }}
              >
                {displayProductsFn()}
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCard>
        </MDBCardBody>
        {/* <MDBCardFooter className="text-muted">2 days ago</MDBCardFooter> */}
      </MDBCard>
    </div>
  );
}
