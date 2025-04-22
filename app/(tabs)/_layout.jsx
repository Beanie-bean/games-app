import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#95ecd2",
                headerShown: false
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} color={color} size={24} />
                    ),
                }} />

            <Tabs.Screen
                name="browse"
                options={{
                    title: "Browse",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "game-controller" : "game-controller-outline"} color={color} size={24} />
                    ),
                }} />

            <Tabs.Screen
                name="mygames"
                options={{
                    title: "My Games",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "albums" : "albums-outline"} color={color} size={24} />
                    ),
                }} />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "body" : "body-outline"} color={color} size={24} />
                        ),
                    }} />
        </Tabs>
    );
}