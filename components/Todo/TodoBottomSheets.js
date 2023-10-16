import styled from 'styled-components/native'
import { Input, InputTitle, ScreenKeyboardLayout, url } from '../Shared'

import { colors } from '../../colors'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loggedInState, userInfoState } from '../../recoil/AuthAtom'
import { BodyBoldSm_Text, BodyBold_Text, Body_Text, DetailSm_Text, Detail_Text } from '../Fonts'
import axios from 'axios'
import { Button_PinkBg } from '../Buttons'

import Change from '../../assets/Svgs/Todo_change.svg'
import Delete from '../../assets/Svgs/Todo_delete.svg'
import Alarm from '../../assets/Svgs/Alarm.svg'
import Edit from '../../assets/Svgs/Todo_edit.svg'

export const TodoCreateBottomSheet = ({ selectedTodo }) => {
  const [users, setUsers] = useState([
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
    { name: '하현정', selected: false },
  ])

  const selectAll = () => {
    const tempArr = JSON.parse(JSON.stringify(users))
    tempArr.map((e) => {
      e.selected = true
      return e
    })
    setUsers(tempArr)
  }

  const selectUser = (id) => {
    const tempArr = JSON.parse(JSON.stringify(users))
    tempArr[id].selected = !tempArr[id].selected
    setUsers(tempArr)
  }
  const handleSubmit = () => {
    console.log('submitted')
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        height: '142%', //*** */
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <BottomSheetHeader>
        {/* <Body_Text color={colors.grey_800}>{selectedTodo?.task}</Body_Text> */}
        <Body_Text color={colors.grey_800}>TODO</Body_Text>
      </BottomSheetHeader>
      <InputContainer>
        <BodyBoldSm_Text style={{ marginBottom: 10 }}>TODO 입력</BodyBoldSm_Text>
        <Input
          style={{ backgroundColor: colors.grey_150, color: colors.grey_700 }}
          // autoFocus
          autoCapitalize="none"
          placeholderTextColor={colors.grey_450}
          onSubmitEditing={() => Keyboard.dismiss()}
          placeholder="할 일을 입력해주세요"
          returnKeyType="done"
          inputMode="text"
          blurOnSubmit={false}
          onChangeText={(text) => setNickname(text)}
        />
      </InputContainer>
      <BodyBoldSm_Text style={{ marginBottom: 10 }}>담당자 지정</BodyBoldSm_Text>
      <UserContainer>
        <UserItem
          style={{
            backgroundColor:
              users.filter((item) => item.selected == false).length == 0 ? colors.red_200 : colors.grey_150,
          }}
          key={0}
          onPress={() => selectAll()}
        >
          <Detail_Text color={colors.grey_700}>모두</Detail_Text>
        </UserItem>
        {users?.map((user, id) => {
          return (
            <UserItem
              onPress={() => selectUser(id)}
              style={{ backgroundColor: user?.selected ? colors.red_200 : colors.grey_150 }}
              key={id + 1}
            >
              <Detail_Text color={user?.selected ? colors.grey_700 : colors.grey_600}>{user.name}</Detail_Text>
            </UserItem>
          )
        })}
      </UserContainer>
      <Button_PinkBg isLoading={false} isEnabled={true} text="완료" func={() => handleSubmit()} />
    </BottomSheetBase>
  )
}
export const TodoEditBottomSheet = ({ selectedTodo }) => {
  const [tempArr, setTempArr] = useState(selectedTodo)

  const editTodo = async (name) => {
    let API = `/user/name`
    const response = await axios.put(
      url + API,
      { nickname: nickname },
      {
        headers: {
          Authorization: accessToken,
          'Content-Type': `application/json; charset=UTF-8`,
        },
      },
    )
    return response.status
  }

  const handleSubmit = () => {
    console.log('submitted')
  }
  return (
    <BottomSheetBase
      style={{
        backgroundColor: colors.grey_100,
        paddingTop: Platform.OS === 'android' ? 8 : 0,
      }}
    >
      <BottomSheetHeader>
        <Body_Text color={colors.grey_800}>{selectedTodo?.task}</Body_Text>
      </BottomSheetHeader>
      <ContentContainer>
        <RowContainer>
          <SmallBox>
            <Edit width={24} height={24} />
            <Detail_Text>수정하기</Detail_Text>
          </SmallBox>
          <SmallBox>
            <Delete width={24} height={24} />
            <Detail_Text>삭제하기</Detail_Text>
          </SmallBox>
        </RowContainer>
        <BigBox>
          <Alarm width={24} height={24} />
          <Detail_Text>시간 알림</Detail_Text>
        </BigBox>
        <BigBox>
          <Change width={24} height={24} />
          <Detail_Text>날짜 변경</Detail_Text>
        </BigBox>
      </ContentContainer>
    </BottomSheetBase>
  )
}

const InputContainer = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: 24px;
`
const UserContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
`
const ContentContainer = styled.View`
  flex-direction: column;
  gap: 8px;
  flex: 1;
`
const SmallBox = styled.View`
  padding: 20px 16px;
  border-radius: 8px;
  flex: 1;
  align-items: center;
  background-color: ${colors.grey_150};
`
const BigBox = styled.View`
  height: 48px;
  width: 100%;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey_150};
`
const RowContainer = styled.View`
  flex-direction: row;
  gap: 9px;
`
const BottomSheetBase = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px;
  flex-direction: column;
  justify-content: space-between;
`
const BottomSheetHeader = styled.View`
  flex-direction: column;
  padding: 16px;
  align-items: center;
`
const UserItem = styled.TouchableOpacity`
  padding: 8px 12px;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey_150};
`
