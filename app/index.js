import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES } from "../constants/theme";
import Welcome from "../components/Welcome";
import HomeSlide from "../components/slides/HomeSlide";

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
          <HomeSlide title="Upcoming" />
          <HomeSlide title="Top rated movies" />
          <HomeSlide title="Top rated series" />
          <HomeSlide title="Most popular movies" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
