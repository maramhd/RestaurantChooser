import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import MainNavigator from "./src/navigation/MainNavigator";
import Toast from "react-native-toast-message";

// منع الإخفاء التلقائي لشاشة البداية
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // محاكاة تحميل الموارد (يمكنك إضافة تحميل البيانات هنا)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // إخفاء شاشة البداية بعد تجهيز التطبيق
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <MainNavigator />
      <Toast />
    </>
  );
}
