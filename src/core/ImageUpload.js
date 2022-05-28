import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import {launchImageLibrary} from "react-native-image-picker"
import {Icon} from "./index";

export const ImageUpload = ({onUpload, src=require('../../assets/images/commentbg.native.png') }) => {
    const onPress = async () => {
        const options = {
            mediaType: "photo",
            includeBase64: true,
            maxHeight: 200,
            maxWidth: 200,
        }
        try {
            await launchImageLibrary(options, (result) => {
                if (result) {
                    console.log(result)
                    onUpload(result.assets)
                }
            });
        } catch (e) {
            // console.log(e)
        }
    }

    return <TouchableOpacity style={[s.image, s.container]}
                             activeOpacity={0.9}
                             onPress={onPress}>
        <Icon type={'Camera'} style={s.icon}/>
        {src ?
            <Image source={typeof src ==='string' ? {uri: src } : src}
                   style={s.image}/>
            : null
        }
    </TouchableOpacity>
}

const s = StyleSheet.create({
    container: {
        position: "relative",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    image: {
        width: 90,
        height: 90
    },
    icon: {
        zIndex: 2,
        position: 'absolute',
        fill: 'white'
    }
})

export default ImageUpload