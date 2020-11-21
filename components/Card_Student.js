import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { Card, Icon, Avatar, Badge, withBadge} from "react-native-elements";

import Colors from "../constants/Colors";
import AtomusText from "./Text";

export default class AtomusCard_Student extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onPress(this.props.student_key);
    };

    _displayStatus = () => {
        if (this.props.status == "late") { return (
            <View style={styles.badgeContainer}>
                <AtomusText text="late" style={styles.badgeLabel} />
                {/* "#F87060" */}
                <Badge value={this.props.late} status="error" size="large" badgeStyle={[styles.badge, {backgroundColor:Colors.soft_pink.opaque}]} textStyle={styles.badgeText}/>
            </View>
        ); } else if (this.props.status == "submitted") { return (
            <View style={styles.badgeContainer}>
                <AtomusText text="submitted" style={styles.badgeLabel} />
                {/* "#44af69" */}
                <Badge value={this.props.submitted} status="success" size="large" badgeStyle={[styles.badge, {backgroundColor:Colors.turquoise.opaque}]} textStyle={styles.badgeText}/>
            </View>
        ); } else { return (
            <View style={styles.badgeContainer}>
                <AtomusText text="not submitted" style={styles.badgeLabel} />
                {/* "#44af69" */}
                <Badge value={this.props.not_submitted} status="primary" size="large" badgeStyle={[styles.badge, {backgroundColor:Colors.yellow.opaque}]} textStyle={styles.badgeText}/>
            </View>
        ); }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.opacityContainer} >
                <Card containerStyle={[styles.container]} wrapperStyle={styles.wrapperContainer}>
                    <View style={styles.assignmentInformation}>
                        <AtomusText text={this.props.name} style={styles.titleText} />
                        <View style={styles.status}>
                            {this._displayStatus()}
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    badgeContainer:{
        flex:1,
        flexDirection:"row",
        height:"100%",
        flexDirection:"column",
        justifyContent:"space-evenly",
    },
    badge:{
        flex:3,
        flexGrow:1,
        fontSize:20,
        width:"90%",
    },
    badgeText:{
        fontSize:15,
    },
    badgeLabel:{
        fontSize: 14,
        color: "#4f4f4f",
        textAlign: "center",
    },
    opacityContainer:{
        flex: 1,
        flexDirection:"row",
    },
    wrapperContainer:{
        flex:1, 
        flexDirection:"row",
    },
    container: {
        borderRadius: 5,
        backgroundColor: "#f1eee7",
        shadowRadius: 3,
        borderWidth: 2,
        flex:1, 
        flexDirection:"row",
        //shadowColor: Colors.turquoise.semi_transparent,
        //borderColor: Colors.turquoise.semi_transparent
    },
    assignmentInformation:{
        flex:2,
        flexDirection:"column",
    },
    titleText: {
        fontSize: 18,
        textAlign: "left",
        marginBottom: 0,
        fontFamily: "NunitoSans_Bold",
        
    },
    status:{
        flex:3,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
})
AtomusCard_Student.propTypes = {
    name: PropTypes.string,
    onPress: PropTypes.func,
}

AtomusCard_Student.defaultProps = {
    name: "CS4261",
    onPress: () => { console.log("Card Pressed"); },
}