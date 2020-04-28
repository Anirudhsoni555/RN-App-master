import React, {FC} from 'react';
import {
  Container,
  Header,
  Text,
  Body,
  Content,
  Button,
  Icon,
} from 'native-base';
import {useHistory} from 'react-router-native';
import {StyleSheet} from 'react-native';

export const Landing: FC = () => {
  const {push} = useHistory();

  return (
    <Container>
      <Content contentContainerStyle={styles.body}>
        <Body
          style={{
            maxHeight: 40,
          }}>
          <Text style={[styles.heading]}>Welcome to Mo Link App</Text>
        </Body>

        <Button
          style={styles.centerText}
          onPress={() => push('/login')}
          rounded
          primary>
          <Icon name="md-log-in" />
          <Text>Sign In</Text>
        </Button>
        <Button
          onPress={() => push('/signup')}
          style={[styles.centerText, {marginTop: 20}]}
          rounded
          info>
          <Icon name="md-person-add" />
          <Text>Sign Up</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgb(11,25,42)',
  },
  headerContent: {
    color: '#ffffff',
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgb(11,25,42)',
  },
  heading: {
    fontFamily: 'Lobster',
    color: '#ffffff',
  },
  centerText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
