import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "./index";
import {Colors, padding} from "../resources";
import LinearGradientBG from "./LinearGradientBG";

const Button = ({
                    title,
                    style,
                    textStyle = {},
                    textSize,
                    type = "primary",
                    size = "medium",
                    icon = null,
                    ...args
                }) => {
    size = size.toLowerCase()
    type = type.toLowerCase()

    return (
        <TouchableOpacity
            style={[{
                ...s.container,
                ...s["container_" + size],
            },
                type !== 'gradient' ? s["container_" + type] : {borderWidth: 0},
                style,
            ]}
            type={type}
            {...args}
        >
            {icon}
            <Text size={!textSize ? (size === 'large' ? 'book15' : 'book13') : textSize}
                  style={{
                      ...s["title_" + type],
                      ...textStyle,
                      marginLeft: icon ? 8 : 0
                  }}
            >
                {title}
            </Text>
            {type === 'gradient' && <LinearGradientBG degree={80}
                                                      from={{offset: '20%', color: 'rgba(71, 67, 255, 1)'}}
                                                      to={{offset: '100%', color: 'rgba(215,39,72,0.75)'}}

            />}
        </TouchableOpacity>
    );
};

const s = StyleSheet.create({
    container: {
        borderRadius: 4,
        alignItems: "center",
        overflow: "hidden",
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        borderWidth: 1,
        boxSizing: "border-box",
        ...padding(0,12)
    },
    container_primary: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    container_dark: {
        backgroundColor: 'black',
        borderColor: "white",
    },
    container_light: {
        backgroundColor: 'white',
    },
    container_gray: {
        backgroundColor: '#CCCDD1',
        borderColor: '#CCCDD1'
    },
    container_large: {
        ...padding(11,12)
    },
    container_medium: {
        ...padding(8,12)
    },
    container_small: {
        ...padding(5,12)
    },
    title_primary: {
        color: "white",
    },
    title_dark: {
        color: "white",
    },
    title_gray: {
        color: "white",
    },
    title_gradient: {
        color: "white",
    },
    title_light: {
        color: "black",
    },
});

export default Button;
