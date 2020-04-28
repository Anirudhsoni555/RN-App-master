import React, {
  FC,
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import {AsyncStorage} from 'react-native';

interface User {
  fullName?: string;
  email: string;
  password?: string;
}

type SessionPayload = {isLoggedin: boolean; fullName: string};
type Session = {[key: string]: SessionPayload};
type CreateUser = (val: User) => User;
type GetUserByMail = (email: string) => User;
type SetSession = (val: User) => Session;
type GetSession = (key: string) => SessionPayload | false;
type GetActiveSession = () => string;
type ValidateUser = (email: string, password: string) => User | false;
interface userContext {
  create?: CreateUser;
  getUserByEmail?: GetUserByMail;
  setSession?: SetSession;
  getSession?: GetSession;
  getActiveSession?: GetActiveSession;
  validateUser?: ValidateUser;
}

const UserContext = createContext<userContext>({});

const getSetAsyncStorageKey = async (key: string, cb: Function) => {
  const result = await AsyncStorage.getItem(key);
  if (result === null) {
    return;
  }
  const objResult: Record<string, User> = JSON.parse(result);
  cb(objResult);
};

const uploadToAsyncStorage: <T>(key: string, value: T) => void = (
  key,
  value,
) => {
  if (Object.keys(value).length) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }
};
export const UserContextProvider: FC<{}> = (props) => {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [sessionData, setSessionData] = useState<
    Record<string, SessionPayload>
  >({});
  const [activeSession, setActiveSession] = useState('');

  useEffect(() => {
    getSetAsyncStorageKey('users', setUsers);
    getSetAsyncStorageKey('sessions', setSessionData);
    getSetAsyncStorageKey('activeSession', setActiveSession);
  }, []);

  useEffect(() => {
    uploadToAsyncStorage('users', users);
  }, [users]);
  useEffect(() => {
    uploadToAsyncStorage('sessions', sessionData);
  }, [sessionData]);
  useEffect(() => {
    uploadToAsyncStorage('activeSession', activeSession);
  }, [activeSession]);

  const create = useCallback<CreateUser>((val) => {
    setUsers((existingUsers) => ({...existingUsers, [val.email]: val}));
    return val;
  }, []);
  const getUserByEmail = useCallback<GetUserByMail>(
    (email: string) => {
      return users[email];
    },
    [users],
  );
  const validateUser = useCallback<ValidateUser>(
    (email: string, password: string) => {
      return users[email] && users[email].password === password
        ? users[email]
        : false;
    },
    [users],
  );
  const setSession = useCallback<SetSession>((val) => {
    const value = {
      [val.email]: {isLoggedin: true, fullName: val.fullName ?? ''},
    };
    setSessionData(value);
    setActiveSession(val.email);
    return value;
  }, []);
  const getSession = useCallback<GetSession>(
    (val) => {
      return !sessionData[val] || sessionData[val];
    },
    [sessionData],
  );
  return (
    <UserContext.Provider
      value={{
        create,
        getUserByEmail,
        setSession,
        getSession,
        getActiveSession: () => activeSession,
        validateUser,
      }}
      {...props}
    />
  );
};

export const useUserContext = () => useContext(UserContext);
