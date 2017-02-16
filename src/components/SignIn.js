import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {Container, Content, Form, H3, Footer, FooterTab, Button, Text} from 'native-base';
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
                justifyContent: 'center',
                alignItems: 'flex-end'
            },
            footer: {
                // backgroundColor: 'blue',
                // justifyContent: 'center',
                // alignItems: 'flex-end'
            }
        };

        return (
            <Container style={styles.container}>
                {/*<Content style={styles.content}>*/}
                <Grid style={styles.content}>
                    <Row size={2} style={styles.headerRow}>
                        <H3 style={styles.header}>LOGIN</H3>
                    </Row>

                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>
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

                            <Text style={styles.text}>Forget password?</Text>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>

                    <Row size={2} style={styles.footerRow}>
                        <Footer style={styles.footer}>
                            {/*<FooterTab style={{backgroundColor: '#ccc'}}>*/}
                                <Button transparent onPress={()=>Actions.signup()}>
                                    <Text style={styles.text}>
                                        Don't have an account. Create one
                                    </Text>
                                </Button>
                            {/*</FooterTab>*/}
                        </Footer>
                    </Row>
                </Grid>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default SignIn;
