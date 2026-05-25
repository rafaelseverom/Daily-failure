import { useState } from "react";
import { Pressable, Share, StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";
import { frases } from "../data/frases";
import { getDiaDoAno } from "../utils/getDiaDoAno";

export default function Home() {
  const [idioma, setIdioma] = useState<"pt" | "en">("pt");

  const diaDoAno = getDiaDoAno();
  const fraseAtual = frases[(diaDoAno - 1) % frases.length];
  const fraseDoDia = fraseAtual[idioma];

  function alternarIdioma() {
    setIdioma(idioma === "pt" ? "en" : "pt");
  }

  async function compartilharFrase() {
    await Share.share({
      message: `"${fraseDoDia}"\n\nDaily Failure`,
    });
  }

  return (
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

      <Pressable style={styles.button} onPress={alternarIdioma}>
        <Text style={styles.buttonText}>
          {idioma === "pt" ? "Switch to English" : "Mudar para Português"}
        </Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={compartilharFrase}>
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
  );
}

const styles = StyleSheet.create({
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