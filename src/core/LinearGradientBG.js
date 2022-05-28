import React from 'react'
import {StyleSheet, View} from "react-native";
import {Defs, LinearGradient, Rect, Stop, Svg} from "react-native-svg";

const LinearGradientBG = ({
                              from = {offset: '50%', color: 'rgba(71, 67, 255, 1)'},
                              to = {offset: '50%', color: 'rgba(254, 43, 84, 0.75)'},
                              degree = 0,
                          }) => {
    let x1 = '0%', x2 = '0%', y1 = '0%', y2 = '0%'

    let pointOfAngle = (a) => ({
        x: Math.cos(a),
        y: Math.sin(a)
    })

    let degreesToRadians = (d) => ((d * Math.PI) / 180);

    let eps = Math.pow(2, -52);
    let angle = (degree % 360);
    let startPoint = pointOfAngle(degreesToRadians(180 - angle));
    let endPoint = pointOfAngle(degreesToRadians(360 - angle));

    if (startPoint.x <= 0 || Math.abs(startPoint.x) <= eps)
        startPoint.x = 0;

    if (startPoint.y <= 0 || Math.abs(startPoint.y) <= eps)
        startPoint.y = 0;

    if (endPoint.x <= 0 || Math.abs(endPoint.x) <= eps)
        endPoint.x = 0;

    if (endPoint.y <= 0 || Math.abs(endPoint.y) <= eps)
        endPoint.y = 0;

    x1 = startPoint.x
    y1 = startPoint.y
    x2 = endPoint.x
    y2 = endPoint.y

    return (
        <View style={s.container}>
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id="grad" x1={x1} y1={y1} x2={x2} y2={y2}>
                        <Stop offset={from.offset} stopColor={from.color}/>
                        <Stop offset={to.offset} stopColor={to.color}/>
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)"/>
            </Svg>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: -1,
        overflow: "hidden"
    }
})

export default LinearGradientBG