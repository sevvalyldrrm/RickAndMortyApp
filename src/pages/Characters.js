import {View, Text, Button, FlatList, StyleSheet, Image , Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

export const CharacterCard = ({character}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: character.image}} />
        <View style={styles.bodyContainer}>
          <Text style={styles.name} >{character.name}</Text>
          <Text>{character.status} - {character.species}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const URL = 'https://rickandmortyapi.com/api/character'

const Characters = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  async function fetchData() {
    try {
      const result = await axios.get(URL);
      const {info, results} = result.data;
      let pages = [results];
      setLoading(false);

      for (let i=2; i<=info.pages; i++){
        const res = await axios.get(`${URL}?page=${i}`);
        pages.push(res.data.results);
      }

      const flattenedPages = pages.flat();
      const filteredCharacters = flattenedPages.filter((char => char.id >= 0 && char.id <= 100));

      setCharacters(filteredCharacters)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  } , [])

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
    paddingHorizontal : 15
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

});
