import { Text } from 'react-native'

export const BodyBold_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ color: color, fontFamily: 'Spoqa-Bold', fontSize: 16, lineHeight: 22 }, { ...style }]}>
      {children}
    </Text>
  )
}

export const Detail_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: 12, lineHeight: 15, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const BodyBoldSm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Bold', fontSize: 14, lineHeight: 19, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const BodySm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: 14, lineHeight: 19, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const DetailSm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Regular', fontSize: 12, lineHeight: 15, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
