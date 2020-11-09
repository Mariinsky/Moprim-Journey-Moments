import React, {useState} from 'react'
import {Text, View, Button, Image} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import DownloadService from "../services/DownloadService"
import DatabaseService from "../services/DatabaseService"
import LoginService from "../services/LoginService"
import RNBottomActionSheet from 'react-native-bottom-action-sheet'
import Icon from 'react-native-vector-icons'
import {ProgressBar} from '@react-native-community/progress-bar-android'

//const cameraIcon = <Icon family={'FontAwesome'} name={'camera'} color={'#000000'} size={30} />
//const videoIcon = <Icon family={'FontAwesome'} name={'video-camera'} color={'#000000'} size={30} />

const Upload = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const userId = LoginService.getCurrentUser().uid

    const videoOptions = {
        mediaType: 'video',
        isVideo: true,
        videoQuality: 'medium',
    }
    const imageOptions = {
        mediaType: 'image',
        isImage: true,
    }

    const pickImage = () => {
        const sheetView = RNBottomActionSheet.SheetView

        sheetView.Show({
            title: "Choose format",
            items: [
                { title: "Image", value: "image", subTitle: "Image description"},
                { title: "Video", value: "video", subTitle: "Video Description"},
            ],
            theme: "light",
            selection: 3,
            onSelection: (index) => {
                if (index === 0) {
                    console.log("image")
                    launchCamera(imageOptions)
                } else {
                    console.log("video")
                    launchCamera(videoOptions)
                }
            }
        })
    }

    const launchCamera = (options) => {
        ImagePicker.launchCamera(options, (response => {
            if (response.didCancel) {
                console.log('cancel')
            } else if (response.error) {
                console.log('error')
            } else {
                console.log('success, uri:', response.uri)
                setImage(response.uri)
            }
        }))
    }

    const uploadFile = async (uri) => {
        setUploading(true)
        const task = await DownloadService.dlINSERT(uri)
        console.log("task state: ", task)

        if (task.state === "success") {
            setUploading(false)
            setImage('Uploaded to the bucket')
            const UUID = task.metadata.fullPath.split("/")[1]
            const url = await DownloadService.dlGetURL(UUID)

            const data = {
                "id": UUID,
                "moprimId": "test",
                "url": url,
                "userId": userId
            }
            await DatabaseService.dbMediaINSERT(data)
        }
    }

    return (
        <View>
            <Text>UPLOAD IMAGE</Text>
            <Button
                title="Picture"
                onPress={() => {
                    pickImage();
                }}
            />
            {uploading && <>
                <Text>Uploading...</Text>
                <ProgressBar/>
            </>}
            {image && <>
                <View>
                    <Text>{image}</Text>
                    <Button
                        title="Upload"
                        onPress={async () => {
                            await uploadFile(image)
                        }}
                    />
                    <Image source={{uri: image}} style={{width: 250, height: 250}}/>
                </View>
            </>}
        </View>
    );
};

export default Upload;
