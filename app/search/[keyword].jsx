import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { useSearchParams, Stack } from "expo-router";
import { useState } from "react";
import MovieCard from "../../components/slides/MovieCard";
import { SIZES, COLORS, FONT } from "../../constants";
import Pagination from "../../components/Pagination";

const Category = () => {
  const [page, setPage] = useState(1);
  const params = useSearchParams();

  const { data, isLoading, error } = useFetch(
    `titles/search/title/${params.keyword}`,
    {
      exact: false,
      page: page,
    },
    [page]
  );

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={data.results}
              renderItem={({ item }) => <MovieCard item={item} category />}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
            />
          )}
        </View>
        {!isLoading && !error && (
          <Pagination
            page={page}
            setPage={setPage}
            num={data?.results?.length}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: SIZES.xLarge,
    backgroundColor: COLORS.lightWhite,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    width: "100%",
    alignItems: "center",
    paddingBottom: 60,
  },
});

export default Category;
