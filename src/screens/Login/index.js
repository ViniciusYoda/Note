import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { loginWithGoogle, logout } from '../../services/auth';

export default function Login({navigation}) {
  const [user, setUser] = useState(null);

  const handleLoginWithGoogle = async () => {
    try {
      const userData = await loginWithGoogle();
      setUser(userData);
      navigation.navigate('Perfil');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text style={styles.welcomeText}>Bem-vindo, {user.displayName}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Text style={styles.loginText}>Faça login com o Google</Text>
          <Button title="Login com Google" onPress={handleLoginWithGoogle} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loginText: {
    fontSize: 20,
    marginBottom: 16,
  },
});
