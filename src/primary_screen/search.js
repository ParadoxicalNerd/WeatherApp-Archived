// import React from 'react'

// export default async function finder({ value }) {
//     let suggestions = await fetch(`https://photon.komoot.de/api/?q=${value}&osm_tag=place:city&limit=1`)
//     suggestions = await suggestions.json()
//     console.log(suggestions.features.map((place) => (
//         {
//             suggestion:
//                 <div className='suggestion'>
//                     <span className='name'>{place.properties.name}</span>
//                     <span className='details'>{place.properties.state + place.properties.country}</span>
//                 </div>,
//             coordinates: place.geometry.coordinates
//         }
//     )))
// }


//This component as a search bar and a display bar combo.
import React from "react";
import { FETCH_PLACE, SEARCH_BY_PLACE } from "../redux/types"
import { connect } from "react-redux";

class fetchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevTyped: this.props.hydrator,
            typed: this.props.hydrator,
            prediction: "",
            coordinates: [],
            timerID: null
        };

        this.serverFetch = this.serverFetch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    serverFetch() {
        //Fetches the most current place results from API if typed every one second. Sets this to the state
        this.setState({
            timer: setInterval(() => {
                if (
                    this.state.prevTyped !== this.state.typed &&
                    this.state.typed.length !== 0
                ) {
                    fetch(
                        `https://photon.komoot.de/api/?q=${
                        this.state.typed
                        }&osm_tag=place:city&limit=1`
                    )
                        .then(response => response.json())
                        .then(response => {
                            // console.log(response);
                            this.setState(prevState => ({
                                prevTyped: prevState.typed,
                                prediction: response.features[0].properties.name,
                                coordinates: response.features[0].geometry.coordinates
                            }));
                        });
                }
            }, 3000)
        })
    }

    componentDidMount() {
        //Start the API calls
        this.serverFetch();
    }
    componentWillUnmount() {
        //Safely end the API calls
        clearInterval(this.state.timerID)
    }

    onChange(e) {
        //When the user types something, updates state with value
        this.setState({ typed: e.target.value });
    }

    onClick() {
        //When the user clicks on a prediction set that to the city and call REDUX store
        this.setState(prevState => ({
            prevTyped: prevState.prediction,
            typed: prevState.prediction
        }));
        this.props.setCity({ city: this.state.typed, latitude: this.state.coordinates[0], longitude: this.state.coordinates[1] })

    }

    onEnter(e) {
        //Same as the onClick function but is executed when the uses presses the enter or the tab key
        if (e.key === "Enter" || e.key === 'Tab') {
            this.onClick();
        }
    }

    render() {

        //Decides whether to show the predictions
        let predictionStyle =
            this.state.typed === this.state.prediction
                ? { display: "none" }
                : { display: "block" };

        predictionStyle = {
            ...predictionStyle,
            color: "grey",
            fontSize: "0.8em",
            cursor: "pointer",
            width: this.props.width
        };


        return (
            //Returns the combo
            <div style={{ maxWidth: "minContent" }} className={'city'}>
                <input
                    type="text"
                    value={this.state.typed}
                    onChange={this.onChange}
                    style={{
                        width: this.props.width,
                        padding: 0,
                        backgroundColor: "white",
                        border: "0 none white",
                        fontSize: '1em'
                    }}
                    onKeyDown={this.onEnter}
                    ref={this.state.ref}
                />
                <div
                    onClick={this.onClick}
                    style={{ ...predictionStyle }}
                >
                    {this.state.prediction}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    //FIXME: Using workaround for maximum width. Fix in future so length equals the length typed ONLY
    width: '50vw',
    hydrator: state.location.city
})

const mapDispatchToProps = (dispatch) => ({
    setCity: (location) => dispatch({ type: SEARCH_BY_PLACE, location })
})

export default connect(mapStateToProps, mapDispatchToProps)(fetchResults)