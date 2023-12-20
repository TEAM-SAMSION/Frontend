import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenLayout } from '../../components/Shared'
import { BodyBoldSm_Text, BodySm_Text } from '../../components/Fonts'
import { AddPetBox } from '../../components/Administrator/AddPetBox'
import PlusIcon from '../../assets/Svgs/miniPlus.svg'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import { deletePet, getPet } from '../../components/Administrator/Apis'
import { useIsFocused } from '@react-navigation/native'

export default function ManagePet({ route, navigation }) {
  const isFocused = useIsFocused()

  const data = route.params
  const teamId = data.teamId
  const swipeableRefs = useRef(null)
  const [isDeletePet, setIsDeletePet] = useState(false)
  const [savedPets, setSavedPets] = useState([])

  useEffect(() => {
    getPet(teamId).then((result) => {
      setSavedPets(result)
    })
  }, [isFocused, isDeletePet])

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => swipeableRefs.current?.close()}>
          <View>
            <PetAddContainer>
              {savedPets.length < 0
                ? ''
                : savedPets.map((pet, index) => (
                    <AddPetBox
                      key={index}
                      pet={pet}
                      teamId={teamId}
                      grey={false}
                      navigation={navigation}
                      handleDelete={() => {
                        deletePet(pet.petId)
                        setIsDeletePet(!isDeletePet)
                      }}
                      onSwipeableOpenHandler={(ref) => {
                        if (swipeableRefs.current && ref !== swipeableRefs.current) {
                          swipeableRefs.current.close()
                          swipeableRefs.current = null
                        }
                        swipeableRefs.current = ref
                      }}
                    />
                  ))}
            </PetAddContainer>
            <AddPetButton onPress={() => navigation.navigate('AddPet', { teamId })}>
              <PlusIcon width={20} height={20} />
              <BodySm_Text color={colors.grey_700}>새로운 펫 등록</BodySm_Text>
            </AddPetButton>
          </View>
        </TouchableWithoutFeedback>
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
