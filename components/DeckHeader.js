import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DeckHeader = ({title, size}) => (
  <View style={styles.header}>
    <Text style={{ fontSize: 30 }}>{title}</Text>
    <Text style={{ fontSize: 15 }}>
      {size} card{size > 1 ? "s" : ""}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DeckHeader;
