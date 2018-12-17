import React, {Component} from 'react';

import MainScreen from './modules/MainScreen';
import CameraScreen from './modules/Camera';
import FotoDetail from './modules/FotoDetails';
import Overview from './modules/PictureOverview';

import {createStackNavigator} from 'react-navigation';

const RootStack = createStackNavigator({
        Home: MainScreen,
        CameraDetail: CameraScreen,
        FotoDetails: FotoDetail,
        OverviewScreen: Overview
    },
    {
        initialRouteName: 'Home',
    });

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <RootStack/>
        );
    }
}