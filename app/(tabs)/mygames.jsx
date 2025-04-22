import { SafeAreaView, Text, View, FlatList } from 'react-native';
import { styles } from '../../styles';


export default function MyGames() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading1}>My Games</Text>
            </View>
        </SafeAreaView>
    )
}
