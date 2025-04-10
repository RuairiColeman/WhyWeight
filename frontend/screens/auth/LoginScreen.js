import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginPage = () => {
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
            // Add login logic here
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <Text>Username</Text>
                <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(value) => handleInputChange('username', value)}
                />
                {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                />
                {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
            </View>
            <Button title="Login" onPress={handleSubmit}/>
            <View style={styles.centeredView}>
                <Text className="mb-0">Don't have an account? Register</Text>
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});

export default LoginPage;