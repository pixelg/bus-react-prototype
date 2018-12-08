import {
  BUS_SEARCH_BEGIN,
  BUS_SEARCH_SUCCESS,
  BUS_SEARCH_FAILURE
} from "../constants/action-types";

function handleErrors(response){
  if (!response.ok) {
    //console.log(response.statusText);
    throw new Error(response.statusText);
  }
  return response;
}

export const busSearchBegin = () => ({
  type: BUS_SEARCH_BEGIN
});

export const busSearchSuccess = busBudSearchResults => ({
  type: BUS_SEARCH_SUCCESS,
  payload: { busBudSearchResults }
});

export const buSearchFailure = error => ({
  type: BUS_SEARCH_FAILURE,
  payload: { error }
});

export function busSearch(departureLocation, arrivalLocation, departureDate, passengerCount){
  return dispatch => {
    if (!departureLocation || !arrivalLocation){
        return;
    }

    dispatch(busSearchBegin());

    // const url = process.env.BUSBUD_URL;
    const token = process.env.BUSBUD_PUBLIC_TOKEN;

    // console.log(token);
    
    const url = 'https://napi-preview.busbud.com/x-departures/v73xj7/v58fnj/2018-08-20?adult=1';
    // const url = "https://napi-preview.busbud.com/x-departures/" + 
    //             departureLocation.id + "/" + 
    //             arrivalLocation.id + "/" + 
    //             "2018-07-01?adult=1";

    return fetch(url, {
        headers:{
            'X-BusBud-Token': token,
            'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/anything.json',
            'User-Agent': 'hostelhops-website/1.0 (+http://www.hostelhops.com)'
        }
    })
    .then(handleErrors)
    .then((response) => response.json())
    .then((busbudJSON) => {
        dispatch(busSearchSuccess(busbudJSON));
        console.log(busbudJSON);
        return busbudJSON;
    })
    .catch((error) => {
        console.log(error);
        error => dispatch(busSearchFailure(error));
      }
    );
  };
}
