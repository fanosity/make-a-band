import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { View, Text } from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import reducers from "./src/reducers";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
import Router from "./src/Router";
// import client from "./src/client";

export const client = new ApolloClient({
    uri: "https://dev-next-api.fanosity.com/graphql"
});

const store = createStore(reducers,
    {},
        applyMiddleware(ReduxThunk)
    );

class App extends Component {
    componentWillMount() {
        console.disableYellowBox = true;
        const config = {
            apiKey: "AIzaSyBpDeiMuOQeqPwnARZ4HrFFE9WJnf5kHVA",
            authDomain: "mabrntest.firebaseapp.com",
            databaseURL: "https://mabrntest.firebaseio.com",
            projectId: "mabrntest",
            storageBucket: "",
            messagingSenderId: "75644645782"
        };
        firebase.initializeApp(config);
    }

    render() {
        // wireup redux thunk. The 2nd arg is any initial state we want to pass in. Optional. Usually used for server-side rendering.
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                <Router />
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;
