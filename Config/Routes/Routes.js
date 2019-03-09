import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Login from '../../Screens/Login/Login'
import SavingProfile from '../../Screens/SavingProfile/SavingProfile'
import Home from '../../Screens/Home/Home'
import Circles from '../../Screens/Circles/Circles'
import CreateCirlce from '../../Screens/CreateCircle/CreateCircle'
import CircleDetails from '../../Screens/CircleDetails/CircleDetails'
import InviteScreen from '../../Screens/InviteScreen/InviteScreen'
import JoinCircle from '../../Screens/JoinCircle/JoinCircle'



const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
    Circles: {
        screen: Circles
    },
    CreateCirlce : {
        screen : CreateCirlce
    },
    JoinCircle : {
        screen : JoinCircle
    }
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
    Circles: {
        screen: Circles
    },
    CreateCirlce: {
        screen: CreateCirlce,
    },
    CircleDetails: {
        screen: CircleDetails,
    },
    InviteScreen: {
        screen: InviteScreen
    },
    JoinCircle: {
        screen: JoinCircle
    }
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const Navigator = createAppContainer(AppNavigator)

export default Navigator