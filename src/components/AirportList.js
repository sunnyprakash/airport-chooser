import React from "react";
import "../App.css";

const AirportList = React.memo((props) => {
  return (
    <React.Fragment>
      {props.airportList && props.airportList.length > 0 && (
        <div className="dropdown-menu">
          {props.airportList.map((list, index) => {
            return (
              <button
                className={`row dropdown-item ${
                  props.selectedAirport &&
                  props.selectedAirport.code === list.code
                    ? "active"
                    : ""
                } ${index % 2 === 0 ? "bg-grey" : ""}`}
                key={list.code}
                name="airportBtn"
                onClick={(e) => props.onClickHandler(e, list)}
              >
                <span className="col-sm-4">{list.name}</span>
                <span className="col-sm-3">{list.city}</span>
                <span className="col-sm-3">{list.country}</span>
                <span className="col-sm-2">{list.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
});

export default AirportList;
