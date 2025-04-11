import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {useNavigation} from "@react-navigation/native";

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = { username: '', email: '', password: '' };
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return !newErrors.username && !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await fetch('http://192.168.4.75:8080/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    const data = await response.json();
                    const token = data.token; // Assuming the backend returns a JWT token
                    const username = formData.username; // Extract username for testing
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Login Failed', 'Invalid credentials');
                    console.log("JWT Token saved:", response.token);
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Something went wrong');
            }
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Register</Text>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, color: '#555', marginBottom: 5 }}>Username</Text>
                <TextInput
                    style={globalStyles.input}
                    value={formData.username}
                    onChangeText={(value) => handleInputChange('username', value)}
                    placeholder="Enter your username"
                    placeholderTextColor="#aaa"
                />
                {errors.username ? <Text style={globalStyles.error}>{errors.username}</Text> : null}
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, color: '#555', marginBottom: 5 }}>Email</Text>
                <TextInput
                    style={globalStyles.input}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                />
                {errors.email ? <Text style={globalStyles.error}>{errors.email}</Text> : null}
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, color: '#555', marginBottom: 5 }}>Password</Text>
                <TextInput
                    style={globalStyles.input}
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    placeholder="Enter your password"
                    placeholderTextColor="#aaa"
                />
                {errors.password ? <Text style={globalStyles.error}>{errors.password}</Text> : null}
            </View>
            <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                <Text style={globalStyles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;