import React from 'react'
import { Text } from 'react-native'
import { ScreenLayout } from '../../components/Shared'
import styled from 'styled-components/native'

export const UserSetting = () => {
  return (
    <ScreenLayout>
      <ContentContainer>
        <Text>UserSetting</Text>
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
