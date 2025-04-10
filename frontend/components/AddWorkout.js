import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddWorkoutScreen = ({ route, navigation }) => {
    const { sessionId, onRefresh } = route.params; // Get the callback function
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const handleAddWorkout = async () => {
        if (!exercise || !sets || !reps || !weight) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const response = await fetch(`http://192.168.4.75:8080/sessions/${sessionId}/exercises`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exercise, sets: parseInt(sets), reps: parseInt(reps), weight: parseFloat(weight) }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Workout added successfully');
                onRefresh(); // Trigger refresh
                navigation.goBack(); // Navigate back to the session details screen
            } else {
                Alert.alert('Error', 'Failed to add workout');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Add Workout</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Exercise name"
                value={exercise}
                onChangeText={setExercise}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Sets"
                keyboardType="numeric"
                value={sets}
                onChangeText={setSets}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Reps"
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />
            <TouchableOpacity style={globalStyles.button} onPress={handleAddWorkout}>
                <Text style={globalStyles.buttonText}>Add Workout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddWorkoutScreen;