import React from 'react'

import PrimaryScreen from './primary_screen'
import SecondaryScreen from './secondary_screen'

import { connect } from 'react-redux'
import { getCoordinates, fetchWeather, clearError, fetchPlaceName, searchByPlace } from './redux/actions'

import './index.scss'

class App extends React.Component {
    //These states enable for error checking
    state = { fetchingData: true, locationError: false, networkError: false, online: true }
    componentToRender = null; //saved as global to prevent continuous variable recreation
    async componentDidMount() {
        //Show different errors based on situation
        if (navigator.onLine) {
            try {
                if (!this.props.store.searchByPlace) {
                    await this.props.getCoordinates()
                    await Promise.all([this.props.fetchWeather(this.props.store.location), this.props.fetchPlaceName(this.props.store.location)])
                }
            } catch (e) {
                if (e.type === 'geolocation') {
                    this.setState({ locationError: true })
                } else if (e.type === 'network') {
                    this.setState({ networkError: true })
                }
            } finally {
                this.setState({ fetchingData: false })
            }
        } else {
            this.setState({ online: false })
        }
    }

    //TODO: Rerender entire screen after city name update

    shouldComponentUpdate(nextProps) {
        console.log({
            old: this.props.store.searchByPlace,
            new: nextProps.store.searchByPlace
        })

        // if (this.props.store.searchByPlace === false && nextProps.store.searchByPlace === true) {
        //     return true
        // } else 
        if (this.props.store.searchByPlace === true && nextProps.store.searchByPlace === false) {
            return false
        } else {
            return true
        }

    }

    componentDidUpdate() {
        if (this.props.store.searchByPlace) {
            this.props.fetchWeather(this.props.store.location)
                .then(
                    this.props.stopSearchingByPlace()
                )

        }
    }

    render() {
        if (!this.state.online) {
            this.componentToRender = <h1>Connect to the internet, please!</h1>
        } else if (this.state.fetchingData) {
            this.componentToRender = <h1>Hold on!</h1>
        } else if (this.state.locationError) {
            this.componentToRender = <h1>Enable Location Access to continue.</h1>
        } else if (this.state.networkError) {
            this.componentToRender = <h1>Error connecting to DarkCloud API. Check your firewall.</h1>
        } else {
            this.componentToRender = <React.Fragment>
                <PrimaryScreen temperature={this.props.store.weather.currently.temperature} city={this.props.store.location.city} summary={this.props.store.weather.currently.summary} icon={this.props.store.weather.currently.icon} />
                <SecondaryScreen weather={this.props.store.weather.daily} />
                <div style={{ position: "fixed", top: 0, left: 0 }}>Powered by DarkSky API</div>
            </React.Fragment>
        }
        return this.componentToRender
    }
}

const mapStateToProps = (state) => ({
    store: state
})

const mapDispatchToProps = (dispatch) => ({
    getCoordinates: () => dispatch(getCoordinates()),
    clearError: () => dispatch(clearError()),
    fetchWeather: (location) => dispatch(fetchWeather(location)),
    fetchPlaceName: (location) => dispatch(fetchPlaceName(location)),
    stopSearchingByPlace: () => dispatch(searchByPlace(null, false))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)