import React, { Component } from "react";
import DepartureRow from "./DepartureRow";
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import BusBudResultsBuilder from '../data/BusBudResultsBuilder';

import MomentLocaleUtils, {
    formatDate,
    parseDate
  } from 'react-day-picker/moment';

class Search extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            departureLocation: null,
            arrivalLocation: null,
            selectedDay: undefined,
            locations: [],
            busbudSearchResults: {},
            loaded: false
        };

        console.log(this.state);
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        let locations = [];

        fetch('/busbud/get_cities')
            .then((response) => {
                if (!response.ok){
                    console.log(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((citiesJson) => {
                    console.log(citiesJson);
                    citiesJson.map((item) => {
                            locations.push({ id: item.fields.city_geohash, label: item.fields.city_name});   
                        }
                    );

                    this.setState({locations: locations});
                }
            )
            .catch((e) => console.log(e));
    }

    handleDayChange = (day) => {
        this.setState({ selectedDay: day });
    }

    handleDepartureLocationChange = (selected) => {
        console.log(selected);
        this.setState({ departureLocation: selected[0] });
    }

    handleArrivalLocationChange= (selected) => {
        console.log(selected);
        this.setState({ arrivalLocation: selected[0] });
    }

    handleSearchOnClick = (event) =>{
        event.preventDefault();
        console.log(event);

        const { departureLocation, arrivalLocation } = this.state;

        // if (!departureLocation || !arrivalLocation){
        //     return;
        // }

        // const url = process.env.BUSBUD_URL;
        const token = process.env.BUSBUD_PUBLIC_TOKEN;

        console.log(token);
        
        const url = 'https://napi-preview.busbud.com/x-departures/v73xj7/v58fnj/2018-07-20?adult=1';
        // const url = "https://napi-preview.busbud.com/x-departures/" + 
        //             departureLocation.id + "/" + 
        //             arrivalLocation.id + "/" + 
        //             "2018-07-01?adult=1";

        fetch(url, {
            headers:{
                'X-BusBud-Token': token,
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/anything.json',
                'User-Agent': 'hostelhops-website/1.0 (+http://www.hostelhops.com)'
            }
        })
        .then((response) => {
            if (!response.ok){
                console.log(response);
            }

            return response;
        })
        .then((response) => response.json())
        .then((busbudJSON) => {
            this.setState({busbudSearchResults: busbudJSON});
            console.log(this.state.busbudSearchResults);
        })
        .catch((e) => console.log(e));
    }

    render(){
        const { locations, busbudSearchResults } = this.state;
        let loaded = this.state.loaded;
        let busbudResultsBuilder = new BusBudResultsBuilder(busbudSearchResults);

        return (
            <div className="booking">
                <h1 className="text-center">Buses</h1>
                <div className="form-row">
                    <div className="col">
                        {/* <i className="glyphicon glyphicon-search"></i> */}
                        <Typeahead
                            onChange={this.handleDepartureLocationChange}
                            options={locations}
                            className="form-control"
                            placeholder="Leaving from"
                        />
                    </div>
                    <div className="col">
                            {/* <i className="glyphicon glyphicon-search"></i> */}
                            <Typeahead
                                onChange={this.handleArrivalLocationChange}
                                options={locations}
                                className="form-control"
                                placeholder="Going to"
                            />
                    </div>
                </div>

                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="date">
                                Depature Date
                            </label>
                            <div className="input-group">
                                <DayPickerInput
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    placeholder={`${formatDate(new Date())}`}
                                    onDayChange={this.handleDayChange}
                                    className="form-control"
                                />
                                <div className="input-group-append">
                                    {/* <span className="input-group-text" id="inputGroup-sizing-default">Default</span> */}
                                    {/* <span className="glyphicon glyphicon-calendar"></span> */}
                                </div>
                            </div>
                            <div style={{marginTop: 10 + 'px'}}>
                                <button className="btn btn-primary" onClick={this.handleSearchOnClick}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col" style={{ position: 'relative' }}>
                        <div className="weekDays-selector passengers">
                            <label htmlFor="adults">
                                Passengers
                            </label>
                            <select className="form-control" name="adults" id="adults">
                                <option value="1">1</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="">
                    { 
                        !busbudSearchResults || !busbudSearchResults.departures || busbudSearchResults.departures.length === 0 ? 
                        <div className="col">No results</div> :
                        
                        busbudResultsBuilder.mergedResults.map(item => 
                            <DepartureRow key={item.departure.id} item={item} onChangePage={this.handleChangePage} />
                        )
                    }
                </div>
                
            </div>
        );
    }    
}

export default Search;
