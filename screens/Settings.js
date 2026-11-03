import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";

import { COLORS, COLORS_LIGHT } from "../constants";

function Settings() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const theme = isDarkTheme ? COLORS : COLORS_LIGHT;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.appBackground },
      ]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: theme.fontMain },
          ]}
        >
          Choose color theme:
        </Text>

        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              { color: theme.fontMain },
            ]}
          >
            Light
          </Text>

          <Switch
            value={isDarkTheme}
            onValueChange={setIsDarkTheme}
            trackColor={{
              false: COLORS_LIGHT.primary200,
              true: COLORS.primary200,
            }}
            thumbColor={
              isDarkTheme
                ? COLORS.primary900
                : COLORS_LIGHT.primary900
            }
          />

          <Text
            style={[
              styles.optionText,
              { color: theme.fontMain },
            ]}
          >
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
});