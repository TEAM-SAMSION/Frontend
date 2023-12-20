import styled from 'styled-components/native'
import Alarm from '../../assets/Svgs/Alarm.svg'
import Setting from '../../assets/Svgs/SettingIcon.svg'
import { colors } from '../../colors'
import DownIcon from '../../assets/Svgs/arrow_down.svg'
import { Text } from 'react-native'
export const TodoHeader = ({ isMenuOpen, setIsMenuOpen, navigation, selectedTeam, todoTeamList }) => {
  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <CustomHeader>
      <DropdownContainer onPress={() => toggleDropdown()}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Spoqa-Medium',
            fontSize: 16,
            lineHeight: 22,
            color: todoTeamList ? colors.grey_600 : colors.grey_400,
            maxWidth: 140,
          }}
        >
          {/* TodoTeamList가 Null이면, 자연스레 TodoTeamList의 끝요소인 SelectedTeam도 없으며, Home화면에서 선택되는 TodoTeam또한 없기에, Null을 반환받는다 */}
          {selectedTeam?.name || '패밀리 선택'}
        </Text>
        <DownIcon width={24} height={24} />
      </DropdownContainer>

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
  width: 110px;
  height: 44px;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`
const CustomHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding: 8px 6px 8px 0px;
`
const IconContainer = styled.TouchableOpacity``
const RightIcon = styled.View`
  flex-direction: row;
  gap: 16px;
`
