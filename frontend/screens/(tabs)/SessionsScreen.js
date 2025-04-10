import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SessionsScreen = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedSession, setExpandedSession] = useState(null);
    const [exercises, setExercises] = useState({});
    const [refresh, setRefresh] = useState(false); // State to trigger refresh
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                const response = await fetch('http://192.168.4.75:8080/sessions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSessions(data);

                    // Fetch exercises for all sessions
                    const exercisesData = {};
                    for (const session of data) {
                        const exercisesResponse = await fetch(`http://192.168.4.75:8080/sessions/${session.id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        if (exercisesResponse.ok) {
                            const exercises = await exercisesResponse.json();
                            exercisesData[session.id] = exercises;
                        }
                    }
                    setExercises(exercisesData);
                } else {
                    throw new Error('Failed to fetch sessions');
                }
            } catch (err) {
                setError(err.message);
                Alert.alert('Error', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, [refresh]); // Re-fetch data when `refresh` changes

    const toggleSession = (sessionId) => {
        if (expandedSession === sessionId) {
            setExpandedSession(null);
        } else {
            setExpandedSession(sessionId);
        }
    };

    if (loading) {
        return (
            <View style={globalStyles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Your Sessions</Text>
            {/* Button to add a new session */}
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('AddSession', { onRefresh: () => setRefresh(!refresh) })}
            >
                <Text style={globalStyles.buttonText}>Add New Session</Text>
            </TouchableOpacity>
            <FlatList
                data={sessions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.sessionCard}>
                        <TouchableOpacity onPress={() => toggleSession(item.id)}>
                            <Text style={styles.sessionTitle}>{item.title}</Text>
                            <Text style={styles.sessionSubtitle}>
                                Exercises: {exercises[item.id]?.length || 0}
                            </Text>
                        </TouchableOpacity>
                        {expandedSession === item.id && (
                            <>
                                <FlatList
                                    data={exercises[item.id]}
                                    keyExtractor={(exercise) => exercise.id?.toString() || Math.random().toString()}
                                    renderItem={({ item: exercise }) => (
                                        <View style={styles.exerciseCard}>
                                            <Text style={styles.exerciseName}>{exercise.exercise}</Text>
                                            <Text style={styles.exerciseDetails}>
                                                Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}kg
                                            </Text>
                                        </View>
                                    )}
                                />
                                {/* Button to add an exercise to the session */}
                                <TouchableOpacity
                                    style={globalStyles.button}
                                    onPress={() => navigation.navigate('AddWorkout', { sessionId: item.id, onRefresh: () => setRefresh(!refresh) })}
                                >
                                    <Text style={globalStyles.buttonText}>Add Exercise</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    sessionCard: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    sessionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    sessionSubtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    exerciseCard: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    exerciseDetails: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
});

export default SessionsScreen;