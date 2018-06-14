import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DeckHeader = ({title, size, cardNumber, score}) => {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 30 }}>{title}</Text>
      {typeof cardNumber !== 'undefined' && cardNumber < size &&
        <Text style={styles.text}>
        {size > 0 && `Card ${cardNumber + 1} of ${size}`}
        </Text>
      }
      {typeof cardNumber !== 'undefined' && cardNumber === size &&
        <Text style={styles.text}>
          Your score is {score}/{size}
        </Text>
      }
      { typeof cardNumber === 'undefined' &&
        <Text style={styles.text}>
          {size} card{size > 1 ? "s" : ""}
        </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20
  }
});

export default DeckHeader;
