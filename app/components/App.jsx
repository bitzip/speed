import React from 'react';

require('./App.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    }
  }

  syncSpeed = (position) => {
    let mps = position.coords.speed || 0
    let kmph = (mps * 3.6).toFixed(1)
    this.setState({ mps, kmph, position })
  }

  error = () => {
    this.setState({
      error: true
    })
  }

  render() {
    navigator.geolocation.watchPosition(this.syncSpeed, this.error, {
      enableHighAccuracy: true
    })

    if (this.state.error) {
      return (
        <h1>Error</h1>
      )
    }

    if (!this.state.position) {
      return <span>Loading</span>
    }

    return (
      <div>
        <h1>{ this.state.kmph } Km/h</h1>
        <p>{ this.state.position.coords.latitude }</p>
        <p>{ this.state.position.coords.longitude }</p>
        <p>{ this.state.mps }</p>
      </div>
    );
  }
}
