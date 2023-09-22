import React from 'react'
import { Image, Text, View } from 'react-native'

import styles from 'styles'

const ConstituencyItem = ({ item }) => (
  <View style={styles.constituencyItem}>
    <Image source={{ uri: item.picture }} style={styles.constituencyImage} />
    <Text style={styles.value}>{item.name}</Text>
  </View>
)

export default ConstituencyItem
