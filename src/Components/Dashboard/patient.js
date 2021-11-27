import { useState } from "react";
import { FaRegHospital } from "react-icons/fa";
import Loader from "react-loader-spinner";

import { IoAddCircleSharp } from "react-icons/io5";
import EditPrescription from "../dialogs/addprescription";
const Patient = ({
  data,
  load,
  uid,
  resetData,
  GetDate,
  userid,
  dataDoctor,
}) => {
  const [btn, setBtn] = useState(1);
  const [addMedicine, setAddMedicine] = useState(false);
  const CloseDialogue = () => {
    setAddMedicine(false);
  };
  let medicinedata = "";
  if (data) {
    data.prescription.map((item, index) => {
      if (item.date === GetDate) {
        medicinedata = item;
      }
    });
  }

  return (
    <>
      <div className="prescription w-full h-full mt-2 p-6 pt-0">
        {!load ? (
          true ? (
            <div className="prescription__card mt-8">
              <div className="flex flex-row justify-between">
                <p className="text-2xl head-txt font-medium tracking-tight">
                  {GetDate}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-2xl head-txt font-medium tracking-tight">
                  Patinet Name:
                  <span className="font-bold sub-txt "> Sam Jose</span>
                </p>
                <p className="text-2xl head-txt font-medium tracking-tight">
                  Age:
                  <span className="font-bold sub-txt ">
                    {data ? data.personaldata.age : "Not Available"}
                  </span>
                </p>
              </div>
              <div className="prescription__card__subcard p-6 mt-3 bg-white">
                <div className="flex flex-row items-center mt-6">
                  <FaRegHospital size="2em" color="#8390bb" />
                  <p className="text-2xl ml-5 head-txt font-medium tracking-tight">
                    {dataDoctor.hospital}
                  </p>
                </div>
                <div className="dashboard-section__sec1__btnholder mt-5 mb-5">
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
                    ADD PRESCRIPTIONS
                  </button>
                  <button
                    onClick={() => {
                      setBtn(2);
                    }}
                    className={
                      btn === 2
                        ? "p-4 ml-4  rounded btn-active font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                        : "p-4   ml-4 rounded btn font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                    }
                  >
                    TEST RESULTS
                  </button>
                </div>
                {btn === 1 ? (
                  <>
                    <div className="prescription__table flex flex-col mt-3">
                      <div className="flex flex-row w-full ">
                        <p className="text-2xl text-white ml-5  font-medium tracking-tight">
                          s
                        </p>
                        <p className="text-2xl ml-5 w-full text-center  head-txt font-medium tracking-tight">
                          Med.Name
                        </p>
                        <p className="text-2xl ml-5  text-center w-full head-txt font-medium tracking-tight">
                          Dosage
                        </p>
                        <p className="text-2xl ml-5  text-center w-full head-txt font-medium tracking-tight">
                          Duration
                        </p>
                      </div>

                      {medicinedata
                        ? medicinedata.medicine.map((data, i) => {
                            return (
                              <div
                                className="flex flex-row w-full mt-3"
                                key={i}
                              >
                                <p className="text-2xl  sub-txt ml-5  font-medium tracking-tight">
                                  {i + 1}
                                </p>
                                <p className="text-2xl ml-5 sub-txt w-full text-center  head-txt font-medium tracking-tight">
                                  {data.medname}
                                </p>
                                <p className="text-2xl ml-5 sub-txt  text-center w-full head-txt font-medium tracking-tight">
                                  {data.dosage}
                                </p>
                                <p className="text-2xl ml-5 sub-txt  text-center w-full head-txt font-medium tracking-tight">
                                  {data.duration}
                                </p>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                    <div className="p-3 flex flex-row justify-end">
                      <IoAddCircleSharp
                        onClick={() => {
                          setAddMedicine(true);
                        }}
                        size="3em"
                        className="cursor-pointer"
                        color="#575ce5"
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {btn === 2 ? (
                  <div className="prescription__table flex flex-col mt-3">
                    <div className="flex flex-row w-full ">
                      <p className="text-2xl text-white ml-5  font-medium tracking-tight">
                        s
                      </p>
                      <p className="text-2xl ml-5 w-full text-center  head-txt font-medium tracking-tight">
                        Test Title
                      </p>
                      <p className="text-2xl ml-5  text-center w-full head-txt font-medium tracking-tight">
                        File
                      </p>
                      <p className="text-2xl ml-5  text-center w-full head-txt font-medium tracking-tight">
                        Date
                      </p>
                    </div>
                    {data
                      ? data.test.map((data, i) => {
                          return (
                            <div className="flex flex-row w-full mt-3" key={i}>
                              <p className="text-2xl  sub-txt ml-5  font-medium tracking-tight">
                                {i + 1}
                              </p>
                              <p className="text-2xl ml-5 sub-txt w-full text-center  head-txt font-medium tracking-tight">
                                {data.category}
                              </p>
                              <p className="text-2xl ml-5 sub-txt  text-center w-full head-txt font-medium tracking-tight">
                                {data.url}
                              </p>
                              <p className="text-2xl ml-5 sub-txt  text-center w-full head-txt font-medium tracking-tight">
                                {data.date}
                              </p>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            "No Data"
          )
        ) : (
          <div className="flex  w-full h-full justify-center items-center">
            <Loader type="TailSpin" color="#575ce5" height={65} width={65} />
          </div>
        )}
      </div>
      {!addMedicine ? (
        ""
      ) : (
        <EditPrescription
          GetDate={GetDate}
          resetData={resetData}
          dialogueAim="ds"
          uid={uid}
          userid={userid}
          data={data}
          CloseDialogue={CloseDialogue}
        />
      )}
    </>
  );
};

export default Patient;
