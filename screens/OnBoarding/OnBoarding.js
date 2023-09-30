import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components/native'
import { FlatList, Animated } from 'react-native'
import SlideItem from '../../components/OnBoarding/SlideItem'
import { ScreenLayout } from '../../components/Shared'
import Paginator from '../../components/OnBoarding/Paginator'
import Button from '../../components/OnBoarding/Button'
import { onboardedState } from '../../recoil/AuthAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Auth from './Auth'

export default function OnBoarding({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current
  const onboarded = useRecoilValue(onboardedState)
  console.log('onboarded:', onboarded)
  const setOnboarded = useSetRecoilState(onboardedState)

  const slidesRef = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const PAGES = [
    {
      id: 1,
      title: '처음 인사드려요!',
      content: '혼자가 아닌 함께, 나의 펫을 위한 모든 것을\n관리할 수 있도록 포잇이 함께할게요',
      image: require('../../assets/Imgs/onboarding01.png'),
    },
    {
      id: 2,
      title: 'PLANING',
      content: '내 반려동물에게 밥을 줬는지 산책해 준 사람이\n있는지 공유 Todo를 통해 함께 관리해요!',
      image: require('../../assets/Imgs/onboarding02.png'),
    },
    {
      id: 3,
      title: 'TOGETHER',
      content:
        '포잇의 Pamily는 펫을 함께 키우는\n모임이나 단체를 의미해요!\n가족, 친구, 동아리 등 사람들과 함께 반려동물을\n관리하고 있다면, 포잇과 함께해요!',
      image: require('../../assets/Imgs/onboarding03.png'),
    },
    {
      id: 4,
      title: 'MANAGING',
      content:
        '포잇은 관리자와 사용자로 권한이 나뉘어지고,\n관리자는 TODO 수정 및 승인과 사용자 관리\n권한이 주어져요!',
      image: require('../../assets/Imgs/onboarding04.png'),
    },
    {
      id: 5,
      content: '포잇과 함께, 반려동물에게 사랑과\n온정이 넘치는 하루를 선물하세요!',
      image: require('../../assets/Imgs/onboarding05.png'),
    },
  ]

  // console.log(ScreenWidth)
  const onViewableItemsChanged = ({ viewableItems }) => {
    console.log(viewableItems[0].index)
    setCurrentIdx(viewableItems[0].index)
  }
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }])

  const scrollTo = () => {
    if (currentIdx < PAGES.length - 1) {
      console.log('scrollToAvailable', currentIdx)
      slidesRef.current.scrollToIndex({ index: currentIdx + 1 })
    }
  }

  const OnBoardingReady = async () => {
    setOnboarded(true)
    console.log('온보딩다시 안뜨게끔 onBoarded 변수 조정')
    await AsyncStorage.setItem('onBoardingDone', 'true')
  }

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
  return (
    <>
      {onboarded ? (
        <Auth />
      ) : (
        <ScreenLayout>
          <Container>
            <FlatList
              style={{ marginTop: 16 }}
              horizontal
              data={PAGES}
              renderItem={({ item }) => <SlideItem item={item} />}
              pagingEnabled
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },
                // 너비를 Animating해야하지만, Native driver는 이를 지원하지않음
              )}
              scrollEventThrottle={32}
              viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
              viewabilityConfig={viewConfig}
              ref={slidesRef}
            />
            <Paginator data={PAGES} scrollX={scrollX} />
          </Container>
          <Button func={() => scrollTo()} lastFunc={() => OnBoardingReady()} currentIdx={currentIdx} data={PAGES} />
        </ScreenLayout>
      )}
    </>
  )
}

const Container = styled.View`
  flex: 1;
  margin-top: 40px;
`
