import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
const MovieCard = ({ item }) => {
  console.log(item);
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: !item.primaryImage
            ? "https://m.media-amazon.com/images/M/MV5BNDBkOWNiMTYtMjlkZS00NzJlLTg0ZmUtN2YwYWQ3N2I3N2Y0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg"
            : item.primaryImage.url,
        }}
        resizeMode="contain"
        style={styles.movieImage}
      />
      <Text>{item.titleText.text}</Text>
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
