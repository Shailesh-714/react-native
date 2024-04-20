import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { deals } from "../data/DealsData";
import CustomStarRating from "../components/CustomStarRating";
import AddtoCart from "../components/AddtoCart";
import Like from "../components/Like";

const SearchResult = ({ route }) => {
  const { searchQuery } = route.params;
  const screenWidth = useWindowDimensions("window").width;
  return (
    <SafeAreaView
      style={{
        marginTop: 5,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "92%",
          marginVertical: 16,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 20,
              letterSpacing: 1.2,
            }}
          >
            Products
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Octicons name="bell" size={20.5} color="rgba(0,0,0,0.7)" />
          <Wishlist />
          <Cart />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: screenWidth * 0.05,
            marginTop: 5,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "grey", fontSize: 16, letterSpacing: 1 }}>
            Showing Search Results for{" "}
            <Text style={{ color: "#eb104e" }}>{searchQuery}</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.04,
          }}
        >
          {deals
            .filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((item, index) => (
              <Pressable
                key={index}
                style={{}}
                onPress={() => handleProductPress(item.id)}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    maxWidth: 155,
                  }}
                >
                  <Image
                    style={{
                      width: 155,
                      height: 130,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    source={item.image}
                  />
                  <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.text,
                        {
                          fontSize: 13,
                          fontWeight: "500",
                          overflow: "hidden",
                          marginVertical: 3,
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.text,
                        {
                          fontSize: 11,
                          fontWeight: "400",
                          color: "grey",
                        },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                    <View
                      style={{
                        marginVertical: 2,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <CustomStarRating
                        rating={item.rating}
                        starSize={10}
                        fullStarColor={"rgba(255,167,15,0.9)"}
                      />
                      <Text
                        style={{
                          color: "#50C878",
                          fontWeight: "500",
                          fontSize: 11,
                          letterSpacing: -0.3,
                        }}
                      >
                        {(
                          ((item.oldPrice - item.price) * 100) /
                          item.oldPrice
                        ).toFixed(0)}
                        % Off
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginVertical: 3 }}>
                      <Text style={{ fontWeight: "500" }}>₹{item.price}</Text>
                      <Text
                        style={{
                          textDecorationLine: "line-through",
                          fontSize: 12,
                          color: "grey",
                          fontWeight: "300",
                          marginHorizontal: 10,
                        }}
                      >
                        ₹{item.oldPrice}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: 8, marginRight: 2 }}>
                    <AddtoCart
                      dealId={item.id}
                      customStyle={{ marginRight: 3 }}
                      showGotoCart={true}
                    />
                  </View>
                </View>
                <View style={{ position: "absolute", top: 6, left: 125 }}>
                  <Like Iconsize={19} dealId={item.id} />
                </View>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({});
