import React from "react";
import { View, StyleSheet, Text } from "react-native";
import UseCamera from "../Components/Camera";

const Home = () => {
  return (
    <View style={styles.container}>
      <UseCamera />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
