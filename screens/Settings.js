
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import { COLORS, COLORS_LIGHT } from "../constants";

function Settings() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const theme = isDarkTheme ? COLORS : COLORS_LIGHT;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          { backgroundColor: theme.appBackground },
        ]}
      >
        <Text style={[styles.title, { color: theme.fontMain }]}>
          Choose color theme:
        </Text>

        <View style={styles.option}>
          <Text style={[styles.optionText, { color: theme.fontMain }]}>
            Light
          </Text>

          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: isDarkTheme }}
            value={isDarkTheme}
            onValueChange={setIsDarkTheme}
            onPress={() => setIsDarkTheme((previous) => !previous)}
            style={[
              styles.switch,
              {
                backgroundColor: isDarkTheme
                  ? COLORS.primary200
                  : COLORS_LIGHT.primary200,
              },
            ]}
          >
            <View
              style={[
                styles.switchThumb,
                {
                  alignSelf: isDarkTheme ? "flex-end" : "flex-start",
                  backgroundColor: isDarkTheme
                    ? COLORS.primary900
                    : COLORS_LIGHT.primary900,
                },
              ]}
            />
          </Pressable>

          <Text style={[styles.optionText, { color: theme.fontMain }]}>
            Dark
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    margin: 12,
    padding: 16,
    borderRadius: 8,
    minHeight: 120,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 18,
  },
  switch: {
    width: 52,
    height: 30,
    borderRadius: 15,
    padding: 3,
    justifyContent: "center",
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
