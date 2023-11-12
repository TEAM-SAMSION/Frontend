import styled from 'styled-components/native'
import { BodyBold_Text, Detail_Text } from '../Fonts'
import EditIcon from '../../assets/Svgs/Edit.svg'
import { colors } from '../../colors'

export const AddPetBox = ({ pet, grey }) => {
  return (
    <PetBox style={{ backgroundColor: grey ? colors.grey_150 : colors.grey_100, padding: grey ? 12 : 16 }}>
      <ProfileImage />
      <InfoBox>
        <InfoTop>
          <TitleBox>
            <BodyBold_Text>{pet.name}</BodyBold_Text>
            <AgeBox>
              <Detail_Text color={colors.on_primary_container}>{pet.age}살</Detail_Text>
            </AgeBox>
          </TitleBox>
          <EditIcon width={22} height={22} color={colors.grey_350} />
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
