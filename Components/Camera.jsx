import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

const UseCamera = () => {
  const navigation = useNavigation()

  const [hasPermission, setHasPermission] = useState(null);
  
  const [camera, setCamera] = useState(null);
  
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const requestCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requestCameraPermissions();
  }, []);

  const handleStartRecording = async () => {
    if (camera && !isRecording) {
      try {
        setIsRecording(true);
        const video = await camera.recordAsync();

        video ? navigation.navigate("Save", { video }) : null;


      } catch (error) {
        console.log(error);
        setIsRecording(false);
      }
    }
  };

  const handleStopRecording = async () => {
    if (camera && isRecording) {
      try {
        setIsRecording(false);
        await camera.stopRecording();
      } catch (error) {
        console.log(error);
        setIsRecording(true);
      }
    }
  };

  if (hasPermission === null) {
    return null;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={setCamera}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onLongPress={handleStartRecording}
            onPressOut={handleStopRecording}
          >
            <View
              style={[
                styles.recordButton,
                { backgroundColor: isRecording ? "red" : "white" },
              ]}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 60,
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  recordButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default UseCamera;
