import React from 'react'

import Search from './search'
import Skycon from './skyconsWrapper'

//Simple component that renders the main screen

export default (props) => {
    return (
        <div className='CurrentWeather'>
            <div className='column1'>
                <div className='temperature'>{props.temperature}&deg;</div>
                <Search />
            </div>
            <div className='column2'>
                <div className='summary'>{props.summary}</div>
                <Skycon icon={props.icon} color={'black'} size={'100px'} animate={true} />
            </div>
        </div>
    )
}