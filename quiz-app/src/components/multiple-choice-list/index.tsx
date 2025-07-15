import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./style";

type Props = {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
};

export default function MultipleChoiceList({
  options,
  selected,
  onToggle,
}: Props) {
  return (
    <View>
      {options.map((opt, index) => {
        const isSelected = selected.includes(opt);
        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, isSelected && styles.selected]}
            onPress={() => onToggle(opt)}
          >
            <Text style={styles.optionText}>
              {isSelected ? "☑" : "⬜"} {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
