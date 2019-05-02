import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux';

import reducers from './reducers';
import Router from './Router';
import { FANOSITY_AUTH_URL, FANOSITY_GRAPHQL_URL } from './config/apiEndpoints';
import { apolloLinkHandleAuthError, apolloLinkWithAuth, guardian } from './lib/AuthGuard';

// wireup redux thunk. The 2nd arg is any initial state we want to pass in. Optional. Usually used for server-side rendering.
const store = createStore(reducers, {}, applyMiddleware(thunk));

// Apollo setup
const apolloLinkHttp = createHttpLink({ uri: FANOSITY_GRAPHQL_URL });
export const apolloClient = new ApolloClient({
    link: ApolloLink.from([
        apolloLinkWithAuth,
        apolloLinkHandleAuthError,
        apolloLinkHttp
    ]),
    cache: new InMemoryCache()
});

const authSettings = {
    authUrl: FANOSITY_AUTH_URL
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default class App extends Component {
    state = {
        guardianLoading: true
    };

    componentDidMount() {
        console.disableYellowBox = true;
        const config = {
            apiKey: 'AIzaSyBpDeiMuOQeqPwnARZ4HrFFE9WJnf5kHVA',
            authDomain: 'mabrntest.firebaseapp.com',
            databaseURL: 'https://mabrntest.firebaseio.com',
            projectId: 'mabrntest',
            storageBucket: '',
            messagingSenderId: '75644645782'
        };
        firebase.initializeApp(config);

        guardian.init(authSettings)
            .then(() => {
                guardian.on('logoutSuccess', () => {
                    console.log('Logged Out');
                    Actions.entry();
                });
                guardian.on('updatedToken', () => {
                    console.log('Tokens updated');
                });
                this.setState({ guardianLoading: false })
            });
    }

    render() {
        if (this.state.guardianLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                    <Router />
                </Provider>
            </ApolloProvider>
        );
    }
}
