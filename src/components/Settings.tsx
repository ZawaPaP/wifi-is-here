import Button from "./Button";
import React from "react";

const SettingsForm = ({ config, onConfigChange }) => {
  return (
    <div className="flex flex-col gap-6 p-6 text-gray-800">
      {/* Section: WiFi Info */}
      <div className="flex flex-col gap-2">
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">SSID</span>
          <input
            type="text"
            placeholder="Enter SSID"
            value={config.ssid}
            onChange={(e) =>
              onConfigChange({ ...config, ssid: e.target.value })
            }
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Password</span>
          <input
            type="text"
            placeholder="Enter password"
            value={config.password}
            onChange={(e) =>
              onConfigChange({ ...config, password: e.target.value })
            }
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <div>
          <p className="text-sm font-medium mb-2">認証方式</p>
          <div className="flex flex-col gap-2">
            {[
              { value: "WPA2", label: "WPA2" },
              { value: "WPA3", label: "WPA3" },
              { value: "WEP", label: "WEP" },
              { value: "Open", label: "Open (No Password)" },
            ].map((auth) => (
              <label
                key={auth.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="authenticationMethod"
                  value={auth.value}
                  checked={config.authenticationMethod === auth.value}
                  onChange={(e) =>
                    onConfigChange({
                      ...config,
                      authenticationMethod: e.target.value,
                    })
                  }
                  className="accent-blue-500"
                />
                <span className="text-sm">{auth.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* hidden: ssid? */}
        <div>
          <p className="text-sm font-medium mb-2">隠しSSID?</p>
          <div className="flex gap-4">
            {["true", "false"].map((val, i) => (
              <label
                key={val}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="hiddenSSID"
                  value={val}
                  checked={config.hiddenSSID === val}
                  onChange={(e) =>
                    onConfigChange({ ...config, hiddenSSID: e.target.value })
                  }
                  className="accent-blue-500"
                />
                <span>{i === 0 ? "Yes" : "No"}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Settings = ({ config, onConfigChange, showSettings, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
        showSettings ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-gray-500 text-xl font-semibold">Settings</h2>
        <Button
          onClick={onClose}
          className="text-gray-500 text-xl bg-white-500"
        >
          ×
        </Button>
      </div>

      <SettingsForm config={config} onConfigChange={onConfigChange} />
    </div>
  );
};
