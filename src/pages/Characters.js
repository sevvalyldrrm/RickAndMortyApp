import React from 'react';
import {View, Text, FlatList, StyleSheet, Image , Dimensions, TouchableWithoutFeedback} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {REACT_APP_DENEME} from '@env';
import useFetch from '../hooks/useFetch';

export const CharacterCard = ({character}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: character.image}} />
        <View style={styles.bodyContainer}>
          <Text style={styles.name} >{character.name}</Text>
          <Text style={styles.status}>{character.status} - {character.species}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const Characters = () => {
  const {loading, characters} = useFetch(REACT_APP_DENEME);
  const renderItem = ({item}) => <CharacterCard character={item} />;

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large"/>
      ) : (
        <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={({id}) => id.toString()}
      />
      )}
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    borderWidth : 1,
    borderRadius : 8,
    margin : 10,
    flexDirection : 'row'
  },
  bodyContainer : {
    paddingTop : 5,
    paddingHorizontal : 15,
  },
  image : {
    resizeMode : 'contain',
    margin : 5,
    borderRadius : 8,
    height : Dimensions.get('window').height / 5.5,
    width : Dimensions.get('window').width / 2.8,
    opacity : 2
  },
  name : {
    fontSize : 17,
    fontWeight : '700'
  },
  status : {
    paddingVertical : 10,
    fontWeight : '500'
  }

});
