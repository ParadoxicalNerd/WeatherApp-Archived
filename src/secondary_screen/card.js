import React from 'react'
import Mappings from './mappings'

//Singular card component that show the weather for one day
export default class Card extends React.Component {
    constructor(props) {
        super(props)
        this.onClickHandler = this.onClickHandler.bind(this)
    }
    style = {}

    onClickHandler() {
        //Calls parent onClick method to notify that this has been clicked
        this.props.onClick(this.props.date)
    }

    UnixTimeStamp(unix_date) {
        //Formats the date for pretty showing
        const dt = new Date(unix_date * 1000)
        const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dt.getDay()]
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][dt.getMonth()]
        return (day + ' ' + dt.getDate() + ' ' + month)
    }
    render() {
        this.icon = Mappings(this.props.icon_name)

        if (this.props.choosenOne) {
            this.style = { borderBottom: '2px solid blue' }
        } else {
            this.style = null;
        }
        return (
            <div className='Card' style={this.style} onClick={this.onClickHandler}>
                <div className='Date'>{this.UnixTimeStamp(this.props.date)}</div>
                <this.icon className='Icon' />
                <div className='Temperature'>
                    <span className='High'>{Math.round(this.props.high)}&deg;</span>
                    <span className='Low'>{Math.round(this.props.low)}&deg;</span>
                </div>
                <div className='Summary'>{this.props.summary}</div>
            </div>
        )
    }

}