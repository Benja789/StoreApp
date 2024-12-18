import { Image, Text, TouchableOpacity, View } from "react-native"
import CustomButtonStyle from "../../Styles/Components/CustomButtonStyle";

interface IButtonProps {
    text?: string;
    callBack: () => void;
    icon?: any;
    textStyle?: object;
    disabled?: boolean;
    buttonStyle?: object;
}
const CustomButton = ( props: IButtonProps ) => {
    const { text, callBack, textStyle, disabled, icon, buttonStyle } = props
    return (
        <TouchableOpacity 
            style={[
                CustomButtonStyle.button, 
                buttonStyle,
                disabled === true && CustomButtonStyle.disabled 
            ]} 
            disabled={disabled}
            onPress={callBack}>
            <View style={[CustomButtonStyle.textContainer]}>
                { 
                    icon && 
                    <Image source={ icon } style={CustomButtonStyle.icon} />
                }
                <Text style={[ CustomButtonStyle.text, textStyle ]}>
                    { text }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton