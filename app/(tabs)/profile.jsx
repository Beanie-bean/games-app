import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../../styles';
import { Surface, Card } from 'react-native-paper';


export default function Profile() {
    return (
        <SafeAreaView>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="Profile"></Card.Title>
                <Card.Content>
                    <Text style={styles.text}></Text>
                </Card.Content>
            </Card>
        </SafeAreaView>
    )
}
