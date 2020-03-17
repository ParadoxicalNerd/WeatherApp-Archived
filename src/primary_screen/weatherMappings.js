// mappings from the data retured from DarkSky API to the ones that can be used with Skycons

const mappings = (event) => {
    switch (event) {
        case ('clear-day'): return "CLEAR_DAY"
        case ('clear-night'): return "CLEAR_NIGHT"
        case ('partly-cloudy-day'): return "PARTLY_CLOUDY_DAY"
        case ('partly-cloudy-night'): return "PARTLY_CLOUDY_NIGHT"
        case ('cloudy'): return "CLOUDY"
        case ('rain'): return "RAIN"
        case ('snow'): return "SNOW"
        case ('sleet'): return "SLEET"
        case ('wind'): return "WIND"
        case ('fog'): return "FOG"
        default: return 'CLEAR_DAY'
    }
}

export default mappings