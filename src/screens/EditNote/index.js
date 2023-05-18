import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../config/firebase';

export default function EditNote({ route, navigation }) {
  const { noteId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const getNote = async () => {
      try {
        const noteRef = db.collection('notes').doc(noteId);
        const noteSnapshot = await noteRef.get();

        if (noteSnapshot.exists()) {
          const noteData = noteSnapshot.data();
          setTitle(noteData.title);
          setContent(noteData.content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getNote();
  }, [noteId]);

  const updateNote = async () => {
    try {
      const noteRef = db.collection('notes').doc(noteId);
      await noteRef.update({
        title,
        content,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async () => {
    try {
      const noteRef = db.collection('notes').doc(noteId);
      await noteRef.delete();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Conteúdo" value={content} onChangeText={setContent} />
      <Button title="Atualizar Nota" onPress={updateNote} />
      <Button title="Excluir Nota" onPress={deleteNote} />
    </View>
  );
}
