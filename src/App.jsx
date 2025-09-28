import { useState } from "react";
import { Main } from "./components/Main";
import { Settings } from "./components/Settings";
const defaultConfig = {
  ssid: "WIFI_IS_HERE",
  password: "1234567890",
  landscape: "1",
  design: "1",
  backgroundImage: "https://via.placeholder.com/150",
};

function App() {
  const [config, setConfig] = useState(defaultConfig);
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      <Main config={config} onSettingsClick={toggleSettings} />
      <Settings
        config={config}
        onConfigChange={setConfig}
        showSettings={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}

export default App;
