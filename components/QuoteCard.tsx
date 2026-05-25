import { StyleSheet, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  frase: string;
  idioma: "pt" | "en";
  diaDoAno: number;
};

export default function QuoteCard({
  frase,
  idioma,
  diaDoAno,
}: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(700)}
      style={styles.card}
    >
      <Text style={styles.date}>
        {idioma === "pt"
          ? `Dia ${diaDoAno} do ano`
          : `Day ${diaDoAno} of the year`}
      </Text>

      <Text style={styles.frase}>{`"${frase}"`}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#1b1b1b",
    borderRadius: 24,
    padding: 28,
    marginBottom: 28,
  },

  date: {
    color: "#777777",
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },

  frase: {
    color: "#f2f2f2",
    fontSize: 28,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 40,
    fontFamily: "SpaceMono",
  },
});