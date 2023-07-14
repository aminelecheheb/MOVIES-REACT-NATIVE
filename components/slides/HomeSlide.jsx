import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MovieCard from "./MovieCard";
import useFetch from "../../hooks/useFetch";
import { FONT, SIZES, COLORS } from "../../constants";
import { useRouter } from "expo-router";

const HomeSlide = ({ title }) => {
  const router = useRouter();
  let endpoint;
  let query;
  switch (title) {
    case "Upcoming":
      endpoint = "titles/x/upcoming";
      query = {
        page: "1",
      };
      break;
    case "Top rated movies":
      endpoint = "titles";
      query = {
        list: "top_rated_english_250",
        sort: "year.decr",
      };
      break;
    case "Top rated series":
      endpoint = "titles";
      query = {
        list: "top_rated_series_250",
        sort: "year.decr",
      };
      break;
    case "Most popular movies":
      endpoint = "titles";
      query = {
        list: "most_pop_movies",
        sort: "year.decr",
      };
      break;
    default:
      break;
  }
  const { data, isLoading, error } = useFetch(endpoint, query);
  // console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data.results}
            renderItem={({ item }) => <MovieCard item={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default HomeSlide;
