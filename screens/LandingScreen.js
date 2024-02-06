import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DayTab from "../components/DayTab";
import { useEffect, useState } from "react";
import DetailScreen from "./DetailScreen";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
import * as Location from "expo-location";
import dayjs from "dayjs";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

const LandingScreen = () => {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isModalVisibleArray, setIsModalVisibleArray] = useState(
  //   new Array(forecast?.length).fill(false)
  // );
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [location]);

  // useEffect(() => {
  //   // Initialize isModalVisibleArray with false for each item in the forecast
  //   if (forecast) {
  //     setIsModalVisibleArray(new Array(forecast.length).fill(false));
  //   }
  // }, [forecast]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    const weatherURL = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
    const res = await fetch(weatherURL);

    const data = await res.json();
    // console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  const fetchForecast = async () => {
    if (!location) {
      return;
    }
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    const forecastURL = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
    const res = await fetch(forecastURL);
    const data_forecast = await res.json();
    // console.log(JSON.stringify(data_forecast, null, 2));
    setForecast(data_forecast.list);
  };

  // const showDetailScreen = () => {
  //   setIsModalVisible(true);
  // };

  // const closeDetailScreen = () => {
  //   setIsModalVisible(false);
  // };

  // const showDetailScreen = (index) => {
  //   // Set the visibility of the modal for the specified index to true
  //   const newArray = [...isModalVisibleArray];
  //   newArray[index] = true;
  //   setIsModalVisibleArray(newArray);
  // };

  // const closeDetailScreen = (index) => {
  //   // Set the visibility of the modal for the specified index to false
  //   const newArray = [...isModalVisibleArray];
  //   newArray[index] = false;
  //   setIsModalVisibleArray(newArray);
  // };

  const showDetailScreen = (index) => {
    setOpenModalIndex(index);
  };

  const closeDetailScreen = () => {
    setOpenModalIndex(null);
  };

  const showTodayDetailScreen = () => {
    setOpenModalIndex("today");
  };

  const filterWeatherData = (weatherDataList) => {
    if (!weatherDataList) {
      return weatherDataList;
    }
    const currentDate = new Date(); // Current date and time
    const currentDay = currentDate.getDate(); // Get the current day
    let includedDays = new Set(); // Set to keep track of included days

    const filteredWeatherData = weatherDataList.filter((weatherObj) => {
      const weatherDate = new Date(weatherObj.dt * 1000); // Convert timestamp to date
      const weatherDay = weatherDate.getDate(); // Get the day of the weather data

      // Check if it's a new day, and exclude the current day
      if (weatherDay === currentDay || includedDays.has(weatherDay)) {
        return false;
      }

      // Include the current day in the set
      includedDays.add(weatherDay);

      return true;
    });

    return filteredWeatherData;
  };

  if (!weather) {
    return <ActivityIndicator />;
  }
  // console.log(forecast);

  const filteredForecast = filterWeatherData(forecast);

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/cloud.png")}
      />
      <View style={styles.weatherContainer}>
        <Pressable
          android_ripple={{ color: "#fff" }}
          onPress={showTodayDetailScreen}
          accessibilityLabel="todayweather"
        >
          <View style={styles.todayInfo}>
            <View style={styles.todayDateInfo}>
              <Text style={styles.todayDateInfoText}>
                {dayjs(weather.dt * 1000).format("dddd, DD MMM YYYY")}
              </Text>
            </View>
            <View style={styles.todayWeatherInfo}>
              <View style={styles.todayDegree}>
                <Text style={styles.todayDegreeText}>
                  {Math.round(weather.main.temp)}°c
                </Text>
              </View>
              <View style={styles.minMaxWeather}>
                <View style={styles.maxWeather}>
                  <Text style={styles.minMaxText}>
                    max {Math.round(weather.main.temp_max)}°c
                  </Text>
                </View>
                <View style={styles.minWeather}>
                  <Text style={styles.minMaxText}>
                    min {Math.round(weather.main.temp_min)}°c
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
        {/* <DetailScreen
          weather={weather}
          visible={openModalIndex === "today"}
          closePress={closeDetailScreen}
        /> */}
        {/* <ScrollView> */}
        <FlatList
          data={filteredForecast}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.dt.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.weekWeather}>
              <Pressable
                android_ripple={{ color: "#fff" }}
                onPress={() => showDetailScreen(index)}
              >
                <DayTab
                  visible={openModalIndex === index}
                  forecast={item}
                  showDetail={() => showDetailScreen(index)}
                  closeDetail={() => closeDetailScreen(index)}
                />
              </Pressable>
              <DetailScreen
                weather={openModalIndex === "today" ? weather : item}
                visible={openModalIndex === index || openModalIndex === "today"}
                closePress={() => closeDetailScreen(index)}
              />
            </View>
          )}
        />
        {/* </ScrollView> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: 8,
  },
  image: {
    flex: 1,
  },
  weatherContainer: {
    flex: 2,
    marginTop: 30,
    marginHorizontal: 10,
  },
  todayInfo: {
    flexDirection: "column",
    width: 250,
    height: 145,
    padding: 7,
    // borderWidth:1,
    // borderRadius:25,
    // borderColor:"white",
    // backgroundColor:"white"
  },
  todayDateInfo: {
    // borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  todayDateInfoText: {
    fontSize: 21,
    color: "#0252A2",
    fontWeight: "bold",
  },
  todayWeatherInfo: {
    flexDirection: "row",
    // borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    // width:"60%",
  },
  todayDegree: {
    flex: 1,
    justifyContent: "center",
    // borderWidth: 1,
    padding: 5,
    alignItems: "center",
  },
  todayDegreeText: {
    fontSize: 40,
    color: "#0252A2",
    fontWeight: "bold",
  },
  minMaxWeather: {
    flex: 1,
    justifyContent: "center",
    // borderWidth: 1,
    padding: 5,
    // alignItems: "center",
  },
  maxWeather: {
    // borderWidth: 1,
    padding: 1,
  },
  minWeather: {
    // borderWidth: 1,
    padding: 1,
  },
  minMaxText: {
    fontSize: 18,
    color: "#0252A2",
    fontWeight: "bold",
  },
  weekWeather: {
    flex: 1,
    // borderWidth:1
  },
});

export default LandingScreen;
