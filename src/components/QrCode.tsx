import { QRCodeCanvas } from "qrcode.react";
import React from "react";

type QrCodeProps = {
  value: string;
};

const QrCode = ({ value }: QrCodeProps) => {
  console.log("QRCode URL: ", value);
  return <QRCodeCanvas value={value} size={250} />;
};

export default QrCode;
