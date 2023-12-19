import styled from 'styled-components/native'
import Alarm from '../../assets/Svgs/Alarm.svg'
import Setting from '../../assets/Svgs/SettingIcon.svg'
import { colors } from '../../colors'

import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import { Detail_Text } from '../Fonts'
import { Text } from 'react-native'
export const TodoHeader = ({ isHeaderOpen, setIsHeaderOpen, navigation, selectedTeam, todoTeamList }) => {
  const toggleDropdown = () => {
    setIsHeaderOpen(!isHeaderOpen)
  }

  return (
    <CustomHeader>
      <DropdownContainer isHeaderOpen={isHeaderOpen} onPress={toggleDropdown}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Spoqa-Medium',
            fontSize: 16,
            lineHeight: 22,
            color: todoTeamList ? colors.grey_600 : colors.grey_400,
            width: '80%',
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
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
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
