import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { ScreenWidth } from "../Shared";

export default Paginator = ({ data, scrollX }) => {
  return (
    <Container>
      {data.map((_, i) => {
        //인접한 3개의 점과 대응하기 위한 범위
        const inputRange = [
          (i - 1) * ScreenWidth,
          i * ScreenWidth,
          (i + 1) * ScreenWidth,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10], //점의 실질적인 너비값
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[
              { width: dotWidth, opacity },
              {
                flexDirection: "row",
                height: 10,
                borderRadius: 5,
                backgroundColor: "#F84D35",
                marginHorizontal: 8,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  height: 64px;
  justify-content: center;
`;
