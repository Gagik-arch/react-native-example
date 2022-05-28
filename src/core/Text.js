import React, {useContext} from "react";
import * as RN from "react-native";
import {AppContext, fonts} from '../resources'

const Text = ({
                  children = "",
                  style = {},
                  size = "book12",
                  ...props
              }) => {
    const {scheme} = useContext(AppContext);
    size = size.toLowerCase()

    return (
        <RN.Text style={
            {
                color: scheme?.colors?.text,
                ...fonts[size],
                ...style,
            }
        } {...props} >
            {children}
        </RN.Text>
    );
};

export default Text;
