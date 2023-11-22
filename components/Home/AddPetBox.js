import styled from 'styled-components/native'
import { BodyBold_Text, BodySm_Text, Detail_Text } from '../Fonts'
import EditIcon from '../../assets/Svgs/Edit.svg'
import DeleteIcon from '../../assets/Svgs/delete.svg'
import { colors } from '../../colors'
import { TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useRef } from 'react'

export const AddPetBox = ({ pet, grey, navigation, handleDelete, handleEdit, onSwipeableOpenHandler }) => {
  const deleteSwipeRef = useRef(null)

  const petInfo = {
    name: pet.name,
    age: pet.age,
    description: pet.description,
    genus: pet.genus,
    species: pet.species,
    profileUrl: pet.profileUrl,
    file: pet.file,
  }

  const RightSwipe = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleDelete()
        }}
        activeOpacity={0.6}
      >
        <DeleteBox style={{ marginRight: grey ? 0 : 16 }}>
          <DeleteIcon width={24} height={24} color={colors.grey_100} />
          <BodySm_Text color={colors.grey_100}>삭제</BodySm_Text>
        </DeleteBox>
      </TouchableOpacity>
    )
  }
  return (
    <Swipeable
      ref={deleteSwipeRef}
      onSwipeableOpen={() => onSwipeableOpenHandler(deleteSwipeRef.current)}
      renderRightActions={RightSwipe}
      hitSlop={{ left: -100 }}
    >
      <PetBox style={{ backgroundColor: grey ? colors.grey_150 : colors.grey_100, padding: grey ? 12 : 16 }}>
        <ProfileImage source={{ uri: pet.profileUrl }} />
        <InfoBox>
          <InfoTop>
            <TitleBox>
              <BodyBold_Text>{pet.name}</BodyBold_Text>
              <AgeBox>
                <Detail_Text color={colors.on_primary_container}>{pet.age}살</Detail_Text>
              </AgeBox>
            </TitleBox>
            <TouchableOpacity
              onPress={() => {
                handleEdit()
                grey ? navigation.navigate('EditPetProfile', { petInfo }) : navigation.navigate('EditPet', { petInfo })
              }}
            >
              <EditIcon width={22} height={22} color={colors.grey_350} />
            </TouchableOpacity>
          </InfoTop>
          <Detail_Text>{pet.description}</Detail_Text>
          <InfoBottom>
            <CategroyBox style={{ backgroundColor: grey ? colors.grey_100 : colors.grey_150 }}>
              <Detail_Text>{pet.genus}</Detail_Text>
            </CategroyBox>
            <CategroyBox style={{ backgroundColor: grey ? colors.grey_100 : colors.grey_150 }}>
              <Detail_Text>{pet.species}</Detail_Text>
            </CategroyBox>
          </InfoBottom>
        </InfoBox>
      </PetBox>
    </Swipeable>
  )
}

const PetBox = styled.View`
  border-radius: 8px;
  flex-direction: row;
  gap: 12px;
`
const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background-color: pink;
`
const InfoBox = styled.View`
  flex: 1;
`
const InfoTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`
const TitleBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
const AgeBox = styled.View`
  background-color: ${colors.red_200};
  padding: 2px 8px;
  border-radius: 99px;
`
const InfoBottom = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 12px;
`
const CategroyBox = styled.View`
  background-color: ${colors.grey_100};
  padding: 6px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`
const DeleteBox = styled.View`
  height: 100%;
  padding: 8px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.primary};
`
