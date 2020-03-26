import { GET_COORDINATES_FROM_BROWSER, FETCH_WEATHER, FETCH_NAME_FROM_COORDINATES, CLEAR_ERROR, SEARCH_BY_PLACE } from "./types";
import { DarkSkyAPIKey } from '../secret/secret'

const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"

export const getCoordinates = () => {
    console.log('Getting coordinates from browser')
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    dispatch(
                        {
                            type: GET_COORDINATES_FROM_BROWSER,
                            payload: {
                                error: null,
                                location: {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                }
                            }
                        }
                    );
                    resolve();
                },
                error => {
                    reject({ error, type: 'geolocation' });
                    dispatch(
                        {
                            type: GET_COORDINATES_FROM_BROWSER,
                            error: "Location not found!",
                            location: {}
                        }
                    );
                }
            );
        });
    };
};

export const fetchWeather = location => {
    console.log('Fetching Weather')
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            fetch(
                CORS_ANYWHERE +
                `https://api.darksky.net/forecast/${DarkSkyAPIKey}/${
                location.latitude
                },${location.longitude}?extend=hourly?units=si`
            )
                .then(response => response.json(), error => reject({ error, type: 'network' }))
                .then(
                    weather => {
                        dispatch({ type: FETCH_WEATHER, payload: weather });
                        resolve();
                    },
                    error => reject({ error, type: 'network' })
                );
        });
    };
};

export const clearError = () => ({
    type: CLEAR_ERROR
})

export const fetchPlaceName = location => {
    console.log('Fetching Place Name')
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(
                CORS_ANYWHERE +
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${
                location.latitude
                }&lon=${location.longitude}&zoom=10&addressdetails=1`
            )
                .then(response => response.json())
                .then(response => {
                    dispatch({ type: FETCH_NAME_FROM_COORDINATES, city: response.address.city });
                    resolve();
                });
        });
    };
};

export const searchByPlace = (location, searchByPlace) => ({ type: SEARCH_BY_PLACE, location, searchByPlace })