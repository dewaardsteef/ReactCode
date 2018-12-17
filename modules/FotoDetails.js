/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    ActivityIndicator,
    Picker,
    TextInput,
    Button,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import store from 'react-native-simple-store';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class FotoDetails extends Component<Props> {
    constructor(props){
        super(props);
        //this.state = {isLoading: true,PokemonListJson:{}};
        const { navigation } = this.props;
        const url = navigation.getParam('url');
        this.state = {
            isLoading: true,
            url: url,
            count: 1,
            category: "High Voltage",
        };
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.showLocation);
    }

    showLocation=(location)=>{
        console.log(this.state);
        console.log(this.props.navigation.getParam('url'));
        this.setState({
            currentLocation: location.coords,
            isLoading: false,
        });
    };
    saveData = () =>{
        const savedData = {
            count: this.state.count + 1,
            Author: this.state.author,
            Description: this.state.description,
            ImageUrl: this.state.url,
            Category: this.state.category,
            Longitude: this.state.currentLocation.longitude,
            Latitude: this.state.currentLocation.latitude,

        };
        store.push("StoredData", savedData);
        this.props.navigation.navigate('Home');
    };
    render() {
        if (this.state.isLoading) {
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image style={styles.image} source={{uri: this.state.url}}/>
                    <Text>Engineer:</Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Insert your name here"
                        onChangeText={(author) => this.setState({author})}
                    />
                    <Text>Description:</Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Enter a short description"
                        onChangeText={(description) => this.setState({description})}
                    />
                    <Text>Pick a category</Text>
                    <Picker
                        style={styles.pickerStyle}
                        onValueChange={(category) => this.setState({category: category})}
                        selectedValue={this.state.category}
                    >
                        <Picker.Item label="High Voltage Cable" value="High Voltage Cable" />
                        <Picker.Item label="Air Cable" value="Air Cable" />
                        <Picker.Item label="Ground Cable" value="Ground Cable" />
                        <Picker.Item label="Switch Cabinet" value= "Switch Cabinet"/>
                    </Picker>
                    <Button onPress={this.saveData} title={"Tap here to save the data"}/>
                </ScrollView>
            </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image:{
        height: 200,
        width: 200,
        marginBottom: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    pickerStyle:{
        height: 50,
        width:300
    }
});