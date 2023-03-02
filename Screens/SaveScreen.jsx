import { useNavigation } from "@react-navigation/core";
import { Video } from "expo-av";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";

const SaveScreen = ({ route }) => {
  const [play, setPlay] = React.useState(true);
  const navigation = useNavigation();
  const { uri } = route.params.video;

  console.log("VIDEO URI : ", uri);

  const saveVideoAsDraft = async () => {
    try {
      console.log("SAVING VIDEO AS DRAFT");
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Permission to access media library denied");
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      let album = await MediaLibrary.getAlbumAsync("MyAppDrafts");

      if (album === null) {
        album = await MediaLibrary.createAlbumAsync(
          "MyAppDrafts",
          asset,
          false
        );
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      // alert the user where the video is saved
      alert(`Video saved as draft in ${album.title} album!`);

      navigation.navigate("Home");

    } catch (err) {
      console.error(err);
      alert(`Error saving video as draft: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => {
          setPlay(!play);
        }}
      >
        <Video
          source={{ uri }}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={play}
          isLooping
          style={styles.video}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={saveVideoAsDraft}>
        <Text style={{ color: "black", fontSize: 20 }}>Save as Draft</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6f9ff",
  },
  video: {
    width: 300,
    height: 500,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#ffcccc",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default SaveScreen;
