import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons, COLORS, FONT } from "../constants";

const Pagination = ({ page, setPage, num }) => {
  const prev = () => {
    page > 1 && setPage(page - 1);
  };
  const next = () => {
    num < 10 ? setPage(1) : setPage(page + 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.iconContainer} onPress={prev}>
          <Image
            source={icons.chevronLeft}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: FONT.bold, fontSize: 20 }}>
          {page ?? " "}
        </Text>
        <TouchableOpacity style={styles.iconContainer} onPress={next}>
          <Image
            source={icons.chevronRight}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  iconContainer: {
    width: 50,
  },
  icon: {
    width: "100%",
  },
});

export default Pagination;
