import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../config/firebase';

export default function CreateNote({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function createNote() {
    db.collection('notes').add({
      title,
      content,
    }).then(() => {
      navigation.goBack();
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <View>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Conteúdo" value={content} onChangeText={setContent} />
      <Button title="Criar Nota" onPress={createNote} />
    </View>
  );
}
