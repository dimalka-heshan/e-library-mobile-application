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
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const book = {
  id: 1,
  name: "Game Of Thrones The Dance Of Dragons",
 };

 const mycomment = {
  id: 1,
    rating: "5",
    name: "Ravindu sandeepana",
    date: "January 1, 2020",
    comment:
      "Ravindu mycommentt, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
 };

 const posts = [
  {
    id: 1,
    rating: "5",
    name: "Ravindu sandeepana",
    date: "January 1, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 2,
    rating: "3",
    name: "Nimna thiranjaya",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 3,
    rating: "1",
    name: "Dimalka heshan",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 4,
    rating: "5",
    name: "hasith damsara",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
  {
    id: 5,
    rating: "3",
    name: "Ravindu",
    date: "January 2, 2020",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  },
];


const BookFeedback = ({navigation}) => {
    return (
      <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.light
      }}
    >
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
      
      <Text
           style={{
                  fontSize: 27,
                  marginLeft: '3%',
                  fontWeight: "bold",
                  marginTop: "2%",
                  width: "100%",
                  color: COLORS.dark, fontWeight: "bold"
                }}
              >
                User Feedbacks :  {book.name} 
      </Text>

      <View style={style.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.push("createFeedback")}
          style={style.getStartedButton}
        >
          <Text style={style.buttonText}>Add Feedback</Text>
          <Icon name="edit" size={27} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={style.mypost}>
      <TouchableOpacity
            key={mycomment.id}
            
          > 
            <View style={style.postContent}>
              <Text style={style.postTitle}>{mycomment.name} | <Icon
            justifyContent="flex-end"
            name="star"
            size={responsiveFontSize(4)}
            color="#ffb300"
          />     
              {mycomment.rating}/5</Text>
              <View
                style={{
                  width: "10%",
                }}
              >
                <TouchableOpacity style={style.editButton}>
                  <Icon name="edit" size={35} color={COLORS.blue} />
                </TouchableOpacity>
              </View> 
              <TouchableOpacity style={style.deleteButton}>
                  <Icon name="delete" size={35} color={COLORS.red} />
                </TouchableOpacity>
              
              <Text style={style.postMeta}>
                | {mycomment.date}
              </Text>
              <Text style={style.postExcerpt}>{mycomment.comment}</Text>
            </View>
          </TouchableOpacity> 
      </View>

      <ScrollView>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={style.post}
          >
            
            <View style={style.postContent}>
              <Text style={style.postTitle}>{post.name} | <Icon
            justifyContent="flex-end"
            name="star"
            size={responsiveFontSize(4)}
            color="#ffb300"
          />     
              {post.rating}/5</Text>
              <Text style={style.postMeta}>
                | {post.date}
              </Text>
              <Text style={style.postExcerpt}>{post.comment}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

        
  
    </SafeAreaView>
    )
  }


  export default BookFeedback;


  const style = StyleSheet.create({
    header: {
      paddingHorizontal: "5%",
      marginTop: "10%",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    post: {
      marginBottom: 20,
      backgroundColor: "#fff",
      
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: {
        width: 10,
        height: 10,
      },
    },
    
    postContent: {
      padding: 20,
    },
    postTitle: {
      fontSize: 20,
      width: "80%",
      fontWeight: "bold",
      marginBottom: 10,
    },
    postMeta: {
      fontSize: 14,
      color: "#999",
      marginBottom: 10,
    },
    postExcerpt: {
      fontSize: 14,
    },
    title: {
      marginTop: 40,
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      marginLeft: 20,
    },

    mypost: {
      marginBottom: 20,
      backgroundColor: "#E5E4E2",
      height:250,
      marginTop: -75,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: {
        width: 10,
        height: 10,
      },
    },
    buttonContainer: {
      width: "100%",
      height: "16%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "flex-end",
      marginLeft: 5
    },
    getStartedButton: {
      width: responsiveWidth(60),
      height: responsiveHeight(6),
      backgroundColor: COLORS.green,
      borderRadius: 15,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: responsiveHeight(-10),
      maxWidth: 200,
    },
    
    
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },

  editButton:{
    justifyContent: "space-around",
    alignItems: "baseline"
  },

  deleteButton:{
    justifyContent: "space-around",
    alignItems: "flex-end"
  }
    
  });
  
