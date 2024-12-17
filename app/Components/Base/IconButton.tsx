import { Image, TouchableHighlight } from "react-native"
import IconButtonStyle from "../../Styles/Components/IconButtonStyle";

interface IIconButtonProps {
    callBack: () => void;
    icon: any;
}
const IconButton = (props: IIconButtonProps) => {
    const { icon, callBack} = props;
    return (
        <TouchableHighlight 
            style={[IconButtonStyle.button]}
            underlayColor='rgba(0, 0, 0, 0.1)' // Color gris claro con opacidad
            onPress={callBack}>
            <Image
                style={IconButtonStyle.icon}
                source={icon}/>
        </TouchableHighlight>
    )
}

export default IconButton;