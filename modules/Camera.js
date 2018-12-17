/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { RNCamera } from 'react-native-camera';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class Camera extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        style = {styles.capture}
                        onPress={this.takePicture.bind(this)}
                    >
                        <Text style={{fontSize: 14}}> Take Picture </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true , fixOrientation:true};
            const data = await this.camera.takePictureAsync(options);
            console.warn(data.uri);
            this.props.navigation.navigate('FotoDetails', {
                url:data.uri,
            });
        }
    };}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});


