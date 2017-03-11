import React, {Component} from 'react';
import {Container, Content, ListItem, Text, Radio, Right, Left, Body, Separator, Header, Button, Icon, Title, StyleProvider, FooterTab, Footer} from 'native-base';
import radioTheme from '../../native-base-theme/components/';
import platform from '../../native-base-theme/variables/platform';
import {Actions} from 'react-native-router-flux';

export default class OrderAddress extends Component {
    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',
                marginBottom: 10
            },
            footer: {
                flexDirection: 'column',
                height: 104
            },
            button: {
                alignSelf: 'flex-end',
                backgroundColor: '#eb7b59',
                width: 90,
                height: 32,
                justifyContent: 'center',
                padding: 0,
            },
            text: {
                fontFamily: 'SourceSansPro-Regular'
            }
        };

        return (
        <StyleProvider style={radioTheme(platform)}>
            <Container>
                <Header style={styles.header}>
                    <Left style={{ flex: 1}}>
                        <Button transparent>
                            <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', fontSize: 16, color: '#e5ddcb'}}>Address</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>
                </Header>

                <Content>
                    <Separator style={{backgroundColor: '#fff'}} >
                        <Text
                            style={{ fontFamily: 'SourceSansPro-Semibold', fontSize: 16, color: '#eb7b59'}}>Choose an address</Text>
                    </Separator>

                    <ListItem selected={false} >
                        <Left style={{ flex: 1}}>
                            <Radio selected={false} />
                        </Left>
                        <Body style={{ flex: 9, }}>
                        <Text style={{alignSelf: 'flex-start', marginLeft: 0}}> Lorem   Inspum, Narimanov </Text>
                        </Body>
                        {/*<Right />*/}
                    </ListItem>

                    <ListItem selected={true} >
                        <Left style={{ flex: 1}}>
                            <Radio selected={true}
                                   radioColor='red'
                                   radioBtnSize={34}
                            />
                        </Left>
                        <Body style={{ flex: 9, }}>
                        <Text style={{alignSelf: 'flex-start', marginLeft: 0}}> Lorem   Inspum, Narimanov </Text>
                        </Body>
                        {/*<Right />*/}
                    </ListItem>

                    <ListItem selected={false} >
                        <Left style={{ flex: 1}}>
                            <Radio selected={false} />
                        </Left>
                        <Body style={{ flex: 9, }}>
                        <Text style={{alignSelf: 'flex-start', marginLeft: 0}}> Lorem   Inspum, Narimanov </Text>
                        </Body>
                        {/*<Right />*/}
                    </ListItem>
                </Content>

                <Footer style={styles.footer}>
                    <FooterTab style={{backgroundColor: '#e5ddcb', flex: 48, }}>
                        <Left>
                            <Button transparent style={{  }}>
                                <Icon style={{color: '#524656'}} name="ios-add-circle-outline" />
                                <Text style={{color: '#524656', fontFamily: 'SourceSansPro-Regular'}}>Add new address</Text>
                            </Button>
                        </Left>
                    </FooterTab>

                    <FooterTab style={{backgroundColor: '#524656', flex: 56, paddingLeft: 12, paddingRight: 12 }}>
                        <Left >
                            <Text style={{color: '#e5ddcb', fontFamily: 'SourceSansPro-Semibold', }} >Total amount</Text>
                            <Text style={{color: '#e57b59', fontFamily: 'SourceSansPro-Regular', fontSize: 18}}>32.50 &#x20bc;</Text>
                        </Left>

                        <Right style={{   }}>
                            <Button rounded style={styles.button} onPress={()=>Actions.category()}>
                                <Text style={styles.text}>Confirm</Text>
                            </Button>
                        </Right>
                    </FooterTab>
                </Footer>
            </Container>
        </StyleProvider>

        );
    }
}
