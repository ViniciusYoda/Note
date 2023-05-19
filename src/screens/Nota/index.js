import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { salvarNota, pegarNotas, atualizarNota, deletarNota } from '../api/notas';

export default function Nota({ navigation }) {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    carregarNotas();
  }, []);

  const carregarNotas = async () => {
    const notas = await pegarNotas();
    setNotas(notas);
  };

  const criarNota = async () => {
    const data = { titulo, conteudo };
    const notaID = await salvarNota(data);
    if (notaID) {
      setTitulo('');
      setConteudo('');
    }
  };

  const atualizarNotaAtual = async (notaID) => {
    const data = { titulo, conteudo };
    const result = await atualizarNota(notaID, data);
    if (result === 'ok') {
      setTitulo('');
      setConteudo('');
    }
  };

  const removerNota = async (notaID) => {
    const result = await deletarNota(notaID);
    if (result === 'ok') {
      setTitulo('');
      setConteudo('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nota</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={(text) => setConteudo(text)}
      />
      <Button title="Criar Nota" onPress={criarNota} />
      <View>
        {notas.map((nota) => (
          <View key={nota.id} style={styles.notaContainer}>
            <Text style={styles.notaTitulo}>{nota.titulo}</Text>
            <Text style={styles.notaConteudo}>{nota.conteudo}</Text>
            <Button title="Atualizar" onPress={() => atualizarNotaAtual(nota.id)} />
            <Button title="Remover" onPress={() => removerNota(nota.id)} />
          </View>
        ))}
      </View>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  notaContainer: {
    marginBottom: 16,
  },
  notaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notaConteudo: {
    marginBottom: 8,
  },
});
