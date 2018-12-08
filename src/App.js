import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import SearchRedux from "./components/SearchRedux";
import BookingDetails from "./components/BookingDetails";

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            propertyId: window.propertyId || 1,
            property: window.property || null
        }
    }

    render(){
        const { property, propertyId } = this.state;

        return (
          <div className="App">
              <Route path="/booking/buses" component={SearchRedux} />
              <Route path="/booking/departure_details" component={BookingDetails} />
          </div>

        );
    }
}

export default App;