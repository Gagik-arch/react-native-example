import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage {
    static async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (e) {
            return new Error(e);
        }
    };

    static async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            return new Error(e);
        }
    };

    static async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            return new Error(e);
        }
    };

    static async clearStorage() {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            return new Error();
        }
    };
}

