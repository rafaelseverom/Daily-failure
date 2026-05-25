import { useRef, useState } from "react";

import {
  Animated,
  Pressable,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../constants/colors";
import { frases } from "../data/frases";
import { getDiaDoAno } from "../utils/getDiaDoAno";

export default function Home() {
  const [idioma, setIdioma] = useState<"pt" | "en">("pt");

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const diaDoAno = getDiaDoAno();
  const fraseAtual = frases[(diaDoAno - 1) % frases.length];
  const fraseDoDia = fraseAtual[idioma];

  function animarBotao() {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function alternarIdioma() {
    setIdioma(idioma === "pt" ? "en" : "pt");
  }

  async function compartilharFrase() {
    await Share.share({
      message: `"${fraseDoDia}"\n\n☠ Daily Failure`,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logo}>☠ Daily Failure</Text>

        <View style={styles.card}>
          <Text style={styles.date}>
            {idioma === "pt"
              ? `Dia ${diaDoAno} do ano`
              : `Day ${diaDoAno} of the year`}
          </Text>

          <Text style={styles.frase}>"{fraseDoDia}"</Text>
        </View>

        <Animated.View
          style={{
            width: "100%",
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Pressable
            style={styles.button}
            onPress={() => {
              animarBotao();
              alternarIdioma();
            }}
          >
            <Text style={styles.buttonText}>
              {idioma === "pt"
                ? "Switch to English"
                : "Mudar para Português"}
            </Text>
          </Pressable>
        </Animated.View>

        <Pressable
          style={styles.secondaryButton}
          onPress={compartilharFrase}
        >
          <Text style={styles.secondaryButtonText}>
            {idioma === "pt" ? "Compartilhar" : "Share"}
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          {idioma === "pt"
            ? "motivação reversa diária"
            : "daily reverse motivation"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 30,
  },

  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 28,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  date: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 24,
    textAlign: "center",
  },

  frase: {
    color: colors.textSoft,
    fontSize: 28,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 40,
  },

  button: {
    backgroundColor: colors.text,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 14,
  },

  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    borderColor: colors.text,
    borderWidth: 1,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 30,
    color: colors.footer,
    fontSize: 13,
    letterSpacing: 1,
  },
});