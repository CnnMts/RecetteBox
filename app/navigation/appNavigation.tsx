import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import { theme } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Recettes' }} />
            <HomeStack.Screen name="Detail" component={DetailScreen} options={{ title: '' }} />
        </HomeStack.Navigator>
    );
}

function FavStackNavigator() {
    return (
        <FavStack.Navigator>
            <FavStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Mes favoris' }} />
            <FavStack.Screen name="Detail" component={DetailScreen} options={{ title: '' }} />
        </FavStack.Navigator>
    );
}

export default function AppNavigator() {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    const navigationTheme = {
        ...(isDarkMode ? DarkTheme : DefaultTheme),
        colors: {
            ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
            primary: currentTheme.primary, 
            background: currentTheme.background,
            card: currentTheme.surface, 
            text: currentTheme.text,
            border: currentTheme.border,
        },
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: currentTheme.primary,
                    tabBarInactiveTintColor: currentTheme.textMuted,
                    tabBarStyle: {
                        backgroundColor: currentTheme.surface,
                        borderTopColor: currentTheme.border,
                    }
                }}
            >
                <Tab.Screen 
                    name="HomeTab" 
                    component={HomeStackNavigator} 
                    options={{ title: 'Accueil', headerShown: false }} 
                />
                <Tab.Screen 
                    name="FavTab" 
                    component={FavStackNavigator} 
                    options={{ title: 'Favoris', headerShown: false }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}