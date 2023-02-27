import { Video } from "expo-av";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SaveScreen = ({ route }) => {

  let { uri } = route.params.video

  console.log("VIDEO URI : ", uri)

  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default SaveScreen;
