import React, { ReactComponent } from "react";
import { Link } from "react-router-dom";

class BookingDetails extends React.Component{

  constructor(props){
    super(props);
    console.log(props);
  }

  render(){
    return (
      <div className="booking">
        <h1 className="text-center">Bus Booking Details</h1>
        
        <div className="nav-group">
          <Link to="/buses" className="btn btn-primary">&larr; Search</Link>
          <Link to="/passengers" className="btn btn-primary">Passengers &rarr;</Link>
        </div>
      </div>
    );
  }
}

export default BookingDetails;