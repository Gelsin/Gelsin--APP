import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {Container, Form, H3, Footer, Header, Button, Text, Input, Item} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';

class Verification extends Component {
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
            headerRow: {
                flexDirection: 'column',
                marginTop: 40
            },
            header: {
                backgroundColor: 'transparent',
                alignItems:'flex-end',
                elevation: 0,
                shadowOpacity: 0,
                height: Dimensions.get('window').height * 0.15
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
                alignItems: 'center'
            },
            button: {
                alignSelf: 'center',
            },
            text: {
                textAlign: 'center',
                alignSelf: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'SourceSansPro-Regular',
                fontSize: 15

            },
            footer: {
                backgroundColor: 'transparent',
            },
            item: {
                borderColor: 'rgba(255, 255, 255, 0.5)'
            },
            input: {
                textAlign: 'center',
                color: '#e5ddcb',
                fontFamily: 'SourceSansPro-Regular'
            }
        };

        return (
            <Container style={styles.container}>
                {/*<Content style={styles.content}>*/}
                <Header style={styles.header}>
                    <H3 style={styles.title}>VERIFICATION</H3>
                </Header>

                <Grid style={styles.content}>
                    <Row size={1} style={styles.headerRow}>
                        <Text style={styles.text}>
                            Please enter the verification code that we just send to your mobile
                        </Text>
                    </Row>

                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>
                            <Item  style={styles.item}>
                                <Input
                                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                    style={styles.input}
                                />
                            </Item>

                            <ButtonRound disabled={false} onPress={()=>Actions.signIn()} text="Verify"/>
                        </Form>
                    </Row>
                </Grid>

                <Footer style={styles.footer}>
                    <Button style={styles.button} transparent onPress={()=>Actions.signUp()}>
                        <Text style={styles.text}>
                            Resend Code
                        </Text>
                    </Button>
                </Footer>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default Verification;
