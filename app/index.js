import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES } from "../constants/theme";
import Welcome from "../components/Welcome";
import ActionSlide from "../components/slides/HomeSlide";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome />
          <ActionSlide />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
