import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const CustomLoading = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("../../assets/loading.json")}
        style={{ width: 100, height: 100 }}
        autoPlay
        loop
      />
    </View>
  );
};

export default CustomLoading;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
});
