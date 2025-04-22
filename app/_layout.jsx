import { Stack } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { PaperProvider } from 'react-native-paper';
import { styles } from '../styles';

export default function RootLayout() {
    return (
        <PaperProvider>
            <Appbar.Header>
                <Appbar.Content
                    titleStyle={styles.heading1}
                    title="GamesApp">
                </Appbar.Content>
            </Appbar.Header>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </PaperProvider>

    );
}
