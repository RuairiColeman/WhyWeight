import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackScreen = () => {
    const [chartData, setChartData] = useState([]);
    const [weight, setWeight] = useState('');
    const [weightLost, setWeightLost] = useState(null); // State for weight lost
    const ref = useRef(null);

    useEffect(() => {
        fetchProgressLogs();
    }, []);

    const fetchProgressLogs = async () => {
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
                const formattedData = data.map((log) => {
                    const date = new Date(log.date);
                    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' }); // Format as DD/MM
                    return {
                        value: log.currentWeight,
                        label: formattedDate,
                        dataPointText: `${log.currentWeight} kg`, // Add weight as label
                    };
                });
                setChartData(formattedData);

                // Calculate weight lost
                if (data.length > 0) {
                    const originalWeight = data[data.length - 1].currentWeight; // First-ever logged weight
                    const currentWeight = data[0].currentWeight; // Most recent weight
                    setWeightLost(originalWeight - currentWeight);
                }
            } else {
                console.error('Failed to fetch progress logs');
            }
        } catch (error) {
            console.error('Error fetching progress logs:', error);
        }
    };

    const handleLogWeight = async () => {
        if (!weight) {
            Alert.alert('Error', 'Please enter a weight');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const response = await fetch('http://192.168.4.75:8080/progress', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentWeight: parseFloat(weight), originalWeight: parseFloat(weight)}),
            });

            if (response.ok) {
                Alert.alert('Success', 'Weight logged successfully');
                setWeight(''); // Clear the input field
                fetchProgressLogs(); // Refresh the graph
            } else {
                Alert.alert('Error', 'Failed to log weight');
            }
        } catch (error) {
            console.error('Error logging weight:', error);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    const getYAxisRange = () => {
        if (chartData.length === 0) return { min: 0, max: 100 };

        const values = chartData.map(item => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        const noOfSections = 5;
        const range = maxValue - minValue;
        const stepValue = Math.ceil(range / noOfSections);
        const adjustedMaxValue = noOfSections * stepValue;

        return {
            min: minValue,
            max: adjustedMaxValue,
        };
    };

    const yAxisRange = getYAxisRange();

    return (
        <View style={styles.chartContainer}>
            <LineChart

                scrollRef={ref}
                data={chartData}
                curved
                initialSpacing={10}
                spacing={150}
                rotateLabel={false}
                yAxisOffset={yAxisRange.min - 5}
                maxValue={yAxisRange.max + 5}
                rulesLength={325}
                yAxisColor="lightgray"
                xAxisColor="lightgray"
                noOfSections={5}
                yAxisLabelSuffix=" kg"
                xAxisLabelTextStyle={{
                    fontSize: 10,
                    color: '#333',
                    textAlign: 'center',
                }}
                xAxisLabelWidth={1}

            />
            <View style={styles.logWeightContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter weight"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={handleLogWeight}>
                    <Text style={styles.buttonText}>Log Weight</Text>
                </TouchableOpacity>
            </View>
            {weightLost !== null && (
                <View style={styles.weightLostContainer}>
                    <Text style={styles.weightLostText}>Weight +/-: {weightLost.toFixed(1)} kg</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    logWeightContainer: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    weightLostContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    weightLostText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    chartContainer: {
        marginHorizontal: 20, // Add space on the sides
        marginTop: 30, // Add space above the chart
        padding: 10, // Add padding inside the container
        backgroundColor: '#f9f9f9', // Optional: Add a background color
        borderRadius: 10, // Optional: Add rounded corners
    },
});

export default TrackScreen;