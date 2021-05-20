import React, {useEffect, useState} from "react";
import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MusicItem from "./MusicItem";
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
const LibraryView = (props) => {
    const [libraryTracks, setLibraryTracks] = useState([]);

    useEffect(() => {
        const asyncFunctionData = async () => {
            try {
                const storageData = await AsyncStorage.getItem('tracks');
                setLibraryTracks(JSON.parse(storageData));
            } catch (e) {}
        }
        asyncFunctionData();
    }, [setLibraryTracks]);

       console.log(libraryTracks)

    return (
        <View>
            <Text style={styles.header}>LibraryView</Text>
            <FlatList
                data={libraryTracks}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={()=>{props.navigation.navigate('SelectedTune', item)}}
                    >
                        <MusicItem item={item} />

                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        backgroundColor: "tomato",
        color: "white",
        padding: 10,
    },
});

export default LibraryView;
