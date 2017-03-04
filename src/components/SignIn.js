import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {Container, Form, H3, Header, Footer, Button, Text} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';
import  IconInput  from './common/IconInput';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: '', loading: false};
    }

    onButtonPress() {
        console.log(this.state);
        Actions.main();
    }

    render() {

        const styles = {
            container: {
                backgroundColor: '#524656',
                alignItems: 'center'
            },
            content: {
                flex: 1,
                width: Dimensions.get('window').width * 0.8
            },
            header: {
                backgroundColor: 'transparent',
                alignItems:'flex-end',
                elevation: 0,
                shadowOpacity: 0,
                height: Dimensions.get('window').height * 0.15,
            },
            title: {
                color: '#e5ddcb',
                letterSpacing: 0.5,
                fontSize: 16,
                fontFamily: 'SourceSansPro-Semibold'
            },
            formRow: {
                justifyContent: 'center'
            },
            form: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            button: {
                alignSelf: 'center',
            },
            text: {
                textAlign: 'center',
                alignSelf: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'SourceSansPro-Regular'
            },
            footer: {
                backgroundColor: 'transparent'
            }
        };

        return (
            <Container style={styles.container}>
                {/*<Content style={styles.content}>*/}
                <Header style={styles.header}>
                    <H3 style={styles.title}>LOGIN</H3>
                </Header>

                <Grid style={styles.content}>
                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>
                            <IconInput
                                placeholder="istifadəçi@email.az"
                                icon="ios-mail-outline"
                                value={this.state.email}
                                onChangeText={email => this.setState({email})}
                            />

                            <IconInput
                                secureTextEntry
                                placeholder="Şifrə"
                                icon="ios-lock-outline"
                                value={this.state.password}
                                onChangeText={password => this.setState({password})}
                            />

                            <ButtonRound disabled={false} onPress={this.onButtonPress.bind(this)} text="Sign in"/>

                            <Button autoCapitalize="none" style={styles.button} transparent onPress={()=>Actions.resetPassword()}>
                                <Text autoCapitalize="none" style={styles.text}>Forget your password?</Text>
                            </Button>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>
                </Grid>

                <Footer style={styles.footer}>
                    <Button style={styles.button} transparent onPress={()=>Actions.signUp()}>
                        <Text style={styles.text}>
                            Don't have an account. Create one
                        </Text>
                    </Button>
                </Footer>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default SignIn;
