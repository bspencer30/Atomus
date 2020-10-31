import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Linking } from "react-native";
import { Icon } from "react-native-elements";
import { Context as AppContext } from "../../context/appContext";

import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import driveService from "../../backend/services/driveService";


class SubmissionCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            coursework: null
        }  
        this.coursework = this.props.navigation.getParam("coursework")
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    }

    _takePicture = async () => {
        if(this.camera){
            const options = { quality: 1, base64: true };
            const data = await this.camera.takePictureAsync(options);
            
            console.log(this.coursework)
            //upload picture to google drive
            var drive_obj = await driveService.uploadPicture(this.context.state.credentials.access_token, data.base64, this.coursework);
                        
            //transfer ownership to teacher
            this.context.submitWork(this.context.state.credentials.access_token, this.coursework.course_id, this.coursework.coursework_id, this.coursework.submission.submission_id, drive_obj)       
            //console.log(this.context); 
            
            //this.props.navigation.goBack({});
            
            //console.log(this.coursework);
        }   
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission == null) {
            return <Text>Camera Permission Null</Text>
        } else if (hasCameraPermission == false) {
            return <Text>Camera has no access</Text>
        } else {
            return (
                <View style={styles.container}>
                    <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => {this.camera = ref}}>
                        <View style={styles.bottom}>
                            <View style={styles.row}>
                                <TouchableOpacity styles={styles.takePicture}>
                                    <Icon size={40} color="red" name="alarm-on" />
                                </TouchableOpacity>
                                <TouchableOpacity styles={styles.takePicture} onPress={() => this._takePicture()}>
                                    <Icon size={40} color="red" name="camera" />
                                </TouchableOpacity>
                                <TouchableOpacity styles={styles.takePicture}>
                                    <Icon size={40} color="red" name="flip" />
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    </Camera>
                </View>

            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    bottom: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        margin: 30,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    takePicture: {
        //flex: .1,
        flexDirection: "column",
        alignSelf: "flex-end",
        alignContent: "center",
        borderWidth: 3,
        borderColor: "green",

        backgroundColor: "green"
    }
});

SubmissionCamera.contextType = AppContext;
export default SubmissionCamera;