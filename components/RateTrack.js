import React, {useEffect, useState} from "react";
import {Button, Text, TextInput, View, TouchableOpacity, Image} from "react-native";
import {styles} from "../App";

export function RateTrack({ sendDataToParent })  {
const[Default_Rating, setDefaultRating] = useState(null);
const[Max_Rating, setMaxRating] = useState(5);
        //Filled Star.
        let Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        //Empty Star.
        let Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';




    function UpdateRating(key) {
        setDefaultRating(key)
        sendDataToParent(key);
    }


        let React_Native_Rating_Bar = [];

        for (var i = 1; i <= Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= Default_Rating
                                ? { uri: Star }
                                : { uri: Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.container}>
                    <View style={styles.childView}>{React_Native_Rating_Bar}</View>
            </View>
        )

}
