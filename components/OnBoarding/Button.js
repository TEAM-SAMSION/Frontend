import styled from 'styled-components/native'
import { colors } from '../../colors'

export default Button = ({ func, lastFunc, currentIdx, data }) => {
  const isLastItem = currentIdx == data.length - 1
  return (
    <MyButton
      style={[
        !isLastItem
          ? {
              borderWidth: 1,
              borderColor: colors.primary,
              backgroundColor: colors.grey_100,
            }
          : {
              backgroundColor: colors.primary,
            },
      ]}
      onPress={func}
    >
      <ButtonText style={{ color: !isLastItem ? colors.primary : colors.grey_100 }}>
        {!isLastItem ? '다음' : '포잇과 함께하기'}
      </ButtonText>
    </MyButton>
  )
}
const MyButton = styled.TouchableOpacity`
  margin: 0 16px 20px 16px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`
