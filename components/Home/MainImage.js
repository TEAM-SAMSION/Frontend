import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'

export const MainImage = (props) => {
  const progress = props.progress
  const [isDog, setIsDog] = useState(true)

  useEffect(() => {
    setIsDog(props.isDog)
  }, [props.isDog])

  const getImageSource = () => {
    if (props.pamilyNum == 0) {
      return require(`../../assets/Imgs/DogDefault.png`)
    } else if (isDog) {
      if (progress === 0) return require(`../../assets/Imgs/Dog0.png`)
      if (progress <= 25) return require(`../../assets/Imgs/Dog25.png`)
      if (progress <= 50) return require(`../../assets/Imgs/Dog50.png`)
      if (progress <= 75) return require(`../../assets/Imgs/Dog75.png`)

      return require(`../../assets/Imgs/Dog100.png`)
    } else {
      if (progress === 0) return require(`../../assets/Imgs/Cat0.png`)
      if (progress <= 25) return require(`../../assets/Imgs/Cat25.png`)
      if (progress <= 50) return require(`../../assets/Imgs/Cat50.png`)
      if (progress <= 75) return require(`../../assets/Imgs/Cat75.png`)
      return require(`../../assets/Imgs/Cat100.png`)
    }
  }
  return (
    <PamilyImageContainer>
      <Image source={getImageSource()} style={{ width: 255, height: 255 }} />
    </PamilyImageContainer>
  )
}

const PamilyImageContainer = styled.View`
  height: 255px;
  width: 100%;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  position: absolute;
  z-index: 0;
  bottom: 0px;
`
