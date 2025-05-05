import { SafeAreaView, Text, View, TouchableOpacity, Alert, SectionList, ScrollView, Dimensions } from 'react-native';
import { styles } from '../../styles';
import { Card, Button, Portal, Modal, TextInput, Snackbar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { onValue, ref, push, remove, update } from "firebase/database";
import { db } from '../../firebaseConfig';

export default function MyLists() {
    const [lists, setLists] = useState([]);
    const [selectedGames, setSelectedGames] = useState([])
    const [myGames, setMyGames] = useState([]);
    const [newList, setNewList] = useState({
        listName: "",
        listGames: []
    })
    const [createListOpen, setCreateListOpen] = useState(false);
    const [editListopen, setEditListOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [editedList, setEditedList] = useState({
        data: [],
        id: "",
        title: ""
    })

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

    const handleCreateModalOpen = () => {
        setCreateListOpen(true)
    }

    const handleCreateModalClose = () => {
        setSelectedGames([])
        setNewList({
            listName: "",
            listGames: []
        })
        setCreateListOpen(false)
    }

    const handleEditModalOpen = (item) => {
        setEditedList({
            data: item.data,
            id: item.id,
            title: item.title
        })
        setSelectedGames(editedList.data)
        setEditListOpen(true)
    }

    const handleEditModalClose = () => {
        setEditedList({
            data: [],
            id: "",
            title: ""
        })
        setEditListOpen(false)
    }

    const createNewList = (list) => {
        setNewList(list)
        setLists({ ...lists, list })
        push(ref(db, "lists/"), list)
        handleCreateModalClose()
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

    const handleUpdateList = () => {
        update(ref(db, 'lists/' + "listGames"))
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
                        <Button onPress={() => handleCreateModalOpen()} compact="true" style={{ flex: 1, alignItems: "flex-start" }} icon={"plus"}>New List</Button>
                    </View>
                    <SectionList
                        stickySectionHeadersEnabled={false}
                        style={{ height: 500 }}
                        sections={sectionListData}
                        renderSectionHeader={({ section }) => (
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.section_style}>{section.title}</Text>
                                {/* <Button compact onPress={() => handleEditModalOpen(section)}>Edit</Button> */}
                                <Button compact onPress={() => showDialog(section.id)}>Delete</Button>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <Text style={styles.item_style}>{item}</Text>
                            </View>
                        )}>
                    </SectionList>
                </Card.Content>
            </Card>
            <Portal>
                <Modal visible={editListopen} onDismiss={handleEditModalClose}>
                    <View style={{ maxHeight: Dimensions.get('window').height - 50 }}>
                        <Card style={styles.card}>
                            <Card.Title titleStyle={styles.heading2} title="Edit List"></Card.Title>
                            <Card.Content>
                                <TextInput
                                    label="List Name"
                                    mode='outlined'
                                    style={{ backgroundColor: "#cae8e0" }}
                                    value={editedList.title}
                                    onChangeText={text => setEditedList({ ...editedList, title: text })}
                                />
                                <View style={{ paddingTop: 10 }}>
                                    <ScrollView style={{ height: 350 }}>

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
                                    </ScrollView>

                                    <View style={{ alignItems: "center", justifyContent: "flex-start", flexDirection: "row" }}>
                                        <Button onPress={() => handleEditModalClose()} style={styles.modalButton}>Cancel</Button>
                                    </View>
                                    <Button onPress={() => addtoList()} mode="contained">Create List</Button>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                </Modal>
                <Modal visible={createListOpen} onDismiss={handleCreateModalClose}>
                    <View style={{ maxHeight: Dimensions.get('window').height - 50 }}>
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
                                    <ScrollView style={{ height: 350 }}>
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
                                    </ScrollView>

                                    <View style={{ alignItems: "center", justifyContent: "flex-start", flexDirection: "row" }}>
                                        <Button onPress={() => handleCreateModalClose()} style={styles.modalButton}>Cancel</Button>
                                    </View>
                                    <Button onPress={() => addtoList()} mode="contained">Create List</Button>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
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
