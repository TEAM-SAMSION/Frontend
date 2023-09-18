import React, { useEffect, useState } from "react";
import { ScreenLayout } from "../../components/Shared";
import { styled } from "styled-components/native";
import { TopHeader } from "../../components/MyPage/TopHeader";
import { FlatList } from "react-native-gesture-handler";
import GroupBox from "../../components/MyPage/GroupBox";
import { Alert, View } from "react-native";
import EditIcon from "../../assets/Svgs/Edit.svg";
import axios from "axios";

export default function MyPage({ navigation }) {
  const name = useState("Name");
  const email = useState("email@pawith.com");

  const [groupInfo, setGroupInfo] = useState([
    {
      teamId: 74,
      teamProfileImageUrl: "../../assets/Svgs/ProfileDefault.svg",
      teamName: "nhetz",
      authority: "EXECUTIVE",
      registerPeriod: 445679,
    },
  ]);
  const fetchTeamList = async () => {
    try {
      const page = 0;
      const size = 4;
      const url = "https://dev.pawith.com/todo/team/list";
      const accessToken =
        "eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJ0ZXN0IiwiaXNzIjoicGF3aXRoIiwiaWF0IjoxNjk1MDMwMzc2LCJleHAiOjE2OTUxMTY3NzZ9.-BsVKZF0aOGD9rSL6Bm1ihGYAJcJ1dMnFEFCbfX9Wj1JuuP57q9QNtcoUHqrjLC3";
      const response = await axios.get(url, {
        params: { page, size },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data.content);
      setGroupInfo(response.data.content);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTeamList();
  }, []);

  const deleteTeam = async (teamId) => {
    const url = `https://dev.pawith.com/register/${teamId}`;
    const accessToken =
      "eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJ0ZXN0IiwiaXNzIjoicGF3aXRoIiwiaWF0IjoxNjk1MDMwMzc2LCJleHAiOjE2OTUxMTY3NzZ9.-BsVKZF0aOGD9rSL6Bm1ihGYAJcJ1dMnFEFCbfX9Wj1JuuP57q9QNtcoUHqrjLC3";
    try {
      const response = await axios.delete(url, {
        params: { todoTeamId: teamId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`${teamId} 삭제`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteItem = (deleteId) => {
    Alert.alert("탈퇴하시겠습니까?", "", [
      {
        text: "아니요",
        style: "cancel",
      },
      {
        text: "네",
        onPress: () => {
          console.log(deleteId);
          deleteTeam(deleteId);
          //reload 추가
        },
      },
    ]);
  };

  return (
    <ScreenLayout>
      <TopHeader navigation={navigation} />
      <UserContainer>
        <ProfileImage />
        <UserDetailContainer>
          <UserNameBox>
            <Username>{name}</Username>
            <EditIcon width={24} height={24} />
          </UserNameBox>
          <EmailBox>
            <EmailText>{email}</EmailText>
          </EmailBox>
        </UserDetailContainer>
      </UserContainer>
      <GroupContainer>
        <Title>내가 속한 모임</Title>
        <Groups>
          <FlatList
            data={groupInfo}
            renderItem={({ item }) => {
              return (
                <GroupBox
                  data={item}
                  handleDelete={() => deleteItem(item.teamId)}
                />
              );
            }}
          />
        </Groups>
      </GroupContainer>
      <FooterContainer>
        <FooterText>
          포잇에 대해 더 알아볼까요?{"\n"}좀 더 똑똑하게 포잇을 사용하고 싶다면?
        </FooterText>
        <Guide>포잇가이드</Guide>
      </FooterContainer>
    </ScreenLayout>
  );
}

const UserContainer = styled.View`
  padding: 12px 20px;
  flex-direction: row;
  gap: 16px;
`;
const ProfileImage = styled.Image`
  width: 78px;
  height: 78px;
  background-color: pink;
  border-radius: 24px;
`;
const UserDetailContainer = styled.View`
  justify-content: center;
`;
const UserNameBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
const Username = styled.Text`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;
const EmailBox = styled.View``;
const EmailText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
`;
const GroupContainer = styled.View`
  padding: 12px 0px;
  gap: 12px;
`;
const Title = styled.Text`
  padding: 0px 20px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;
const Groups = styled.View`
  gap: 12px;
  margin-bottom: 8px;
`;
const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #f2f2f2;
  padding-top: 24px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 500px;
`;
const FooterText = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
`;
const Guide = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  text-decoration-line: underline;
`;
