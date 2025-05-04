import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import { Card } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Page() {
    const router = useRouter();

    return (
        <SafeAreaView>
            <Card style={styles.indexCard}>
                <Card.Title titleStyle={styles.heading2} title="Welcome!"></Card.Title>
                <Card.Content>
                    <Text style={styles.text}>Make lists of games you have played</Text>
                </Card.Content>
            </Card>
            <TouchableOpacity onPress={() => router.navigate("/browse")}>
                <Card style={styles.indexCard}>
                    <Card.Title titleStyle={styles.heading2} title="Browse Games"></Card.Title>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/mygames")}>
                <Card style={styles.indexCard}>
                    <Card.Title titleStyle={styles.heading2} title="My Games"></Card.Title>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/mylists")}>
                <Card style={styles.indexCard}>
                    <Card.Title titleStyle={styles.heading2} title="My Lists"></Card.Title>
                </Card>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
