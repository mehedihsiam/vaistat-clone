import AsyncStorage from '@react-native-async-storage/async-storage';

const set = async (key: string, data: string) => {
  try {
    const res = await AsyncStorage.setItem(key, data);

    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const get = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    return false;
  }
};

const remove = async (key: string) => {
  try {
    const res = await AsyncStorage.removeItem(key);
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const storage = {
  set,
  get,
  remove,
};

export default storage;
