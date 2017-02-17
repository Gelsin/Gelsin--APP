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
    Item,
    ListItem
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
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
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center'}}>Header</Title>
                    </Body>

                    <Right style={{ flex: 1}}>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    {/*<Grid>*/}
                    {/*<Row >*/}
                    {/*<Col>*/}
                    <ListItem itemHeader>
                        <Text>Profile</Text>
                    </ListItem>

                    <ListItem style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <Text note>Name Surname</Text>
                        <Text >Orxan Alirzayev</Text>
                    </ListItem>

                    <ListItem style={{flexDirection: 'column'}}>
                        <Text note>Name Surname</Text>
                        <Text >Orxan Alirzayev</Text>
                    </ListItem>

                    <ListItem style={{flexDirection: 'column'}}>
                        <Text note>Name Surname</Text>
                        <Text >Orxan Alirzayev</Text>
                    </ListItem>


                    <ListItem itemHeader >
                        <Text>Profile</Text>
                    </ListItem>

                    <Text note>Name Surname</Text>
                    <Text >Orxan Alirzayev</Text>

                    <Text note>Name Surname</Text>
                    <Text >Orxan Alirzayev</Text>

                    <Text note>Name Surname</Text>
                    <Text >Orxan Alirzayev</Text>
                    {/*</Col>*/}
                    {/*</Row>*/}
                    {/*</Grid>*/}
                </Content>

                {/*<Footer>*/}
                {/*<FooterTab>*/}
                {/*<Button full onPress={() => Actions.addresses()}>*/}
                {/*<Text>Log out</Text>*/}
                {/*</Button>*/}
                {/*</FooterTab>*/}
                {/*</Footer>*/}
            </Container>
        );
    }
}