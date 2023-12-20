import { atom, DefaultValue, selector } from 'recoil'

export const loggedInState = atom({
  key: 'loggedIn',
  default: false,
})
export const onboardedState = atom({
  key: 'onboarded',
  default: false,
})
export const eventViewedState = atom({
  key: 'eventViewed',
  default: false,
})

export const userInfoState = selector({
  key: 'userInfo',
  get: ({ get }) => {
    const loggedIn = get(loggedInState)
    const onboarded = get(onboardedState)
    const eventViewed = get(eventViewedState)

    return { loggedIn, onboarded, eventViewed }
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(loggedInState, value)
      set(onboardedState, value)
      set(eventViewedState, value)
      return
    }
    set(loggedInState, value.loggedIn)
    set(onboardedState, value.onboarded)
    set(eventViewedState, value.eventViewed)
  },
})
