import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LandingScreen from "./screens/LandingScreen";
import DetailScreen from "./screens/DetailScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <LandingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEF3FD",
    alignItems: "center",
    justifyContent: "center",
  },
});
