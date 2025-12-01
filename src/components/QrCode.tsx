import { QRCodeCanvas } from "qrcode.react";
import React, { useState, useEffect, forwardRef } from "react";

type QrCodeProps = {
  value: string;
};

const QrCode = forwardRef<HTMLCanvasElement, QrCodeProps>(({ value }, ref) => {
  console.log("QRCode URL: ", value);

  const [qrSize, setQrSize] = useState(192); // デフォルトサイズ

  // 画面サイズに応じてQRコードのサイズを動的に計算
  const getQRSize = (width: number) => {
    if (width < 640) return 128; // モバイル
    if (width < 768) return 160; // 小タブレット
    if (width < 1024) return 192; // タブレット
    if (width < 1280) return 300; // 小デスクトップ
    return 440; // 大デスクトップ
  };

  useEffect(() => {
    const updateSize = () => {
      const newSize = getQRSize(window.innerWidth);
      setQrSize(newSize);
    };

    // 初回設定
    updateSize();

    // リサイズイベントリスナーを追加
    window.addEventListener("resize", updateSize);

    // クリーンアップ
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  console.log("QRCode Size: ", qrSize);
  return (
    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 print:!w-[300px] print:!h-[300px]">
      <QRCodeCanvas
        value={value}
        size={qrSize}
        className="w-full h-full print:!w-[300px] print:!h-[300px]"
        ref={ref}
      />
    </div>
  );
});

QrCode.displayName = "QrCode";

export default QrCode;
