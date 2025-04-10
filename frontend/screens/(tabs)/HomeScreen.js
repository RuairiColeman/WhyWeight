import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const HomeScreen = ({ route }) => {
    const { username } = route.params;

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Welcome, {username}!</Text>
        </View>
    );
};

export default HomeScreen;