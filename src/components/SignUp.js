import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {Container, Content, Form, H3, Footer, Button, Text} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
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
                alignItems: 'center',
                justifyContent: 'center'
            },
            header: {
                alignSelf: 'center',
                color: '#e5ddcb',
                letterSpacing: 0.5,
            },
            formRow: {
                backgroundColor: '#ccc',
                justifyContent: 'center'
            },
            form: {
                flex: 1,
            },
            button: {
                alignSelf: 'center'
            },
            text: {
                alignSelf: 'center'
            },
            footerRow: {
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'flex-end'
            },
            footer: {
                // backgroundColor: 'transparent'
            }
        };

        return (
            <Container style={styles.container}>
                {/*<Content style={styles.content}>*/}
                <Grid style={styles.content}>
                    <Row size={1} style={styles.headerRow}>
                        <H3 style={styles.header}>REGISTER</H3>
                    </Row>

                    <Row size={3} style={styles.formRow}>
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

                            <ButtonRound disabled={false} onPress={()=>Actions.verification()} text="Enter"/>

                            <Button style={styles.button} transparent onPress={()=>Actions.signIn()}>
                                <Text style={styles.text}>Already have an account? Sign In</Text>
                            </Button>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>

                    <Row size={1} style={styles.footerRow}>
                        <Footer style={styles.footer}>
                            <Button style={styles.button} transparent onPress={()=>Actions.signIn()}>
                                <Text style={styles.text}>Skip</Text>
                            </Button>
                        </Footer>
                    </Row>
                </Grid>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default SignUp;