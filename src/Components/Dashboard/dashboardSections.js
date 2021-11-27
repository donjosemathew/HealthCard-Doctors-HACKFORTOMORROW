import React, { useEffect } from "react";
import Patient from "./patient";
import QRSection from "./qrcode";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
const DashboardSection = ({ name, image }) => {
  //const [uid, setUid] = useState("");
  let { uid } = useParams();
  const colRef = doc(db, "user", uid);
  const colRef2 = doc(db, "doctors", "qQr7J8vNTYRxvle1C8h3aZJXBkF3");
  const [data, setData] = useState("");
  const [dataDoctors, setDataDoctors] = useState("");
  const [load, setLoad] = useState(true);

  //const q=query(colRef,where)
  const getDoctorsData = () => {
    setDataDoctors("");
    getDoc(colRef2).then((doc) => {
      setDataDoctors(doc.data());
      console.log(doc.data());
      setLoad(false);
    });
  };
  const resetData = () => {
    setData("");
    getDoc(colRef).then((doc) => {
      setData(doc.data());
      console.log(doc.data());
      getDoctorsData();
    });
  };
  useEffect(() => {
    resetData();
  }, [uid]);

  const [btn, setBtn] = useState(1);
  //Selected button from the Prescriptions, Test Results, Predictions btns
  return (
    <div className="dashboard-section p-10 flex flex-col lg:grid lg:grid-cols-3 relative">
      <div className="dashboard-section__sec1 flex flex-col col-span-2 p-11  m-8 h-full bg-white rounded">
        <div className="dashboard-section__sec1__btnholder mt-10  ">
          <button
            onClick={() => {
              setBtn(1);
            }}
            className={
              btn === 1
                ? "p-4 rounded btn-active font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                : "p-4 rounded btn font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
            }
          >
            Patient
          </button>
          <button
            onClick={() => {
              setBtn(2);
            }}
            className={
              btn === 2
                ? "p-4 ml-4 rounded btn-active font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                : "p-4   ml-4 rounded btn font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
            }
          >
            All Patients
          </button>
        </div>
        {btn === 1 ? <Patient uid={uid} load={load} data={data} /> : ""}
        {btn === 2 ? "" : ""}
      </div>
      <div className="dashboard-section__sec2 ">
        <QRSection
          name={name}
          image={image}
          uid={uid}
          resetData={resetData}
          data={dataDoctors.personaldata}
        />
      </div>
    </div>
  );
};

export default DashboardSection;
