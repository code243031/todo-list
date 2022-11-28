import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ToastAndroid, ScrollView, TextInput } from 'react-native';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { db } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import Todo from '../components/Todo';
import Advice from '../components/Advice';

export default function Home() {
    const [todo, setTodo] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");

    const getList = async () => {
        if (todo.length !== 0) {
            return;
        }

        try {
            const list = await getDocs(collection(db, "todo"));
            setTodo(
                list.docs.map(doc => ({ ...doc.data(), id: doc.id.toString() }))
            );
        }
        catch (error) {
            setTodo([]);
        }
    }

    const refreshList = () => {
        setTodo([]);
        getList();
    }

    const deleteTodo = async(id: string) => {
        try {
            const docRef = doc(db, "todo", id);
            await deleteDoc(docRef);

            ToastAndroid.show("Complete To-do.", ToastAndroid.SHORT);
            refreshList();
        }
        catch (error) {
            setTodo([]);
        }
    }

    const clearWord = () => {
        setSearch("");
    }

    useEffect(() => {
        getList();
    })

    return (
        <View style={styles.container}>
            <Advice />
            {todo.length === 0 ?
                <View style={styles.notice}>
                    <Image
                        source={require("../assets/images/nothing.jpg")}
                        style={{
                            width: 400,
                            height: 300

                        }}
                    />
                    <Text>Nothing here...</Text>
                    <Text>Let's memo EVERY THINGS!</Text>
                </View> :
                <ScrollView>
                    <Button title="Refresh" onPress={refreshList} />
                    {todo?.map((row: any, idx: number) => {
                        if (search.length !== 0) {
                            if (!row.id.includes(search) && !row.addName.includes(search) && !row.addAge.includes(search)) {
                                return null;
                            }
                        }

                        return (
                            <Todo id={row.id} title={row.title} content={row.content} remindedDate={row.createdAt} delete={deleteTodo} key={idx} />
                        )
                    })}
                </ScrollView>
            }
            
            <View style={styles.typeContainer}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        width: 200,
                        marginRight: 10,
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                    }}
                    placeholder="   Search word..."
                    onChangeText={setSearch}
                />
                <Button title="Clear" onPress={clearWord} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notice: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        margin: 5,
        height: 50
    }
});