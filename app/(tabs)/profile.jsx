import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../../styles';


export default function Profile() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading1}>Profile</Text>
            </View>
        </SafeAreaView>
    )
}
