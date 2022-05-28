import React, {useContext, useState} from 'react'
import {TouchableOpacity, View, StyleSheet} from "react-native";
import {AppContext, Colors, padding} from "../resources";


const Switch = ({onChange, defaultValue = false}) => {
    const [active, setActive] = useState(defaultValue)
    const {scheme} = useContext(AppContext);
    const theme = scheme.dark ? 'dark' : 'light'

    return <TouchableOpacity activeOpacity={1}
                             onPress={() => {
                                 setActive(!active)
                                 onChange && onChange(!active)
                             }}
                             style={[
                                 s.container,
                                 {justifyContent: active ? 'flex-end' : 'flex-start'},
                                 active ? s.container_active : (theme === 'dark' ? s.container_dark : s.container_light),
                             ]}>
        <View style={[s.switch, active && s.switch_active]}
        />
    </TouchableOpacity>
}

const s = StyleSheet.create({
    container: {
        width: 70,
        height: 40,
        borderWidth: 2,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        ...padding(4)
    },
    switch: {
        width: 30,
        height: 30,
        backgroundColor: "black",
        borderRadius: 30,
    },
    container_active: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary
    },
    container_dark: {
        backgroundColor: 'white',
        borderColor: 'white'
    },
    container_light: {
        borderColor: 'black'
    },
    switch_active: {
        backgroundColor: 'white'
    }
})
export default Switch