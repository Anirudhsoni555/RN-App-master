import React, { FC, useState, useCallback, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { object, string } from 'yup';
import {
  Container,
  Header,
  Left,
  Body,
  Content,
  Button,
  Icon,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import { useUserContext } from '../contexts/User';
import { useHistory } from 'react-router-native';

const SignupSchema = object().shape({
  fullName: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string().required(),
});

export const SignUp: FC = () => {
  const { push, goBack } = useHistory();
  const { create, setSession } = useUserContext();
  const [isFormValid, setIsFormValid] = useState(false);
  const [maskPassword, setMaskPassword] = useState({
    password: true,
    confirmPassword: true,
  });
  const [formData, setFormData] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const setFormDataByKey = useCallback(
    (key: 'fullName' | 'email' | 'password' | 'confirmPassword') => (
      value: string,
    ) => {
      setFormData((data) => ({ ...data, [key]: value }));
    },
    [],
  );
  const toggleMaskPassword = useCallback(
    (key: 'password' | 'confirmPassword') => {
      setMaskPassword((toggleState) => ({
        ...toggleState,
        [key]: !toggleState[key],
      }));
    },
    [],
  );
  const handleSubmit = useCallback(() => {
    const user = create!({
      email: formData.email ?? '',
      fullName: formData.fullName,
      password: formData.password,
    });
    setSession!(user);
    push('/welcome');
  }, [
    formData.email,
    formData.fullName,
    formData.password,
    push,
    setSession,
    create,
  ]);

  useEffect(() => {
    setIsFormValid(SignupSchema.isValidSync(formData));
  }, [formData, setIsFormValid]);

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <Left>
          <Button onPress={goBack} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Text style={styles.headerText}>MoLink Logo Placeholder</Text>
        </Body>
      </Header>
      <Content>
        <Content contentContainerStyle={styles.subheader}>
          <Text style={[styles.content, styles.signUpHeading]}>Sign Up</Text>
          <Text style={[styles.content, styles.signUpSubheading]}>
            Get Started with Mo Link
          </Text>
        </Content>

        <Form style={styles.form}>
          <Item floatingLabel>
            <Label style={styles.formLabel}>Email</Label>
            <Input
              onChangeText={setFormDataByKey('email')}
              value={formData.email}
              style={styles.formInput}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.formLabel}>Full Name</Label>
            <Input
              onChangeText={setFormDataByKey('fullName')}
              value={formData.fullName}
              style={styles.formInput}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.formLabel}>Password</Label>
            <Input
              onChangeText={setFormDataByKey('password')}
              value={formData.password}
              secureTextEntry={maskPassword.password}
              style={styles.formInput}
            />
            <Icon
              onPress={() => toggleMaskPassword('password')}
              name={!maskPassword.password ? 'md-eye-off' : 'md-eye'}
              style={styles.eyeIcon}
            />
          </Item>
          <Item floatingLabel>
            <Label style={styles.formLabel}>Confirm Password</Label>
            <Input
              onChangeText={setFormDataByKey('confirmPassword')}
              value={formData.confirmPassword}
              secureTextEntry={maskPassword.confirmPassword}
              style={styles.formInput}
            />
            <Icon
              onPress={() => toggleMaskPassword('confirmPassword')}
              name={!maskPassword.confirmPassword ? 'md-eye-off' : 'md-eye'}
              style={styles.eyeIcon}
            />
          </Item>
          <Button
            disabled={!isFormValid}
            rounded
            onPress={handleSubmit}
            style={styles.formItem}
            block>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(11,25,42)',
    display: 'flex',
  },
  header: {
    backgroundColor: 'rgb(11,25,42)',
  },
  headerText: {
    color: 'white',
  },
  subheader: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    color: '#ffffff',
  },
  signUpHeading: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Lobster',
    marginTop: 20,
  },
  signUpSubheading: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Lobster',
    marginTop: 20,
  },
  form: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    alignItems: 'flex-start',
  },
  formItem: {
    marginTop: 20,
  },
  formLabel: {
    color: '#ffffff',
  },
  formInput: {
    color: '#ffffff',
  },
  eyeIcon: {
    color: '#ffffff',
  },
});
