import React, { useState, useEffect, useReducer } from "react";
import Main from "../components/Main";
import Spinner from "../components/Spinner";

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: false, errorMsg: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: true, errorMsg: action.errorMsg };
    default:
      throw new Error("Wrong action type.");
  }
};

const MainContainer = (props) => {
  const [httpState, dispatchHttpState] = useReducer(httpReducer, {
    loading: false,
    error: false,
    errorMsg: null,
  });
  let [airportList, setAirportList] = useState([]);
  let [selectedAirport, setSelectedAirport] = useState(null);

  const getAirportList = async () => {
    dispatchHttpState({ type: "SEND" });
    await fetch(
      `https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json`
    )
      .then((response) => {
        dispatchHttpState({ type: "RESPONSE" });
        return response.json();
      })
      .then((data) => {
        setAirportList(data);
      })
      .catch((error) => {
        dispatchHttpState({
          type: "ERROR",
          errorMsg: "Issue in getting data. Please contact the administrator.",
        });
        console.error("Error:", error);
      });
  };

  const onClickHandler = (event, value) => {
    const name = event.target.name;

    if (name === "chooserBtn") {
      getAirportList();
    } else {
      setSelectedAirport(value);
    }
  };

  return (
    <React.Fragment>
      <Main
        airportList={airportList}
        selectedAirport={selectedAirport}
        onClickHandler={onClickHandler}
      />
      {httpState.loading && <Spinner />}
    </React.Fragment>
  );
};

export default MainContainer;
