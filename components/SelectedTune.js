import React, {useEffect, useState} from "react";
import {Button, Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {styles} from "../App";
import { AsyncStorage } from 'react-native';
//import AsyncStorage from "@react-native-community/async-storage";
import {Audio} from "expo-av";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {RateTrack} from "./RateTrack";
const SelectedTune = (props) => {
    // title
    // artist
    // artwork
    // genre
    // year
    // id
    //music
console.log(props.route.params)
let [music, setMusic] = useState(false)
    const [check, setCheck] = useState(false);
    const [rate, setRate] = useState(null); // the lifted state


    if (props.route.params) {
        let dataToSave = {
            title:props.route.params.title,
            artist:props.route.params.artist,
            artwork:props.route.params.artwork,
            genre:props.route.params.genre,
            year:props.route.params.year,
            id:props.route.params.id,
            music:props.route.params.music,
            myRating:rate,
        }

        const saveItem = async () => {
            console.log('rate', rate)
            // AsyncStorage.setItem('track', JSON.stringify(dataToSave));

            let numberArray = [];
            try {
                let storedTracks = await AsyncStorage.getItem('tracks');
                if (storedTracks !== null) {
                    numberArray = JSON.parse(storedTracks); // you could do some additional checks to make sure it is an array
                }
                numberArray.push(dataToSave)
                await AsyncStorage.setItem('tracks', JSON.stringify(numberArray));
            } catch (error) {
                console.log(error)
            }
        };

        async function loadAudio() {
            music  = new Audio.Sound()
            try {
                await music.loadAsync({ uri: props.route.params.music })
            } catch (e) {
                console.log('ERROR Loading Audio', e);
            }
        }

        useEffect(()=>{
            loadAudio()
        })
   /*      const toggleChecked = async () => {
                setCheck(prevCheck => !prevCheck);
               check ? await stopAudio(): await playAudio();
            }*/
        const playAudio = async () => {
            await music.playAsync()
        }
        const stopAudio = async () => {
            await music.stopAsync()
        }
        const getData = (index) => {
            console.log("index", index);
            setRate(index);
        };
        var parts = props.route.params.year.slice(0, -1).split('T');
        return (
            <View>
                <View style={{display: 'flex', flexDirection:'row'}}>
                    <Text style={styles.titleStyle}>{props.route.params.title}</Text>
                    <Text style={styles.subTitleStyle}> - </Text>
                    <Text style={styles.titleStyle}>{props.route.params.artist}</Text>
                </View>
                <Image style={{ width: 250, height: 250, margin: 5}} source={{ uri: props.route.params.artwork }} />
                <Text style={{ fontSize:30}}>Genre: {props.route.params.genre}</Text>
                <Text style={{ fontSize:30}}>Release date: {parts[0]}</Text>
                {props.route.params.myRating ? (
                    <Text style={{ fontSize:30}}>Rating:{props.route.params.myRating}</Text>
                ) : null}
                <View style={{display:"flex", flexDirection:'row'}}>
                    <Text style={{ fontSize:30}}>Click to listen:</Text>
                    <TouchableHighlight onPress={stopAudio}>
                        <MaterialCommunityIcons name="stop" size={30} color="black" />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={playAudio}>
                        <Ionicons name="md-play-sharp" size={30} color="black" />
                    </TouchableHighlight>
                </View>
                <RateTrack sendDataToParent={getData}/>
                <View style={styles.buttonContainer}>
                    <Button title="Add to the library" onPress={saveItem}/>
                </View>

            </View>
        );
    } else {
        return <View></View>
    }
}


export default SelectedTune;
