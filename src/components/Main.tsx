import React from "react";
import Button from "./Button";

const QrCode = () => {
  return <p>QR Code (sample)</p>;
};

const DownloadButton = () => {
  return <Button type="button">Download</Button>;
};

const ShareButton = () => {
  return <Button type="button">Share</Button>;
};

const PrintButton = () => {
  return <Button type="button">Print</Button>;
};

const MainContent = ({ config }) => {
  return (
    <div className="w-full aspect-video border-2 border-gray-300 flex flex-col items-center justify-between p-8">
      {/* タイトル部分 */}
      <div className="flex-shrink-0">
        <p className="text-6xl font-bold underline">WIFI_IS_HERE</p>
      </div>

      {/* メインコンテンツ部分 - 3つの要素をバランスよく配置 */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {/* WiFi情報とQRコードを横並びに配置 */}
        <div className="flex flex-row items-center justify-center w-full gap-12">
          {/* WiFi情報 */}
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <p className="text-2xl text-gray-600 mb-2 font-semibold">SSID</p>
              <h2 className="text-5xl font-bold break-all">{config.ssid}</h2>
            </div>
            <div className="text-center">
              <p className="text-2xl text-gray-600 mb-2 font-semibold">
                Password
              </p>
              <h2 className="text-5xl font-bold break-all">
                {config.password}
              </h2>
            </div>
          </div>

          {/* QRコード */}
          <div className="flex flex-col items-center justify-center">
            <QrCode />
          </div>
        </div>
      </div>

      {/* 下部の余白 */}
      <div className="flex-shrink-0 h-4"></div>
    </div>
  );
};

const MainButtons = ({ onSettingsClick }) => {
  return (
    <div className="flex flex-row gap-4 mt-5">
      <DownloadButton />
      <ShareButton />
      <PrintButton />
      <Button onClick={onSettingsClick}>Settings</Button>
    </div>
  );
};

export const Main = ({ config, onSettingsClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-2">
      <MainContent config={config} />
      <MainButtons onSettingsClick={onSettingsClick} />
    </div>
  );
};
