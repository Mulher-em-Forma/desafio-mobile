import Button from "@/components/button";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.msgWrapper}>
          <Text style={styles.msg}>Vamos começar o quetionario!?</Text>
        </View>
        <Button title="Iniciar" onPress={() => router.navigate("/quiz")} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  msgWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  msg: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f46e5",
  },
});
