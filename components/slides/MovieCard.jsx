import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
const MovieCard = ({ item }) => {
  let year, month, day;
  item.releaseDate
    ? ({ day, month, year } = item.releaseDate)
    : item.releaseYear
    ? ({ year } = item.releaseYear)
    : "N/A";
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: !item.primaryImage
            ? `https://placehold.co/400x600/000000/FFFFFF/png?${item.titleText.text}`
            : item.primaryImage.url,
        }}
        resizeMode="contain"
        style={styles.movieImage}
      />
      <Text>{item.titleText.text ?? "Title"}</Text>
      <Text style={{ fontWeight: "bold" }}>
        {`${day ?? ""}-${month ?? ""}-${year ?? "N/A"}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  movieImage: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
});

export default MovieCard;
