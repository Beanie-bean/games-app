import { Alert, FlatList, Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { styles } from '../../styles';
import { Card, IconButton, Snackbar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { onValue, ref, remove } from "firebase/database";
import RemoveButton from '../components/RemoveButton';

export default function MyGames() {
    const [myGames, setMyGames] = useState([]);
    const [visible, setVisible] = useState(false);

    const separator = () => <View style={styles.separator} />

    useEffect(() => {
        getMyGames()
    }, []);

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

    const handleDelete = (item) => {
        const id = item[0];
        remove(ref(db, "games/" + id))
        onToggleSnackBar()
        if (myGames.length == 1) {
            setMyGames([])
        }
    }
    
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const showDialog = (item) => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this game?",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    onPress: () => handleDelete(item)
                }
            ]
        )
    }

    return (
        <SafeAreaView>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="My Games"></Card.Title>
                <Card.Content>
                    <FlatList
                        style={styles.list}
                        data={myGames}
                        ItemSeparatorComponent={separator}
                        renderItem={({ item }) => <View style={{ gap: 10 }}>
                            <View style={styles.listItem}>
                                <Text style={{ paddingLeft: 8, maxWidth: 200 }}>{item[1].name}</Text>
                                <View>
                                    {myGames.map(game => game.id).includes(item.id) &&
                                        <Pressable onPress={() => showDialog(item)}><RemoveButton /></Pressable>
                                    }
                                </View>

                            </View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${item[1].background_image}`
                                }}
                            />
                        </View>}>
                    </FlatList>
                    <View>
                        {myGames.length > 20 &&
                            <View style={styles.buttons}>
                                <IconButton mode="contained" icon="arrow-left-bold" style={styles.button}></IconButton>
                                <IconButton mode="contained" icon="arrow-right-bold" style={styles.button}></IconButton>
                            </View>
                        }
                    </View>
                </Card.Content>
            </Card>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={3000}>
                Game Deleted
            </Snackbar>
        </SafeAreaView>
    );
}
