import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../../styles';


export default function Page() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading1}>GamesApp</Text>
                <Text style={styles.body}>Make lists of games you have played</Text>
            </View>
        </SafeAreaView>
    );
}
