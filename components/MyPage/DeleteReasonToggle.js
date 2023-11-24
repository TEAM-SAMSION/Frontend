import { useEffect, useState } from 'react'
import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ModalPopUp } from '../Shared'
import Close from '../../assets/Svgs/Close.svg'
import { useNavigation } from '@react-navigation/native'
import { BodyBold_Text, BodySm_Text, Detail_Text, SubHead_Text } from '../Fonts'

export const DeleteReasonToggle = (props) => {
  const options = [
    '원래 있던 단체에서 나와서',
    '더이상 관리할 펫이 없어서',
    '서비스 이용에 어려움이 있어서',
    '서비스의 필요성을 못느껴서',
    '기타',
  ]

  // onFocus
  const [onReason, setOnReason] = useState(false)

  // 패밀리 선택 toggle isOpen
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [personalReason, setPersonalReason] = useState('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = (value) => {
    setSelectedValue(value)
    props.setReason(value)
    {
      value == '기타' ? props.setIsEnabled(false) : props.setIsEnabled(true)
    }
    setIsOpen(false)
  }

  useEffect(() => {
    personalReason == '' ? '' : props.setIsEnabled(true) & props.setPersonalReason(personalReason)
  }, [personalReason])

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

      {selectedValue == '기타' && (
        <ReasonBox>
          <BodyBold_Text>탈퇴 이유를 자세히 입력해주세요</BodyBold_Text>
          <InputBox style={{ borderWidth: onReason ? 1 : 0, borderColor: onReason ? 'rgba(0, 0, 0, 0.12)' : '' }}>
            <InputBlock
              editable
              placeholder="탈퇴 이유 입력하기"
              onChangeText={(text) => setPersonalReason(text)}
              returnKeyType="done"
              onFocus={() => setOnReason(true)}
              onBlur={() => {
                setOnReason(false)
              }}
            />
          </InputBox>
        </ReasonBox>
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
const InputBox = styled.View`
  flex-direction: row;
  background-color: ${colors.grey_150};
  padding-right: 12px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: flex-start;
`
const InputBlock = styled.TextInput`
  width: 80%;
  padding: 12px;
  font-family: 'Spoqa-Medium';
  color: ${colors.grey_600};
  font-size: 12px;
`
const ReasonBox = styled.View`
  margin-top: 8px;
  gap: 10px;
`
