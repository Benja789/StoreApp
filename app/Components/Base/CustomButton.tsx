import { Text, TouchableOpacity } from "react-native"
import CustomButtonStyle from "../../Styles/Components/CustomButtonStyle";

interface IButtonProps {
    text?: string;
    callBack: () => void;
    textStyle?: object;
    disabled?: boolean;
    buttonStyle?: object;
}
const CustomButton = ( props: IButtonProps ) => {
    const { text, callBack, textStyle, disabled, buttonStyle } = props
    return (
        <TouchableOpacity 
            style={[
                CustomButtonStyle.button, 
                buttonStyle,
                disabled === true && CustomButtonStyle.disabled 
            ]} 
            disabled={disabled}
            onPress={callBack}>
            <Text style={[ CustomButtonStyle.text, textStyle ]}>
                { text }
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton