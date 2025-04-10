import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackScreen = () => {
    const [chartData, setChartData] = useState([]);
    const [weight, setWeight] = useState(''); // State for weight input
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
                    const day = date.getDate();
                    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                        (day % 10 === 2 && day !== 12) ? 'nd' :
                            (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
                    const formattedDate = `${day}${suffix}\n${date.toLocaleString('default', { month: 'short' })}\n'${date.getFullYear().toString().slice(-2)}`;
                    return {
                        value: log.currentWeight,
                        label: formattedDate,
                    };
                });
                setChartData(formattedData);
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
                body: JSON.stringify({ currentWeight: parseFloat(weight) }),
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
        <View>
            <LineChart
                scrollRef={ref}
                data={chartData}
                curved
                initialSpacing={0}
                spacing={100}
                rotateLabel={false} // Set to true if you want to rotate the labels
                yAxisOffset={yAxisRange.min - 5}
                maxValue={yAxisRange.max + 5}
                yAxisColor="lightgray"
                xAxisColor="lightgray"
                noOfSections={5}
                yAxisLabelSuffix=" kg"
                xAxisLabelTextStyle={{
                    fontSize: 10, // Adjust font size for better readability
                    color: '#333', // Set label color
                    textAlign: 'center', // Center align the labels
                }}
                xAxisLabelWidth={50} // Adjust width to prevent overlap
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
        </View>
    );
};

const styles = StyleSheet.create({
    monthsContainer: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    monthButton: {
        padding: 6,
        margin: 4,
        backgroundColor: '#ebb',
        borderRadius: 8,
    },
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
});

export default TrackScreen;