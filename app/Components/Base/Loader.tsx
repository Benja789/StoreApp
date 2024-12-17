import { BlurView } from "@react-native-community/blur";
import { ActivityIndicator, Modal } from "react-native";
import Base from "../../Styles/Base";
import { useContext } from "react";
import AppContextProvider from "../../Interfaces/IAppContext";

const Loader = () =>{
    const appContext = useContext(AppContextProvider)
    return (
        <Modal visible={appContext.loader} animationType="slide" transparent={true}>
            <BlurView
                style={Base.blurContainer}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"/>
            <ActivityIndicator size="large" color="#0000ff" />
        </Modal>
    );
}

export default Loader