import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text, BodySm_Text } from '../../components/Fonts'
import { AddPetBox } from '../../components/Home/AddPetBox'
import PlusIcon from '../../assets/Svgs/miniPlus.svg'
import { useRef } from 'react'
import { ScrollView } from 'react-native'

export default function ManagePet({ navigation }) {
  const swipeableRefs = useRef([])
  const savedPets = [
    {
      name: '포포',
      age: '4',
      description: '귀여운 포포',
      genus: '강아지',
      species: '포메라니안',
      profileUrl: `https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/profileDefault.png`,
      file: '',
    },
    {
      name: '몽이',
      age: '7',
      description: '까만 푸들',
      genus: '강아지',
      species: '푸들',
      profileUrl: `https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/sample_3.png`,
      file: '',
    },
    {
      name: '야옹이',
      age: '1',
      description: '안녕',
      genus: '고양이',
      species: '스핑크스',
      profileUrl: `https://pawith.s3.ap-northeast-2.amazonaws.com/base-image/sample_6.png`,
      file: '',
    },
  ]
  return (
    <ScreenLayout>
      <ScrollView>
        <PetAddContainer>
          {savedPets.length < 0
            ? ''
            : savedPets.map((pet, index) => (
                <AddPetBox
                  key={index}
                  pet={pet}
                  grey={false}
                  navigation={navigation}
                  handleDelete={() => {
                    console.log('api 나오면')
                    //setDeletePetInfo(pet)
                    //setDeleteVisible(true)
                  }}
                  handleEdit={() => {
                    console.log('api 나오면')
                    //deletePet(pet)
                  }}
                  swipeableRef={(ref) => (swipeableRefs.current[pet] = ref)}
                />
              ))}
        </PetAddContainer>
        <AddPetButton onPress={() => navigation.navigate('AddPet')}>
          <PlusIcon width={20} height={20} />
          <BodySm_Text color={colors.grey_700}>새로운 펫 등록</BodySm_Text>
        </AddPetButton>
      </ScrollView>
    </ScreenLayout>
  )
}

const PetAddContainer = styled.View``

const AddPetButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 8px 16px;
  border-radius: 8px;
  background-color: ${colors.grey_150};
`
