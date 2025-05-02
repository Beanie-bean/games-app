import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, Image, Pressable, Alert } from 'react-native';
import { getAllGames } from '../../fetches';
import { Card, IconButton, Snackbar } from 'react-native-paper';
import { styles } from '../../styles';
import { db } from '../../firebaseConfig';
import { onValue, push, ref, remove } from "firebase/database";
import AddButton from '../components/AddButton';
import RemoveButton from '../components/RemoveButton';

export default function Browse() {
    const [games, setGames] = useState([])
    const [myGames, setMyGames] = useState([])
    const [page, setPage] = useState(1)
    const [snackBarVisible, setSnackBarVisible] = useState(false);

    const separator = () => <View style={styles.separator} />

    useEffect(() => {
        getMyGames()
        handleFetch(page);
    }, [page]);

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

    const handleSave = (item) => {
        push(ref(db, "games/"), item)
    }

    const handleDelete = (item) => {
        const id = myGames.find(game => game[1].id === item.id)[0];
        remove(ref(db, "games/" + id))
        onToggleSnackBar()
        if (myGames.length == 1) {
            setMyGames([])
        }
    }
    const handleFetch = (page) => {
        getAllGames(page)
            .then(data => setGames(data.results))
            .catch(error => console.error(error))
    }
    const fetchNextPageData = () => {
        setPage(page + 1)
    }

    const fetchPreviousPageData = () => {
        if (page == 1) {
            setPage(1)
        }
        else {
            setPage(page - 1)
        }
    }
    const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);

    const onDismissSnackBar = () => setSnackBarVisible(false);

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
                <Card.Title titleStyle={styles.heading2} title="Games"></Card.Title>
                <Card.Content>
                    <FlatList
                        style={styles.list}
                        data={games}
                        ItemSeparatorComponent={separator}
                        renderItem={({ item }) => <View style={{ gap: 10 }}>
                            <View style={styles.listItem}>
                                <Text style={{ paddingLeft: 8, maxWidth: 200 }}>{item.name}</Text>
                                <View>
                                    {myGames.find(game => game[1].id === item.id)
                                        ? <Pressable onPress={() => showDialog(item)}><RemoveButton /></Pressable>
                                        : <Pressable onPress={() => handleSave(item)}><AddButton /></Pressable>
                                    }
                                </View>
                            </View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${item.background_image}`
                                }}
                            />
                        </View>}>
                    </FlatList>
                    <View style={styles.buttons}>
                        <IconButton onPress={() => fetchPreviousPageData()} mode="contained" icon="arrow-left-bold" style={styles.button}></IconButton>
                        <IconButton onPress={() => fetchNextPageData()} mode="contained" icon="arrow-right-bold" style={styles.button}></IconButton>
                    </View>
                </Card.Content>
            </Card>
            <Snackbar
                visible={snackBarVisible}
                onDismiss={onDismissSnackBar}
                duration={3000}>
                Game Deleted
            </Snackbar>
        </SafeAreaView>
    )
}