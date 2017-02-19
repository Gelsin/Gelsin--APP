import React, {Component} from 'react';
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


export default class Account extends Component {
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
                    <Left style={{ flex: 1}}>
                        <Button transparent>
                            <Icon style={{color: '#e5ddcb'}} name='arrow-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Header</Title>
                    </Body>

                    <Right style={{ flex: 1}}>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Separator style={{backgroundColor: '#fff'}}>
                        <Text
                            style={{ fontFamily: 'SourceSansPro-Semibold', fontSize: 16, color: '#eb7b59'}}>Profile</Text>
                    </Separator>

                    <Form>
                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Username</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>Orxan Alirzayev</Text>
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Username</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>Orxan Alirzayev</Text>
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Username</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>Orxan Alirzayev</Text>
                        </ListItem>
                    </Form>


                    <Separator style={{backgroundColor: '#fff', height: 16}}>
                    </Separator>

                    <Separator style={{backgroundColor: '#fff'}}>
                        <Text
                            style={{ fontFamily: 'SourceSansPro-Semibold', fontSize: 16, color: '#eb7b59'}}>Account</Text>
                    </Separator>

                    <Form>
                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Username</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>Orxan Alirzayev</Text>
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Username</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>Orxan Alirzayev</Text>
                        </ListItem>
                    </Form>

                    <Separator style={{backgroundColor: '#fff', height: 16}}>
                    </Separator>

                    <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                        <Text
                            style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Language</Text>
                        <Text note
                              style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>English</Text>
                    </ListItem>

                    <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                        <Text
                            style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Logout</Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}