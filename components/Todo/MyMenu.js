import React, { useRef, useEffect } from 'react'
import { Animated, StyleSheet, View, TouchableOpacity, Text } from 'react-native'

const MyMenu = ({ isOpen, onClose }) => {
  const translateY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: isOpen ? 0 : 300,
      useNativeDriver: true,
    }).start()
  }, [isOpen, translateY])

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 146,
          borderRadius: 8,
          margin: 16,
          backgroundColor: 'red',
          transform: [{ translateY: translateY }],
        },
      ]}
    >
      {/* //<View style={styles.menuContent}>메뉴 내용을 추가하세요</View> */}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContent: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MyMenu
