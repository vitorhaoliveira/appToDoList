import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../components/Home";
import Register from "../components/Register";
import Change from "../components/Change";  

const Stack = createStackNavigator();

function Routes() {
    return ( 
        <Stack.Navigator >
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }} // Oculta a barra de cabeçalho para Home
            />
            <Stack.Screen 
                name="Change" 
                component={Change} 
                options={{ headerShown: false }} // Oculta a barra de cabeçalho para Change
            />
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{ headerShown: false }} // Oculta a barra de cabeçalho para Register
            />
        </Stack.Navigator>
    );
}

export default Routes;
