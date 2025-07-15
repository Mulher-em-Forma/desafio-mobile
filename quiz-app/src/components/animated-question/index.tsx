import MultipleChoiceList from "@/components/multiple-choice-list";
import { Question } from "@/data/question";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Button from "../button";
import { styles } from "./style";

type Props = {
  question: Question;
  onAnswer: (
    questionText: string,
    answerText: string | string[],
    nextId: string
  ) => void;
};

export default function AnimatedQuestion({ question, onAnswer }: Props) {
  const translateX = useSharedValue(400);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    setSelectedOptions([]);
  }, [question.id]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    const nextId = question.answers[0].next;
    const questionText = question.text;
    onAnswer(questionText, selectedOptions, nextId);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>{question.text}</Text>

      {question.multiple ? (
        <>
          <MultipleChoiceList
            options={question.answers.map((a) => a.text)}
            selected={selectedOptions}
            onToggle={toggleOption}
          />
          <View style={styles.buttonWrapper}>
            <Button
              title="Próximo"
              onPress={handleSubmit}
              disabled={selectedOptions.length === 0}
            />
          </View>
        </>
      ) : (
        question.answers.map((answer, index) => (
          <Button
            key={index}
            title={answer.text}
            onPress={() => onAnswer(question.text, answer.text, answer.next)}
          />
        ))
      )}
    </Animated.View>
  );
}
