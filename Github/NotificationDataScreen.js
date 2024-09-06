import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import NotificationDataStyle from "../../assets/css/NotificationDataStyle";
import { APP_COLORS } from "../utils/constants";
import { useNotifications } from "../context/NotificationContext";

const NotificationDataScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item, id } = route.params;
  const { deleteNotification } = useNotifications();
  const logo = require("../../assets/logoEcsapemSplash.png");

  const handleDelete = () => {
    deleteNotification(id);
    navigation.goBack();
  };

  return (
    <View style={NotificationDataStyle.itemContainer}>
      <ScrollView style={NotificationDataStyle.textContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}>
          <Image source={logo} style={{ width: 200, height: 50 }} />
        </View>
        <Text style={NotificationDataStyle.itemContainerText1}>ID: {id}</Text>
        <Text style={NotificationDataStyle.itemContainerText2}>
          Descripcion: {item.description}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={handleDelete} style={{ padding: 10 }}>
            <FontAwesome
              name="trash-o"
              size={25}
              color={APP_COLORS["main_border"]}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationDataScreen;
