import React, {useContext, useEffect, useState} from 'react'
import {TextInput, StyleSheet, View} from 'react-native'
import {TabButton, Icon, Text} from "./index";
import {Colors, fonts, isIos, padding, margin, AppContext} from '../resources'

let typingTimer;                //timer identifier
let doneTypingInterval = 600;  //time in ms (600 seconds)

const regex = {
    //min 8 character, 1 number, 1 UPPERCASE, 1 lowercase, 1 special character
    password: {
        validation: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"),
        errorMessage: 'Password must be at least 8 characters long, contains 1 UPPERCASE 1 lowercase 1 special charecter.',
    },
    // @, 0 UPPERCASE, only com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)
    email: {
        validation: new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])(?:[A-z])?\\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\\b'),
        errorMessage: 'Invalid email',
    }
}


const validateField = (fieldName, text) => regex[fieldName].validation.test(text)

const Input = ({
                   value = '',
                   onChange = null,
                   placeholder,
                   keyboardType,
                   secureTextEntry = false,
                   containerStyles,
                   inputStyles,
                   fontSize = 'medium16',
                   buttons = null,
                   validate = false,
                   name = 'password',
                   errorMassage = null,
                   ref,
                   onFinish,
               }) => {
    const [visibility, setVisibility] = useState(secureTextEntry);
    const [defaultValue, setDefaultValue] = useState(value)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => setDefaultValue(value), [value])

    useEffect(() => {
        if (validate && defaultValue) {
            setIsValid(validateField(name, defaultValue))
            return onChange && onChange(defaultValue, validateField(name, defaultValue))
        }
        onChange && onChange(defaultValue)
        setIsValid(true)
    }, [])

    const onTextChange = (text) => {
        setDefaultValue(text)
        const _isValid = validateField(name, text)

        // [--- handled when user finished typing >>>
        if (onFinish) {
            clearTimeout(typingTimer);
            if (text) {
                typingTimer = setTimeout(() => onFinish(text), doneTypingInterval);
            }
        }
        // <<<-----

        // ---- handled onChange >>>
        if (validate) {
            setIsValid(_isValid)
            return onChange && onChange(text, _isValid)
        }
        return onChange && onChange(text)
        // <<<-----
    }
    const defaultFlow = <DefaultFlow
        fontSize={fontSize}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        validate={validate}
        isValid={isValid}
        containerStyles={containerStyles}
        onTextChange={onTextChange}
        ref={ref}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        visibility={visibility}
        placeholder={placeholder}
        inputStyles={inputStyles}
        setVisibility={setVisibility}
        buttons={buttons}
    />
    return validate ? <View>
            {defaultFlow}
            {validate && !isValid &&
                <Text size={'medium12'}
                      style={s.error}>{errorMassage || regex[name].errorMessage}</Text>}
        </View> :
        defaultFlow

}

const DefaultFlow = ({
                         fontSize,
                         defaultValue,
                         setDefaultValue,
                         validate,
                         isValid,
                         containerStyles,
                         onTextChange,
                         ref,
                         keyboardType,
                         secureTextEntry,
                         visibility,
                         placeholder,
                         inputStyles,
                         setVisibility,
                         buttons,
                     }) => {
    const {scheme} = useContext(AppContext);

    const theme = scheme.dark ? 'dark' : 'light'

    return (
        <View style={[
            s.container,
            fonts[fontSize],
            s['container_' + theme],
            {borderColor: validate && defaultValue ? (isValid ? Colors.borderColor : Colors.errorColor) : Colors.borderColor},
            containerStyles
        ]}>
            <View style={{flex: 1}}>

                {validate && defaultValue.length > 0 &&
                    <Text size={'medium13'}
                          style={{...s.placeholder, color: scheme?.colors?.placeholderColor}}>{placeholder}</Text>}

                <View style={{flexDirection: "row"}}>
                    <TextInput
                        ref={ref}
                        value={defaultValue}
                        onChangeText={onTextChange}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry && visibility && secureTextEntry}
                        style={[
                            validate && defaultValue.length ?  padding((isIos() ? 8 : 0),0) : padding((isIos() ? 18 : 20),0),
                            {
                                ...s.input,
                                ...s['input_' + theme],
                                ...inputStyles,
                            },
                        ]}
                        placeholderTextColor={scheme?.colors?.placeholderColor}
                    />
                </View>
            </View>

            {
                buttons && buttons.map(({onPress,...args}, index) => {
                    return <TabButton key={index}
                                      onPress={()=>onPress && onPress({value:defaultValue,setValue:setDefaultValue})}
                               {...args}
                    />
                })
            }

            {
                secureTextEntry ?
                    <TabButton onPress={() => setVisibility(!visibility)}
                               label={<Icon type={visibility ? 'Show' : 'Hide'} style={{fill: '#B1B5BD'}}/>}
                    /> :
                    null
            }

        </View>
    )
}
const s = StyleSheet.create({
    container: {
        borderRadius: 6,
        flexDirection: "row",
        alignItems: 'center',
        borderWidth: 2,
        boxSizing: 'border-box',
        width: '100%',
        ...padding(0,16),
        ...margin(16,0)
    },
    container_dark: {
        backgroundColor: '#151D29',
    },
    container_light: {
        backgroundColor: 'transparent',
        borderColor: '#DEDFE3',
    },
    input: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        color: 'black',
    },
    input_dark: {
        color: 'white'
    },
    input_light: {
        color: 'black'
    },
    placeholder: {
        ...margin(7,0,0,0)
    },
    error: {
        color: Colors.errorColor,
    }
})

export default Input
