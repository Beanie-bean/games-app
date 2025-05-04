import { Stack } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { PaperProvider } from 'react-native-paper';
import { styles } from '../styles';
import { MD3LightTheme } from "react-native-paper";

const customTheme = {
    ...MD3LightTheme, colors: {
        ...MD3LightTheme.colors,
        primary: '#88c1b1',
    },
};

export default function RootLayout() {
    return (
        <PaperProvider theme={customTheme}>
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
