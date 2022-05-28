import React, {useContext} from "react";
import {StyleSheet} from "react-native";
import Icons from '../../assets/icons'
import {AppContext} from "../resources";

const Icon = ({
                  type,
                  style = {},
                  scale=1,
                  ...props
              }) => {
    const {scheme} = useContext(AppContext);
    const theme = scheme.dark ? "dark" : "light";

    const Feather = Icons[type] ? Icons[type] : Icons['Add'];

    return (
        <Feather
            style={{...s.icon, ...s["icon_" + theme], transform: [{scale}], ...style}}
            {...props}
        />
    );
};
const s = StyleSheet.create({
    icon: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,

    },
    icon_dark: {
        fill: "#FFF",
    },
    icon_light: {
        fill: "#000",
    },
});
export default Icon;
