import React from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {registerRootComponent} from 'expo';
import {StatusBar} from 'expo-status-bar';
import {store} from 'store';
import {useIpAddress} from 'hooks/useIpAddress';
import {useCurrentLocation} from 'hooks/useCurrentLocation';
import {useSearchLocation} from 'hooks/useSearchLocation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
    },
});

function App() {
    const [currentLocation, reloadCurrentLocation, isCurrentLocationLoading] = useCurrentLocation();
    const [ip, reloadIp, isIpLoading] = useIpAddress();
    const {location, search, setSearch, isLoading} = useSearchLocation();

    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.input} onChangeText={setSearch} value={search} placeholder='Enter city name' />
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : location == null ? (
                    <Text>No data</Text>
                ) : (
                    <Text>
                        Temperature in {location.name}: {location.main.temp}
                    </Text>
                )}
            </View>
            <View>
                {isIpLoading ? <Text>Loading...</Text> : ip == null ? <Text>No data</Text> : <Text>Your IP Address: {ip}</Text>}
                <Button onPress={reloadIp} title='Reload' disabled={isIpLoading} />
            </View>
            <View>
                {isCurrentLocationLoading ? (
                    <Text>Loading...</Text>
                ) : currentLocation == null ? (
                    <Text>No data</Text>
                ) : (
                    <Text>
                        The temperature in your location ({currentLocation.name}): {currentLocation.main.temp}
                    </Text>
                )}
                <Button onPress={reloadCurrentLocation} title='Reload' disabled={isCurrentLocationLoading} />
            </View>
            <StatusBar style='auto' />
        </View>
    );
}

function Index() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

registerRootComponent(Index);
