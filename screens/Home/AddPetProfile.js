import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { BodySm_Text } from '../../components/Fonts'

export default function AddPetProfile({ navigation }) {
  const [petName, setPetName] = useState('')
  const [petAge, setPetAge] = useState()
  const [petCategory, setPetCategroy] = useState('')
  const [petDetail, setPetDetail] = useState('')
  const [petIntro, setPetIntro] = useState('')

  return (
    <>
      <ProfileContainer>
        <TouchableOpacity>
          <ProfileImage />
        </TouchableOpacity>
      </ProfileContainer>
      <InfoContainer>
        <InputBlock
          editable
          onChangeText={(text) => setPetName(text)}
          placeholder="이름"
          placeholderTextColor={colors.grey_400}
          returnKeyType="done"
        />
        <InputBlock
          editable
          onChangeText={(text) => setPetAge(text)}
          placeholder="나이"
          placeholderTextColor={colors.grey_400}
          returnKeyType="done"
        />
        <CategoryBlock>
          <InputBlock
            editable
            onChangeText={(text) => setPetCategroy(text)}
            placeholder="펫종류"
            placeholderTextColor={colors.grey_400}
            style={{
              flexGrow: 1,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            returnKeyType="done"
          />
          <Bar />
          <InputBlock
            editable
            onChangeText={(text) => setPetDetail(text)}
            placeholder="펫종류"
            placeholderTextColor={colors.grey_400}
            style={{
              flexGrow: 1,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            }}
            returnKeyType="done"
          />
        </CategoryBlock>
        <InputBlock
          editable
          onChangeText={(text) => setPetIntro(text)}
          placeholder="한 줄 소개"
          placeholderTextColor={colors.grey_400}
          returnKeyType="done"
        />
      </InfoContainer>
      <ButtonContainer>
        <CancelButton onPress={() => navigation.goBack()}>
          <BodySm_Text color={colors.red_350}>취소</BodySm_Text>
        </CancelButton>
        <OkButton>
          <BodySm_Text color={colors.red_350}>확인</BodySm_Text>
        </OkButton>
      </ButtonContainer>
    </>
  )
}

const ProfileContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 32px 0px;
`
const ProfileImage = styled.Image`
  background-color: pink;
  width: 110px;
  height: 110px;
  border-radius: 16px;
`
const InputBlock = styled.TextInput`
  font-family: 'Spoqa-Medium';
  background-color: ${colors.grey_100};
  color: ${colors.grey_600};
  padding: 0px 16px;
  height: 44px;
  border-radius: 8px;
  font-size: 14px;
`
const InfoContainer = styled.View`
  gap: 12px;
  margin: 0px 16px;
`
const CategoryBlock = styled.View`
  flex-direction: row;
`
const Bar = styled.View`
  width: 1px;
  height: 44px;
  background-color: 'rgba(0, 0, 0, 0.12)';
`
const ButtonContainer = styled.View`
  position: absolute;
  bottom: 10;
  flex-direction: row;
  margin: 0px 16px;
  gap: 8px;
`
const CancelButton = styled.TouchableOpacity`
  border: 2px solid;
  border-color: ${colors.grey_150};
  background-color: ${colors.grey_100};
  display: flex;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
`
const OkButton = styled.TouchableOpacity`
  background-color: ${colors.red_200};
  display: flex;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-radius: 8px;
`
