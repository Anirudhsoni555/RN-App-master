import React, { FC, useState, useEffect } from 'react';
import { Container, Header, Text, Button, Icon, Content } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useUserContext } from '../contexts/User';
import { useHistory } from 'react-router-native';
import { StyleSheet } from 'react-native';

export const Welcome: FC = () => {
  const [name, setName] = useState('');
  const { push } = useHistory();
  const { getActiveSession, getSession } = useUserContext();
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [region, setRegion] = useState<Region>({
    ...location,
    latitudeDelta: 0.095,
    longitudeDelta: 0.091,
  });
  useEffect(() => {
    const activeSessionKey = getActiveSession!();
    const activeSession = getSession!(activeSessionKey);
    if (activeSession) {
      setName(activeSession.fullName);
    }
  }, [getSession, getActiveSession]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      (error) => {
        alert(`${JSON.stringify(error)} is error`);
      },
    );
  }, []);

  useEffect(() => {
    setRegion((rn) => ({
      ...rn,
      ...location,
    }));
  }, [location]);
  return (
    <Container>
      <Header style={styles.header}>
        <Text style={[styles.lightColor, styles.lobsterFont]}>
          Welcome {name}
        </Text>
        <Button onPress={() => push('/')} transparent>
          <Icon name="md-log-out" />
        </Button>
      </Header>
      <Content contentContainerStyle={styles.content}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              featureType: 'poi.business',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'road.arterial',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'road.local',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
          ]}
          style={{ height: '100%', width: '100%' }}
          region={region}
          onRegionChange={setRegion}
          showsUserLocation
          showsIndoorLevelPicker
          loadingEnabled
        />
        {/* <Text style={[styles.lightColor, styles.lobsterFont]}>
          This is your dashboard......
        </Text>
        <Text style={[styles.lightColor, styles.lobsterFont]}>
          I know it's empty but wait for the awesome content here
        </Text> */}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  lightColor: {
    color: '#ffffff',
  },
  lobsterFont: {
    fontFamily: 'Lobster',
    fontSize: 20,
    fontWeight: '800',
  },
  content: {
    display: 'flex',
    flex: 1,
    // height: 400,
    // width: 400,
    //backgroundColor: 'rgb(11,25,42)',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 50,
  },
});
