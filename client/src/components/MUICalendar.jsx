import * as React from "react";
import { useState, useEffect } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import { useAtom } from "jotai";
import state from "./AtomStates";

import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/zh-cn';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

const locales = ['en', 'en-gb', 'zh-cn', 'de'];

export default function MUICalendar({
  isModalCalendar,
  handleCustomDay,
  displayCustomDay,
  setDisplayCustomDay,
  setModalShow
}) {
  const [customDay, setCustomDay] = useState(null);
  const [displayCustomDayNotF, setDisplayCustomDayNotF] = useState(null);
  const [isNotAdded, setIsNotAdded] = useState(true);

  const [locale, setLocale] = React.useState('en');

  const getCalendarPopup = () => {
    const collection = document.getElementsByClassName('MuiPickersPopper-root');
    // turn the collection into an array
    const myElements = Array.from(collection);
    console.log(myElements);
  }

  // useEffect(() => {
  //   getCalendarPopup();
  // }, [])

  const handleDisplayChange = (newValue) => {
    setDisplayCustomDayNotF(newValue);

    let forOneDigit = [`0${newValue.$M + 1}`, `0${newValue.$D}`];
    let forMultipleDigit = [`${newValue.$M + 1}`, `${newValue.$D}`];

    let formatValue = `${newValue.$y}-${
      newValue.$M.toString().split("").length > 1
        ? forMultipleDigit[0]
        : forOneDigit[0]
    }-${
      newValue.$D.toString().split("").length > 1
        ? forMultipleDigit[1]
        : forOneDigit[1]
    }`;

    setDisplayCustomDay(formatValue);
  };
  
  const handleOnAccept = () => {
    handleCustomDay(customDay);
    alert(`The product was succesfully added to the diary`);
    setModalShow(false);
  }

  const handleOnClose = () => {
    setModalShow(false);
  }

  return (
    <div>
    {isModalCalendar ? (
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <Stack spacing={3} sx={{ width: 300 }}>
        <DemoContainer components={[ isModalCalendar ? 'StaticDatePicker' : "DatePicker"]}>
        <div style = {{marginTop: "0%"}}>
          <StaticDatePicker
            value={customDay}
            onChange={(newValue) => setCustomDay(newValue)}
            onAccept = {handleOnAccept}
            onClose = {handleOnClose}
            onError = {(error) => alert(error)}

          />

        </div>

          <ToggleButtonGroup
            value={locale}
            exclusive
            fullWidth
            onChange={(event, newLocale) => setLocale(newLocale)}
          >
            {locales.map((localeItem) => (
              <ToggleButton key={localeItem} value={localeItem}>
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {/* <DateField label="Date" defaultValue={dayjs('2022-04-17')} />
          <TimeField label="Time" defaultValue={dayjs('2022-04-17T18:30')} /> */}
          </DemoContainer>
          </Stack>
          </LocalizationProvider>
        </div>) : ( <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <Stack spacing={3} sx={{ width: 300 }}>
        <DemoContainer components={[ isModalCalendar ? 'StaticDatePicker' : "DatePicker"]}>
            <DatePicker
              value={displayCustomDayNotF}
              onChange={(newValue) => handleDisplayChange(newValue)}
            />
        </DemoContainer>
        </Stack>
        </LocalizationProvider>
        </div>
       )
      }
      </div>
  );
}
