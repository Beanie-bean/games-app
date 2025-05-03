import { Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';
import { Card, Button, Portal, Modal, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { onValue, ref, push } from "firebase/database";
import { db } from '../../firebaseConfig';

export default function MyLists() {
    const [lists, setLists] = useState([]);
    const [selectedGames, setSelectedGames] = useState([])
    const [myGames, setMyGames] = useState([]);
    const [newList, setNewList] = useState({
        listName: "",
        listGames: []
    })
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getMyGames()
        getMyLists()
    }, []);

    const getMyGames = () => {
        onValue(ref(db, "games/"), (snapshot) => {
            const data = snapshot.val();
            if (data === null) {
                return
            }
            else {
                setMyGames(Object.entries(data))
            }
        })
    };

    const getMyLists = () => {
        onValue(ref(db, "lists/"), (snapshot) => {
            const data = snapshot.val();
            if (data === null) {
                return
            }
            else {
                setLists(Object.entries(data))
            }
        })
    };

    const handleModalOpen = () => {
        setOpen(true)
    }

    const handleModalClose = () => {
        setSelectedGames([])
        setNewList({
            listName: "",
            listGames: []
        })
        setOpen(false)
    }

    const createNewList = (temp) => {
        setNewList(temp)        
        push(ref(db, "lists/"), temp)
        setLists({...lists, temp })
        handleModalClose()
    }

    const addtoList = () => {
        const temp = { ...newList, listGames: selectedGames };
        createNewList(temp)
    }
    const dropDownItems = myGames.map(game => ({
        label: game[1].name,
        value: game
    }))

    return (
        <SafeAreaView>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="My Lists"></Card.Title>
                <Card.Content>
                    <View style={styles.listItem}>
                        <Button onPress={() => handleModalOpen()} compact="true" style={{ flex: 1, alignItems: "flex-start" }} icon={"plus"}>New List</Button>
                    </View>
                    <Text style={styles.text}></Text>
                </Card.Content>
            </Card>
            <Portal>
                <Modal style={{ justifyContent: "flex-start" }} visible={open} onDismiss={handleModalClose}>
                    <Card style={styles.card}>
                        <Card.Title titleStyle={styles.heading2} title="Create a New List"></Card.Title>
                        <Card.Content>
                            <TextInput
                                label="List Name"
                                value={newList.listName}
                                onChangeText={text => setNewList({ ...newList, listName: text })}
                            />
                            <View style={{ paddingTop: 10 }}>
                                <MultiSelect
                                    style={styles.dropdown}
                                    data={dropDownItems}
                                    search
                                    labelField="label"
                                    valueField="value"
                                    value={selectedGames}
                                    placeholder="Select Game"
                                    searchPlaceholder="Search..."
                                    onChange={(item) => setSelectedGames(item)}

                                    renderSelectedItem={(item, unSelect) => (
                                        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                                          <View style={styles.selectedStyle}>
                                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                            <Button icon="delete"/>
                                          </View>
                                        </TouchableOpacity>
                                    )}
                                />
                                <View style={{ alignItems: "center", justifyContent: "flex-start", flexDirection: "row" }}>
                                    <Button onPress={() => handleModalClose()} style={styles.modalButton}>Cancel</Button>
                                </View>
                                <Button onPress={() => addtoList()} mode="contained">Create List</Button>
                            </View>
                        </Card.Content>
                    </Card>
                </Modal>
            </Portal>

        </SafeAreaView>
    )
}
