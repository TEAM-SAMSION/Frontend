import React, { useRef, useState } from "react";
import { styled } from "styled-components/native";
import { FlatList } from "react-native";
import SlideItem from "../../components/OnBoarding/SlideItem";

export default function OnBoarding({ navigation }) {
  const PAGES = [
    {
      num: 1,
      title: "처음 인사드려요!",
      content:
        "혼자가 아닌 함께, 나의 펫을 위한 모든 것을\n관리할 수 있도록 포잇이 함께할게요",
      color: "#86E3CE",
    },
    {
      num: 2,
      title: "PLANING",
      content:
        "내 반려동물에게 밥을 줬는지 산책해 준 사람이\n있는지 공유 Todo를 통해 함께 관리해요!",
      color: "#D0E6A5",
    },
    {
      num: 3,
      title: "TOGETHER",
      content:
        "포잇의 Pamily는 펫을 함께 키우는\n모임이나 단체를 의미해요!\n가족, 친구, 동아리 등 사람들과 함께 반려동물을\n관리하고 있다면, 포잇과 함께해요!",
      color: "#FFDD94",
    },
    {
      num: 4,
      title: "MANAGING",
      content:
        "포잇은 관리자와 사용자로 권한이 나뉘어지고,\n관리자는 TODO 수정 및 승인과 사용자 관리\n권한이 주어져요!",
      color: "#FA897B",
    },
    {
      num: 5,
      title: "PAWITH",
      content:
        "포잇과 함께, 반려동물에게 사랑과\n온정이 넘치는 하루를 선물하세요!",
      color: "#CCABD8",
    },
  ];

  return (
    <Container>
      <FlatList
        style={{ marginTop: 74 }}
        horizontal
        data={PAGES}
        renderItem={({ item }) => <SlideItem item={item} />}
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      />
      {/* pagenation 부분 */}
      <Button
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <ButtonText>다음</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  padding: 0px 16px;
`;
const Button = styled.TouchableOpacity`
  margin-top: 84px;
  height: 44px;
  border-radius: 8px;
  background-color: black;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;
