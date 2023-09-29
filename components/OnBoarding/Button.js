import styled from 'styled-components/native'
import { colors } from '../../colors'
import LOGO_Symbol from '../../assets/Svgs/LOGO_Symbol.svg'

export default Button = ({ func, lastFunc, currentIdx, data }) => {
  const isLastItem = currentIdx == data.length - 1
  return (
    <MyButton
      style={[
        !isLastItem
          ? {
              borderWidth: 2,
              borderColor: colors.primary,
              backgroundColor: colors.grey_100,
            }
          : {
              backgroundColor: colors.primary,
            },
      ]}
      onPress={!isLastItem ? func : lastFunc}
    >
      {isLastItem && <LOGO_Symbol color={colors.grey_100} height={24} width={24} />}
      <ButtonText style={[{ color: !isLastItem ? colors.primary : colors.grey_100 }, isLastItem && { marginLeft: 8 }]}>
        {!isLastItem ? '다음' : '포잇과 함께하기'}
      </ButtonText>
    </MyButton>
  )
}
const MyButton = styled.TouchableOpacity`
  margin: 0 16px 20px 16px;
  flex-direction: row;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`
const ButtonText = styled.Text`
  font-size: 14px;
  font-family: Spoqa-Bold;
  line-height: 19px;
`
