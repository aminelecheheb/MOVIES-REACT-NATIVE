import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES, FONT, icons } from "../constants";
import useFetch from "../hooks/useFetch";
import { useRouter } from "expo-router";
import { useState } from "react";

const GenreTab = ({ item }) => {
  const router = useRouter();

  const showGenre = () => {
    router.push(`genre/${item}`);
  };

  return (
    <TouchableOpacity style={styles.genreTab} onPress={showGenre}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
};

const SearchInput = () => {
  const router = useRouter();
  const handleSearch = () => {
    router.push(`search/${searchKey}`);
  };
  const { data, isLoading, error } = useFetch("titles/utils/genres");
  const [searchKey, setSearchKey] = useState("");

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            handleSearch(searchKey);
          }}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data.results && (
            <View style={styles.tabContainer}>
              <FlatList
                data={data.results.slice(1)}
                renderItem={({ item }) => <GenreTab item={item} />}
                keyExtractor={(item) => item.index}
                contentContainerStyle={{ columnGap: SIZES.medium }}
                horizontal
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginTop: SIZES.large,
    paddingHorizontal: SIZES.medium,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    // marginBottom: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },

  tabContainer: {
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.medium,
  },

  genreTab: {
    backgroundColor: COLORS.gray2,
    paddingHorizontal: SIZES.small,
    paddingVertical: 5,
    borderRadius: 50,
  },
});

export default SearchInput;
