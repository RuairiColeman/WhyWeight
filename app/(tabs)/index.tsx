import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../backend/firebaseConfig';

export default function Index() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', 'USER_ID')); // Replace 'USER_ID' with the actual user ID
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.error('User not found');
          router.replace('/login'); // Redirect to login if user is not found
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.replace('/login'); // Redirect to login on error
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Current Weight: {user.currentWeight} lbs</Text>
      <Text style={styles.text}>Weight Loss/Week: {user.weightLossPerWeek} lbs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
});