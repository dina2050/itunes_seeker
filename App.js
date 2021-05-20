import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LibraryView from "./components/LibraryView";
import SearchView from "./components/SearchView";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import SelectedTune from "./components/SelectedTune";
import {Platform, StyleSheet} from "react-native";


const Tabs = createBottomTabNavigator();

export const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom:30
  },

  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },

  titleStyle: {
    fontWeight:'bold',
    marginTop:40,
    fontSize:40,
  },

  subTitleStyle: {
    fontWeight:'bold',
    marginTop:55,
    fontSize:30,
  },
  buttonContainer: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'web' ? 0 : 60
  }
});

const App = () => {
  const [libraryList, setLibraryList] = useState([]);

  const addItem = (item) => {
    setLibraryList((prev) => [...prev, item]);
  };
  return (
      <NavigationContainer>
        <Tabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                  case "Library":
                    iconName = focused ? "library" : "library.json-outline";
                    break;
                  case "Search":
                    iconName = focused ? "musical-notes" : "musical-notes-outline";
                    break;
                  default:
                    iconName = "ban";
                    break;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{ activeTintColor: "tomato", inactiveTintColor: "gray" }}
        >
          <Tabs.Screen name="Search">
            {(props) => <SearchView {...props} />}
          </Tabs.Screen>
          <Tabs.Screen name="Library">
            {(props)=><LibraryView {...props}  />}
          </Tabs.Screen>
          <Tabs.Screen name="SelectedTune">
            {(props)=><SelectedTune {...props}  />}
          </Tabs.Screen>
        </Tabs.Navigator>
      </NavigationContainer>
  );
};

export default App;

