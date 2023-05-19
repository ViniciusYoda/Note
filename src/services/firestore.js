import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

export async function salvarNota(data) {
  try {
    const docRef = await addDoc(collection(db, 'notas'), data);
    return docRef.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pegarNotas() {
  try {
    const querySnapshot = await getDocs(collection(db, 'notas'));
    let notas = [];
    querySnapshot.forEach((doc) => {
      let nota = { id: doc.id, ...doc.data() };
      notas.push(nota);
    });
    return notas;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function atualizarNota(notaID, data) {
  try {
    const notaRef = doc(db, 'notas', notaID);
    await updateDoc(notaRef, data);
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'erro';
  }
}

export async function deletarNota(notaID) {
  try {
    const notaRef = doc(db, 'notas', notaID);
    await deleteDoc(notaRef);
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'erro';
  }
}
