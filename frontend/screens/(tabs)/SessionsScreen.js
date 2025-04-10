import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionsScreen = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                const response = await fetch('http://192.168.4.75:8080/sessions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer  ${token}`, // Replace with actual token
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSessions(data);
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
    }, []);

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
            <FlatList
                data={sessions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 15, padding: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 2 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{ fontSize: 14, color: '#555' }}>Session ID: {item.id}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default SessionsScreen;