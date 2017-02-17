import React, {Component} from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    H3,
    Text,
    Form,
    Item
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';

export default class Addresses extends Component {
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
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}} >
                    <Title style={{alignSelf: 'center'}}>Addresses</Title>
                    </Body>

                    <Right style={{ flex: 1}}>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Form>
                        <H3>Edit addresses</H3>

                        <Item style={styles.item}>
                            <Text>Name Surname</Text>
                            <Text>Name Surname</Text>
                        </Item>

                        <Item style={styles.item}>
                            <Text>Name Surname</Text>
                            <Text>Name Surname</Text>
                        </Item>

                        <Item style={styles.item}>
                            <Text>Name Surname</Text>
                            <Text>Name Surname</Text>
                        </Item>
                    </Form>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button full style={{flexDirection: 'row'}}>
                            <Icon name='add' />
                            <Text>Add new address</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}