import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, Image } from 'react-native';
import { styles } from '../../styles';
import { getAllGames } from '../../fetches';

export default function Games() {
    const [games, setGames] = useState([])
    const [game, setGame] = useState({})
    const [searchWord, setSearchWord] = useState("")

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getAllGames()
            .then(data => setGames(data.results))
            .catch(error => console.error(error))
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading1}>Games</Text>
                <FlatList
                    style={styles.list}
                    data={games}
                    renderItem={({ item }) => <View>
                        <Text>{item.name}</Text>
                        <Image
                            style={styles.image}
                            source={{
                                uri: `${item.background_image}`
                            }}
                        />
                    </View>}>
                </FlatList>
            </View>
        </SafeAreaView>
    )
}
