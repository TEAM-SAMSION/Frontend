import React, { useRef, useState } from "react";
import { styled } from "styled-components/native";
import { FlatList, Text, View } from "react-native";
import SlideItem from "../../components/OnBoarding/SlideItem";
import { ScreenLayout } from "../../components/Shared";

export default function OnBoarding({ navigation }) {
  const PAGES = [
    {
      id: 1,
      title: "처음 인사드려요!",
      content:
        "혼자가 아닌 함께, 나의 펫을 위한 모든 것을\n관리할 수 있도록 포잇이 함께할게요",
      image: require("../../assets/Imgs/onboarding01.png"),
    },
    {
      id: 2,
      title: "PLANING",
      content:
        "내 반려동물에게 밥을 줬는지 산책해 준 사람이\n있는지 공유 Todo를 통해 함께 관리해요!",
      image: require("../../assets/Imgs/onboarding02.png"),
    },
    {
      id: 3,
      title: "TOGETHER",
      content:
        "포잇의 Pamily는 펫을 함께 키우는\n모임이나 단체를 의미해요!\n가족, 친구, 동아리 등 사람들과 함께 반려동물을\n관리하고 있다면, 포잇과 함께해요!",
      image: require("../../assets/Imgs/onboarding03.png"),
    },
    {
      id: 4,
      title: "MANAGING",
      content:
        "포잇은 관리자와 사용자로 권한이 나뉘어지고,\n관리자는 TODO 수정 및 승인과 사용자 관리\n권한이 주어져요!",
      image: require("../../assets/Imgs/onboarding04.png"),
    },
    {
      id: 5,
      title: "PAWITH",
      content:
        "포잇과 함께, 반려동물에게 사랑과\n온정이 넘치는 하루를 선물하세요!",
      image: require("../../assets/Imgs/onboarding05.png"),
    },
  ];

  return (
    <ScreenLayout>
      <Container>
        <FlatList
          style={{ marginTop: 16 }}
          horizontal
          data={PAGES}
          renderItem={({ item }) => <SlideItem item={item} />}
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={{
            backgroundColor: "pink",
            marginTop: 18,
            height: 24,
          }}
        >
          <Text>pagination 부분...</Text>
        </View>
        <Button
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <ButtonText>다음</ButtonText>
        </Button>
      </Container>
    </ScreenLayout>
  );
}

const Container = styled.View``;
const Button = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: 20px;
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
