import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import  ButtonRound  from './common/ButtonRound';
import  IconInput  from './common/IconInput';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: '', loading: false};
    }

  onButtonPress() {
    console.log(this.state);
  }

  render() {
    return (
        <Container>
          <Content>
            <IconInput
                placeholder="istifadeci"
                icon="ios-person"
                value={this.state.email}
                onChangeText={email => this.setState({email})}
            />
            <IconInput
                secureTextEntry
                placeholder="sifre"
                icon="key"
                value={this.state.password}
                onChangeText={password => this.setState({password})}
            />

            <ButtonRound disabled={false} onPress={this.onButtonPress.bind(this)} text="Enter" />
          </Content>
        </Container>

    );
  }
}

export default SignIn;
