import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
export default function Stream() {
  const { id, season, episode } = useLocalSearchParams();
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    lockOrientation();

    // Optionally reset orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (season) {
    return (
      <WebView
        source={{
          uri: `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
        }}
      />
    );
  }
  return <WebView source={{ uri: `https://vidsrc.to/embed/movie/${id}` }} />;
}
