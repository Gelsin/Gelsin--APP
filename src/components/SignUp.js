import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {Container, Content, Form, H3, Header, Footer, Button, Text} from 'native-base';
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
                width: Dimensions.get('window').width * 0.8
            },
            header: {
                backgroundColor: 'transparent',
                alignItems:'flex-end',
                elevation: 0,
                // justifyContent: 'flex-end',
                height: Dimensions.get('window').height * 0.15
            },
            title: {
                //alignSelf: 'center',
                color: '#e5ddcb',
                letterSpacing: 0.5,
                fontSize: 16,
                fontFamily: 'SourceSansPro'
            },
            formRow: {
                // backgroundColor: '#ccc',
                justifyContent: 'center'
            },
            form: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            button: {
                alignSelf: 'center',
                // marginTop: 10
            },
            text: {
                alignSelf: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'SourceSansPro'

            },
            // footerRow: {
            //     backgroundColor: '#fff',
            //     justifyContent: 'center',
            //     alignItems: 'flex-end'
            // },
            footer: {
                backgroundColor: 'transparent',

                // justifyContent: 'center',
                // alignItems: 'flex-end'
            }
        };

        return (
            <Container style={styles.container}>
                {/*<Content style={styles.content}>*/}
                <Header style={styles.header}>
                    <H3 style={styles.title}>REGISTER</H3>
                </Header>

                <Grid style={styles.content}>
                    {/*<Row size={1} style={styles.headerRow}>*/}
                        {/*<H3 style={styles.header}>REGISTER</H3>*/}
                    {/*</Row>*/}

                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>
                            <IconInput
                                placeholder="+994 44 444 44 44"
                                icon="ios-call-outline"
                            />

                            <IconInput
                                placeholder="Ad Soyad"
                                icon="ios-person-outline"
                            />

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

                            <ButtonRound disabled={false} onPress={()=>Actions.verification()} text="Enter"/>

                            <Button style={styles.button} transparent onPress={()=>Actions.signIn()}>
                                <Text style={styles.text}>Already have an account? Sign In</Text>
                            </Button>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>

                    {/*<Row size={1} style={styles.footerRow}>*/}
                        {/**/}
                    {/*</Row>*/}
                </Grid>

                <Footer style={styles.footer}>
                    <Button style={styles.button} transparent onPress={()=>Actions.signIn()}>
                        <Text style={styles.text}>Skip</Text>
                    </Button>
                </Footer>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default SignUp;