import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';

import Checkbox from 'expo-checkbox';
import { useState } from 'react';

type Props = {
    id: string;
    title: string;
    content: string;
    remindedDate: string;
    delete: any;
}

export default function Todo(props: Props) {
    const [isSelected, setSelection] = useState(false);
    
    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelected}
                    onValueChange={() => {
                        setSelection(true);
                        props.delete(props.id);
                    }}
                    style={styles.checkbox}
                />
                <View style={styles.label}>
                    <Text style={{ fontWeight: 'bold' }}>{props.title}</Text>
                    <Text>{props.content}</Text>
                    <Text>{new Date(Number.parseInt(props.remindedDate)).toISOString()}</Text>
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 350,
        height: 150,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 15,
        borderStyle: 'solid',
        borderColor: 'whitesmoke',
        marginBottom: 10,
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 50,
    },
});