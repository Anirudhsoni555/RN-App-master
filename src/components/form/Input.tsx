import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Input as NativeBaseInput } from 'native-base';

export const Input: FC = () => <NativeBaseInput style={styles.input} />;

const styles = StyleSheet.create({
  input: {
    color: '#ffffff',
  },
});
