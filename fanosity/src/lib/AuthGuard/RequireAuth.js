import React, { Component } from 'react';
import _ from 'lodash';
import { guardian } from './index';

export default function (ComposedComponent, FailedComponent) {
    class Authentication extends Component {
        state = {
            isLoggedIn: guardian.isLoggedIn()
        };

        componentDidMount() {
            guardian.on('updatedToken', () => {
                console.log("Tokens Updated!");
                this.setState({ isLoggedIn: guardian.isLoggedIn() })
            });
        }

        renderFailedAuth() {
            if (FailedComponent) {
                return <FailedComponent {...this.props} />;
            }

            return <div>Unauthenticated</div>;
        }

        render() {
            if (!this.state.isLoggedIn) {
                return this.renderFailedAuth();
            }
            return <ComposedComponent {...this.props} />;
        }
    }

    return Authentication;
}
