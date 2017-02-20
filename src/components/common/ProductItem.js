import React, {Component} from 'react';
import { View, TouchableOpacity} from "react-native";
import {Text,CardItem,Thumbnail} from "native-base";

export default class ProductItem extends Component {
render()
{
return(
    <CardItem horizontal={false} style={{flexDirection: 'column'}}>
        <Text>{this.props.name}</Text>
        <Thumbnail square size={50} source={{uri: this.props.thumbnail }}/>
        <TouchableOpacity><Text>Add To Cart</Text></TouchableOpacity>
        <Text>{this.props.price}</Text>
    </CardItem>
);

  }
}