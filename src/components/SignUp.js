import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Container, Form, H3, Header, Footer, Button, Text, Spinner} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';
import  IconInput  from './common/IconInput';

class SignUp extends Component {
    constructor(props) {
        console.log("inside constructor");
        super(props);
        this.state = {contact: '', fullname: '', email: '', password: '', error: '', loading: false};
        console.log(this.state);
    }

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
    };

    onButtonPress() {
        console.log('button pressed');

        const {contact, fullname, email, password} = this.state;

        this.setState({error: '', loading: true});
        console.log(this.state);

        //let url = gelsin.az/app/api/auth/register + encodeURIComponent(this.state.email);

        fetch('http://gelsin.az/app/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                contact,
                fullname,
                email,
                password
            })
        })
            .then((response) => response.json()
                .then((responseData) => {
                    console.log("inside responsejson");
                    console.log('response object:', responseData);
                    this.setState({loading: false});

                    switch (responseData.error) {
                        case false: {
                            this.onRegisterSuccess();
                        }

                        default: {
                            this.setState({error: responseData.message});
                        }
                    }
                })
                .catch((error) => {
                    console.log("Inside nested catch");
                    console.log(error);
                    this.setState({loading: false});
                })
            )
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
        // .done();
    }

    onRegisterFail() {
        this.setState({error: 'Authentication failed', loading: false});
    }

    onRegisterSuccess() {
        this.setState({
            contact: '',
            fullname: '',
            email: '',
            password: '',
            error: '',
            loading: false
        });

        Actions.signIn();
    }


    renderButton() {
        if (this.state.loading) {
            return (
                <Spinner color='#eb7b59'/>
            )
        }
        return (
            <ButtonRound onPress={this.onButtonPress.bind(this)} text="Sign up"/>
        );
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
                alignItems: 'flex-end',
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
                backgroundColor: 'transparent',
            }
        };

        return (
            <Container style={styles.container}>
                {/*<Content style={styles.content}>*/}
                <Header style={styles.header}>
                    <H3 style={styles.title}>REGISTER</H3>
                </Header>

                <Grid style={styles.content}>
                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>
                            <IconInput
                                placeholder="+994 44 444 44 44"
                                icon="ios-call-outline"
                                value={this.state.contact}
                                onChangeText={contact => this.setState({contact})}
                            />

                            <IconInput
                                placeholder="Ad Soyad"
                                icon="ios-person-outline"
                                value={this.state.fullname}
                                onChangeText={fullname => this.setState({fullname})}
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

                            {this.renderButton()}

                            <Button style={styles.button} transparent onPress={()=>Actions.signIn()}>
                                <Text style={styles.text}>Already have an account? Sign In</Text>
                            </Button>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>
                </Grid>

                <Footer style={styles.footer}>
                    <Button style={styles.button} transparent onPress={()=>Actions.main()}>
                        <Text style={styles.text}>Skip</Text>
                    </Button>
                </Footer>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default SignUp;