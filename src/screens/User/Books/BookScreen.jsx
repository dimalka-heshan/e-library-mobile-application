import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/color";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const book = {
  id: 1,
  name: "Game Of Thrones The Dance Of Dragons",
  price: "George R.R. Martin",
  like: true,
  img: require("../../../assets/images/sample_Book.jpg"),
  about:
    "Lorem stet consetetur invidunt stet tempor dolores clita kasd clita erat, sit tempor ea dolore invidunt invidunt clita amet ut. Lorem kasd magna ea amet accusam dolore. Amet accusam dolores dolore amet dolor stet, elitr at diam accusam et accusam ipsum stet, dolor vero sadipscing sea diam diam stet et amet amet. Et amet magna sea lorem justo diam gubergren, et elitr lorem ea diam sanctus et. Duo stet labore justo magna lorem dolor diam est et, sit et rebum elitr ipsum sit est dolores dolor et, kasd gubergren et voluptua lorem labore. Eos eos eirmod erat et aliquyam diam lorem. Et aliquyam sit ea sadipscing no aliquyam sanctus et. Dolor lorem elitr est amet dolores. Et ut et aliquyam voluptua dolor erat diam, lorem et sea duo diam et sit, lorem dolor ipsum dolores gubergren sanctus. Voluptua sit nonumy lorem sit ipsum sit sit. Et stet diam lorem ipsum takimata takimata. Ipsum sea diam magna dolor justo sit clita dolores. Sit erat no kasd ut sed voluptua et. Et stet takimata sed vero diam sed diam rebum. Invidunt sit aliquyam labore invidunt et dolore stet gubergren et. Dolores amet justo rebum justo. Justo consetetur amet takimata eirmod magna est. Diam elitr gubergren sadipscing dolore justo. Eos elitr duo dolore eirmod dolore magna sed sit, diam nonumy et et sadipscing labore nonumy. Kasd sadipscing sanctus eos gubergren rebum. Invidunt gubergren dolores stet elitr accusam sit est. Amet rebum kasd sit ea dolor eirmod. Kasd at sit voluptua et stet takimata nonumy ut et, sit diam erat ea erat dolor. Gubergren sit lorem eos elitr est consetetur, ipsum ipsum invidunt ut et amet clita diam ipsum duo. Sed justo dolore takimata ut elitr dolore ut diam. Kasd nonumy sed erat est, lorem sanctus lorem et sadipscing et amet voluptua sanctus, at amet sadipscing at invidunt amet at. Vero amet dolor et eos duo et stet sit sadipscing. Accusam dolores aliquyam elitr ipsum nonumy dolore et, sea duo diam dolore consetetur et nonumy et dolor. Sit kasd aliquyam at sit et lorem. Lorem stet tempor sadipscing no ipsum labore et sit gubergren. Takimata vero eos ipsum et no. Aliquyam amet invidunt et gubergren. Vero et gubergren consetetur et no invidunt justo dolor, sed et duo eirmod dolores nonumy, diam sanctus lorem at ipsum ea dolor aliquyam kasd, kasd nonumy sit dolor vero lorem sed sed, est erat vero voluptua dolores, dolore et dolore ipsum at at, et gubergren elitr et sea nonumy, sea eos ipsum ut eos sanctus sadipscing gubergren justo. Consetetur sea tempor nonumy dolore dolore. Sanctus duo et takimata clita gubergren dolor, rebum labore diam stet aliquyam. No takimata vero diam erat erat et. Dolor labore dolores eirmod et dolores sea erat dolores justo, sit sed tempor voluptua dolor sit duo rebum, sed ea no voluptua eirmod eos magna. Erat sea accusam dolor magna et duo. Et sanctus at accusam et elitr magna dolor ipsum sed. Sanctus diam diam et clita dolor clita lorem est eos. Et duo sadipscing consetetur.",
};
const BookScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>

      <View style={style.imageContainer}>
        <Image source={book.img} style={style.bookImage} />
      </View>

      <View style={style.detailsContainer}>
        <View>
          <View>
            <View style={style.bookNameContainer}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginTop: "2%",
                  width: "80%",
                }}
              >
                {book.name}
              </Text>
              <View
                style={{
                  width: "20%",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity style={style.downloadButton}>
                  <Icon name="file-download" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "gray",
                  marginTop: 1,
                }}
              >
                {book.price}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: COLORS.blue,
                  marginTop: 1,
                }}
                onPress={() => {}}
              >
                {"View Feedback >>"}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              paddingHorizontal: 20,
              marginTop: "5%",
            }}
          >
            About
          </Text>
          <ScrollView
            style={{
              width: "100%",
              height: responsiveHeight(22),
              marginTop: "2%",
            }}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  color: "grey",
                  fontSize: 16,
                  lineHeight: 22,
                  marginTop: 10,
                }}
              >
                {book.about}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookScreen;

const style = StyleSheet.create({
  header: {
    paddingHorizontal: "5%",
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imageContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: COLORS.white,
    justifyContent: "center",
  },

  bookImage: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },

  detailsContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginTop: "5%",
  },

  downloadButton: {
    backgroundColor: COLORS.blue,
    padding: "15%",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },

  bookNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
});
