import { createAppContainer, createStackNavigator } from 'react-navigation';

// Screen Imports
import Login from '../../Screens/Login/Login';
import SavingProfile from '../../Screens/SavingProfile/SavingProfile';

// Drawer Navigator
import Drawer from './drawerNavigator';

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    SavingProfile: {
        screen: SavingProfile
    },
    Drawer: {
        screen: Drawer
    },
}, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "red"
            }
        }
    });

const Navigator = createAppContainer(AppNavigator);

export default Navigator;