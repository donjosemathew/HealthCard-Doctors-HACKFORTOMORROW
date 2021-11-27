import React from "react";
import Loader from "react-loader-spinner";
import QRCode from "qrcode";
import { IoCall, IoArrowRedoCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import EditDetails from "../dialogs/editpersonaldata";
import { AiOutlineEdit, AiFillBank } from "react-icons/ai";
const QRSection = ({ data, resetData, uid, name, image, userid }) => {
  const [dialog, setDialog] = useState(false);

  /////Close Dialogue
  const CloseDialogue = () => {
    setDialog(false);
  };
  /////Open Dialogue
  const OpenDialogue = () => {
    setDialog(true);
  };

  return (
    <>
      <div className="qrcode-section relative m-8 flex flex-col items-center   h-full bg-white rounded">
        <div
          onClick={OpenDialogue}
          className="absolute cursor-pointer light-primary rounded-full w-16 h-16 bg-red-300 flex items-center justify-center top-6 right-6"
        >
          {" "}
          <AiOutlineEdit className="" size="2.3rem" color="#575CE5" />
        </div>
        <div className="container flex flex-col mt-10 justify-center items-center w-full">
          <img src={image} className=" rounded-full h-60" alt="QR" />
        </div>
        <p className="text-4xl font-medium tracking-tight">{name}</p>
        <div className="w-full">
          {data ? (
            <>
              <div className="p-4 m-6 flex flex-row items-center justify-between relative bg-gray-100">
                <IoCall size="2.4em" color="#575ce5" />
                <p className="bg-transparent font-bold input-text text-2xl outline-none ml-3 text-gray-500">
                  {data.phone}
                </p>
              </div>
              <div className="p-4 m-6 flex flex-row items-center justify-between relative bg-gray-100">
                <AiFillBank size="2.4em" color="#575ce5" />
                <p className="bg-transparent font-bold input-text text-2xl outline-none ml-3 text-gray-500">
                  {data.hospital ? data.hospital : ""}
                </p>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center items-center">
              <Loader type="TailSpin" color="#575ce5" height={65} width={65} />
            </div>
          )}
          <div className="w-full  flex justify-center items-center">
            <button className="p-4 flex flex-row justify-center items-center ml-6 rounded btn-2 mt-6 font-medium pl-7 pr-7 text-xl tracking-tight		bg-blue-50">
              SHARE PROFILE
              <IoArrowRedoCircleSharp
                className="ml-5"
                size="2em"
                color="#fff"
              />
            </button>
          </div>
        </div>
      </div>
      {dialog ? (
        <EditDetails
          uid={uid}
          resetData={resetData}
          data={data}
          userid={userid}
          CloseDialogue={CloseDialogue}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default QRSection;
