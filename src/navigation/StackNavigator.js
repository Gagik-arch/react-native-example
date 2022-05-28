import React, {useEffect, useState} from "react";
import {


} from "../screens";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TabsNavigator} from "./index";
import {Storage} from "../resources";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [token, setToken] = useState('')

    const checkTokenInDevice = async () =>  await Storage.getItem('token')

    useEffect(() => {
        const TOKEN =  checkTokenInDevice()
        return setToken(TOKEN)
    }, [])

    return (
        <Stack.Navigator>
            <Stack.Group>
                {/*<Stack.Screen*/}
                {/*  name={"Example"}*/}
                {/*  component={ExampleScreen}*/}
                {/*  options={{header: () => null}}*/}
                {/*/>*/}
            </Stack.Group>
        </Stack.Navigator>
    );
};


export default StackNavigator;
