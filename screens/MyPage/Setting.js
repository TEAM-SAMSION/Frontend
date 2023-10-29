import React from 'react'
import { Text, View } from 'react-native'
import { ScreenLayout } from '../../components/Shared'
import { styled } from 'styled-components/native'
import ContentIcon from '../../assets/Svgs/chevron_right.svg'
import { colors } from '../../colors'

export default function Setting({ navigation }) {
  return (
    <ScreenLayout>
      <ContentContainer onPress={() => navigation.navigate('Account')}>
        <ContentText>계정</ContentText>
        <TouchableIcon>
          <ContentIcon width={16} height={16} color={colors.grey_450} />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>포잇가이드</ContentText>
        <TouchableIcon>
          <ContentIcon width={16} height={16} color={colors.grey_450} />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>개인정보처리방침</ContentText>
        <TouchableIcon>
          <ContentIcon width={16} height={16} color={colors.grey_450} />
        </TouchableIcon>
      </ContentContainer>
      <ContentContainer>
        <ContentText>앱 정보</ContentText>
      </ContentContainer>
      <ContentContainer>
        <ContentText>공지사항</ContentText>
      </ContentContainer>
    </ScreenLayout>
  )
}

const ContentContainer = styled.TouchableOpacity`
  padding: 16px;
  padding-left: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ContentText = styled.Text`
  font-family: 'Spoqa-Bold';
  font-size: 16px;
  line-height: 22px;
`
const TouchableIcon = styled.TouchableOpacity``
