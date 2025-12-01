import React, { useRef } from "react";
import Button from "./Button";
import QrCode from "./QrCode";

const DownloadButton = ({ qrCodeRef, ssid }) => {
  const handleDownload = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current;
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `wifi-qrcode-${ssid || "wifi"}.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <Button type="button" onClick={handleDownload}>
      QR Code Download
    </Button>
  );
};

const ShareButton = ({ config }) => {
  const handleShare = async () => {
    const shareText = `WiFi情報\nSSID: ${config.ssid}\nパスワード: ${config.password}\n認証方式: ${config.authenticationMethod}`;
    const shareData = {
      title: "WiFi情報",
      text: shareText,
    };

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        // Web Share APIが利用できない場合はクリップボードにコピー
        await navigator.clipboard.writeText(shareText);
        alert("WiFi情報をクリップボードにコピーしました");
      }
    } catch (error) {
      // ユーザーが共有をキャンセルした場合など
      if (error.name !== "AbortError") {
        // フォールバック: クリップボードにコピー
        try {
          await navigator.clipboard.writeText(shareText);
          alert("WiFi情報をクリップボードにコピーしました");
        } catch (clipboardError) {
          console.error(
            "クリップボードへのコピーに失敗しました:",
            clipboardError
          );
        }
      }
    }
  };

  return (
    <Button type="button" onClick={handleShare}>
      Share
    </Button>
  );
};

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button type="button" onClick={handlePrint}>
      Print
    </Button>
  );
};

const MainContent = ({ config, qrCodeRef }) => {
  return (
    <div className="w-full aspect-video border-2 border-gray-300 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
      {/* タイトル部分 */}
      <div className="flex-shrink-0">
        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold underline">
          WIFI_IS_HERE
        </p>
      </div>

      {/* メインコンテンツ部分 - 3つの要素をバランスよく配置 */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {/* WiFi情報とQRコードを横並びに配置 */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6 lg:gap-20 xl:gap-40">
          {/* WiFi情報 */}
          <div className="flex flex-col items-center space-y-4 lg:space-y-8 xl:space-y-20">
            <div className="text-center">
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-semibold">
                SSID
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold break-all">
                {config.ssid}
              </h2>
            </div>
            <div className="text-center">
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-2 font-semibold">
                Password
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold break-all">
                {config.password}
              </h2>
            </div>
          </div>

          {/* QRコード */}
          <div className="flex flex-col items-center justify-center -mt-2 lg:-mt-12 xl:-mt-32">
            <QrCode
              ref={qrCodeRef}
              value={
                "WIFI:T:" +
                config.authenticationMethod +
                ";S:" +
                config.ssid +
                ";P:" +
                config.password +
                ";H:" +
                config.hiddenSSID
              }
            />
          </div>
        </div>
      </div>

      {/* 下部の余白 */}
      <div className="flex-shrink-0 h-4"></div>
    </div>
  );
};

const MainButtons = ({ onSettingsClick, qrCodeRef, config }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-5 no-print">
      <DownloadButton qrCodeRef={qrCodeRef} ssid={config.ssid} />
      <ShareButton config={config} />
      <PrintButton />
      <Button onClick={onSettingsClick} className="no-print">
        Settings
      </Button>
    </div>
  );
};

export const Main = ({ config, onSettingsClick }) => {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2">
      <MainContent config={config} qrCodeRef={qrCodeRef} />
      <MainButtons
        onSettingsClick={onSettingsClick}
        qrCodeRef={qrCodeRef}
        config={config}
      />
    </div>
  );
};
