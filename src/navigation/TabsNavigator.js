import React, {useContext} from 'react'
import {} from '../screens'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {AppContext} from "../resources";

const Tab = createBottomTabNavigator()

const TabsNavigator = () => {
    const {scheme} = useContext(AppContext);
    const theme = scheme.dark ? 'Dark' : 'Light'

    return (
        <Tab.Navigator
            tabBar={(props) => <TabBar {...props} theme={theme}/>}
            screenOptions={() => ({headerShown: false, tabBarShowLabel: false,})}
        >
            <Tab.Screen name='Feed' component={FeedScreen}/>
            <Tab.Screen name='Search' component={SearchScreen}/>
            <Tab.Screen name='Upload' component={UploadScreen}/>
            <Tab.Screen name='SuitableTitle' component={SuitableTitleScreen}/>
            <Tab.Screen name='Profile' component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

export default TabsNavigator
