import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScreenLayout } from "../../components/Shared";
import { styled } from "styled-components/native";
import { TopHeader } from "../../components/MyPage/TopHeader";
import { FlatList, Text } from "react-native";
import GroupBox from "../../components/MyPage/GroupBox";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import EditIcon from "../../assets/Svgs/Edit.svg";
import axios from "axios";
import { ProfileImageModal } from "../../components/MyPage/ProfileImageModal";
import { resolveDiscoveryAsync } from "expo-auth-session";
import "react-native-gesture-handler";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function MyPage({ navigation }) {
  const [name, setName] = useState("포잇");
  const [email, setEmail] = useState("pawith@gmail.com");
  const [profileUrl, setProfileUrl] = useState("");

  const swipeableRefs = useRef([]);
  const ACCESSTOKEN =
    "eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJ0ZXN0IiwiaXNzIjoicGF3aXRoIiwiaWF0IjoxNjk1ODAyNDUzLCJleHAiOjE2OTU4ODg4NTN9.lACxP5vqKIqUR6uHiIe06IgMOE4WwB8X_MXxSQKabH9O8VaM5sk4UvcTbI_ShRIH";

  const getUserInfo = async () => {
    try {
      const url = "https://dev.pawith.com/user";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${ACCESSTOKEN}` },
      });
      console.log(response.data);
      setEmail(response.data.email);
      setName(response.data.nickname);
      setProfileUrl(response.data.profileImageUrl);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const [groupInfo, setGroupInfo] = useState([
    {
      teamId: 74,
      teamProfileImageUrl: "../../assets/Svgs/ProfileDefault.svg",
      teamName: "dummy1",
      authority: "PRESIDENT",
      registerPeriod: 500,
    },
    {
      teamId: 75,
      teamProfileImageUrl: "../../assets/Svgs/ProfileDefault.svg",
      teamName: "dummy2",
      authority: "EXECUTIVE",
      registerPeriod: 700,
    },
  ]);

  const fetchTeamList = async () => {
    try {
      const page = 0;
      const size = 10000;
      const url = "https://dev.pawith.com/todo/team/list";
      const response = await axios.get(url, {
        params: { page, size },
        headers: { Authorization: `Bearer ${ACCESSTOKEN}` },
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
    try {
      const response = await axios.delete(url, {
        params: { todoTeamId: teamId },
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
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
        onPress: async () => {
          console.log(deleteId);
          await deleteTeam(deleteId);
          swipeableRefs.current[deleteId]?.close();
          fetchTeamList();
        },
      },
    ]);
  };

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["30%"];
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <ScreenLayout>
        <TopHeader navigation={navigation} />
        <ScrollView>
          <UserContainer>
            <TouchableOpacity onPress={handlePresentModal}>
              <ProfileImage
                source={{
                  uri: `${profileUrl}`,
                }}
              />
              {/* <ProfileImage onPress={handlePresentModalPress} /> */}
            </TouchableOpacity>
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
                      swipeableRef={(ref) =>
                        (swipeableRefs.current[item.teamId] = ref)
                      }
                    />
                  );
                }}
              />
            </Groups>
          </GroupContainer>
          <FooterContainer>
            <FooterText>
              포잇에 대해 더 알아볼까요?{"\n"}좀 더 똑똑하게 포잇을 사용하고
              싶다면?
            </FooterText>
            <Guide>포잇가이드</Guide>
          </FooterContainer>
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            borderRadius: 22,
          }}
        >
          <ProfileImageModal profileUrl={profileUrl} />
        </BottomSheetModal>
      </ScreenLayout>
    </BottomSheetModalProvider>
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
