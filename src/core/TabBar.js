import React from 'react'
import {View, StyleSheet} from 'react-native'
import {TabBarButton} from './index'
import {Themes, Colors, padding} from "../resources";

const TabBar = ({state, descriptors, navigation, theme}) => {

    return (
        <View  style={{...styles.container, ...styles['container' + theme]}}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key]

                let icon =''
                let type = 'Normal'
                switch (route.name) {
                    case 'Feed':
                        icon = 'Home'
                        break
                    case 'Search':
                        icon = 'Search'
                        break
                    case 'Upload':
                        icon = 'Add'
                        type = 'Filled'
                        break
                    case 'SuitableTitle':
                        icon = 'Achievements'
                        break
                    case 'Profile':
                        icon = 'User'
                        break
                    default:
                        break
                }

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({name: route.name, merge: true})
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    })
                }

                return (
                    <TabBarButton
                        key={index}
                        accessibilityRole='button'
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        icon={icon}
                        type={type}
                        selected={isFocused}
                        theme={theme}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        justifyContent: 'space-between',
        borderRadius: 5,
        left: 0,
        right: 0,
        bottom: 0,
        shadowColor: Colors.borderColor,
        shadowOffset: {
            width: 0,
            height: -20,
        },
        shadowOpacity: .8,
        shadowRadius: 10,
        elevation: 150,
        ...padding(10)
    },
    containerDark: {
        backgroundColor: Themes.dark.colors.background
    },
    containerLight: {
        backgroundColor: Themes.light.colors.background
    }
})
export default TabBar
