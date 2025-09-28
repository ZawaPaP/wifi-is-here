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
      </div>

      {/* Section: Orientation */}
      <div>
        <p className="font-medium mb-2">Orientation</p>
        <div className="flex gap-4">
          {["1", "2"].map((val, i) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="landscape"
                value={val}
                checked={config.landscape === val}
                onChange={(e) =>
                  onConfigChange({ ...config, landscape: e.target.value })
                }
                className="accent-blue-500"
              />
              <span>{i === 0 ? "Landscape" : "Portrait"}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section: Design */}
      <div>
        <p className="font-medium mb-2">Design</p>
        <div className="flex gap-4">
          {["1", "2", "3"].map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="design"
                value={val}
                checked={config.design === val}
                onChange={(e) =>
                  onConfigChange({ ...config, design: e.target.value })
                }
                className="accent-blue-500"
              />
              <span>Design {val}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section: Background */}
      <div className="flex flex-col gap-2">
        <p className="font-medium">Background Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            onConfigChange({ ...config, backgroundImage: e.target.value })
          }
          className="text-sm"
        />
        <img
          src={config.backgroundImage}
          alt="background"
          className="w-full rounded-md border mt-2"
        />
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
