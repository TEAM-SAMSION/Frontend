import styled from 'styled-components/native'
import Alarm from '../../assets/Svgs/Alarm.svg'
import Setting from '../../assets/Svgs/SettingIcon.svg'
import { colors } from '../../colors'
import { useState } from 'react'

import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import { Detail_Text } from '../Fonts'
import { useRecoilState } from 'recoil'
import { SelectedTeamAtom } from '../../recoil/TabAtom'
export const TodoHeader = ({ navigation, todoTeamList, setIsCreateVisible }) => {
  const [selectedTeam, setSelectedTeam] = useRecoilState(SelectedTeamAtom)

  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  console.log(todoTeamList, selectedTeam)
  return (
    <CustomHeader>
      <DropDownListContainer>
        <DropdownContainer isOpen={isOpen} onPress={toggleDropdown}>
          <Detail_Text color={todoTeamList ? colors.grey_600 : colors.grey_400}>
            {/* TodoTeamList가 Null이면, 자연스레 TodoTeamList의 끝요소인 SelectedTeam도 없으며, Home화면에서 선택되는 TodoTeam또한 없기에, Null을 반환받는다 */}
            {selectedTeam?.name || '패밀리 없음'}
          </Detail_Text>
          {isOpen ? (
            <UpIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
          ) : (
            <DownIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
          )}
        </DropdownContainer>

        {isOpen && (
          <>
            {todoTeamList?.map((todoTeam, id) => (
              <DropdownBox
                key={id}
                onPress={() => {
                  setIsOpen(false)
                  // changeTodoTeam(todoTeam.id)
                  console.log()
                  setSelectedTeam({ name: todoTeam.name, id: todoTeam.id, auth: todoTeam.auth })
                }}
              >
                <Detail_Text>{todoTeam.name}</Detail_Text>
              </DropdownBox>
            ))}
            <DropdownBox
              style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
              onPress={() => setIsCreateVisible(true)}
            >
              <Detail_Text color={colors.grey_600}>+</Detail_Text>
            </DropdownBox>
          </>
        )}
      </DropDownListContainer>
      <RightIcon>
        {selectedTeam && selectedTeam?.auth != 'MEMBER' && (
          <IconContainer onPress={() => navigation.navigate('ManageTodo', { teamId: selectedTeam.id })}>
            <Setting width={24} height={24} />
          </IconContainer>
        )}
        <IconContainer
          onPress={() => {
            navigation.navigate('AlarmNav')
          }}
        >
          <Alarm color={colors.grey_350} width={24} height={24} />
        </IconContainer>
      </RightIcon>
    </CustomHeader>
  )
}
const DropdownContainer = styled.Pressable`
  width: 109px;
  height: ${({ isOpen }) => (isOpen ? '33px' : '32px')};
  z-index: 1;
  border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0px 0px' : '8px')};
  border-bottom-width: ${({ isOpen }) => (isOpen ? '1px' : '0px')};
  border-bottom-color: rgba(0, 0, 0, 0.12);
  align-items: center;
  padding-left: 16px;
  flex-direction: row;
  background-color: ${colors.grey_150};
`
const DropDownListContainer = styled.View`
  position: absolute;
  left: 0;
  top: 6px;
`
const DropdownBox = styled.Pressable`
  width: 109px;
  height: 32px;
  padding: 8px 10px 8px 16px;
  align-items: center;
  flex-direction: row;

  background-color: ${colors.grey_150};
`
const CustomHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 52px;
  padding: 8px 6px 8px 0px;
`
const DropDownText = styled.Text`
  color: #4d4d4d;
  font-family: 'Spoqa-Medium';
  font-size: 12px;
  padding-left: 6px;
  line-height: 15px;
`
const IconContainer = styled.TouchableOpacity``
const RightIcon = styled.View`
  flex-direction: row;
  gap: 16px;
`
