import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from 'styles';


const UpdateConstituencyItems = ({ item, handleConstituencySelection }) => (
  <View style={styles.flexContainer}>
    <View style={styles.constituencyItem}>
      <Image source={{ uri: item?.picture }} style={styles.constituencyImage} />
      <Text style={styles.value}>{item?.name}</Text>
    </View>
    <View style={{ ...styles.constituencyItem, justifyContent: 'flex-end' }}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleConstituencySelection(item)}
      ></TouchableOpacity>
    </View>
  </View>
)

export default UpdateConstituencyItems
