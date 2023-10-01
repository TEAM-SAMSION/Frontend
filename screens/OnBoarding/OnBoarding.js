import React, { useRef, useState } from 'react'
import { styled } from 'styled-components/native'
import { FlatList, Animated } from 'react-native'
import SlideItem from '../../components/OnBoarding/SlideItem'
import { ScreenLayout } from '../../components/Shared'
import Paginator from '../../components/OnBoarding/Paginator'
import Button, { OnboardingButton } from '../../components/OnBoarding/Button'
import { onboardedState } from '../../recoil/AuthAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Auth from './Auth'
import { PAGES } from '../../datas/OnBoarding/data'

export default function OnBoarding({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current
  const onboarded = useRecoilValue(onboardedState)

  const setOnboarded = useSetRecoilState(onboardedState)

  const slidesRef = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(0)

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
        <Auth navigation={navigation} />
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
          <OnboardingButton
            func={() => scrollTo()}
            lastFunc={() => OnBoardingReady()}
            currentIdx={currentIdx}
            data={PAGES}
          />
        </ScreenLayout>
      )}
    </>
  )
}

const Container = styled.View`
  flex: 1;
  margin-top: 40px;
`
