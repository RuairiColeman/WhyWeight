import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const RegisterScreen = () => {
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

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form submitted:', formData);
            // Add registration logic here
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