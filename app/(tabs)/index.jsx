import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import { Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { getAllGames } from '../../fetches';

export default function Page() {
    const [games, setGames] = useState([])
    const [myGames, setMyGames] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getMyGames()
        handleFetch(1);
    }, []);

    const handleFetch = (page) => {
        getAllGames(page)
            .then(data => setGames(data.results))
            .catch(error => console.error(error))
    }

    const getMyGames = () => {
        onValue(ref(db, "games/"), (snapshot) => {
            const data = snapshot.val();
            if (data === null) {
                return
            }
            else {
                setMyGames(Object.entries(data))
            }
        })
    };

    return (
        <SafeAreaView>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="Welcome!"></Card.Title>
                <Card.Content>
                    <Text style={styles.text}>Make lists of games you have played</Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <TouchableOpacity onPress={() => router.navigate("/browse")}>
                    <Card.Title titleStyle={styles.heading2} title="Browse Games"></Card.Title>
                    <Card.Content>
                        <Text style={styles.text}></Text>
                    </Card.Content>
                </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
                <TouchableOpacity onPress={() => router.navigate("/mygames")}>
                    <Card.Title titleStyle={styles.heading2} title="My Games"></Card.Title>
                    <Card.Content>
                        <Text style={styles.text}></Text>
                    </Card.Content>
                </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
                <TouchableOpacity onPress={() => router.navigate("/mylists")}>
                    <Card.Title titleStyle={styles.heading2} title="My Lists"></Card.Title>
                    <Card.Content>
                        <Text style={styles.text}></Text>
                    </Card.Content>
                </TouchableOpacity>
            </Card>
        </SafeAreaView>
    );
}
