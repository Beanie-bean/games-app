import { SafeAreaView, Text, View, TouchableOpacity, Pressable, Alert, SectionList } from 'react-native';
import { styles } from '../../styles';
import { Card, Button, Portal, Modal, TextInput, Snackbar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { onValue, ref, push, remove } from "firebase/database";
import { db } from '../../firebaseConfig';
import RemoveButton from '../components/RemoveButton';

export default function MyLists() {
    const [lists, setLists] = useState([]);
    const [selectedGames, setSelectedGames] = useState([])
    const [myGames, setMyGames] = useState([]);
    const [newList, setNewList] = useState({
        listName: "",
        listGames: []
    })
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const separator = () => <View style={styles.separator} />

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

    const createNewList = (list) => {
        setNewList(list)
        setLists({ ...lists, list })
        push(ref(db, "lists/"), list)
        handleModalClose()
    }

    const addtoList = () => {
        const list = { ...newList, listGames: selectedGames };
        createNewList(list)
    }
    const dropDownItems = myGames.map(game => ({
        label: game[1].name,
        value: game
    }))

    const handleDelete = (id) => {
        remove(ref(db, "lists/" + id))
        onToggleSnackBar()
        if (lists.length == 1) {
            setLists([])
        }
    }
    const sectionListData = lists.map(item => ({
        title: item[1].listName,
        data: item[1].listGames.map(g => g[1].name),
        id: item[0]
    }))

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const showDialog = (id) => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this list?",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    onPress: () => handleDelete(id)
                }
            ]
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.heading2} title="My Lists"></Card.Title>
                <Card.Content>
                    <View style={styles.listItem}>
                        <Button onPress={() => handleModalOpen()} compact="true" style={{ flex: 1, alignItems: "flex-start" }} icon={"plus"}>New List</Button>
                    </View>
                    <SectionList
                        stickySectionHeadersEnabled={false}
                        style={styles.list}
                        sections={sectionListData}
                        renderSectionHeader={({ section }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.section_style}>{section.title}</Text>
                                <Pressable onPress={() => showDialog(section.id)}><RemoveButton /></Pressable>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <Text style={styles.item_style}>{item}</Text>
                        )}
                    >
                    </SectionList>
                </Card.Content>
            </Card>
            <Portal>
                <Modal style={{ justifyContent: "flex-start" }} visible={open} onDismiss={handleModalClose}>
                    <Card style={styles.card}>
                        <Card.Title titleStyle={styles.heading2} title="Create a New List"></Card.Title>
                        <Card.Content>
                            <TextInput
                                label="List Name"
                                mode='outlined'
                                style={{ backgroundColor: "#cae8e0" }}
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
                                                <Button icon="delete" />
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
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={3000}>
                List Deleted
            </Snackbar>
        </SafeAreaView>
    )
}
