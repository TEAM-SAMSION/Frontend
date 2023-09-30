import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import Report from '../../assets/Svgs/report.svg'

const screenWidth = Dimensions.get('window').width

export const MainStat = (props) => {
  const percentage = props.progress
  return (
    <MainStatContainer>
      <TouchableOpacity>
        <Report width={24} height={24} />
      </TouchableOpacity>
      <BarContainer>
        <BackBar>
          <Percentage percentage={percentage} />
          <PercentagePickIcon source={require('../../assets/Imgs/StatIcon.png')} percentage={percentage} />
        </BackBar>
      </BarContainer>
      <StatButton>
        <StatText>{percentage}%</StatText>
      </StatButton>
    </MainStatContainer>
  )
}

const MainStatContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const BarContainer = styled.View`
  width: ${screenWidth - 153};
  margin-left: 10px;
`
const BackBar = styled.View`
  flex-direction: row;
  height: 26px;
  border-radius: 99px;
  border: 1px solid ${colors.primary_outline};
`
const Percentage = styled.View`
  height: 100%;
  width: ${(props) => props.percentage}%;
  border-top-left-radius: 99px;
  border-bottom-left-radius: 99px;
  background-color: ${colors.primary_outline};
  justify-content: center;
  padding-left: 7px;
`
const PercentagePickIcon = styled.Image`
  position: absolute;
  bottom: -5px;
  left: ${(props) => ((screenWidth - 153) * props.percentage) / 100 - 18}px;
  width: 36px;
  height: 35px;
`
const StatButton = styled.View`
  width: 49px;
  height: 24px;
  padding: 0px 8px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.primary_container};
`
const StatText = styled.Text`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  color: ${colors.primary};
`
