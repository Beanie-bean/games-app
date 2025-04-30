import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { styles } from '../../styles';
import { Surface, Card } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { onValue, push, ref } from "firebase/database";

export default function MyGames() {
    const [myGames, setMyGames] = useState([]);

    const separator = () => <View style={styles.separator} />

    useEffect(() => {
        getMyGames()
    }, []);

    const getMyGames = () => {
        onValue(ref(db, "games/"), (snapshot) => {
            const data = snapshot.val();
            setMyGames(Object.values(data))
        })
    };

    return (
        <SafeAreaView>
            <Surface style={styles.surface}>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="My Games"></Card.Title>
                <Card.Content>
                    <Text style={styles.text}>View your games</Text>
                    <FlatList
                        style={styles.list}
                        data={myGames}
                        ItemSeparatorComponent={separator}
                        renderItem={({ item }) => <View style={{ gap: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.listText}>{item.name}</Text>
                            </View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${item.background_image}`
                                }}
                            />
                        </View>}>
                    </FlatList>
                </Card.Content>
            </Card>
            </Surface>
        </SafeAreaView>
    );
}
