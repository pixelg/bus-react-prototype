import React, { Component } from "react";
import { connect } from "react-redux";
import { busSearch } from "../book-redux/actions/searchActions";
import DepartureRow from "./DepartureRow";
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import BusBudResultsBuilder from '../data/BusBudResultsBuilder';

import MomentLocaleUtils, {
    formatDate,
    parseDate
  } from 'react-day-picker/moment';

class SearchRedux extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        departureLocation: null,
        arrivalLocation: null,
        selectedDay: undefined,
        locations: []
    };
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
            .catch((e) => console.error(e));
    }

    handleDayChange = (day) => {
        this.setState({ selectedDay: day });
    }

    handleDepartureLocationChange = (selected) => {
        this.setState({ departureLocation: selected[0] });
    }

    handleArrivalLocationChange = (selected) => {
        this.setState({ arrivalLocation: selected[0] });
    }

    handleSearchOnClick = (event) => {
      event.preventDefault();

      try{
        this.props.dispatch(busSearch());
      } catch(e){
        console.error(e);
      }
      
    }

    render(){
      const { locations } = this.state;
      let busbudResultsBuilder = new BusBudResultsBuilder(this.props.reduxResults);
    
      if (this.props.error) {
        return <div>Error! {error.message}</div>;
      }
  
      if (this.props.loading) {
        return <div>Loading...</div>;
      }
      
        return (
            <div className="booking">
                <h1 className="text-center">Buses</h1>
                <div className="form-row">
                    <div className="col">
                        <Typeahead
                            onChange={this.handleDepartureLocationChange}
                            options={locations}
                            className="form-control"
                            placeholder="Leaving from"
                        />
                    </div>
                    <div className="col">
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
                        !busbudResultsBuilder.build() ? 
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

const mapStateToProps = state => {
    console.log(state);
    return {
        loading: state.searchReducer.loading,
        error: state.searchReducer.error,
        reduxResults: state.searchReducer.items
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         busSearch: dispatch(busSearch())
//     };
// };

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(SearchRedux);
