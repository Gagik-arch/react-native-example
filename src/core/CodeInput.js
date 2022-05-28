import React, {useEffect, useState} from 'react'
import {TextInput, View, StyleSheet, Animated, Easing, Platform} from "react-native";
import {Text} from "./index";
import {Colors, margin} from "../resources";

const CodeInput = ({columns = 6, onFinish}) => {
    const [value, setValue] = useState('')
    const [focused, setFocused] = useState(true)
    const opacity = useState(new Animated.Value(0))[0]

    useEffect(() => {
        if (focused) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: true,
                        easing: Easing.ease
                    })
                ])
            ).start()
        } else {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: true,
                        easing: Easing.ease
                    })
                ])
            ).stop()
        }
    })

    const onTextChange = (text) => {
        text = text.toLowerCase()
        setValue(text)
        if (text.length === columns && onFinish) {
            onFinish(text)
        }
    }

    return (
        <View style={s.container}>
            <View style={s.block}>
                {
                    Array.from({length: columns}).map((column, index) => {
                        return (
                            <View style={s.column} key={index}>
                                {
                                    value.length > index &&
                                    <Text numberOfLines={1}
                                          textBreakStrategy={'simple'}
                                          style={s.text}>
                                        {value[index]}
                                    </Text>
                                }
                                {value.length === index && focused && <Animated.View style={[s.cursor, {opacity}]}/>}
                            </View>
                        )
                    })
                }
            </View>

            <TextInput
                onChangeText={onTextChange}
                keyboardType={'default'}
                placeholder={'asd'}
                style={[s.input]}
                maxLength={columns}
                placeholderTextColor={'transparent'}
                autoFocus={true}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                caretHidden
                selectTextOnFocus={false}
                autoCompleteType={'off'}
                autoComplete={ Platform.OS === 'web' ? 'none' : 'off' }
                selectionColor={'transparent'}
                underlineColorAndroid={'transparent'}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        position: 'relative',
        height: 50,
    },
    input: {
        color: 'transparent',
        height: '100%',
        fontSize: 0
    },
    block: {
        flexDirection: "row",
        flex: 1,
    },
    column: {
        backgroundColor: 'white',
        borderColor: Colors.primary,
        borderWidth: 2,
        flex: 1,
        height: 50,
        borderRadius: 6,
        justifyContent: "center",
        ...margin(0,5)
    },
    text: {
        fontSize: 25,
        backgroundColor: "transparent",
        width: '100%',
        textAlign: "center",
        color: Colors.primary,
    },
    cursor: {
        height: 3,
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: 10,
        right: 15,
        left: 15
    }
})

export default CodeInput