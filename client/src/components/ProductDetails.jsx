import { useAtom } from "jotai";
import state from "./AtomStates";
import { useState, useRef } from "react";
import DoughnutChart from "./DoughnutChart";
import { addingProduct } from "./Utils";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import WelcomeCard from "./WelcomeCard";
import CalendarModal from "./CalendarModal";

export default function ProductDetails() {
  const [product] = useAtom(state.product);
  const [user, setUser] = useAtom(state.user);
  const [isLoggedIn] = useAtom(state.isLoggedIn);
  const [grams, setGrams] = useState(100);
  const [searchNames] = useAtom(state.searchNames)
  const inputRef = useRef(null);

  const [modalShow, setModalShow] = useState(false);
  
  const handleCustomDay = (customDay) => {
    setModalShow(true);

    customDay && (() => {
      let forOneDigit= [`0${customDay.$M + 1}`, `0${customDay.$D}`];
      let forMultipleDigit = [`${customDay.$M + 1}`, `${customDay.$D}`];
      let customDayFormated = `${customDay.$y}-${customDay.$M.toString().split("").length > 1 ? forMultipleDigit[0] : forOneDigit[0]}-${customDay.$D.toString().split("").length > 1 ? forMultipleDigit[1] : forOneDigit[1]}`;
  
      addingProduct(product, user.email, grams, setUser, customDayFormated);
    })()

  }
  
  return product ? (
    product !== "Product Not Found" ? (
      <div className="product-chart">
        <div className="name-chart">
          <h1>{product.name}</h1>
          <DoughnutChart nutriments={product.nutriments} />
        </div>
        <div className="product-table-container">
          <div className="product-table">
            <ul>
              <li style={{ color: "rgb(0, 0, 0)" }}>Kcal/100g</li>
              <li style={{ color: "rgb(255, 151, 48)" }}>Carbohydrates</li>
              <li style={{ color: "rgb(94, 87, 81)" }}>Fat</li>
              <li style={{ color: "#003aed" }}>Proteins</li>
              <li style={{ color: "#019300" }}>Fiber</li>
              <li style={{ color: "#f74bd7" }}>Sugars</li>
            </ul>
          </div>
          <div className="product-table-values">
            <ul>
              <li style={{ color: "rgb(0, 0, 0)" }}>
                {product.nutriments.kcal}
              </li>
              <li style={{ color: "rgb(255, 151, 48)" }}>
                {product.nutriments.carbohydrates} g
              </li>
              <li style={{ color: "rgb(94, 87, 81)" }}>
                {product.nutriments.fat} g
              </li>
              <li style={{ color: "#003aed" }}>
                {product.nutriments.proteins} g
              </li>
              <li style={{ color: "#019300" }}>{product.nutriments.fiber} g</li>
              <li style={{ color: "#f74bd7" }}>
                {product.nutriments.sugars} g
              </li>
            </ul>
          </div>
        </div>
        {isLoggedIn && (
          <Popup
            trigger={<button className="add-button"> Add product </button>}
            position="left center"
          >
            {(close) => (
              <div>
                <div>How many grams?</div>
                <input
                  type="text"
                  ref={inputRef}
                  value={grams}
                  className="grams-input"
                  onChange={() => setGrams(inputRef.current.value)}
                />
                <div className="adding-buttons">
                  <button
                    onClick={() => {
                      addingProduct(product, user.email, grams, setUser, null);
                      close();
                    }}
                  >
                    Today
                  </button>
                  <button onClick={() => handleCustomDay()}>Custom day</button>
                </div>
              </div>
            )}
          </Popup>
        )}

      <CalendarModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleCustomDay = {handleCustomDay}
        setModalShow = {setModalShow}
      />

      </div>
    ) : (
      <h1>{product}</h1>
    )
  ) : (
    <WelcomeCard searchNames={searchNames}/>
  );
}
