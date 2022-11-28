import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Vibration, ToastAndroid, ScrollView } from 'react-native';
import { db } from '../firebaseConfig';

export default function Write(props: any) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [notification, setNotification] = useState(false);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("00:00:00");

    const createTodo = async () => {
        if (title.length === 0 || content.length === 0 || time.split(":").length !== 3) {
            Vibration.vibrate()
            ToastAndroid.show("Be sure to write the title and content.", ToastAndroid.SHORT);
        }

        await addDoc(collection(db, "todo"), {
            title: title,
            content: content,
            createdAt: new Date().getTime().toString(),
            remindedAt: new Date(
                Number.parseInt(year),
                Number.parseInt(month),
                Number.parseInt(day),
                Number.parseInt(time.split(":")[0]),
                Number.parseInt(time.split(":")[1]),
                Number.parseInt(time.split(":")[2]),
            ).getTime().toString()
        });

        setTitle("");
        setContent("");
        setNotification(false);
        setYear("");
        setMonth("");
        setDay("");
        setTime("00:00:00")
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.input}>
                    <Text style={{ fontSize: 28, marginBottom: 15 }} >Title</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="   Title here"
                        onChangeText={setTitle}
                    />
                </View>
                <View style={styles.input}>
                    <Text style={{ fontSize: 28, marginBottom: 15 }} >Content</Text>
                    <TextInput
                        style={styles.multipleTextArea}
                        multiline={true}
                        placeholder="   Content here"
                        onChangeText={setContent}
                    />
                </View>

                <View style={styles.input}>
                    <View style={styles.checkInput} >
                        <Checkbox
                            style={{ marginRight: 15 }}
                            value={notification}
                            onValueChange={setNotification}
                        />
                        <Text>Do you set a reminder?</Text>
                    </View>
                    {notification === true ?
                        <View style={styles.notification}>
                            <View style={styles.notificationDate} >
                                <TextInput
                                    style={styles.marginTextArea}
                                    placeholder="   4 digit Year"
                                    onChangeText={setYear}
                                />
                                <TextInput
                                    style={styles.marginTextArea}
                                    placeholder="   2 digit Month"
                                    onChangeText={setMonth}
                                />
                                <TextInput
                                    style={styles.shortTextArea}
                                    placeholder="   2 digit Day"
                                    onChangeText={setDay}
                                />
                            </View>
                            <TextInput
                                style={styles.textArea}
                                placeholder="   HH:mm:ss"
                                onChangeText={setDay}
                            />
                        </View> :
                        null
                    }
                </View>
            </ScrollView>

            <Button title='Create' onPress={createTodo} />
            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25
    },
    checkInput: {
        flexDirection: "row",
        padding: 10
    },
    notification: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationDate: {
        flexDirection: "row",
        marginBottom: 25
    },
    textArea: {
        borderWidth: 1,
        width: 300,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    shortTextArea: {
        borderWidth: 1,
        width: 100,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    multipleTextArea: {
        borderWidth: 1,
        width: 300,
        height: 100,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    marginTextArea: {
        borderWidth: 1,
        width: 100,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginRight: 10
    }
});
