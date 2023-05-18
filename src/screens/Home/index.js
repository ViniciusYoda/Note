import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../../config/firebase';

export default function Home({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('notes').onSnapshot((snapshot) => {
      const updatedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(updatedNotes);
    });

    return () => unsubscribe();
  }, []);

  function deleteNote(noteId) {
    db.collection('notes').doc(noteId).delete();
  }

  return (
    <View>
      {notes.map((note) => (
        <View key={note.id}>
          <Text>{note.title}</Text>
          <Text>{note.content}</Text>
          <Button title="Editar" onPress={() => navigation.navigate('EditNote', { noteId: note.id })} />
          <Button title="Excluir" onPress={() => deleteNote(note.id)} />
        </View>
      ))}
      <Button title="Criar Nota" onPress={() => navigation.navigate('CreateNote')} />
    </View>
  );
}
