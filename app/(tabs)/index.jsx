import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../../styles';
import { Card } from 'react-native-paper';


export default function Page() {
    return (
        <SafeAreaView>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="Welcome!"></Card.Title>
                <Card.Content>
                    <Text style={styles.text}>Make lists of games you have played</Text>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}
