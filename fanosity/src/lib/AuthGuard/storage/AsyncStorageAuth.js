import { AsyncStorage } from 'react-native';
import Storage from './Storage';

const DEFAULT_STORAGE_KEY = 'auth';

export default class AsyncStorageAuth extends Storage {
    serialize = JSON.stringify;
    deserialize = JSON.parse;

    refreshCache() {
        return this.retrieveAuth()
            .then((auth) => {
                this.cachedAuth = auth;
                return this.cachedAuth;
            });
    }

    async persistAuth(authPayload) {
        try {
            const localStorageKey = this.config.getSetting('storageKey', DEFAULT_STORAGE_KEY);

            await AsyncStorage.setItem(localStorageKey, this.serialize(authPayload));
            await this.refreshCache();
            return authPayload;
        } catch (e) {
            return Promise.reject(new Error('Unable to persist auth state to localStorage'));
        }
    }

    async clearAuth() {
        this.clearCache();

        const localStorageKey = this.config.getSetting('storageKey', DEFAULT_STORAGE_KEY);
        return AsyncStorage.removeItem(localStorageKey);
    }

    async retrieveAuth() {
        try {
            const localStorageKey = this.config.getSetting('storageKey', DEFAULT_STORAGE_KEY);
            const storedAuthString = await AsyncStorage.getItem(localStorageKey);
            if (storedAuthString) {
                try {
                    return this.deserialize(storedAuthString);
                } catch (e) {
                    console.warn('Error deserializing auth state from localStorage, resetting state...', e);
                    return await AsyncStorage.removeItem(localStorageKey);
                }
            }
        } catch (e) {
            console.log(e);
            return Promise.reject(new Error('Unable to retrieve auth state from localStorage'));
        }
    }
}
