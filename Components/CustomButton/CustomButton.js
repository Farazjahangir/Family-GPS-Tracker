import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
}
    from 'react-native'

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={props.buttonStyle} onPress={props.onPress}>
            <Text style={props.textStyle}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton