import React from 'react';
import {View, Text, FlatList, StyleSheet, Image , Dimensions, TouchableWithoutFeedback} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {REACT_APP_RM} from '@env';
import useFetch from '../hooks/useFetch';

export const CharacterCard = ({character, onSelect}) => {
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
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
const Characters = ({navigation}) => {
  const {loading, data} = useFetch(REACT_APP_RM+"/character");

 const handleCharacterDetailSelect = (id => {
  navigation.navigate('CharacterDetailScreen' , {id});
 })

  const renderItem = ({item}) => <CharacterCard character={item}  onSelect={() => handleCharacterDetailSelect(item.id)}/>;
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
  );
};

export default Characters;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    borderWidth : 1,
    borderRadius : 10,
    margin : 10,
    flexDirection : 'row',
    backgroundColor : '#454545'
  },
  bodyContainer : {
    paddingTop : 5,
    paddingHorizontal : 15,
    flex : 1
  },
  image : {
    resizeMode : 'contain',
    margin : 5,
    borderRadius : 10,
    height : Dimensions.get('window').height / 5.5,
    width : Dimensions.get('window').width / 2.8,
    opacity : 2
  },
  name : {
    fontSize : 17,
    fontWeight : '700',
  },
  status : {
    paddingVertical : 10,
    fontWeight : '500'
  }

});
