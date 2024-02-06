import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import DetailScreen from "../screens/DetailScreen";

const DayTab = ({ visible, forecast, showDetail, closeDetail }) => {
  return (
    <View style={styles.mainContainer}>
      {/* <Pressable android_ripple="slide" onPress={showDetail.bind(this)}> */}
      <View style={styles.dateInfo}>
        <Text style={styles.dateText}>
          {dayjs(forecast.dt * 1000).format("ddd, DD MMM")}
        </Text>
      </View>
      <View style={styles.minMaxInfo}>
        <View style={styles.maxInfo}>
          <Text style={styles.minMaxText}>
            max {Math.round(forecast.main.temp_max)}°c
          </Text>
        </View>
        <View style={styles.minInfo}>
          <Text style={styles.minMaxText}>
            min {Math.round(forecast.main.temp_min)}°c
          </Text>
        </View>
      </View>
      {/* </Pressable> */}
      {/* <DetailScreen
        visible={visible}
        weather={forecast}
        closePress={closeDetail.bind(this)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 334,
    height: 70,
    borderWidth: 1,
    margin: 10,
    padding: 13,
    flexDirection: "row",
    borderColor: "#ACE4FF",
    borderRadius: 30,
    backgroundColor: "#ACE4FF",
  },
  dateInfo: {
    flex: 2,
    // borderWidth: 1,
    justifyContent: "center",
  },
  minMaxInfo: {
    flex: 1,
    // borderWidth: 1,
    // paddingRight: 3,
    // padding:5
  },
  minInfo: {
    flex: 1,
    // borderWidth: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  maxInfo: {
    flex: 1,
    // borderWidth: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 22,
    color: "#0252A2",
    fontWeight: "bold",
  },
  minMaxText: {
    fontSize: 18,
    color: "#0252A2",
    fontWeight: "bold",
  },
});

export default DayTab;
