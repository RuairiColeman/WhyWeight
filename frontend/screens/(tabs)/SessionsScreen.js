import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const SessionsScreen = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedSession, setExpandedSession] = useState(null);
    const [exercises, setExercises] = useState({});
    const [refresh, setRefresh] = useState(false);
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

                    // Sort sessions by ID in descending order
                    const sortedSessions = data.sort((a, b) => b.id - a.id);
                    setSessions(sortedSessions);

                    const exercisesData = {};
                    for (const session of sortedSessions) {
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
    }, [refresh]);

    const toggleSession = (sessionId) => {
        setExpandedSession(expandedSession === sessionId ? null : sessionId);
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
            <Text style={styles.screenTitle}>Your Sessions</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddSession', { onRefresh: () => setRefresh(!refresh) })}
            >
                <MaterialIcons name="add" size={24} color="#fff" />
                <Text style={styles.addButtonText}>Add New Session</Text>
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
                                <TouchableOpacity
                                    style={styles.addExerciseButton}
                                    onPress={() => navigation.navigate('AddWorkout', { sessionId: item.id, onRefresh: () => setRefresh(!refresh) })}
                                >
                                    <MaterialIcons name="fitness-center" size={20} color="#fff" />
                                    <Text style={styles.addExerciseButtonText}>Add Exercise</Text>
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
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    sessionCard: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
    addExerciseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    addExerciseButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default SessionsScreen;