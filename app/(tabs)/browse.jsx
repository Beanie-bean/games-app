import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, Image } from 'react-native';
import { getAllGames } from '../../fetches';
import { Card, Surface, IconButton, Checkbox } from 'react-native-paper';
import { styles } from '../../styles';

export default function Browse() {
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [myGames, setMyGames] = useState([])
    const [checked, setChecked] = useState([]);

    const separator = () => <View style={styles.separator} />

    useEffect(() => {
        handleFetch(page);
    }, [page]);


    const handleFetch = (page) => {
        setLoading(true)
        getAllGames(page)
            .then(data => setGames(data.results.map(game => ({ ...game, checked: false }))))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
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

    const handleCheck = (item) => {
        const tempArray = [...games]
        let index = tempArray.indexOf(item);
        if (!myGames.map(game => game.name).includes(item.name)) {
            myGames.push(item);
            setMyGames([...new Set(myGames.map((game) => game))])
        }
        else if (myGames.map(game => game.name).includes(item.name)) {
            setMyGames(myGames.map((game) => {
                if (game.name === item.name) {
                    return undefined;
                }
                else {
                    return game
                }
            }).filter((game) => game !== undefined));
        }
        tempArray.splice(index, 1, { ...item, checked: !item.checked })
        setGames(tempArray)
    }
    console.log(myGames.map(item => item.name))
    console.log(games.map(item => item.checked))

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
                                <View style={{ flexDirection: "row" }}>
                                    <Checkbox.Item
                                        mode="android"
                                        status={item.checked ? "checked" : "unchecked"}
                                        onPress={() => handleCheck(item)}>
                                    </Checkbox.Item>
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
                        <View style={styles.buttons}>
                            <IconButton onPress={() => fetchPreviousPageData()} mode="contained" icon="arrow-left-bold" style={styles.button}></IconButton>
                            <IconButton onPress={() => fetchNextPageData()} mode="contained" icon="arrow-right-bold" style={styles.button}></IconButton>
                        </View>
                    </Card.Content>
                </Card>
            </Surface>
        </SafeAreaView>
    )
}
