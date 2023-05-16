import { View, Text, TouchableWithoutFeedback, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import useFetch from '../hooks/useFetch'
import {REACT_APP_RM} from '@env'

export const EpisodeCard = ({character}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text>{character.name}</Text>
        <Text>{character.episode}</Text>
        <Text>{character.air_date}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const Episodes = () => {
  const {loading, data} = useFetch(REACT_APP_RM+"/episode")
  const renderItem= ({item}) => <EpisodeCard character={item}/>
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
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

export default Episodes

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