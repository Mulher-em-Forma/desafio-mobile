import AnimatedQuestion from "@/components/animated-question";
import { questions } from "@/data/questions";
import { useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  const { currentQuestionId, setCurrentQuestion, addAnswer } = useQuizStore();
  const router = useRouter();

  const question = questions[currentQuestionId];

  const handleAnswer = (
    questionText: string,
    answer: string | string[],
    nextId: string
  ) => {
    addAnswer({ question: questionText, questionId: question.id, answer });

    if (nextId.startsWith("result")) {
      router.push("/confirm");
    } else {
      setCurrentQuestion(nextId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {question && (
        <AnimatedQuestion question={question} onAnswer={handleAnswer} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
});
