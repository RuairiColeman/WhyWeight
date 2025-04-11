import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quotes from '../../assets/quotes.json'; // Import the quotes JSON file

const HomeScreen = ({ route, navigation }) => {
    const { username } = route.params;
    const [weightLost, setWeightLost] = useState(null);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [currentQuote, setCurrentQuote] = useState({ quote: '', author: '' });

    useEffect(() => {
        let index = 0;
        setCurrentQuote({ quote: quotes[index].quote, author: quotes[index].author }); // Set the initial quote and author
        const interval = setInterval(() => {
            index = (index + 1) % quotes.length; // Cycle through quotes
            setCurrentQuote({ quote: quotes[index].quote, author: quotes[index].author });
        }, 10000); // Change quote every 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        fetchUserStats();
    }, []);

    const fetchUserStats = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const response = await fetch('http://192.168.4.75:8080/progress', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const originalWeight = data[data.length - 1].currentWeight;
                    const currentWeight = data[0].currentWeight;
                    setWeightLost(originalWeight - currentWeight);
                }
            }

            const sessionsResponse = await fetch('http://192.168.4.75:8080/sessions', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (sessionsResponse.ok) {
                const sessions = await sessionsResponse.json();
                setSessionsCompleted(sessions.length);
            }
        } catch (error) {
            console.error('Error fetching user stats:', error);
            Alert.alert('Error', 'Failed to fetch user stats');
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={styles.welcomeText}>Welcome, {username}!</Text>
            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Weight Lost: {weightLost !== null ? `${weightLost.toFixed(1)} kg` : 'N/A'}</Text>
                <Text style={styles.statsText}>Sessions Completed: {sessionsCompleted}</Text>
            </View>
            <View style={styles.quickLinksContainer}>
                <TouchableOpacity
                    style={styles.quickLinkButton}
                    onPress={() => navigation.navigate('Track')}
                >
                    <Text style={styles.quickLinkText}>Track Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.quickLinkButton}
                    onPress={() => navigation.navigate('Sessions')}
                >
                    <Text style={styles.quickLinkText}>View Sessions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.quickLinkButton}
                    onPress={() => navigation.navigate('AddSession')}
                >
                    <Text style={styles.quickLinkText}>Add Session</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.quoteContainer}>
                <Text style={styles.quoteText}>{currentQuote.quote}</Text>
                <Text style={styles.authorText}>- {currentQuote.author}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 24,
    },
    statsContainer: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
    },
    statsText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 8,
    },
    quickLinksContainer: {
        marginBottom: 24,
    },
    quickLinkButton: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    quickLinkText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quoteContainer: {
        marginTop: 24,
        padding: 16,
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
    },
    quoteText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    authorText: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default HomeScreen;