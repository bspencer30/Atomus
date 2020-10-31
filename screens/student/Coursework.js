import React, { Component } from "react";
import { Platform, StyleSheet, ScrollView, View } from "react-native";
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text";
import AtomusButton from "../../components/Button";
import dateCalc from "../../utils/dateCalc";

class Student_CourseworkDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coursework: null,
            hasCameraPermission: null
        }
        this.coursework = this.props.navigation.getParam("coursework");
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={navigation.getParam("coursework").title} />,
    });

    _status = (date, submission_state) => {
        var status_obj = { string: "Default", color: "grey" }
        if (submission_state == "TURNED_IN") {
            status_obj.string = "Status: Assignment Completed";
            status_obj.color = Colors.turquoise.opaque;
        } else if (dateCalc.dateDiffInDays(new Date(), date) < 0) {
            status_obj.string = "Status: Assignment Late";
            status_obj.color = Colors.soft_pink.opaque;
        } else {
            status_obj.string = "Status: Need to Submit";
            status_obj.color = Colors.yellow.opaque;
        }
        return status_obj
    }

    _shortDescription = (description) => {
        var length = description.length;
        if (length < 250) return description;    
        return description.substring(0, description.indexOf(" ", 250)).trim() + ". . .";
    }

    render() {
        const { string, color } = this._status(this.coursework.due_date, this.coursework.submission.submission_state);
        return (
            <ScrollView  style={{backgroundColor: Colors.beige.opaque}} contentContainerStyle={styles.container}>
                <AtomusText text={"due " + this.coursework.due_date.toDateString()} style={styles.dueDateText} />
                <View style={styles.descriptionContainer}>
                    <AtomusText text={"Description"} />
                    <AtomusText text={this._shortDescription(this.coursework.description)} style={styles.descriptionText} />
                    <View style={[styles.status, {backgroundColor: color}]}>
                        <AtomusText text={string} />
                    </View>
                </View>
                <View style={styles.button_group}>
                    <AtomusButton backgroundColor={Colors.grey.semi_transparent} title={"Submit"} onPress={() => { }} />
                    <AtomusButton backgroundColor={Colors.grey.semi_transparent} title={"Message Parent"} onPress={() => { }} />
                    <AtomusButton backgroundColor={Colors.grey.semi_transparent} title={"Ask Teacher for Help"} onPress={() => { }} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        alignItems: "center",
    },
    dueDateText: {
        textAlign: "center",
        top: (Platform.OS == "ios") ? "8%" : 20
    },
    descriptionContainer: {
        top: "10%",
        margin: 16
    },
    status:{
        borderRadius: 5, 
        padding: 15, 
        marginTop: 20, 
        alignItems: "center"
    },
    button_group: {
        marginTop: 200,
        justifyContent: "space-between",
        height: 150,
        marginBottom: 100
    },
});

Student_CourseworkDetail.contextType = AppContext;
export default Student_CourseworkDetail;