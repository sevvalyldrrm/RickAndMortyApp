import {View, Text, Button, FlatList, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const CharacterCard = ({character}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: character.image}} />
        <View style={styles.bodyContainer}>
          <Text>{character.name}</Text>
          <Text>{character.status}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Characters = () => {
  const [character, setCharacter] = useState([]);

  async function fetchData() {
    const response = await axios.get(
      'https://rickandmortyapi.com/api/character',
    );
    setCharacter(response.data.results);

    // const responsenext = await axios.get(
    //   response.data.info.next
    // );
  }

  const renderItem = ({item}) => <CharacterCard character={item} />;

  return (
    <View>
      <FlatList
        data={character}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Fetch Data" onPress={fetchData} />
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({
  image : {
    width : 50,
    height : 50
  }
});
