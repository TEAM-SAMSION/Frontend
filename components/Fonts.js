import { Text } from 'react-native'
import { normalize } from './Shared'

export const BodyBold_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ color: color, fontFamily: 'Spoqa-Bold', fontSize: normalize(16), lineHeight: 22 }, { ...style }]}>
      {children}
    </Text>
  )
}

export const Detail_Text = ({ color, children, style = null, props = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: normalize(12), lineHeight: 15, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
export const Label_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: normalize(14), lineHeight: 19, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const BodyBoldSm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Bold', fontSize: normalize(14), lineHeight: 19, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const BodySm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: normalize(14), lineHeight: 19, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const DetailSm_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[{ fontFamily: 'Spoqa-Regular', fontSize: normalize(12), lineHeight: 15, color: color }, { ...style }]}
    >
      {children}
    </Text>
  )
}

export const Body_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Medium', fontSize: normalize(16), lineHeight: normalize(22), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}

export const HeadLine_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Bold', fontSize: normalize(22), lineHeight: 30, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}

export const HeadLineSm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: normalize(16), lineHeight: 22, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
export const SubHead_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Bold', fontSize: normalize(20), lineHeight: 28, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
export const SubHeadSm_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Medium', fontSize: normalize(18), lineHeight: 25, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
export const HeadLineXl_Text = ({ color, children, style = null }) => {
  return (
    <Text style={[{ fontFamily: 'Spoqa-Bold', fontSize: normalize(36), lineHeight: 43, color: color }, { ...style }]}>
      {children}
    </Text>
  )
}
