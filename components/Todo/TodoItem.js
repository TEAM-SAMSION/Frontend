import React, { useState } from 'react'
import { Detail_Text, Label_Text } from '../Fonts'
import { colors } from '../../colors'
import Complete from '../../assets/Imgs/Complete.png'
import InComplete from '../../assets/Imgs/InComplete.png'
import styled from 'styled-components/native'

export const TodoItem = ({ title, status, mate = ['김형석1', '김형석2', '김형석3'] }) => {
  const [isDone, setIsDone] = useState(status == 'COMPLETE')
  const handlePress = () => {
    //backend쪽으로 isPressed 변경된 값 보내는 구문
    setIsDone(!isDone)
  }
  return (
    <TodoContainer>
      <LeftContainer>
        <Label_Text style={{ padding: 4 }} color={colors.grey_800}>
          {title}
        </Label_Text>
        <MateContainer>
          {mate.map((name) => {
            return (
              <MateItem>
                <Detail_Text color={colors.grey_600}>{name}</Detail_Text>
              </MateItem>
            )
          })}
        </MateContainer>
      </LeftContainer>
      <CheckBox onPress={() => handlePress()}>
        {/* {status == 'COMPLETE' ? <CheckIcon source={Complete} /> : <CheckIcon source={InComplete} />} */}
        {isDone ? <CheckIcon source={Complete} /> : <CheckIcon source={InComplete} />}
      </CheckBox>
    </TodoContainer>
  )
}
const TodoContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
  margin-bottom: 8px;
  justify-content: space-between;
  align-items: center;
`
const CheckIcon = styled.Image`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`
const CheckBox = styled.TouchableOpacity``
const CheckBoxNon = styled.Image`
  display: flex;
  flex-direction: row;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
  margin-bottom: 8px;
`
const MateContainer = styled.View`
  display: flex;
  margin-top: 8px;
  flex-direction: row;
`
const MateItem = styled.View`
  margin-right: 4px;
  padding: 8px 10px;
  border-radius: 99px;
  background-color: ${colors.grey_100};
`
const LeftContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 20%;
`
