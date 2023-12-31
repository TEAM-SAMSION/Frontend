import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { Swipeable } from 'react-native-gesture-handler'
import { colors } from '../../colors'
import CrownIcon from '../../assets/Svgs/Crown.svg'
import PinkCrownIcon from '../../assets/Svgs/Crown_pink.svg'
import { BodyBoldSm_Text, BodySm_Text } from '../Fonts'
import { Platform } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

const GroupBox = (props) => {
  const deleteSwipeRef = useRef(null)

  const RightSwipe = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.handleDelete()
        }}
        activeOpacity={0.6}
      >
        <DeleteBox>
          <BodySm_Text color={colors.grey_100}>나가기</BodySm_Text>
        </DeleteBox>
      </TouchableOpacity>
    )
  }
  return (
    <Swipeable
      ref={deleteSwipeRef}
      friction={2}
      onSwipeableOpen={() => props.onSwipeableOpenHandler(deleteSwipeRef.current)}
      renderRightActions={RightSwipe}
    >
      <GroupBoxContainer
        Platform={Platform.OS}
        style={
          Platform.OS == 'android'
            ? { elevation: 0.5 }
            : { shadowColor: 'rgb(0,0,0)', shadowRadius: 2, shadowOpacity: 0.17, shadowOffset: [0, 0], border: 'none' }
        }
      >
        <LeftContent>
          <GroupImage source={{ uri: `${props.data.teamProfileImageUrl}` }} />
          <GroupInfoBox>
            <BodyBoldSm_Text color={colors.grey_800}>{props.data.teamName}</BodyBoldSm_Text>
            <BodySm_Text color={colors.grey_450}>
              가입한지 <BodyBoldSm_Text color={colors.primary_outline}>{props.data.registerPeriod + 1}</BodyBoldSm_Text>
              일째
            </BodySm_Text>
          </GroupInfoBox>
        </LeftContent>
        {props.data.authority == 'MEMBER' ? (
          <View width={34} height={34} />
        ) : props.data.authority == 'PRESIDENT' ? (
          <CrownButton
            onPress={() => {
              props.gotoAdminNav()
            }}
          >
            <CrownIcon width={34} height={34} />
          </CrownButton>
        ) : (
          <CrownButton
            onPress={() => {
              props.gotoAdminNav()
            }}
          >
            <PinkCrownIcon width={34} height={34} />
          </CrownButton>
        )}
      </GroupBoxContainer>
    </Swipeable>
  )
}

export default GroupBox

const CrownButton = styled.TouchableOpacity``
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
  width: auto;
  border: 0.7px solid rgba(0, 0, 0, 0.01);
`
const LeftContent = styled.View`
  flex-direction: row;
  gap: 16px;
`
const GroupImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`
const GroupInfoBox = styled.View`
  justify-content: center;
`
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
`
