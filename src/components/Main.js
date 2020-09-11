import React, { Suspense } from "react";
import "../App.css";
import Spinner from "./Spinner";
const AirportList = React.lazy(() => import("./AirportList"));

const Main = React.memo((props) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-12">
          <h2>Airport Chooser</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <button
            type="button"
            className="btn"
            name="chooserBtn"
            onClick={props.onClickHandler}
          >
            Get List
          </button>

          <Suspense fallback={<Spinner />}>
            <AirportList
              airportList={props.airportList}
              selectedAirport={props.selectedAirport}
              onClickHandler={props.onClickHandler}
            />
          </Suspense>

          <p className="p-title">Selected Airport:</p>
          {props.selectedAirport && (
            <ul>
              <li>Name: {props.selectedAirport.name}</li>
              <li>City: {props.selectedAirport.city}</li>
              <li>Country: {props.selectedAirport.country}</li>
              <li>Code: {props.selectedAirport.code}</li>
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
});

export default Main;
