import {
  SafeAreaView,
  ScrollView,
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
import { useEffect } from "react";

const Category = () => {
  const [page, setPage] = useState(1);
  //   const [items, setItems] = useState({});
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isErrorTrue, setIsErrorTrue] = useState(false);
  const params = useSearchParams();
  let endpoint;
  let query;
  switch (params.category) {
    case "Upcoming":
      endpoint = "titles/x/upcoming";
      query = {
        page: page,
      };
      break;
    case "Top rated movies":
      endpoint = "titles";
      query = {
        list: "top_rated_english_250",
        sort: "year.decr",
        page: page,
      };
      break;
    case "Top rated series":
      endpoint = "titles";
      query = {
        list: "top_rated_series_250",
        sort: "year.decr",
        page: page,
      };
      break;
    case "Most popular movies":
      endpoint = "titles";
      query = {
        list: "most_pop_movies",
        sort: "year.decr",
        page: page,
      };
      break;
    default:
      break;
  }

  const { data, isLoading, error } = useFetch(endpoint, query, [page]);

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
