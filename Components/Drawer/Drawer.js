import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import { loginUser } from '../../Redux/actions/authActions';

import variables from '../../Config/Variables/variables';

class Drawer extends Component {
    navigateToScreen = route => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    };

    render() {
        // const { user } = this.props;

        return (
            <Text>Drawer</Text>
        )
    }
}

const Styles = StyleSheet.create({
    drawerTopArea: { height: variables.WINDOW_HEIGHT * 0.4 },
    avatar: {
        width: (variables.WINDOW_HEIGHT * 0.4) / 2,
        height: (variables.WINDOW_HEIGHT * 0.4) / 2,
        borderRadius: (variables.WINDOW_HEIGHT * 0.4) / 2
    },
    avatarText: {
        marginTop: 10,
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        loginUser
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
