/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Container } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { NativeRouter, Route } from 'react-router-native';
import { SignUp } from './screens/Signup';
import { SignIn } from './screens/Signin';
import { Welcome } from './screens/Welcome';
import { UserContextProvider } from './contexts/User';
import { Landing } from './screens/Landing';
import { StatusBar, Platform } from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NativeRouter>
        <UserContextProvider>
          <Container>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/welcome" component={Welcome} />
          </Container>
        </UserContextProvider>
      </NativeRouter>
    </>
  );
};

export default App;
