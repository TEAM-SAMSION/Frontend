import { atom, DefaultValue, selector } from 'recoil'

export const accessTokenState = atom({
  key: 'accessToken',
  default:
    'eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJ0ZXN0IiwiaXNzIjoicGF3aXRoIiwiaWF0IjoxNjk1ODk1ODc2LCJleHAiOjE2OTU5ODIyNzZ9.i58lt1IYpj9YHOK1QZ3v3U0jjplv5SR4rkbQyM_qwCT3Tt2rbmVxi0U3BNuAUOcV',
})
export const loggedInState = atom({
  key: 'loggedIn',
  default: false,
})
export const onboardedState = atom({
  key: 'onboarded',
  default: false,
})

export const userInfoState = selector({
  key: 'userInfo',
  get: ({ get }) => {
    const accessToken = get(accessTokenState)
    const loggedIn = get(loggedInState)
    const onboarded = get(onboardedState)
    return { accessToken, loggedIn, onboarded }
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(accessTokenState, value)
      set(loggedInState, value)
      set(onboardedState, value)
      return
    }
    set(accessTokenState, value.accessToken)
    set(loggedInState, value.loggedIn)
    set(onboardedState, value.onboarded)
  },
})
