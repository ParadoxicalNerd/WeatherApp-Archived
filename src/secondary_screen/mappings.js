// Mappings for the React Weather Icons (Static Icons for easier viewing)
import { WiDaySunny, WiNightClear, WiRain, WiSnow, WiSleet, WiWindy, WiFog, WiCloudy, WiDayCloudy, WiNightAltCloudy, WiNa } from 'react-icons/wi'

export default function (icon) {
    switch (icon) {
        case ('clear-day'): return (WiDaySunny)
        case ('clear-night'): return (WiNightClear)
        case ('partly-cloudy-day'): return (WiDayCloudy)
        case ('partly-cloudy-night'): return (WiNightAltCloudy)
        case ('cloudy'): return (WiCloudy)
        case ('rain'): return (WiRain)
        case ('snow'): return (WiSnow)
        case ('sleet'): return (WiSleet)
        case ('wind'): return (WiWindy)
        case ('fog'): return (WiFog)
        default: return (WiNa)
    }
}