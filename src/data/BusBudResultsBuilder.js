/**
 * Creates a data structure from the BusBud API results making the view code cleaner
 * when trying to display the results.
 */
class BusBudResultsBuilder{
  constructor(busbudSearchResults){
    this.busbudSearchResults = busbudSearchResults;
  }

  get mergedResults(){
    return this._mergedResults;
  }

  build = () => {
    let mergedResults = [];

    if (!this.busbudSearchResults || this.busbudSearchResults.length === 0){
      return false;
    }
    
    const departures = this.busbudSearchResults.departures;
    const operators = this.busbudSearchResults.operators;
    const locations = this.busbudSearchResults.locations;

    if (!departures){
      return false;
    }

    // Extact the root depature node. All other nodes are children.
    departures.map(departure => {
      const operatorId = departure.operator_id;
      const originLocationId = departure.origin_location_id;
      const destinationLocationId = departure.destination_location_id;

      let currentOperator, originLocation, destinationLocation = null;

      operators.map((operator) => {
        operator.id === operatorId ? currentOperator = operator : null;
      });

      locations.map(location => {
        location.id === originLocationId ? originLocation = location : null;
        location.id === destinationLocationId ? destinationLocation = location : null;
      })

      const adultPrice = departure.prices.categories.adult / 100;
      const durationHours = parseInt(departure.duration / 60);
      const durationMinutes = departure.duration % 60;

      mergedResults.push({
        departure: departure,
        operator: currentOperator,
        originLocation: originLocation,
        destinationLocation: destinationLocation,
        prices: {
          adult: adultPrice
        },
        duration: {
          hours: durationHours,
          minutes: durationMinutes
        }
      });

    });

    mergedResults.sort((a, b) => {
      if (a.departure.departure_time > b.departure.departure_time){
        return 1;
      }

      if (a.departure.departure_time < b.departure.departure_time){
        return -1;
      }

      return 0;
    });

    this._mergedResults = mergedResults;
    return true;
  }
  
}

export default BusBudResultsBuilder;