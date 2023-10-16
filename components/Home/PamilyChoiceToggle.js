import { useState } from 'react'
import { FlatList, Modal, Text, View } from 'react-native'
import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ModalPopUp } from './ModalPopUp'
import Close from '../../assets/Svgs/Close.svg'
import { useNavigation } from '@react-navigation/native'

export const PamilyChoiceToggle = () => {
  // 패밀리 선택 toggle isOpen
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const options = ['패밀리1', '패밀리2']
  // + 누르면 나오는 모달 팝업 visible
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
        <DropdownTitle>{selectedValue || '패밀리 선택 '}</DropdownTitle>
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
              <DropdownTitle>{option}</DropdownTitle>
            </DropdownBox>
          ))}
          <DropdownBox
            style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
            onPress={() => setVisible(true)}
          >
            <DropdownTitle>+</DropdownTitle>
          </DropdownBox>
        </>
      )}
      <ModalPopUp visible={visible}>
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
          <PopTitle>Pamily와 함께하시겠습니까?</PopTitle>
          <PopSubTitle>Pamily는 나의 반려동물을 함께 키우는 모임을 말합니다.</PopSubTitle>
        </PopContent>
        <PopButtonContainer>
          <PopButton
            onPress={() => {
              navigation.navigate('CreateTeam')
              setVisible(false)
              setIsOpen(false)
            }}
          >
            <PopButtonText>Pamily 생성하기</PopButtonText>
          </PopButton>
          <PopButton
            onPress={() => {
              navigation.navigate('JoinTeam')
              setVisible(false)
              setIsOpen(false)
            }}
          >
            <PopButtonText>Pamily 참여하기</PopButtonText>
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
const DropdownTitle = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  color: ${colors.grey_600};
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
const PopTitle = styled.Text`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  color: ${colors.grey_700};
`
const PopSubTitle = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  color: ${colors.grey_500};
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
  background-color: ${colors.primary_container};
`
const PopButtonText = styled.Text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  color: ${colors.primary};
`
const CloseButton = styled.TouchableOpacity``
const ModalHeader = styled.View`
  width: '100%';
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 24px;
`
