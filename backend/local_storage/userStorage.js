import AsyncStorage from '@react-native-community/async-storage'

export class userStorage {
    static loaded = false;
    static storeUser = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("user", jsonValue);
            userStorage.userExists = true;
          } catch (e) {
            console.error(e);
          }
    }
}