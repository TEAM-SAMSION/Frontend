import { atom, DefaultValue, selector } from 'recoil'

export const accessTokenState = atom({
  key: 'accessToken',
  default:
    'eyJhbGciOiJIUzM4NCJ9.eyJ0b2tlbl90eXBlIjoiQUNDRVNTX1RPS0VOIiwiZW1haWwiOiJuZW9zZWxmMTEwNUBnbWFpbC5jb20iLCJpc3MiOiJwYXdpdGgiLCJpYXQiOjE2OTcwODMyMzAsImV4cCI6MTY5NzE2OTYzMH0.HW53JVwtXuO228ZU-mXK6HCl9RJyloITsIX_ujnpXZKi4vk54_2-1gZ0v97N7xat',
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
    return { accessToken, refreshToken, loggedIn, onboarded }
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(accessTokenState, value)
      set(refreshTokenState, value)
      set(loggedInState, value)
      set(onboardedState, value)
      return
    }
    set(accessTokenState, value.accessToken)
    set(refreshTokenState, value.refreshToken)
    set(loggedInState, value.loggedIn)
    set(onboardedState, value.onboarded)
  },
})
