import React, { Component } from 'react'
import { Detail_Text, Label_Text } from '../Fonts'
import { colors } from '../../colors'
import styled from 'styled-components/native'

export const TodoItem = ({ title, status, mate = ['김형석1', '김형석2', '김형석3'] }) => {
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
      {/* {status=="INCOMPLETE"? <></>} */}
    </TodoContainer>
  )
}
const TodoContainer = styled.View`
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
`
