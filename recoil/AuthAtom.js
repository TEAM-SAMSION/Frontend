import { atom, DefaultValue, selector } from 'recoil'

export const platformState = atom({
  key: 'platform',
  default: 'NAVER',
})
export const accessTokenState = atom({
  key: 'accessToken',
  default: '',
})
export const refreshTokenState = atom({
  key: 'refreshToken',
  default: '',
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
    const refreshToken = get(refreshTokenState)
    const loggedIn = get(loggedInState)
    const onboarded = get(onboardedState)
    const platform = get(platformState)
    return { accessToken, refreshToken, loggedIn, onboarded, platform }
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(platformState, value)
      set(accessTokenState, value)
      set(refreshTokenState, value)
      set(loggedInState, value)
      set(onboardedState, value)
      return
    }
    set(platformState, value.platform)
    set(accessTokenState, value.accessToken)
    set(refreshTokenState, value.refreshToken)
    set(loggedInState, value.loggedIn)
    set(onboardedState, value.onboarded)
  },
})
