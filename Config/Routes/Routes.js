import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Login from '../../Screens/Login/Login'
import SavingProfile from '../../Screens/SavingProfile/SavingProfile'
import Home from '../../Screens/Home/Home'


const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
});

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    SavingProfile: {
        screen: SavingProfile
    },
    Home: {
        screen: DrawerNavigator,
    },
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const Navigator = createAppContainer(AppNavigator)

export default Navigator