import { AsyncStorage } from 'react-native';
import {
  white,
  red,
  orange,
  blue,
  lightPurp,
  pink
} from './colors';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = "UdaciCards:notifications";

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync());
}

const createNotification = () => {
  return {
    title: 'Continue learning',
    body: "🧠 Don't forget to answer to your favorite deck questions",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(10);
            tomorrow.setMinutes(0);
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                //repeat: 'minute', 'hour', 'day', 'week', 'month', or 'year'
                repeat: "day"
              }
            );
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          })
      }
    })
}
