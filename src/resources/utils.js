import React, {useState, useEffect, createContext} from 'react'
import {Dimensions, Platform} from "react-native";

export const isIos = () => Platform.OS === 'ios'

export function isPortrait() {
    const [orientation, setOrientation] = useState(true);

    useEffect(() => {
        Dimensions.addEventListener('change', ({window: {width, height}}) => {
            if (width < height) {
                setOrientation(true)
            } else {
                setOrientation(false)

            }
        })

    }, []);

    return orientation;
}

const getShortHandOfEdges = (style, ...values) => {
    const _genCss = (...values) => ({
        [style + 'Top']: values[0],
        [style + 'Right']: values[1],
        [style + 'Bottom']: values[2],
        [style + 'Left']: values[3],
    })
    if (values.length === 1) {
        return _genCss(values[0], values[0], values[0], values[0])
    }
    if (values.length === 2) {
        return _genCss(values[0], values[1], values[0], values[1])
    }
    if (values.length === 3) {
        return _genCss(values[0], values[1], values[2], values[1])
    }
    return _genCss(values[0], values[1], values[2], values[3])
}

export const padding = (...values) => getShortHandOfEdges('padding', ...values)

export const margin = (...values) => getShortHandOfEdges('margin', ...values)

export const AppContext = createContext();
