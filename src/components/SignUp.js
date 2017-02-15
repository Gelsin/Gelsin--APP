import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {Container, Content, Form, H3, Footer, Text} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import  ButtonRound  from './common/ButtonRound';
import  IconInput  from './common/IconInput';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: '', loading: false};
    }

    onButtonPress() {
        console.log(this.state);
    }

    render() {

        const styles = {
            container: {
                backgroundColor: '#524656',
                alignItems: 'center'
            },
            content: {
                flex: 1,
                width: Dimensions.get('window').width * 0.85
            },
            headerRow: {
                backgroundColor: '#fff',
                alignItems:'center',
                justifyContent: 'center'
            },
            header: {
                alignSelf: 'center',
                color: '#e5ddcb',
                letterSpacing: 0.5,
                marginTop: 60,
            },
            formRow: {
                backgroundColor: '#ccc',
                justifyContent: 'center'
            },
            form: {
                flex: 1,
            },
            text: {
                alignSelf: 'center'
            },
            footerRow: {
                backgroundColor: '#fff',
                justifyContent: 'center'
            },
            footer: {
                // backgroundColor: 'transparent'
            }
        };

        return (
            <Container style={styles.container}>
                {/*<Content style={styles.content}>*/}
                <Grid style={styles.content}>
                    <Row  style={styles.headerRow}>
                        <H3 style={styles.header}>Register</H3>
                    </Row>

                    <Row  style={styles.formRow}>
                        <Form style={styles.form}>
                            <IconInput
                                placeholder="+994 44 444 44 44"
                                icon="person"
                            />

                            <IconInput
                                placeholder="Ad Soyad"
                                icon="person"
                            />

                            <IconInput
                                placeholder="istifadəçi@email.az"
                                icon="person"
                                value={this.state.email}
                                onChangeText={email => this.setState({email})}
                            />
                            <IconInput
                                secureTextEntry
                                placeholder="Şifrə"
                                icon="key"
                                value={this.state.password}
                                onChangeText={password => this.setState({password})}
                            />

                            <ButtonRound disabled={false} onPress={this.onButtonPress.bind(this)} text="Enter"/>

                            <Text style={styles.text}>Already have an account? Sign In</Text>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>

                    <Row  style={styles.footerRow}>
                        <Footer style={styles.footer}>
                            <Text style={styles.text}>Dont have an account. Create one</Text>
                        </Footer>
                    </Row>
                </Grid>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default SignUp;