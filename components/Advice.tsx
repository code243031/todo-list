import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Advice() {    
    const [advice, setAdvice] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    
    const getRandomAdvice = async () => {
        if (advice.length !== 0) {
            return;
        }
        else {
            const result = await axios.get(
                "https://favqs.com/api/qotd",
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            setAdvice(result.data.quote.body);
            setAuthor(result.data.quote.author);
        }
    }

    useEffect(() => {
        getRandomAdvice();
    });

    return (
        <View style={styles.container}>
            <Text>{advice}</Text>
            <Text style={{ fontStyle: 'italic', marginTop: 5 }} >- {author} -</Text>
            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        borderWidth: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
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