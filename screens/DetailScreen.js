import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const DetailScreen = (props) => {
  const extraInfo = [
    {
      key: "Clouds",
      value: props.weather.clouds.all,
    },
    {
      key: "Wind Speed",
      value: props.weather.wind.speed,
    },
    {
      key: "Humidity",
      value: props.weather.main.humidity,
    },
    {
      key: "Pressure",
      value: props.weather.main.pressure,
    },
  ];

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.mainContainer}>
        <View style={styles.frontScreen}>
          <View style={styles.closeContainer}>
            <Pressable
              accessibilityLabel="closebutton"
              onPress={props.closePress.bind(this)}
            >
              <View style={styles.close}>
                <Text style={styles.cross}>×</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.subContainer}>
            <View style={styles.weatherInfo}>
              <View style={styles.currentTemp}>
                <Text style={styles.currTempText}>
                  {Math.round(props.weather.main.temp)}°c
                </Text>
              </View>
              <View style={styles.minMaxCont}>
                <View style={styles.maxInfo}>
                  <Text style={styles.minMaxText}>
                    max {Math.round(props.weather.main.temp_max)}°c
                  </Text>
                </View>
                <View style={styles.minInfo}>
                  <Text style={styles.minMaxText}>
                    min {Math.round(props.weather.main.temp_min)}°c
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.weatherDesc}>
              <Text style={styles.tempDes}>
                {props.weather.weather[0].description}
              </Text>
            </View>
            <View style={styles.extraInfoCont}>
              <FlatList
                data={extraInfo}
                // pagingEnabled
                alwaysBounceVertical={true}
                alwaysBounceHorizontal={true}
                showsVerticalScrollIndicator={false}
                numColumns="2"
                contentContainerStyle={styles.gridContainer}
                renderItem={({ item }) => (
                  <View style={styles.extraInfoBlock}>
                    <Text style={styles.itemKey}>{item.key}</Text>
                    <Text style={styles.itemVal}>{item.value}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // borderWidth:1,
    width: "100%",
    backgroundColor: "#DEF3FD",
  },
  frontScreen: {
    // flex: 1,
    borderWidth: 1,
    marginVertical: 20,
    marginHorizontal: 20,
    height: 700,
    width: 350,
    backgroundColor: "#fff",
    borderColor: "#DEF3FD",
  },
  closeContainer: {
    flexDirection: "row-reverse",
  },
  close: {
    width: 35,
    height: 35,
    // borderWidth: 1,
    borderRadius: 100,
    borderColor: "#DC0101",
    backgroundColor: "#DC0101",
    justifyContent: "center",
    alignItems: "center",
  },
  cross: {
    color: "white",
    fontSize: 25,
  },
  subContainer: {
    // borderWidth: 1,
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  weatherInfo: {
    // borderWidth: 1,
    height: 150,
    flexDirection: "row",
    padding: 7,
  },
  currentTemp: {
    flex: 2,
    // borderWidth: 1,
    justifyContent: "center",
    // alignItems:"center"
  },
  minMaxCont: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: "column",
  },
  maxInfo: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: "flex-end",
  },
  minInfo: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
  },
  weatherDesc: {
    // borderWidth: 1,
    height: 70,
    marginVertical: 8,
    justifyContent: "center",
    padding: 14,
    // borderWidth:1
  },
  currTempText: {
    fontSize: 90,
    color: "#0252A2",
    fontWeight: "bold",
  },
  minMaxText: {
    fontSize: 25,
    color: "#0252A2",
    fontWeight: "bold",
  },
  tempDes: {
    fontSize: 30,
    color: "#0252A2",
  },
  extraInfoCont: {
    flex: 1,
    // borderWidth:1
  },
  gridContainer: {
    // flex:1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly", // Adjust as needed
    padding: 10,
  },
  extraInfoBlock: {
    height: 150,
    width: 150,
    padding: 2,
    // borderWidth:1,
    margin: 7,
    marginTop: 2,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 50,
    borderRadius: 20,
    backgroundColor: "#DEF3FD",
  },
  itemKey: {
    fontSize: 25,
    color: "#0252A2",
    fontWeight: "700",
  },
  itemVal: {
    fontSize: 20,
  },
});

export default DetailScreen;
