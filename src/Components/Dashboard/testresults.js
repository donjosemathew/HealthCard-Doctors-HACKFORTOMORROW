import Loader from "react-loader-spinner";
import { FaRegHospital } from "react-icons/fa";
import { HiDownload, HiPlusSm, HiXCircle } from "react-icons/hi";
import EditPrescription from "../dialogs/addprescription";
import { useState } from "react";
const Testresults = ({ data, resetData, load, uid }) => {
  const [prescription, setPrescription] = useState(false);
  const [indexOfSelectedResult, setIndexOfSelectedResult] = useState(0);
  const [dialogueAim, setDialogueAim] = useState("add");
  const ClosePrescriptionDialogue = () => {
    setPrescription(false);
  };

  return (
    <>
      <div className="prescription w-full h-full mt-5 p-6">
        <div className="w-full flex flex-row justify-end ">
          <button
            onClick={() => {
              setPrescription(true);
              setDialogueAim("add");
            }}
            className={
              "p-4 rounded flex flex-row items-center justify-center btn font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
            }
          >
            <HiPlusSm size="1.5em" /> Prescriptions
          </button>
        </div>
        <div className="grid gap-4 grid-cols-2 mt-3">
          {!load ? (
            data ? (
              data.map((item, index) => {
                return (
                  <div className="prescription__card mt-3" key={index}>
                    <div className="testresult__card w-full relative m-3 p-7 bg-white">
                      <button
                        onClick={() => {
                          setIndexOfSelectedResult(index);
                          setDialogueAim("delete");
                          setPrescription(true);
                        }}
                        className="absolute top-2 right-2"
                      >
                        <HiXCircle size="2.2em" color="#ff5252" />
                      </button>
                      <div className="testresult__card__top flex flex-col items-center">
                        <div className="flex flex-row w-full  justify-between">
                          <div className="icn text-6xl p-2 ml-4 w-32 h-32 rounded-full flex items-center justify-center bg-yellow-300 bg-opacity-60">
                            {item.icon}
                          </div>
                          <div className="flex flex-col ml-4 ">
                            <p className="text-3xl sub-txt head-txt font-bold tracking-tight">
                              {item.category}
                            </p>
                            <div className="flex mt-2 flex-row items-center">
                              <FaRegHospital size="2em" color="#8390bb" />
                              <p className="text-3xl ml-3   head-txt font-medium tracking-tight">
                                {item.labname}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-row flex justify-between pl-2 mt-5   w-full">
                          <div
                            className="
                          "
                          >
                            <p className="text-3xl  head-txt font-medium tracking-tight">
                              {item.category}
                            </p>
                            <p className="text-3xl mt-2 sub-txt head-txt font-medium tracking-tight">
                              {item.value}
                            </p>
                          </div>
                          <div className=" flex flex-col items-end">
                            <p className="text-2xl  head-txt font-medium tracking-tight">
                              Reult Date :{" "}
                              <span className="sub-txt"> {item.date}</span>
                            </p>
                            <a
                              href={item.url}
                              className="flex mt-2 text-impo flex-row font-medium tracking-tight items-center text-2xl"
                              target="_blank"
                            >
                              <HiDownload color="#575ce5" size="1em" /> Download
                              PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Data available</h1>
            )
          ) : (
            <div className="flex  w-full h-full justify-center items-center">
              <Loader type="TailSpin" color="#575ce5" height={65} width={65} />
            </div>
          )}
        </div>
      </div>
      {prescription ? (
        <EditPrescription
          uid={uid}
          i={indexOfSelectedResult}
          dialogueAim={dialogueAim}
          resetData={resetData}
          data={data}
          ClosePrescriptionDialogue={ClosePrescriptionDialogue}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Testresults;
