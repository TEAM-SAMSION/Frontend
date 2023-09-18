import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { styled } from "styled-components/native";
import { Swipeable } from "react-native-gesture-handler";
import { colors } from "../../colors";
import CrownIcon from "../../assets/Svgs/Crown.svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

const GroupBox = (props) => {
  const RightSwipe = (progress) => {
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <DeleteBox>
          <DeleteText>나가기</DeleteText>
        </DeleteBox>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={RightSwipe}>
      <GroupBoxContainer
        style={{
          shadowColor: "rgb(0,0,0)",
          shadowRadius: 3,
          shadowOpacity: 0.17,
          shadowOffset: [0, 0],
        }}
      >
        <GroupImage source={{ uri: `${props.data.teamProfileImageUrl}` }} />
        <GroupInfoBox>
          <GroupName>{props.data.teamName}</GroupName>
          <GroupDate>가입한지 {props.data.registerPeriod}일째</GroupDate>
        </GroupInfoBox>
        {props.data.authority == "PRESIDENT" ? (
          <CrownIcon width={34} height={34} />
        ) : (
          <View width={34} height={34} />
        )}
      </GroupBoxContainer>
    </Swipeable>
  );
};

export default GroupBox;

const GroupBoxContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: #fff;
  width: calc(SCREEN_WIDTH - 24);
`;
const GroupImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`;
const GroupInfoBox = styled.View`
  margin-left: 16px;
  justify-content: center;
  width: 212px;
`;
const GroupName = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`;
const GroupDate = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`;
const DeleteBox = styled.View`
  width: 89px;
  height: 71px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 16px;
`;
const DeleteText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.grey_100};
`;
