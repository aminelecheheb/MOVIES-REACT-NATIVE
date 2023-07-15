import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetch";

const detailsPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { data, error, isLoading } = useFetch(`titles/${params.id}`, {
    info: "base_info",
  });

  let item = data.results;
  // item && console.log(item);

  const isSerie = item?.titleType?.isSeries;

  // const getSeasons = () => {
  //   const { data } = useFetch(`titles/seasons/${params.id}`);
  //   window.seasons = data.results;
  // };
  // getSeasons();

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      {isLoading ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        item && (
          <ScrollView style={{ backgroundColor: COLORS.lightWhite }}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: !item.primaryImage
                    ? `https://placehold.co/400x600/000000/FFFFFF/png?${item.titleText.text}`
                    : item.primaryImage.url,
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text>Title : {item.titleText.text}</Text>
              <Text>
                Date of release :{" "}
                {item.releaseDate?.day && `${item.releaseDate.day}-`}
                {item.releaseDate?.month && `${item.releaseDate.month}-`}
                {item.releaseDate?.year ?? `${item.releaseYear.year}` ?? "N/A"}
              </Text>
              <Text>
                Rating : {item.ratingsSummary?.aggregateRating ?? " N/A"}
                {` (${item.ratingsSummary?.voteCount ?? "0"} vote)`}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                <Text>genres : </Text>
                {item.genres?.genres?.map((genre) => {
                  return <Text key={genre.id}>{genre.text}</Text>;
                })}
              </View>
              <Text>language : {item.plot?.language?.id ?? " "}</Text>
              {isSerie ? (
                <Text>
                  Seasons : {item.episodes?.seasons?.length ?? "No data"}
                </Text>
              ) : (
                <Text>
                  Time :{" "}
                  {item.runtime?.displayableProperty?.value?.plainText ?? "N/A"}
                </Text>
              )}
              {isSerie && (
                <Text>
                  Total episodes : {item.episodes?.episodes?.total ?? "N/A"}
                </Text>
              )}
              <Text>Abstract : {item.plot?.plotText?.plainText ?? " "}</Text>
            </View>
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    padding: SIZES.medium,
  },
  textContainer: {
    width: "100%",
    padding: SIZES.medium,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
});

export default detailsPage;
