import { StyleSheet } from "react-native"

const TabRouterStyles = StyleSheet.create({
    tabBarStyle: {
        height: 70,
        position: 'absolute',
        bottom: 0,
        right: 25,
        borderWidth: 0.1,
        left: 25,
        backgroundColor: '#FFF',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#888888',
        shadowOffset: { width: -1, height: 7 },
        shadowOpacity: 0.25,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        alignSelf: 'stretch'
    },
    button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    title: {
        fontSize: 13,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        color: '#3B6840',
        bottom: 10,
    }
})

export default TabRouterStyles