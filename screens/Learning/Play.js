import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants";
import { playSound } from "../../services/soundHandler";
import dummyData from "../../dummyData";

export default function Play({ words }) {
  const [learningWords, setLearningWords] = useState(() => {
    const sourceWords = words === undefined ? dummyData : words;

    return (sourceWords || [])
      .filter((item) => item.status < 2)
      .map((item) => ({ ...item }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentWord = learningWords[currentIndex];

  function goToNextWord() {
    setIsRevealed(false);

    setCurrentIndex((previousIndex) =>
      learningWords.length > 0
        ? (previousIndex + 1) % learningWords.length
        : 0
    );
  }

  function onDidNotKnow() {
    goToNextWord();
  }

  function onKnewIt() {
    setLearningWords((previousWords) =>
      previousWords.map((item, index) =>
        index === currentIndex
          ? { ...item, status: item.status + 1 }
          : item
      )
    );

    setIsRevealed(false);

    setCurrentIndex((previousIndex) => {
      const updatedWords = learningWords.map((item, index) =>
        index === previousIndex
          ? { ...item, status: item.status + 1 }
          : item
      );

      const remainingWords = updatedWords.filter(
        (item) => item.status < 2
      );

      if (remainingWords.length === 0) return 0;

      const nextWord = updatedWords.findIndex(
        (item, index) =>
          index > previousIndex && item.status < 2
      );

      return nextWord === -1
        ? updatedWords.findIndex((item) => item.status < 2)
        : nextWord;
    });
  }

  if (!currentWord) {
    return (
      <View style={styles.container}>
        <Text style={styles.congrats}>Congrats!</Text>

        <Text style={styles.completed}>
          For now you have learned all the words
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={styles.card}
        onPress={() => setIsRevealed((previous) => !previous)}
      >
        <Text style={styles.word}>
          {currentWord.word}
        </Text>

        {isRevealed && (
          <View style={styles.details}>
            <View style={styles.phoneticsRow}>
              <Text style={styles.phonetics}>
                {currentWord.phonetics}
              </Text>

              {currentWord.audio ? (
                <Pressable
                  onPress={() => playSound(currentWord.audio)}
                  style={styles.soundButton}
                >
                  <Ionicons
                    name="volume-medium-outline"
                    size={28}
                    color={COLORS.primary900}
                  />
                </Pressable>
              ) : null}
            </View>

            {currentWord.partOfSpeech ? (
              <Text style={styles.partOfSpeech}>
                {currentWord.partOfSpeech}
              </Text>
            ) : null}

            <Text style={styles.meaning}>
              {currentWord.meaning}
            </Text>
          </View>
        )}
      </Pressable>

      {isRevealed && (
        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, styles.dontKnowButton]}
            onPress={onDidNotKnow}
          >
            <Text style={styles.buttonText}>
              Didn't know it
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.knewButton]}
            onPress={onKnewIt}
          >
            <Text style={styles.buttonText}>
              Knew it
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    minHeight: 190,
    padding: 22,
    borderRadius: 12,
    backgroundColor: COLORS.fontInverse,
    justifyContent: "center",
    elevation: 4,
  },

  word: {
    color: COLORS.primary900,
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
  },

  details: {
    marginTop: 18,
  },

  phoneticsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  phonetics: {
    color: COLORS.fontMain,
    fontSize: 20,
  },

  soundButton: {
    marginLeft: 15,
    padding: 4,
  },

  partOfSpeech: {
    color: COLORS.grey600,
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },

  meaning: {
    color: COLORS.fontMain,
    fontSize: 18,
    textAlign: "center",
    marginTop: 12,
  },

  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    gap: 12,
  },

  button: {
    flex: 1,
    minHeight: 48,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  dontKnowButton: {
    backgroundColor: COLORS.secondary800,
  },

  knewButton: {
    backgroundColor: COLORS.primary900,
  },

  buttonText: {
    color: COLORS.fontInverse,
    fontSize: 16,
    fontWeight: "600",
  },

  congrats: {
    color: COLORS.primary900,
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },

  completed: {
    color: COLORS.fontMain,
    fontSize: 20,
    textAlign: "center",
  },
});