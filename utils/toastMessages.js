import Toast from 'react-native-toast-message'

export const showDeletedToast = () => {
  Toast.show({
    type: 'customToast',
    text1: '삭제되었습니다',
    visibilityTime: 2500,
    position: 'bottom',
    bottomOffset: 120,
    props: { mode: 'delete' },
  })
}

export const showNotAuthorizedToast = () => {
  Toast.show({
    type: 'customToast',
    text1: '나에게 할당된 TODO가 아닙니다',
    visibilityTime: 2500,
    position: 'bottom',
    bottomOffset: 120,
    props: { mode: 'notAuthorized' },
  })
}
