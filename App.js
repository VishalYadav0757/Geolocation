import React, { Component } from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    Button, 
    Alert,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import GetLocation from 'react-native-get-location';

export default class App extends Component {
  state = {
    location: null,
    loading: false,
  }
  _requestLocation = () => {
    this.setState({ loading: true, location: null });
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      this.setState({
        location,
        loading: false,
      });
    })
    .catch(ex => {
      const { code, message } = ex;
      console.warn(code, message);
      if (code === 'CANCELLED') {
        Alert.alert('Location cancelled by user or by another request');
      }
      if (code === 'UNAVAILABLE') {
        Alert.alert('Location service is disabled or unavailable');
      }
      if (code === 'TIMEOUT') {
        Alert.alert('Location request timed out');
      }
      if (code === 'UNAUTHORIZED') {
        Alert.alert('Authorization denied');
      }
      this.setState({
        location: null,
        loading: false,
      });
    });
  }

    render() {
      const { location, loading } = this.state;
        return (
          <View style={styles.container}>
            <StatusBar barStyle = "light-content" backgroundColor = "#000000"/>
            <Text style={styles.welcome}> Welcome </Text>
            <Text style={styles.instructions}>For location details, please press the button below:</Text>
            <View style={styles.button}>
              <Button
                disabled={loading}
                title="Get Location"
                onPress={this._requestLocation}
              />
              </View>
                {loading ? (
                  <ActivityIndicator />
                ) : null}
                {location ? (
                  <Text style={styles.location}>
                    {JSON.stringify(location, 0, 2)}
                  </Text>
                ) : null}
          </View>
        );
    };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90A4AE',
  },
  welcome: {
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
    fontSize: 20
  },
  location: {
    color: '#D50000',
    marginBottom: 5,
  },
  button: {
    marginBottom: 8,
    padding: 15,
    width: '40%',
  }
});