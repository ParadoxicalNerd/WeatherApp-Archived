import { GET_COORDINATES_FROM_BROWSER, FETCH_WEATHER, FETCH_NAME_FROM_COORDINATES, CLEAR_ERROR, SEARCH_BY_PLACE } from "./types";

export function reducer(state, action) {
    switch (action.type) {
        case GET_COORDINATES_FROM_BROWSER:
            return { ...state, ...action.payload };
        case FETCH_WEATHER:
            return { ...state, weather: action.payload };
        case FETCH_NAME_FROM_COORDINATES:
            return { ...state, location: { city: action.city, latitude: state.location.latitude, longitude: state.location.longitude } };
        case CLEAR_ERROR:
            return { ...state, error: null }
        case SEARCH_BY_PLACE:
            if (action.searchByPlace) {
                return {
                    ...state, location: { city: action.location.city, latitude: action.location.latitude, longitude: action.location.longitude }, searchByPlace: true
                }
            } else {
                return { ...state, searchByPlace: false }
            }
        default:
            return state;
    }
}
