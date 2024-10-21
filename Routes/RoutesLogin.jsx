import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import Routes from "./Routes";
 

const Stack = createStackNavigator();

function RoutesLogin() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Routes" 
                component={Routes} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default RoutesLogin;
