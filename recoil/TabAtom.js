import { atom } from 'recoil'

export const TabBarAtom = atom({
  key: 'TabBarAtom',
  default: true,
})

export const SelectedTeamAtom = atom({
  key: 'SelectedTeamAtom',
  default: null,
})
