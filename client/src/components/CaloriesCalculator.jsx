import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function CaloriesCalculator({ useremail, informations, setUser }) {
  const [activityLevel, setActivityLevel] = useState("");
  const [addInformationsTem, setAddInformations] = useState(informations ? informations : {
    gender: "",
    activityLevel: "",
    height: "",
    weight: "",
    age: "",
    target: "",
  });

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setAddInformations({ ...addInformationsTem, [id]: value });
  };

  const addInformations = () => {
    const BMR =
    addInformationsTem.gender === "Mrs"
      ? 655 +
        9.6 * addInformationsTem.weight +
        1.8 * addInformationsTem.height -
        4.7 * addInformationsTem.age
      : 66 +
        13.7 * addInformationsTem.weight +
        5 * addInformationsTem.height -
        6.8 * addInformationsTem.age;

  const ACTIVITYLEVEL =
    addInformationsTem.activityLevel === "Sedentary"
      ? BMR * 1.2
      : addInformationsTem.activityLevel === "Lightly-active"
      ? BMR * 1.375
      : addInformationsTem.activityLevel === "Moderatly-active"
      ? BMR * 1.55
      : addInformationsTem.activityLevel === "Very-active"
      ? BMR * 1.725
      : addInformationsTem.activityLevel === "Extra-active"
      ? BMR * 1.9
      : 0;

  const CALORIES =
    addInformationsTem.target === "maintain"
      ? ACTIVITYLEVEL
      : addInformationsTem.target === "lose"
      ? ACTIVITYLEVEL * 0.8
      : addInformationsTem.target === "gain"
      ? ACTIVITYLEVEL * 1.2
      : 0;

    fetch(`http://localhost:3001/api/updateInformations/${useremail}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({informations: addInformationsTem, calories: Math.floor(CALORIES)}),
    }).then(res => res.json()).then(data => setUser(data));
  };
  
  return (
    <Popup
      trigger={<button> Calories calculator </button>}
      modal
      className="my-profile-popup"
    >
      {(close) => (
        <div className="my-profile-modal">
          <h1>Complete your details</h1>
          <select id="gender" onChange={onChangeInput}>
            <option></option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Other">Other</option>
          </select>
          <select
            id="activityLevel"
            onChange={(e) => {
              setActivityLevel(e.target.value);
              onChangeInput(e);
            }}
          >
            <option>Select one</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Lightly-active">Lightly active</option>
            <option value="Moderatly-active">Moderatly active</option>
            <option value="Very-active">Very active</option>
            <option value="Extra-active">Extra active</option>
          </select>
          <p>
            {activityLevel === "Sedentary"
              ? "Little or no exercise"
              : activityLevel === "Lightly-active"
              ? "Light exercise 1-3 days per week"
              : activityLevel === "Moderatly-active"
              ? "Moderate exercise 3-5 days per week"
              : activityLevel === "Very-active"
              ? "Hard exercise 6-7 days per week"
              : activityLevel === "Extra-active"
              ? "Very hard exercise, physical job or training twice a day"
              : "More informations here"}
          </p>
          <label>Height(cm):</label>
          <input type="number" contentEditable min="0" id="height" onChange={onChangeInput} />
          <label>Weight(kg):</label>
          <input type="number" contentEditable min="0" id="weight" onChange={onChangeInput} />
          <label>Age:</label>
          <input type="number" contentEditable min="5" id="age" onChange={onChangeInput} />
          <select id="target" onChange={onChangeInput}>
            <option>Target</option>
            <option value="maintain">Maintain</option>
            <option value="lose">Lose</option>
            <option value="gain">Gain</option>
          </select>
          <div style={{ display: "flex" }} className="my-profile-modal-close">
            <button
              onClick={() => {
                close();
                setActivityLevel("");
              }}
            >
              Close
            </button>
            <button
              onClick={() => {
                addInformations();
                close();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
