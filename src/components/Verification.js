import React, {Component} from 'react';
import {Dimensions, AsyncStorage} from 'react-native';
import {Container, Form, H3, Footer, Header, Button, Text, Input, Item, Spinner} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';

class Verification extends Component {
    constructor(props) {
        console.log("inside  constructor");
        super(props);
        this.state = {token: this.props.token, activation_code: '', error: '', loading: false};
        console.log(this.state);
    }

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
        // this.getToken();
    };

    // getToken = async () => {
    //     try {
    //         var value = await AsyncStorage.getItem('@Gelsin:auth_user');
    //         if (value !== null){
    //             //console.log(value);
    //             this.setState({token: value});
    //             console.log(this.state.token);
    //         } else {
    //             console.log(value);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    onButtonPress() {
        console.log('button pressed');

        const {token, activation_code} = this.state;

        this.setState({error: '', loading: true});
        console.log(this.state);

        //let url = gelsin.az/app/api/auth/login + encodeURIComponent(this.state.email);

        fetch('http://gelsin.az/app/api/auth/user/activate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                token,
                activation_code
            })
        })
            .then((response) => response.json()
                .then((responseData) => {
                    console.log("inside responsejson");
                    console.log('response object:', responseData);
                    this.setState({loading: false});

                    switch (responseData.error) {
                        case false: {
                            this.onSuccess();
                        }

                        default: {
                            this.setState({error: responseData.message});
                        }
                    }
                })
                .catch((error) => {
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

    onFail() {
        this.setState({error: 'Authentication failed', loading: false});
    }

    onSuccess() {
        this.setState({
            activation_code: '',
            error: '',
            loading: false
        });

        Actions.category();
    }

    resend() {
        console.log('button pressed');

        const {token} = this.state;

        this.setState({error: ''});
        console.log(this.state);

        //let url = gelsin.az/app/api/auth/login + encodeURIComponent(this.state.email);

        fetch('http://gelsin.az/app/api/auth/user/resend', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token
            })
        })
            .then((response) => response.json()
                .then((responseData) => {
                    console.log("inside responsejson");
                    console.log('response object:', responseData);
                    //this.setState({loading: false});

                    this.setState({error: responseData.message});
                })
                .catch((error) => {
                    console.log(error);
                })
            )
            .catch((error) => {
                console.log(error);
            });
        // .done();
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <Spinner color='#eb7b59'/>
            )
        }
        return (
            <ButtonRound onPress={this.onButtonPress.bind(this)} text="Verify"/>
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
                            Please enter the verification code that we sent to your mobile
                        </Text>
                    </Row>

                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>
                            <Item  style={styles.item}>
                                <Input
                                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                    style={styles.input}
                                    value={this.state.activation_code}
                                    onChangeText={activation_code => this.setState({activation_code})}
                                />
                            </Item>

                            {this.renderButton()}

                            <Button style={styles.button} transparent onPress={this.resend.bind(this)}>
                                <Text style={styles.text}>
                                    Resend code
                                </Text>
                            </Button>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>
                </Grid>

                <Footer style={styles.footer}>
                    <Button style={styles.button} transparent onPress={()=>Actions.category()}>
                        <Text style={styles.text}>
                            Verify later
                        </Text>
                    </Button>
                </Footer>
                {/*</Content>*/}
            </Container>
        );
    }
}

export default Verification;
