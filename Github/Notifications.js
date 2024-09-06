import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NotificationsStyle from "../../assets/css/NotificationsStyle";
import IconDollar from "../utils/IconDollar";
import IconSupport from "../utils/IconSupport";
import IconParty from "../utils/IconParty";
import IconBank from "../utils/IconBank";
import IconCellPhone from "../utils/IconCellPhone";
import { useNotifications } from "../context/NotificationContext";

const Notifications = () => {
  const navigation = useNavigation();
  const { notifications, markAsRead } = useNotifications();

  const goToNotification = (item) => {
    markAsRead(item.id);

    navigation.navigate("NotificationDataScreen", {
      item,
      id: item.id,
    });
  };

  const getIconComponent = (tipo) => {
    switch (tipo) {
      case 1:
        return <IconParty />;
      case 2:
        return <IconBank />;
      case 3:
        return <IconSupport />;
      case 4:
        return <IconCellPhone />;
      case 5:
        return <IconDollar />;
      default:
        return <Text>No hay iconos</Text>;
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.leido === 1 ? "#ECECEC" : "#FFFFFF";

    return (
      <TouchableOpacity onPress={() => goToNotification(item)}>
        <View style={[NotificationsStyle.item, { backgroundColor }]}>
          <View style={NotificationsStyle.itemContainer}>
            <View style={NotificationsStyle.IconContainer}>
              {getIconComponent(item.tipoNotificacion)}
            </View>
            <View style={NotificationsStyle.itemContainerNotificacion}>
              <Text style={NotificationsStyle.itemContainerText1}>
                {item.titulo} {"\n"}
              </Text>
              <Text style={NotificationsStyle.itemContainerText2}>
                {item.subtitulo}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={NotificationsStyle.listContainer}
    />
  );
};

export default Notifications;
