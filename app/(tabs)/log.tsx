import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import { collection, addDoc, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../backend/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function LogScreen() {
  const [logs, setLogs] = useState([]);
  const [weight, setWeight] = useState('');
  const [user, setUser] = useState(null); // Store the logged-in user's data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('Current User UID:', currentUser.uid); // Debugging
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            console.log('User Data:', userDoc.data()); // Debugging
            setUser(userDoc.data());
          } else {
            console.error('User document not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No user is logged in');
      }
    });

    fetchLogs();

    return unsubscribe; // Cleanup the listener
  }, []);

  const fetchLogs = async () => {
    try {
      const logsQuery = query(
        collection(db, 'logs'),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(logsQuery);
      const logsData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((log) => log.uid === auth.currentUser?.uid); // Filter logs by the user's UID
      setLogs(logsData);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const addLog = async () => {
    if (!weight || !user || !user.name) {
      console.error('Cannot add log: Missing weight or user data');
      return;
    }
    try {
      await addDoc(collection(db, 'logs'), {
        uid: auth.currentUser?.uid, // Associate the log with the user's UID
        name: user.name, // Include the user's name
        weight: parseFloat(weight),
        date: new Date(),
      });
      setWeight('');
      fetchLogs();
    } catch (error) {
      console.error('Error adding log:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.text}>
            {new Date(item.date.toDate()).toLocaleDateString()} - {item.name}: {item.weight} lbs
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Add Log" onPress={addLog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});