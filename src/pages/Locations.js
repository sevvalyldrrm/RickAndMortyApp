import { View, Text, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import {REACT_APP_RM} from '@env'
import useFetch from '../hooks/useFetch'
import { ActivityIndicator } from 'react-native-paper'

export const LocationCard = ({character}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.name}>Planet : {character.name}</Text>
        <Text>{character.type}</Text>
        <Text>Created : {character.created}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
const Locations = () => {
  const {loading, data} = useFetch(REACT_APP_RM+"/location");
  const renderItem = ({item}) => <LocationCard character={item}/>;

  return (
    <View>
    {loading ? (
      <ActivityIndicator size="large"/>
    ) : (
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={({id}) => id.toString()}
    />
    )}
  </View>
  )
}

export default Locations;

const styles = StyleSheet.create({
  container : {
    borderWidth : 1,
    margin : 10,
    borderRadius : 10,
    backgroundColor : '#454545',
    flex : 1
  },
  name : {
    
  }
})