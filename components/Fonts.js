import { Text } from 'react-native'
import { normalize } from './Shared'

export const BodyBold_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { color: color, fontFamily: 'Spoqa-Bold', fontSize: normalize(16), lineHeight: normalize(22) },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}

export const Detail_Text = ({ color, children, style = null, props = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Medium', fontSize: normalize(12), lineHeight: normalize(15), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}
export const Label_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Medium', fontSize: normalize(14), lineHeight: normalize(19), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}

export const BodyBoldSm_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Bold', fontSize: normalize(14), lineHeight: normalize(19), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}

export const BodySm_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Medium', fontSize: normalize(14), lineHeight: normalize(19), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}

export const DetailSm_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Regular', fontSize: normalize(12), lineHeight: normalize(15), color: color },
        { ...style },
      ]}
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
    <Text
      style={[
        { fontFamily: 'Spoqa-Bold', fontSize: normalize(22), lineHeight: normalize(30), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}

export const HeadLineSm_Text = ({ color, children, style = null }) => {
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
export const SubHead_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Bold', fontSize: normalize(20), lineHeight: normalize(28), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}
export const SubHeadSm_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Medium', fontSize: normalize(18), lineHeight: normalize(25), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}
export const HeadLineXl_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Bold', fontSize: normalize(36), lineHeight: normalize(43), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}
export const HeadLineLg_Text = ({ color, children, style = null }) => {
  return (
    <Text
      style={[
        { fontFamily: 'Spoqa-Bold', fontSize: normalize(28), lineHeight: normalize(33), color: color },
        { ...style },
      ]}
    >
      {children}
    </Text>
  )
}
