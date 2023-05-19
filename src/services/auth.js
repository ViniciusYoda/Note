import { auth, googleProvider } from "../config/firebase";

export async function loginWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function logout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
