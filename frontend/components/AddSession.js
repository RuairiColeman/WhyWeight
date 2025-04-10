import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddSession = ({ navigation, route }) => {
    const { onRefresh } = route.params; // Get the callback function
    const [title, setTitle] = useState('');

    const handleAddSession = async () => {
        if (!title) {
            Alert.alert('Error', 'Session title is required');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const response = await fetch('http://192.168.4.75:8080/sessions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Session added successfully');
                onRefresh(); // Trigger refresh
                navigation.goBack(); // Navigate back to the sessions screen
            } else {
                Alert.alert('Error', 'Failed to add session');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Add New Session</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Enter session title"
                value={title}
                onChangeText={setTitle}
            />
            <TouchableOpacity style={globalStyles.button} onPress={handleAddSession}>
                <Text style={globalStyles.buttonText}>Add Session</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddSession;