import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, Image } from 'react-native';
import { getAllGames } from '../../fetches';
import { Card, Surface, IconButton } from 'react-native-paper';
import { styles } from '../../styles';

export default function Browse() {
    const [games, setGames] = useState([])
    const [game, setGame] = useState({})
    const [page, setPage] = useState(1)
    const [searchWord, setSearchWord] = useState("")
    const [loading, setLoading] = useState(false);

    const separator = () => <View style={styles.separator} />

    useEffect(() => {
        handleFetch(page);
    }, [page]);

    const handleFetch = (page) => {
        setLoading(true)
        getAllGames(page)
            .then(data => setGames(data.results))
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
                            renderItem={({ item }) => <View style={{ gap: 10}}>
                                <Text style={styles.listText}>{item.name}</Text>
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
