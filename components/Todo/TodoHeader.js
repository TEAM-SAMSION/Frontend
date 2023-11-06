import styled from 'styled-components/native'
import Alarm from '../../assets/Svgs/Alarm.svg'
import Report from '../../assets/Svgs/report.svg'
import Schedule from '../../assets/Svgs/Calendar.svg'
import { colors } from '../../colors'
import { useState } from 'react'

import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import { Detail_Text } from '../Fonts'
export const TodoHeader = ({ navigation, changeTodoTeam, todoTeamList, setSelectedTeam, selectedTeam }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <CustomHeader>
      <DropDownListContainer>
        <DropdownContainer isOpen={isOpen} onPress={toggleDropdown}>
          <Detail_Text>{selectedTeam?.name || '패밀리 선택 '}</Detail_Text>
          {isOpen ? (
            <UpIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
          ) : (
            <DownIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
          )}
        </DropdownContainer>

        {isOpen && (
          <>
            {todoTeamList.reverse().map((todoTeam, id) => (
              <DropdownBox
                key={id}
                style={id == todoTeamList.length - 1 && { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
                onPress={() => {
                  setIsOpen(false)
                  changeTodoTeam(todoTeam.id)
                  setSelectedTeam({ id: todoTeam.id, name: todoTeam.name })
                }}
              >
                <Detail_Text>{todoTeam.name}</Detail_Text>
              </DropdownBox>
            ))}
          </>
        )}
      </DropDownListContainer>
      <RightIcon>
        <IconContainer>
          <Schedule width={24} height={24} />
        </IconContainer>
        <IconContainer>
          <Report color={colors.grey_350} width={24} height={24} />
        </IconContainer>
        <IconContainer
          onPress={() => {
            navigation.navigate('Setting')
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
const Setting = styled.View`
  width: 24px;
  height: 24px;
  background-color: pink;
`
