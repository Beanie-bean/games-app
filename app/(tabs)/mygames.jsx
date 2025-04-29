import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../../styles';
import { Surface, Card } from 'react-native-paper';
import { useState } from 'react';


export default function MyGames() {
    const [myGames, setMyGames] = useState([]);
    
    return (
        <SafeAreaView>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="My Games"></Card.Title>
                <Card.Content>
                    <Text  style={styles.text}>View your games</Text>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}
