import { createDrawerNavigator, createStackNavigator } from 'react-navigation';


// Drawer Component
import Drawer from '../../Components/Drawer/Drawer';

import variables from '../../Config/Variables/variables';

import Home from '../../Screens/Home/Home'

export default drawer = createDrawerNavigator({
    Home: {
        screen: createStackNavigator({ Home }),
    }
}, {
        contentComponent: Drawer,
        drawerWidth: variables.WINDOW_WIDTH * 0.8
    });