import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import moment from "moment";

class DepartureRow extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const listItem = this.props.item;
    let departureDate = moment(listItem.departure.departure_time);

    return (
        <div className="card">
          <div className="card-header">
            { departureDate.format('ddd, MMM D YYYY h:mm A') + ' ' + listItem.duration.hours + ' hours ' + listItem.duration.minutes + ' minutes' }
            <div className="font-weight-bold">
              { listItem.prices.adult + ' ' + listItem.departure.prices.currency } per passenger
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{ listItem.operator.name }</h5>
            <p className="card-text">{ listItem.originLocation.name } &rarr; { listItem.destinationLocation.name }</p>
            <Link to={
              {
                pathname: "/booking/departure_details",
                search: "one=1"
              }
            } className="btn btn-primary"
            >
            Book</Link>
          </div>
        </div>
    );
  }
}

export default DepartureRow;