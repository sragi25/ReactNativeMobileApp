import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import ScrolledView from "./components/scrolledView";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: "1709264e1791ec20913e78201c350020",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  };
  //const url=`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput("");
    axios({
      method: "GET",
      // url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=${api.key}`,
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/weather.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <TextInput
            placeholder="Enter city to know the weather"
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholderTextColor={"#000"}
            style={styles.input}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#000" />
          </View>
        )}
        {data && (
          <>
            <View style={styles.info}>
              <Text style={styles.cityCountry}>
                {`${data?.name}, ${data?.sys?.country}`}
              </Text>
              {/* <Text style={styles.dateText}>{new Date().toLocaleString()}</Text> */}
              <Text
                style={styles.temp}
              >{`${data?.main?.temp.toFixed()}℉`}</Text>
              <Text style={styles.minMaxText}> {``}</Text>
              <Text style={styles.feelsLike}>
                Feels like {`${data?.main?.feels_like.toFixed()}℉`}
              </Text>
              <Text style={styles.humidity}>
                Humidity {`${data?.main?.humidity}`}
              </Text>

              <Text style={styles.speed}>
                Wind Speed {`${data?.wind?.speed.toFixed()} MPH`}
              </Text>
            </View>
          </>
        )}
      </ImageBackground>
      {/* <ScrolledView /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    flexDirection: "column",
  },
  input: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "#FFA500",
  },
  info: {
    alignItems: "center",
  },
  cityCountry: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  dateText: {
    color: "#fff",
    fontSize: 22,
    marginVertical: 10,
  },
  temp: {
    color: "#fff",
    fontSize: 40,
    marginVertical: 10,
  },

  feelsLike: {
    color: "#fff",
    fontSize: 30,
    padding: 20,
    justifyContent: "center",
  },
  humidity: {
    color: "#fff",
    fontSize: 30,
    padding: 20,
    justifyContent: "center",
  },
  speed: {
    color: "#fff",
    fontSize: 30,
    padding: 20,
    justifyContent: "center",
  },
});

export default App;
