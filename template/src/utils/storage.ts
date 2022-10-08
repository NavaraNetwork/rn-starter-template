import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAsyncStorage {
  set(key: string, value: number | string | object): Promise<void>;
  get(key: string): Promise<string | number | object | null>;
  remove(key: string): Promise<void>;
}

export const asyncStorage: IAsyncStorage = {
  set: async (key, value) => {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  get: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  },
  remove: async key => await AsyncStorage.removeItem(key),
};
