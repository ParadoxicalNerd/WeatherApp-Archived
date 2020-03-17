import React, { useState } from 'react'
import Card from './card'

//Displays the deck of cards that show the weather forecast for the week
export default (props) => {

    //The following functions determine which card has been selected and will show blue bar below it
    //TODO: Add weather graph for the day when clicked
    const [selected, setSelected] = useState(props.weather.data[0].time)
    const onClick = (newSelected) => {
        setSelected((prevState) => (newSelected))
    }
    let weekly = props.weather.data.map((data) => {
        if (data.time === selected) {
            return <Card date={data.time} icon_name={data.icon} summary={data.summary} high={data.temperatureHigh} low={data.temperatureLow} key={data.time} onClick={onClick} choosenOne={true} />
        } else {
            return <Card date={data.time} icon_name={data.icon} summary={data.summary} high={data.temperatureHigh} low={data.temperatureLow} key={data.time} onClick={onClick} choosenOne={false} />
        }
    })

    return (
        <div className='WeatherBox'>
            {weekly}
        </div>
    )
}
