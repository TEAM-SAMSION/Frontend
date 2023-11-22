import { useEffect, useState } from 'react'
import { BodySm_Text } from '../Fonts'
import { ImagePickerComponent } from './ImagePickerComponent'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { profileSample, profileSample2 } from '../../datas/Home/data'
import RNFS from 'react-native-fs'

export const ProfileImageModal = (props) => {
  const [bottomProfileUrl, setBottomProfileUrl] = useState(props.profileUrl)
  const [imageFile, setImageFile] = useState('file://' + RNFS.MainBundlePath + '/default_pamily.png')

  const changeSampleImage = async (file) => {
    setBottomProfileUrl(`https://pawith.s3.ap-northeast-2.amazonaws.com/base-image${file}`)
    setImageFile('file://' + RNFS.MainBundlePath + file)
  }

  return (
    <>
      <BottomTitle>
        <BottomTitleText>Pamily 프로필 등록</BottomTitleText>
      </BottomTitle>
      <ImageContainer>
        <ProfileImageBox
          source={{
            uri: `${bottomProfileUrl}`,
          }}
        />
        <ImageSampleContainer>
          <ImagePickerComponent setBottomProfileUrl={setBottomProfileUrl} setImageFile={setImageFile} />
          {profileSample.map((item) => (
            <SampleImageContainer onPress={() => changeSampleImage(item.file)}>
              <SampleImage key={item.id} source={item.image} />
            </SampleImageContainer>
          ))}
        </ImageSampleContainer>
        <ImageSampleContainer>
          {profileSample2.map((item) => (
            <SampleImageContainer onPress={() => changeSampleImage(item.file)}>
              <SampleImage key={item.id} source={item.image} />
            </SampleImageContainer>
          ))}
        </ImageSampleContainer>
      </ImageContainer>
      <ButtonContainer>
        <CancelButton onPress={() => props.bottomRef.current?.dismiss()}>
          <BodySm_Text color={colors.red_350}>취소</BodySm_Text>
        </CancelButton>
        <OkButton
          onPress={() => {
            props.bottomRef.current?.dismiss()
            props.setProfileUrl(bottomProfileUrl)
            props.setImageFile(imageFile)
          }}
        >
          <BodySm_Text color={colors.red_350}>완료</BodySm_Text>
        </OkButton>
      </ButtonContainer>
    </>
  )
}

const BottomTitle = styled.View`
  align-items: center;
  padding-top: 6px;
  padding-bottom: 24px;
`
const BottomTitleText = styled.Text`
  font-family: 'Spoqa-Medium';
  font-size: 16px;
  line-height: 22px;
  color: ${colors.grey_800};
`
const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  //margin-top: 16px;
`
const ProfileImageBox = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-bottom: 19px;
`
const ImageSampleContainer = styled.View`
  margin: 5px 24px;
  flex-direction: row;
  gap: 8px;
`
const SampleImage = styled.Image`
  width: 59px;
  height: 59px;
  border-radius: 16px;
  border: 1px solid ${colors.grey_200};
`
const SampleImageContainer = styled.TouchableOpacity`
  width: 59px;
  height: 59px;
`
const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 19px 16px 0px 16px;
  gap: 8px;
`
const CancelButton = styled.TouchableOpacity`
  border: 2px solid ${colors.grey_150};
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
