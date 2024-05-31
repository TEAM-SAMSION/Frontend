import { useEffect, useState } from 'react'
import DownIcon from '../../assets/Svgs/arrow_down.svg'
import UpIcon from '../../assets/Svgs/arrow_up.svg'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useNavigation } from '@react-navigation/native'
import { BodySm_Text, Detail_Text, SubHead_Text } from '../Fonts'
import { ScrollView } from 'react-native'
import { PetModalPopUp } from '../Shared'

export const PamilyChoiceToggle = (props) => {
  const pamilyList = props.pamilyList
  const options = pamilyList.length > 0 ? pamilyList.map((item) => item) : []
  // 패밀리 선택 toggle isOpen
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = (value) => {
    let tempArr = { id: value.teamId, name: value.teamName, auth: value.authority }
    console.log('topTeam Changed', tempArr)
    props.setSelectedTeam(tempArr)
    setIsOpen(false)
  }

  return (
    <>
      <DropdownContainer
        isOpen={isOpen}
        onPress={toggleDropdown}
        style={
          Platform.OS == 'android'
            ? { elevation: 0.7, borderWidth: 0.7, borderColor: 'rgba(0, 0, 0, 0.01)' }
            : {
                shadowColor: 'rgb(0,0,0)',
                shadowRadius: 2,
                shadowOpacity: 0.1,
                shadowOffset: [0, 0],
              }
        }
      >
        <Detail_Text color={colors.grey_600} style={{ width: 67 }}>
          {props.selectedTeam?.name || '패밀리 선택 '}
        </Detail_Text>
        {isOpen ? (
          <UpIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
        ) : (
          <DownIcon width={16} height={16} style={{ position: 'absolute', right: 10 }} />
        )}
      </DropdownContainer>

      {isOpen &&
        (pamilyList.length > 4 ? (
          <LongDropdown>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <DropdownBox
                  style={
                    Platform.OS == 'android'
                      ? {
                          elevation: 0.7,
                          borderWidth: 0.7,
                          borderColor: 'rgba(0, 0, 0, 0.01)',
                          paddingLeft: 4,
                          width: 90,
                        }
                      : {
                          shadowColor: 'rgb(0,0,0)',
                          shadowRadius: 2,
                          shadowOpacity: 0.1,
                          shadowOffset: { width: 2, height: 2 },
                          paddingLeft: 4,
                          width: 90,
                        }
                  }
                  key={option.teamId}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Detail_Text color={colors.grey_600}>{option.teamName}</Detail_Text>
                </DropdownBox>
              ))}
              <DropdownBox
                style={
                  Platform.OS == 'android'
                    ? {
                        elevation: 0.7,
                        borderWidth: 0.7,
                        borderColor: 'rgba(0, 0, 0, 0.01)',
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        paddingLeft: 4,
                        width: 90,
                      }
                    : {
                        shadowColor: 'rgb(0,0,0)',
                        shadowRadius: 2,
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 2, height: 2 },
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        paddingLeft: 4,
                        width: 90,
                      }
                }
                onPress={() => setVisible(true)}
              >
                <Detail_Text color={colors.grey_600}>+</Detail_Text>
              </DropdownBox>
            </ScrollView>
          </LongDropdown>
        ) : (
          <>
            {options.map((option) => (
              <DropdownBox
                key={option.teamId}
                onPress={() => handleOptionSelect(option)}
                style={
                  Platform.OS == 'android'
                    ? {
                        elevation: 0.7,
                        borderWidth: 0.7,
                        borderColor: 'rgba(0, 0, 0, 0.01)',
                      }
                    : {
                        shadowColor: 'rgb(0,0,0)',
                        shadowRadius: 2,
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 2, height: 2 },
                      }
                }
              >
                <Detail_Text color={colors.grey_600}>{option.teamName}</Detail_Text>
              </DropdownBox>
            ))}
            <DropdownBox
              style={
                Platform.OS == 'android'
                  ? {
                      elevation: 0.7,
                      borderWidth: 0.7,
                      borderColor: 'rgba(0, 0, 0, 0.01)',
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    }
                  : {
                      shadowColor: 'rgb(0, 0, 0)',
                      shadowRadius: 2,
                      shadowOpacity: 0.1,
                      shadowOffset: { width: 2, height: 2 },
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    }
              }
              onPress={() => setVisible(true)}
            >
              <Detail_Text color={colors.grey_600}>+</Detail_Text>
            </DropdownBox>
          </>
        ))}
      <PetModalPopUp
        petIcon={true}
        visible={visible}
        height={211}
        setIsVisible={setVisible}
        setIsOpen={setIsOpen}
        navigation={navigation}
      />
    </>
  )
}

const DropdownContainer = styled.Pressable`
  width: 129px;
  height: 38px;
  padding: 4px 10px 4px 16px;
  margin: 12px 0px 0px 12px;
  z-index: 999;
  border-radius: ${({ isOpen }) => (isOpen ? '8px 8px 0px 0px' : '8px')};
  border-bottom-width: ${({ isOpen }) => (isOpen ? '1px' : '0px')};
  border-bottom-color: rgba(0, 0, 0, 0.12);
  align-items: center;
  flex-direction: row;
  background-color: ${colors.grey_100};
`
const DropdownBox = styled.Pressable`
  width: 129px;
  height: 38px;
  padding: 0px 10px 0px 16px;
  margin-left: 12px;
  z-index: 1;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.grey_100};
`
const LongDropdown = styled.View`
  width: 109px;
  height: 128px;
  background-color: ${colors.grey_100};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-left: 12px;
  z-index: 1;
`
