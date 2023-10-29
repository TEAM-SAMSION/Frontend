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
export const Label_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: 14, lineHeight: 19, color: color }, { ...style }]}>
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

export const Body_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: 16, lineHeight: 22, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const HeadLine_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Bold', fontSize: 22, lineHeight: 30, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const HeadLineSm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: 16, lineHeight: 22, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
export const SubHead_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: 20, lineHeight: 28, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
