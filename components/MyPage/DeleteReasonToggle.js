import { useEffect, useState } from 'react'
import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ModalPopUp } from '../Shared'
import Close from '../../assets/Svgs/Close.svg'
import { useNavigation } from '@react-navigation/native'
import { BodySm_Text, Detail_Text, SubHead_Text } from '../Fonts'

export const DeleteReasonToggle = (props) => {
  const options = [
    '원래 있던 단체에서 나와서',
    '더이상 관리할 펫이 없어서',
    '서비스 이용에 어려움이 있어서',
    '서비스의 필요성을 못느껴서',
  ]

  // 패밀리 선택 toggle isOpen
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = (value) => {
    setSelectedValue(value)
    props.setReason(value)
    setIsOpen(false)
  }

  return (
    <>
      <DropdownContainer isOpen={isOpen} onPress={toggleDropdown}>
        <BodySm_Text color={selectedValue == '' ? colors.grey_400 : colors.grey_800}>
          {selectedValue || '선택해주세요'}
        </BodySm_Text>
        {isOpen ? (
          <UpIcon width={24} height={24} style={{ position: 'absolute', right: 12 }} />
        ) : (
          <DownIcon width={24} height={24} style={{ position: 'absolute', right: 12 }} />
        )}
      </DropdownContainer>

      {isOpen && (
        <>
          <DropDownContent>
            {options.map((option) => (
              <DropdownBox onPress={() => handleOptionSelect(option)}>
                <Detail_Text color={colors.grey_800}>{option}</Detail_Text>
              </DropdownBox>
            ))}
          </DropDownContent>
        </>
      )}
    </>
  )
}

const DropdownContainer = styled.Pressable`
  padding: 12px;
  z-index: 1;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 8px;
  background-color: ${colors.grey_150};
`
const DropdownBox = styled.Pressable`
  padding: 15px 12px;
  z-index: 1;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.grey_150};
`
const DropDownContent = styled.View`
  background-color: ${colors.grey_150};
  border-radius: 10px;
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
