import { updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react/cjs/react.development";
import { db } from "../../firebase/firebase";
import Loader from "react-loader-spinner";
const EditPrescription = ({
  data,
  resetData,
  CloseDialogue,
  dialogueAim,
  uid,
}) => {
  const docref = doc(db, "user", uid);
  const [medicinenme, setMedcinname] = useState("");
  const [dose, setDose] = useState("");
  const [duration, SetDuration] = useState("");

  const [index, setIndex] = useState(-1);
  const [uploading, setUploading] = useState(false);
  let json = [];
  let smedateindex = 0;
  const update = () => {
    data.prescription.map((item, ind) => {
      if (item.date === "29 Januvary 2021") {
        smedateindex = ind;
        data.prescription.map((item, ind) => {
          if (item.date === "29 Januvary 2021") {
            json.push(item);
          }
        });
        json = [
          ...json,
          {
            date: "26 Januvary 2021",
            doctrname: "s",
            hospital: "sds",
            medicine: [
              ...data.prescription[smedateindex].medicine,
              { dosage: "sds", duration: "Sdsdsds", medname: "sdsd" },
            ],
          },
        ];
      } else {
        json = [
          ...data.prescription,
          {
            date: "29 Jan v",
            doctrname: "sds",
            hospital: "MIMS",
            medicine: [
              {
                dosage: "sds",
                duration: "Sdsdsds",
                medname: "sdsd",
              },
            ],
          },
        ];
        setIndex(-1);
      }
    });
    setUploading(true);
    updateDoc(docref, {
      prescription: json,
    })
      .then(() => {
        CloseDialogue();
        setUploading(false);
        resetData();
      })
      .catch((error) => {
        setUploading(false);
        console.log(error);
      });
  };
  const deleteData = (i) => {
    let deletedArray = data;
    //console.log(data);
    deletedArray.pop(i);

    setUploading(true);
    updateDoc(docref, {
      test: deletedArray,
    })
      .then(() => {
        setUploading(false);
        resetData();
        CloseDialogue();
      })
      .catch((error) => {
        setUploading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (data) {
      //setAge(data.age);
      // setHeight(data.height);
      //setWeight(data.weight);
      // setSex(data.sex);
    }
  }, [data]);

  return (
    <div className="bg-gray-500 bg-opacity-50 top-0 left-0 flex items-center justify-center  modal-window  fixed z-50 ">
      {uploading ? (
        <Loader type="TailSpin" color="#575ce5" height={65} width={65} />
      ) : (
        <>
          <div className="dialog p-8 pl-12 rounded-md w-2/5  bg-white">
            <p className="text-3xl font-medium mt-4 tracking-tight">
              {dialogueAim === "delete" ? "Delete Results" : "Add medicine"}
            </p>

            {dialogueAim !== "delete" ? (
              <>
                <div class="lg:mt-6 mt-10 flex flex-col ">
                  <label
                    className="text-3xl head-txt text-gray-700 tracking-tight font-medium"
                    for="username"
                  >
                    Medicine Name:
                  </label>
                  <input
                    onChange={(e) => {
                      setMedcinname(e.target.value);
                    }}
                    className="text-2xl mt-2  focus:outline-none focus:bg-gray-100  bg-gray-200 text-gray-700 tracking-tight p-4 outline-none   rounded "
                    id="name"
                    type="text"
                    placeholder=" Medicine Name"
                    value={medicinenme}
                  />
                </div>
                <div class="lg:mt-6 mt-10 flex flex-col ">
                  <label
                    className="text-3xl head-txt text-gray-700 tracking-tight font-medium"
                    for="username"
                  >
                    Dosage:
                  </label>
                  <input
                    onChange={(e) => {
                      setDose(e.target.value);
                    }}
                    className="text-2xl mt-2   focus:outline-none focus:bg-gray-100  bg-gray-200 text-gray-700 tracking-tight p-4 outline-none   rounded "
                    id="name"
                    type="text"
                    value={dose}
                    placeholder="Dosage"
                  />
                </div>
                <div class="lg:mt-6 mt-10 flex flex-col ">
                  <label
                    className="text-3xl head-txt text-gray-700 tracking-tight font-medium"
                    for="username"
                  >
                    Duration
                  </label>
                  <input
                    onChange={(e) => {
                      SetDuration(e.target.value);
                    }}
                    className="text-2xl mt-2   focus:outline-none focus:bg-gray-100  bg-gray-200 text-gray-700 tracking-tight p-4 outline-none   rounded "
                    id="name"
                    type="text"
                    placeholder="Duration"
                    value={duration}
                  />
                </div>

                <div className="flex justify-end mt-4 w-full flex-row bg-gray-50">
                  <button
                    onClick={update}
                    className="p-4 ml-4 rounded btn font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                  >
                    &nbsp;Add&nbsp;
                  </button>
                  <button
                    onClick={CloseDialogue}
                    className="p-4 ml-4 rounded btn-active font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-end mt-4 w-full flex-row bg-gray-50">
                <button
                  onClick={deleteData}
                  className="p-4 ml-4 rounded btn font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                >
                  &nbsp;Delete&nbsp;
                </button>
                <button
                  onClick={CloseDialogue}
                  className="p-4 ml-4 rounded btn-active font-medium pl-7 pr-7 text-2xl tracking-tight	bg-blue-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default EditPrescription;
