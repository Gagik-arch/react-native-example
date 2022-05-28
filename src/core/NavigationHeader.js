import React from 'react'
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {TabButton, Icon, Text} from "./index";
import {padding} from "../resources";

const NavigationHeader = ({
                              backHandler = true,
                              backAction = null,
                              buttons = null,
    style={},
                              ...props
                          }) => {
    return (
        <View style={[s.container,style]}>
            <View>
                {backHandler ?
                    <TouchableOpacity onPress={(e) => backAction ? backAction(e) : props.navigation.goBack()}>
                        <Icon type={'Arrow2Left'}/>
                    </TouchableOpacity> : null}
            </View>

            <Text style={s.title} size={'h5'}
                  numberOfLines={1}>
                {props.route.name} {props?.route?.params?.nickname}
            </Text>

            <View style={s.buttons}>
                {
                    buttons && buttons.map((button, index) => <TabButton key={index}
                                                                         {...button}
                                                                         onPress={(e)=>button.onPress(e,props)}
                                                                       />)
                }
            </View>

        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "transparent",
        justifyContent: "space-between",
        ...padding(16),
    },
    title: {
        flex: 1,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})
export default NavigationHeader