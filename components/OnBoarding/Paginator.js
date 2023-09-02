import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { styled } from "styled-components/native";

const Paginator = ({ data, scrollX }) => {
  const width = Dimensions.get("screen");
  return (
    <Container>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth }]}
            key={i.toString()}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
  },
});

export default Paginator;
