import styled from 'styled-components/native'
import Alarm from '../../assets/Svgs/Alarm.svg'
import ArrowDown from '../../assets/Svgs/arrow_down.svg'
import Report from '../../assets/Svgs/report.svg'
import Schedule from '../../assets/Svgs/Calendar.svg'
import { colors } from '../../colors'

export const TodoHeader = ({ navigation }) => {
  return (
    <CustomHeader>
      <DropDownContainer onPress={() => console.log('touched')}>
        <DropDownText>패밀리 선택</DropDownText>
        <ArrowDown width={16} height={16} />
      </DropDownContainer>
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

const CustomHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 52px;
`
const DropDownContainer = styled.TouchableOpacity`
  width: 109px;
  border-radius: 8px;
  background-color: #f2f2f2;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
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
