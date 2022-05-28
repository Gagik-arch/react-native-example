import React, {useContext} from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {Text} from "./index";
import {AppContext, padding} from "../resources";

const List = ({
                  style = {},
                  children,
                  onPress = null,
                  ...args
              }) => {

    return onPress ?
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...s.container,
                ...style
            }}>
            {children ? children : <DefaultFlow {...args}/>}
        </TouchableOpacity> :
        <View style={{
            ...s.container,
            ...style,
        }}>
            {children ? children : <DefaultFlow {...args}/>}
        </View>
}

const DefaultFlow = ({
                         nickname,
                         comment,
                         uri,
                         rightSide = <></>,
                         nicknameSize = 'medium15',
                         commentSize = 'book12',
                         nicknameStyle = {},
                         commentStyle = {},
                         action
                     }) => {
    const {scheme} = useContext(AppContext);
    const theme = scheme.dark ? 'dark' : 'light'

    return (
        <>
            <Image
                style={s.avatar}
                source={typeof uri === 'string' ? {uri} : uri}
            />

            <View style={{...s.body,}}>
                {nickname && <Text style={{
                    ...s.nickname,
                    color: theme === 'dark' ? 'white' : 'black',
                    ...nicknameStyle,
                }}
                       size={nicknameSize}>
                    {nickname}
                </Text>}
                {comment && <Text style={{
                    ...s.comment,
                    ...commentStyle,
                }}
                       size={commentSize}>
                    {comment}
                </Text>}
                {action}
            </View>

            <View style={s.btn}>
                {rightSide}
            </View>
        </>
    )
}
const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
    },
    body: {
        ...padding(4,15),
        flex: 1,
        justifyContent: 'center',
    },
    nickname: {
        color: 'white',
        marginBottom: 4
    },
    comment: {
        color: 'rgba(124, 129, 138, 1)'
    },
    btn: {
        justifyContent: 'center'
    }
})
export default List