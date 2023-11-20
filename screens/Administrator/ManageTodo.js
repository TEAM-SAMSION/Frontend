import styled from 'styled-components/native'
import { categoryColors, colors } from '../../colors'
import { HeaderWithBack, ModalPopUp, ScreenKeyboardLayout } from '../../components/Shared'
import { BodyBold_Text, BodySm_Text, Body_Text, Detail_Text, Label_Text, SubHead_Text } from '../../components/Fonts'
import Plus from '../../assets/Svgs/miniPlus.svg'
import { Circle } from '../../components/Todo/CategoryIndicator'
import Trash from '../../assets/Svgs/delete.svg'
import Edit from '../../assets/Svgs/Edit.svg'
import Add from '../../assets/Svgs/add.svg'
import Switch_false from '../../assets/Svgs/switch_false.svg'
import Switch_true from '../../assets/Svgs/switch_true.svg'
import { createRef, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Keyboard, Modal, NativeModules, Platform, ScrollView, TextInput } from 'react-native'
import { getCategoryListAdmin } from '../../components/Todo/Apis'
import {
  CreateCategory,
  DeleteCategory,
  EditCategoryName,
  ToggleCategory,
} from '../../components/Admin/ManageTodo/Apis'

export default function ManageTodo({ navigation, route }) {
  const inputRefs = useRef([])
  const { StatusBarManager } = NativeModules
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  Platform.OS == 'ios'
    ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
      })
    : null

  const [categoryList, setCategoryList] = useState(null)
  const [selectedLocalId, setSelectedLocalId] = useState(null)
  const [isEditable, setIsEditable] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [name, setName] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const teamId = route.params.teamId
  const setEnv = async (index) => {
    const isEditable_temp = JSON.parse(JSON.stringify(isEditable))
    isEditable_temp[index] = true
    setIsEditable(isEditable_temp)
    setSelectedLocalId(index)
    setName(categoryList[index].categoryName)
    //** useState의 비동기성을 확인할 수 있는 구문. editable 상태가 늦게 전달되어 focus되지 않았었음 이를 async 함수로 따로 빼어 해결 */
  }
  const refreshData = () => {
    getCategoryListAdmin(teamId).then((categories) => {
      console.log(categories)
      if (categories.length > 0) {
        inputRefs.current = Array.from({ length: categories.length }, () => createRef()) //useRef의 ref값은 .current를 통해 mount 이후에도 변경이 가능하다.
        setIsEditable(Array.from({ length: categories.length }, () => false))
        setCategoryList(categories)
      }
    })
  }
  const editCategoryName = (index) => {
    setEnv(index).then(() => {
      inputRefs.current[index].current.focus()
    })
  }
  const createCategory = (text) => {
    setIsLoading(true)
    CreateCategory(text, teamId).then((status) => {
      if (status == 200) {
        setIsLoading(false)
        setIsCreate(false)
        refreshData()
      }
    })
  }
  const toggleStatus = (index) => {
    setIsLoading(true)
    ToggleCategory(categoryList[index].categoryId).then((status) => {
      if (status == 200) {
        setIsLoading(false)
        let tempArr = JSON.parse(JSON.stringify(categoryList))
        if (tempArr[index].categoryStatus == 'OFF') {
          tempArr[index].categoryStatus = 'ON'
        } else {
          tempArr[index].categoryStatus = 'OFF'
        }
        setCategoryList(tempArr)
      }
    })
  }
  const finishCategoryEdit = (data, categoryId) => {
    setIsLoading(true)
    EditCategoryName(categoryId, data).then((status) => {
      if (status == 200) {
        refreshData()
        setIsLoading(false)
        setSelectedLocalId(null)
      } else {
        console.log(status)
      }
    })
    setIsEditable(isEditable.map((item) => (item = false)))
  }

  const deleteCategory = (categoryId) => {
    DeleteCategory(categoryId).then((status) => {
      if (status == 200) {
        setIsLoading(false)
        refreshData()
        console.log('Hello')
      } else {
        console.log(status)
      }
    })
  }
  const startDeleteCategory = (category) => {
    setSelectedCategory(category)
    setIsVisible(true)
  }

  useEffect(() => {
    refreshData()
  }, [])
  return (
    <ScreenKeyboardLayout
      verticalOffset={statusBarHeight + 44}
      disabled={true}
      // onPress={() => {
      //   setIsVisible(false)
      //   Keyboard.dismiss()
      // }}
      behavior="padding"
    >
      <HeaderWithBack navigation={navigation} title="카테고리 관리" />
      <ScrollViewContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContentLayout>
            <TopBase>
              <SubHead_Text color={colors.grey_600}>카테고리</SubHead_Text>
              <ButtonBase onPress={() => setIsCreate(true)}>
                <Plus width={24} height={24} color={colors.grey_800} />
              </ButtonBase>
            </TopBase>
            {isCreate && (
              <CategoryBox>
                <Circle style={{ backgroundColor: categoryColors[0] }} />
                <TextInput
                  onEndEditing={() => setIsCreate(false)}
                  style={{ width: this.state?.inputWidth }}
                  placeholderTextColor={colors.grey_900}
                  onSubmitEditing={(data) => createCategory(data.nativeEvent.text)}
                  placeholder="카테고리명을 입력해주세요."
                  selectTextOnFocus={false}
                  returnKeyType="done"
                  inputMode="text"
                />
              </CategoryBox>
            )}

            {isLoading ? (
              <ActivityIndicator style={{ marginTop: 80 }} />
            ) : (
              categoryList?.map((category, index) => (
                <ListBase style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 10 }} key={index}>
                  <Base>
                    <CategoryBox
                      style={{ backgroundColor: index == selectedLocalId ? colors.grey_150 : colors.grey_100 }}
                    >
                      <Circle style={{ backgroundColor: categoryColors[category.categoryId % 10] }} />
                      <TextInput
                        ref={inputRefs.current[index]}
                        style={{ fontFamily: 'Spoqa-Medium', color: colors.grey_600, width: this.state?.inputWidth }}
                        placeholderTextColor={colors.grey_600}
                        onSubmitEditing={(data) => finishCategoryEdit(data.nativeEvent.text, category.categoryId)}
                        placeholder={category.categoryName}
                        value={index == selectedLocalId && name}
                        onChange={(data) => setName(data.nativeEvent.text)}
                        returnKeyType="done"
                        inputMode="text"
                        editable={isEditable[index]}
                      />
                    </CategoryBox>
                    <ButtonBase onPress={() => toggleStatus(index)}>
                      {categoryList[index].categoryStatus == 'ON' ? ( //***/
                        <Switch_true width={38} height={22} />
                      ) : (
                        <Switch_false width={38} height={22} />
                      )}
                    </ButtonBase>
                  </Base>
                  <Base style={{ gap: 8, marginTop: 12 }}>
                    <ButtonBox onPress={() => editCategoryName(index)}>
                      {/*Index는 TextInput 활성화 컨트롤 위함 */}
                      <Edit width={16} height={16} color={colors.secondary} />
                      <Detail_Text color={colors.grey_600}>편집하기</Detail_Text>
                    </ButtonBox>
                    <ButtonBox onPress={() => startDeleteCategory(category)}>
                      <Trash width={16} height={16} color={colors.red_350} />
                      <Detail_Text color={colors.grey_600}>삭제하기</Detail_Text>
                    </ButtonBox>
                  </Base>
                </ListBase>
              ))
            )}
          </ContentLayout>
        </ScrollView>
      </ScrollViewContainer>

      <ModalPopUp visible={isVisible} petIcon={false} height={204}>
        <PopContent>
          <BodyBold_Text color={colors.grey_700}>{selectedCategory?.categoryName}</BodyBold_Text>
          <Body_Text color={colors.grey_500}>을 삭제하시겠습니까?</Body_Text>
        </PopContent>
        <PopButtonContainer>
          <PopButton
            style={{ backgroundColor: colors.grey_100, borderWidth: 1, borderColor: colors.grey_150 }}
            onPress={() => {
              deleteCategory(selectedCategory.categoryId)
              setIsVisible(false)
            }}
          >
            <BodySm_Text color={colors.red_350}>예</BodySm_Text>
          </PopButton>
          <PopButton
            style={{ backgroundColor: colors.red_200 }}
            onPress={() => {
              setIsVisible(false)
            }}
          >
            <BodySm_Text color={colors.red_350}>아니요</BodySm_Text>
          </PopButton>
        </PopButtonContainer>
      </ModalPopUp>
    </ScreenKeyboardLayout>
  )
}
const PopContent = styled.View`
  flex-direction: row;
  padding-top: 70px;
  padding-bottom: 40px;
  justify-content: center;
`
const PopButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
const PopButton = styled.TouchableOpacity`
  display: flex;
  flex: 1 0 0;
  height: 44px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
const ContentLayout = styled.View`
  padding: 16px;
  margin-bottom: 10px;
  flex: 1;
`
const TopBase = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px;
  justify-content: space-between;
`
const Base = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ScrollViewContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
`
const ListBase = styled.View``
const ButtonBox = styled.TouchableOpacity`
  flex: 1;
  height: 36px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  gap: 4px;
  background-color: ${colors.grey_150};
`

const ButtonBase = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
`
const CategoryBox = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  padding: ${Platform.OS == 'android' ? '2px 8px' : '6px 8px'};
  border: 1px solid ${colors.grey_200};
  gap: 8px;
`
