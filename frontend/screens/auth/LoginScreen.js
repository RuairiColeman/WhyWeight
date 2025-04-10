import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {useNavigation} from "@react-navigation/native";

const LoginPage = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = { username: '', password: '' };
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form submitted:', formData);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Image source={require('../../assets/logoPlaceholder.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 20 }} />
            <Text style={globalStyles.title}>WhyWeight</Text>
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
                <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={globalStyles.centeredView}>
                <Text style={globalStyles.registerText}>
                    Don't have an account?{''}
                    <Text style={globalStyles.registerLink} onPress={() => navigation.navigate('RegisterScreen')}> Register</Text>
                </Text>
            </View>
        </View>
    );
};

export default LoginPage;