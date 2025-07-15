import Button from "@/components/button";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Confirm() {
  const { answers, resetQuiz } = useQuizStore();
  const router = useRouter();

  const handleRestart = () => {
    resetQuiz();
    router.replace("/");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Revise suas respostas:</Text>
      {answers.map((opt, index) => {
        return (
          <View key={index}>
            <Text style={styles.question}>{opt.question}</Text>
            <Text>
              R.:{" "}
              {Array.isArray(opt.answer) ? opt.answer.join(", ") : opt.answer}
            </Text>
          </View>
        );
      })}
      <Button title="Refazer quiz" onPress={handleRestart} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
  },
});
