import { useState } from 'react'
import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ModalPopUp } from '../Shared'
import Close from '../../assets/Svgs/Close.svg'
import { useNavigation } from '@react-navigation/native'
import { BodySm_Text, Detail_Text, SubHead_Text } from '../Fonts'

export const PamilyChoiceToggle = (props) => {
  const pamilyList = props.pamilyList
  const options = pamilyList.map((item) => item.teamName)
  // 패밀리 선택 toggle isOpen
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = (value) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  return (
    <>
      <DropdownContainer isOpen={isOpen} onPress={toggleDropdown}>
        <Detail_Text color={colors.grey_600}>{selectedValue || '패밀리 선택 '}</Detail_Text>
        {isOpen ? (
          <UpIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
        ) : (
          <DownIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
        )}
      </DropdownContainer>

      {isOpen && (
        <>
          {options.map((option) => (
            <DropdownBox key={option} onPress={() => handleOptionSelect(option)}>
              <Detail_Text color={colors.grey_600}>{option}</Detail_Text>
            </DropdownBox>
          ))}
          <DropdownBox
            style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
            onPress={() => setVisible(true)}
          >
            <Detail_Text color={colors.grey_600}>+</Detail_Text>
          </DropdownBox>
        </>
      )}
      <ModalPopUp visible={visible} petIcon={true} height={211}>
        <ModalHeader>
          <CloseButton
            onPress={() => {
              setVisible(false)
              setIsOpen(false)
            }}
          >
            <Close width={24} height={24} />
          </CloseButton>
        </ModalHeader>
        <PopContent>
          <SubHead_Text color={colors.grey_700}>Pamily와 함께하시겠습니까?</SubHead_Text>
          <Detail_Text color={colors.grey_500}>Pamily는 나의 반려동물을 함께 키우는 모임을 말합니다.</Detail_Text>
        </PopContent>
        <PopButtonContainer>
          <PopButton
            onPress={() => {
              navigation.navigate('CreateTeam')
              setVisible(false)
              setIsOpen(false)
            }}
          >
            <BodySm_Text color={colors.red_350}>Pamily 생성하기</BodySm_Text>
          </PopButton>
          <PopButton
            onPress={() => {
              navigation.navigate('JoinTeam')
              setVisible(false)
              setIsOpen(false)
            }}
          >
            <BodySm_Text color={colors.red_350}>Pamily 참여하기</BodySm_Text>
          </PopButton>
        </PopButtonContainer>
      </ModalPopUp>
    </>
  )
}

const DropdownContainer = styled.Pressable`
  width: 109px;
  height: 32px;
  padding: 8px 10px 8px 16px;
  margin: 12px 0px 0px 12px;
  z-index: 1;
  border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0px 0px' : '8px')};
  border-bottom-width: ${({ isOpen }) => (isOpen ? '1px' : '0px')};
  border-bottom-color: rgba(0, 0, 0, 0.12);
  align-items: center;
  flex-direction: row;
  background-color: ${colors.grey_100};
`
const DropdownBox = styled.Pressable`
  width: 109px;
  height: 32px;
  padding: 8px 10px 8px 16px;
  margin-left: 12px;
  z-index: 1;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.grey_100};
`
const PopContent = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`
const PopButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
const PopButton = styled.TouchableOpacity`
  display: flex;
  flex: 1 0 0;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.red_200};
`
const CloseButton = styled.TouchableOpacity``
const ModalHeader = styled.View`
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
