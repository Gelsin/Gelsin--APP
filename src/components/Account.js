import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Form,
    Item,
    ListItem,
    Separator,
    Label
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Update from './common/Update';


export default class Account extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {
            email: '', fullname: '', error: '', loading: false, token: '',
            nameUpdate: false, phoneUpdate: false, message: ''
        };
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
        this.getToken();
    };

    getToken = async () => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:auth_user');
            if (value !== null) {
                //console.log(value);
                this.setState({token: value});
                console.log(this.state.token);

                this.getUser(this.state.token)

            } else {
                Actions.signIn();
            }
        } catch (error) {
            console.log(error);
        }
    };

    getUser(token) {
        console.log("get user function");

        fetch('http://gelsin.az/app/api/auth/user?token=' + this.state.token, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                if (responseJson.user) {
                    this.setState({
                        email: responseJson.user.email,
                        fullname: responseJson.user.customer_detail.fullname,
                        contact: responseJson.user.customer_detail.contact,
                        loading: false
                    });

                    console.log(this.state);
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    logout = async () => {
        console.log('logout');

        fetch('http://gelsin.az/app/auth/invalidate', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => console.log(response)
                // .then((responseData) => {
                //     console.log("inside responsejson");
                //     console.log('response object:', responseData);
                //
                // })
                // .catch((error) => {
                //     console.log(error);
                // })
            )
            .catch((error) => {
                console.log(error);
            });

        try {
            await AsyncStorage.removeItem('@Gelsin:auth_user');
            Actions.signIn();
        } catch (error) {
            this.setState({error: error.message});
        }
    };

    updateUser(label) {

        const {token, contact, fullname} = this.state;

        body = JSON.stringify({
            token,
            fullname
        });

        if (label == 'contact') {
            body = JSON.stringify({
                token,
                contact
            });
        }

        console.log(body);

        fetch('http://gelsin.az/app/api/profile/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body
        })
            .then((response) => response.json()
                .then((responseData) => {
                    console.log("inside responsejson");
                    console.log('response object:', responseData);

                    if (responseData.error) {
                        this.setState({message: responseData.message, phoneUpdate: false, nameUpdate: false})
                    }
                    else {
                        if (label == "fullname") {
                            this.setState({message: "Name updated successfully", nameUpdate: !this.state.nameUpdate});
                        }
                        else {
                            this.setState({
                                message: "Phone updated successfully",
                                phoneUpdate: !this.state.phoneUpdate
                            });
                        }
                    }
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

    onUpdate(label) {
        if (label == "fullname") {
            this.updateUser(label)
            //this.setState({message: label + " updated successfully", nameUpdate: !this.state.nameUpdate});
        }
        else {
            this.updateUser(label)
            //this.setState({message: label + " updated successfully ", phoneUpdate: !this.state.phoneUpdate});
        }
    }

    renderMessage() {
        if (this.state.message != '') {
            return (
                <Item style={{backgroundColor: '#e5ddcb', margin: 0, height: 48, padding: 12}}>
                    <Icon style={{color: '#524656'}} name="ios-checkmark-outline"/>

                    <Text style={{color: '#524656', fontFamily: 'SourceSansPro-Regular'}}>
                        {this.state.message}
                    </Text>
                </Item>

            );
        }
    }


    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',
            },
            item: {
                flexDirection: 'column'
            }
        };

        return (
            <Container >
                <Header style={styles.header}>
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => Actions.category()}>
                            <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                        </Button>
                    </Left>

                    <Body style={{flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Settings</Title>
                    </Body>

                    <Right style={{flex: 1}}/>
                </Header>

                {this.renderMessage()}

                <Content>
                    <Separator style={{backgroundColor: '#fff'}}>
                        <Text
                            style={{
                                fontFamily: 'SourceSansPro-Semibold',
                                fontSize: 16,
                                color: '#eb7b59'
                            }}>Profile</Text>
                    </Separator>

                    <Form>
                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SourceSansPro-Regular',
                                    fontSize: 16,
                                    color: '#524656'
                                }}>Name Surname</Text>
                            <Text note onPress={() => this.setState({nameUpdate: !this.state.nameUpdate}) }
                                  style={{
                                      alignSelf: 'flex-start',
                                      fontFamily: 'SourceSansPro-Semibold',
                                      fontSize: 14,
                                      color: '#524656'
                                  }}>{this.state.fullname}</Text>
                            <Update
                                visible={this.state.nameUpdate}
                                label="Full Name"
                                value={this.state.fullname}
                                onChange={fullname => this.setState({fullname})}
                                onPress={() => this.onUpdate("fullname")}
                                close={() => this.setState({
                                    nameUpdate: !this.state.nameUpdate,
                                    message: ''
                                }, this.getUser(this.state.token))}
                            />
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SourceSansPro-Regular',
                                    fontSize: 16,
                                    color: '#524656'
                                }}>Email</Text>
                            <Text note
                                  style={{
                                      alignSelf: 'flex-start',
                                      fontFamily: 'SourceSansPro-Semibold',
                                      fontSize: 14,
                                      color: '#524656'
                                  }}>{this.state.email}</Text>
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SourceSansPro-Regular',
                                    fontSize: 16,
                                    color: '#524656'
                                }}>Address</Text>

                            <Button transparent style={{padding: 0, margin: 0}} onPress={() => Actions.addresses()}>
                                <Text note
                                      style={{
                                          alignSelf: 'flex-start',
                                          fontFamily: 'SourceSansPro-Semibold',
                                          fontSize: 14,
                                          color: '#524656'
                                      }}>Edit Addresses</Text>
                            </Button>
                        </ListItem>
                    </Form>


                    <Separator style={{backgroundColor: '#fff', height: 16}}>
                    </Separator>

                    <Separator style={{backgroundColor: '#fff'}}>
                        <Text
                            style={{
                                fontFamily: 'SourceSansPro-Semibold',
                                fontSize: 16,
                                color: '#eb7b59'
                            }}>Account</Text>
                    </Separator>

                    <Form>
                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SourceSansPro-Regular',
                                    fontSize: 16,
                                    color: '#524656'
                                }}>Phone</Text>
                            <Text note onPress={() => this.setState({phoneUpdate: !this.state.phoneUpdate}) }
                                  style={{
                                      alignSelf: 'flex-start',
                                      fontFamily: 'SourceSansPro-Semibold',
                                      fontSize: 14,
                                      color: '#524656'
                                  }}>{this.state.contact}</Text>
                            <Update
                                visible={this.state.phoneUpdate}
                                label="Phone"
                                value={this.state.contact}
                                onChange={contact => this.setState({contact})}
                                onPress={() => this.onUpdate("contact")}
                                close={() => this.setState({
                                    phoneUpdate: !this.state.phoneUpdate,
                                    message: ''
                                }, this.getUser(this.state.token))}
                            />
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SourceSansPro-Regular',
                                    fontSize: 16,
                                    color: '#524656'
                                }}>Password</Text>
                            <Text note
                                  style={{
                                      alignSelf: 'flex-start',
                                      fontFamily: 'SourceSansPro-Semibold',
                                      fontSize: 14,
                                      color: '#524656'
                                  }}>Change password</Text>
                        </ListItem>
                    </Form>

                    <Separator style={{backgroundColor: '#fff', height: 16}}>
                    </Separator>

                    <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                        <Text
                            style={{
                                alignSelf: 'flex-start',
                                fontFamily: 'SourceSansPro-Regular',
                                fontSize: 16,
                                color: '#524656'
                            }}>Language</Text>
                        <Text note
                              style={{
                                  alignSelf: 'flex-start',
                                  fontFamily: 'SourceSansPro-Semibold',
                                  fontSize: 14,
                                  color: '#524656'
                              }}>English</Text>
                    </ListItem>

                    <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                        <Button transparent style={{padding: 0, margin: 0}} onPress={this.logout.bind(this)}>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    fontFamily: 'SourceSansPro-Regular',
                                    fontSize: 16,
                                    color: '#524656'
                                }}>Logout</Text>
                        </Button>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}