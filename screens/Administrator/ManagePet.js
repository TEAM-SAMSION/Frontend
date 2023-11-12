import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text } from '../../components/Fonts'
import { AddPetBox } from '../../components/Home/AddPetBox'

export default function ManagePet({ navigation }) {
  const savedPets = [
    {
      name: '펫이름',
      age: '4',
      description: '~~~~`',
      genus: '강아지',
      species: '포메라니안',
    },
    {
      name: '펫이름',
      age: '4',
      description: '~~~~`',
      genus: '강아지',
      species: '포메라니안',
    },
    {
      name: '펫이름',
      age: '4',
      description: '~~~~`',
      genus: '강아지',
      species: '포메라니안',
    },
  ]
  return (
    <ScreenLayout>
      {savedPets.length < 0 ? '' : savedPets.map((pet, index) => <AddPetBox key={index} pet={pet} grey={false} />)}
    </ScreenLayout>
  )
}
