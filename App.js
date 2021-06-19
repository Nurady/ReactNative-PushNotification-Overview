// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './NotifService';

const App = () => {
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);
  const handlePerm = perms => {
    Alert.alert('Permissions', JSON.stringify(perms));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Example app react-native-push-notification
      </Text>
      <View style={styles.spacer} />
      <TextInput
        style={styles.textField}
        value={registerToken}
        placeholder="Register token"
      />
      <View style={styles.spacer} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.localNotif();
        }}>
        <Text>Local Notification (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          this.notif.localNotif('sample.mp3');
        }}>
        <Text>Local Notification with sound (now)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.scheduleNotif();
        }}>
        <Text>Schedule Notification in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.scheduleNotif('sample.mp3');
        }}>
        <Text>Schedule Notification with sound in 30s</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          this.notif.cancelNotif();
        }}>
        <Text>Cancel last notification (if any)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.cancelAll();
        }}>
        <Text>Cancel all notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.checkPermission(handlePerm());
        }}>
        <Text>Check Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.requestPermissions();
        }}>
        <Text>Request Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.abandonPermissions();
        }}>
        <Text>Abandon Permissions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.getScheduledLocalNotifications(notifs => console.log(notifs));
        }}>
        <Text>Console.Log Scheduled Local Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.getDeliveredNotifications(notifs => console.log(notifs));
        }}>
        <Text>Console.Log Delivered Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.createOrUpdateChannel();
        }}>
        <Text>Create or update a channel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.popInitialNotification();
        }}>
        <Text>popInitialNotification</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      {fcmRegistered && <Text>FCM Configured !</Text>}

      <View style={styles.spacer} />
    </View>
  );

  //  onRegister(token) {
  //    this.setState({registerToken: token.token, fcmRegistered: true});
  //  }

  //  onNotif(notif) {
  //    Alert.alert(notif.title, notif.message);
  //  }

  //  handlePerm(perms) {
  //    Alert.alert('Permissions', JSON.stringify(perms));
  //  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
