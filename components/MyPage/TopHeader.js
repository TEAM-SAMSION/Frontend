import styled from 'styled-components/native'
import LogoIcon from '../../assets/Svgs/LogoIcon.svg'
import SettingIcon from '../../assets/Svgs/SettingIcon.svg'
import Alarm from '../../assets/Svgs/Alarm.svg'
import { colors } from '../../colors'

export const TopHeader = ({ navigation }) => {
  return (
    <CustomHeader>
      <IconContainer
        onPress={() => {
          navigation.navigate('HomeNav', { screen: 'Home' })
        }}
      >
        <LogoIcon width={110} height={26} />
      </IconContainer>
      <RightIcon>
        <IconContainer
          onPress={() => {
            navigation.navigate('AlarmNav')
          }}
        >
          <Alarm width={24} height={24} color={colors.grey_350} />
        </IconContainer>
        <IconContainer
          onPress={() => {
            navigation.navigate('Setting')
          }}
        >
          <SettingIcon width={24} height={24} />
        </IconContainer>
      </RightIcon>
    </CustomHeader>
  )
}

const CustomHeader = styled.View`
  flex-direction: row;
  padding: 0px 16px;
  justify-content: space-between;
  align-items: center;
  height: 52px;
`
const IconContainer = styled.TouchableOpacity``
const RightIcon = styled.View`
  flex-direction: row;
  gap: 16px;
`
