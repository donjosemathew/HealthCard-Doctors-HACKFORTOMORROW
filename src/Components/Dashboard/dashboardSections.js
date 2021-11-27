import React, { useEffect } from "react";
import Patient from "./patient";
import QRSection from "./qrcode";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
const DashboardSection = ({ name, image, userid, location }) => {
  //const [uid, setUid] = useState("");
  let { uid } = useParams();
  const colRef = doc(db, "user", uid);
  const colRef2 = doc(db, "doctors", userid);
  const [data, setData] = useState("");
  const [dataDoctors, setDataDoctors] = useState("");
  const [load, setLoad] = useState(true);
  /////////////////////
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let dname = month[d.getMonth()];
  let day = d.getDay();
  let year = d.getFullYear();
  const currentday = day + " " + dname + " " + year;

  ///////////////////////////////

  //const q=query(colRef,where)
  const getDoctorsData = () => {
    getDoc(colRef2).then((doc) => {
      if (doc.exists) {
        setDataDoctors(doc.data());

        setLoad(false);
      }
    });
  };
  const resetData = () => {
    setData("");
    getDoc(colRef).then((doc) => {
      if (doc.exists) {
        setData(doc.data());
        getDoctorsData();
      } else {
        console.log("No such document!");
      }
    });
  };
  useEffect(() => {
    resetData();
  }, [uid]);
  useEffect(() => {
    resetData();
  }, []);
  const [btn, setBtn] = useState(1);
  //Selected button from the Prescriptions, Test Results, Predictions btns
  return (
    <div className="dashboard-section p-10 flex flex-col lg:grid lg:grid-cols-3 relative">
      <div className="dashboard-section__sec1 flex flex-col col-span-2 p-11  m-8 h-full bg-white rounded">
        {uid !== "dashboard" ? (
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
        ) : (
          <div className=" w-full flex items-center justify-center">
            <p className="text-3xl font-bold">Please scan QR of patients </p>
          </div>
        )}

        {btn === 1 && uid !== "dashboard" ? (
          <Patient
            dataDoctor={dataDoctors.personaldata}
            GetDate={currentday}
            uid={uid}
            resetData={resetData}
            load={load}
            data={data}
          />
        ) : (
          ""
        )}
        {btn === 2 ? "" : ""}
      </div>
      <div className="dashboard-section__sec2 ">
        {dataDoctors !== undefined ? (
          <QRSection
            name={name}
            image={image}
            uid={uid}
            userid={userid}
            resetData={resetData}
            data={dataDoctors.personaldata}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashboardSection;
