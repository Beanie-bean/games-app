import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, Image, Pressable } from 'react-native';
import { getAllGames } from '../../fetches';
import { Card, Surface, IconButton, Snackbar } from 'react-native-paper';
import { styles } from '../../styles';
import { db } from '../../firebaseConfig';
import { onValue, push, ref } from "firebase/database";
import AddButton from '../components/AddButton';
import RemoveButton from '../components/RemoveButton';

export default function Browse() {
    const [games, setGames] = useState([])
    const [myGames, setMyGames] = useState([])
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false);

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
                setMyGames(Object.values(data))
            }
        })
    };

    const handleSave = (item) => {
        push(ref(db, "games/"), item)
        onToggleSnackBar()
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

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <SafeAreaView>
            <Surface style={styles.surface}>
                <Card style={styles.card}>
                    <Card.Title titleStyle={styles.heading2} title="Games"></Card.Title>
                    <Card.Content>
                        <FlatList
                            style={styles.list}
                            data={games}
                            ItemSeparatorComponent={separator}
                            renderItem={({ item }) => <View style={{ gap: 10 }}>
                                <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                    <Text>{item.name}</Text>
                                    <View>
                                        {myGames.map(game => game.id).includes(item.id)
                                            ? <Pressable onPress={() => handleDelete(item)}><RemoveButton /></Pressable>
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
            </Surface>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={3000}
                action={{
                    label: 'Undo',
                    onPress: () => {
                    },
                }}>Game Added!</Snackbar>
        </SafeAreaView>
    )
}