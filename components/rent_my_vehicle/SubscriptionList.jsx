// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";
// import Text from "components/ThemedText";
// import { getAllRentals } from "api/rental";
// import React, { useEffect, useState } from "react";
// import { useLoadingAnimation } from "hooks/useLoadingAnimation";
// import useSentenceCase from "hooks/useSentenceCase";
// import { colors } from "constants/Colors";
// import { router } from "expo-router";
// import { useIsFocused } from "@react-navigation/native";

// const SubscriptionList = () => {
//   const { showLoading, hideLoading, LoadingComponent } = useLoadingAnimation();
//   const { toSentenceCase } = useSentenceCase();
//   const [data, setData] = useState([]);
//   const isFocused = useIsFocused();

//   const getRentals = async () => {
//     try {
//       showLoading();
//       const filter = { status: "pending" };
//       const result = await getAllRentals(filter);
//       if (Array.isArray(result)) {
//         setData(result);
//       }
//       hideLoading();
//     } catch (error) {
//       hideLoading();
//       alert(
//         "There has been an error fetching Rental Applications, please try again later."
//       );
//     }
//   };

//   const handleOnPress = (index) => {
//     if (data[index]) {
//       router.push({
//         pathname: "rent-my-vehicle/renting-application/booking-information",
//         params: { data: JSON.stringify(data[index]) },
//       });
//     } else {
//       router.push("rent-my-vehicle/renting-application/booking-information");
//     }
//   };

//   useEffect(() => {
//     if (isFocused) {
//       getRentals();
//     }
//   }, [isFocused]);

//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       {data.length > 0 ? (
//         <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
//           {data.map(({ vehicleName, imageUrl }, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.container,
//                 index === data.length - 1 && styles.lastItem,
//               ]}
//               onPress={() => handleOnPress(index)}
//             >
//               <View style={styles.row}>
//                 <View style={styles.col}>
//                   <Image style={styles.img} source={{ uri: imageUrl }} />
//                   <View style={styles.textContainer}>
//                     <Text style={styles.renteeName}>
//                       {/* {toSentenceCase(rentee)} */}
//                     </Text>
//                     <Text style={styles.text}>Wants to rent your vehicle!</Text>
//                   </View>
//                 </View>
//                 <View style={styles.col2}>
//                   <Text style={styles.dateText}>
//                     {/* {dateCreated.toString()} */}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       ) : (
//         <View style={styles.container2}>
//           <Image
//             source={require("assets/images/logo.png")}
//             style={styles.logo}
//           />
//           <Text style={styles.caption}>No Applicants for Renting found</Text>
//         </View>
//       )}

//       <LoadingComponent />
//     </View>
//   );
// };

// export default SubscriptionList;

// const styles = StyleSheet.create({
//   scroll: {
//     flex: 1,
//     height: "auto",
//     marginTop: -23,
//   },
//   container: {
//     width: "100%",
//     borderBottomColor: colors.white[2],
//     borderBottomWidth: 1,
//     paddingTop: 10,
//     paddingBottom: 10,
//     alignItems: "flex-start",
//   },
//   row: {
//     flex: 1,
//     flexBasis: 1,
//     width: "100%",
//     flexDirection: "row",
//     alignContent: "center",
//     justifyContent: "space-between",
//   },
//   col: {
//     flex: 1,
//     gap: 10,
//     flexDirection: "row",
//   },
//   col2: {
//     alignSelf: "flex-end",
//   },
//   textContainer: {
//     alignSelf: "center",
//     width: "70%",
//   },
//   img: {
//     width: 60,
//     height: 60,
//     borderRadius: 100,
//   },
//   renteeName: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   dateText: {
//     fontSize: 12,
//   },
//   text: {},
//   container2: {
//     flex: 1,
//     marginTop: -100,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "70%",
//     alignSelf: "center",
//     flexDirection: "column",

//     gap: 20,
//   },
//   logo: {
//     width: 165,
//     height: 198,
//   },
//   caption: {
//     fontSize: 20,
//     textAlign: "center",
//   },
// });
