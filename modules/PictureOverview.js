/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Image, ActivityIndicator, FlatList, Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
import store from 'react-native-simple-store';

type Props = {};
export default class PictureOverview extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            uniqueValue: 1,
        };
/*
        this.refreshScreen = this.refreshScreen.bind(this)
*/
    }

    componentDidMount(){
        console.log(this.state.data);
        store.get('StoredData')
            .then((res) =>
/*                console.log(res),*/
                this.setState({
                    data: res,
                    isLoading: false,
                })
            );
        console.log(this.state.data);
    }
/*    forceRemount = () => {
        this.setState(({ uniqueValue }) => ({
            uniqueValue: uniqueValue + 1
        }));
    };*/
    deleteAll = () =>{
        store.delete('StoredData');
        this.props.navigation.navigate('Home');
    };
    renderItems = ({item}) => {
        return (
            <View style={styles.ListItem}>
                <Image style={styles.imageStyle} source={{uri: item.ImageUrl}}/>
                <Text>Engineer: {item.Author}</Text>
                <Text>Desc: {item.Description}</Text>
                <Text>Lat: {item.Latitude}</Text>
                <Text>Long: {item.Longitude}</Text>
                <Text>Category: {item.Category}</Text>
            </View>
        )
    };
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
{/*                <Button title={'REFRESH'} onPress={this.forceRemount}/>*/}
                <Button title={'DELETE'} onPress={this.deleteAll}/>
                <FlatList data={this.state.data} keyExtractor={(item) => item} renderItem={this.renderItems}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    ListItem: {
        marginBottom: 2,
        marginTop: 2,
        borderColor: '#b8b6ba',
        borderWidth: 1,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fcffff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    imageStyle: {
        height: 100,
        width: 100
    }
});
