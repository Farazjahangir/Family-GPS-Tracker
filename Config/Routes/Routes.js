import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Login from '../../Screens/Login/Login'




// const DrawerNavigator = createDrawerNavigator({});

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    }
});

const Navigator = createAppContainer(AppNavigator)

export default Navigator