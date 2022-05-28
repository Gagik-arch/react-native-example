import React, {useContext, useEffect, useRef, useState} from 'react'
import {View, StyleSheet, Animated, Easing} from "react-native";
import {TabButton} from "./index";
import PagerView from 'react-native-pager-view';
import {AppContext, margin, padding} from "../resources";

const PageViewer = ({
                        data = {},
                        containerStyle = {},
                        divider = false
                    }) => {
    const [selected, setSelected] = useState(0)
    const {scheme} = useContext(AppContext);
    const translateX = useState(new Animated.Value(0))[0]
    const viewPager = useRef()
    let width = useRef()
    const theme = scheme.dark ? 'dark' : 'light'

    const switchAnimation = (x) => {
        Animated.timing(translateX, {
            toValue: x,
            duration: 120,
            useNativeDriver: true,
            easing: Easing.ease
        }).start()
    }
    const onSelect = (index) => viewPager.current.setPage(index)

    const onPageScroll = (event) => {
        const {position} = event.nativeEvent;
        setSelected(position)
        const x = width.current ? position * width.current : 0
        switchAnimation(x)
    }

    return (
        <View style={{flex: 1}}>
            <View style={[s.container,
                s['container_' + theme],
                containerStyle]}
            >
                <Animated.View
                    onLayout={({nativeEvent}) => {
                        width.current = nativeEvent.layout.width
                    }}
                    style={[s.switch, s['switch_' + theme],
                        {transform: [{translateX}], width: 100 / Object.keys(data).length + '%'}
                    ]}
                />

                {
                    Object.keys(data)?.map((item, index) => {
                        const _style = selected === index ? s['text_' + theme] : {color: scheme.colors.text}

                        return <React.Fragment key={index}>
                            {divider && index > 0 && <View style={[s.divider, {
                                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#CCCDD1',
                            }]}/>}
                            <TabButton label={item}
                                       style={s.button}
                                       labelStyle={{..._style}}
                                       onPress={() => onSelect(index)}
                            />
                        </React.Fragment>
                    })
                }

            </View>
            <PagerView style={s.pagerView}
                       ref={viewPager}
                       initialPage={0}
                       onPageSelected={onPageScroll}
                       scrollEnabled={true}
            >
                {
                    Object.keys(data).length && Object.entries(data).map(([key, value], index) => {
                        return <View style={{flex: 1}} key={index}>{value}</View>
                    })
                }
            </PagerView>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 4,
        ...margin(10, 16)
    },
    container_dark: {
        backgroundColor: '#151D29',
    },
    container_light: {
        backgroundColor: '#F0F0F5',
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        ...padding(8, 0),
        zIndex: 1
    },
    switch: {
        position: 'absolute',
        height: '100%',
        borderRadius: 4,
        zIndex: 1,
    },
    switch_light: {
        backgroundColor: '#030E21',
    },
    switch_dark: {
        backgroundColor: 'rgba(255, 255, 255, 0.84)',
    },
    text_light: {
        color: 'white',
    },
    text_dark: {
        color: 'black',
    },
    pagerView: {
        flex: 1,
        height: '100%',
    },
    divider: {
        width: 1,
        zIndex: -1,
        ...margin(10, 0)
    }
})

export default PageViewer