import {Container, Content, Text, StyleProvider} from 'native-base';
import React, {Component} from 'react';
import textTheme from '../../native-base-theme/components/';
import platform from '../../native-base-theme/variables/platform';

export default class Custom extends Component {
    render() {
        return (
            <Container>
                <StyleProvider style={textTheme(platform)}>
                    <Content>
                        <Text>
                            I have changed the text color.
                        </Text>
                    </Content>
                </StyleProvider>
            </Container>
        );
    }
}
