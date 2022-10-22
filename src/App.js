import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Table from "react-bootstrap/Table";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";

const getLocalStorage = () => {
  let eklen = localStorage.getItem("eklen");
  if (eklen) {
    return JSON.parse(localStorage.getItem("eklen"));
  } else {
    return [];
  }
};

function App() {
  const [ert, setErt] = useState([]);
  const [eklen, setEkle] = useState(getLocalStorage());
  const [pasw, setPasw] = useState(false);
  const [tel, setTel] = useState(false);
  const [loca, setLoca] = useState(false);
  const [yas, setYas] = useState(false);
  const [is, setIs] = useState(false);
  const [mek, setMek] = useState(false);

  useEffect(() => {
    veri();
  }, []);

  const url = "https://randomuser.me/api/";

  const veri = async () => {
    try {
      const {
        data: { results },
      } = await axios(url);

      setErt(results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ert);
  const {
    picture,
    name,
    email,
    cell,
    location,
    registered,
    id,
    login,
    gender,
  } = ert;

  let jk = id?.value;
  let pic = picture?.large;
  let tit = name?.title;
  let fir = name?.first;
  let las = name?.last;
  let ag = registered?.age;
  let dat = registered?.date;
  let pas = login?.password;

  const ekleme = () => {
    let newtas = { fir, las, tit, email, cell, ag, jk, pas, gender };

    console.log(eklen);

    if (eklen?.filter((item) => item.jk === newtas.jk).length == 0) {
      setEkle([...eklen, newtas]);
    } else {
      alert("Listede Mevcut...");
    }
  };

  useEffect(() => {
    localStorage.setItem("eklen", JSON.stringify(eklen));
  }, [eklen]);

  return (
    <div className="App">
      <h1>EMPLOYEE LIST</h1>
      <div className="m-5  d-flex flex-wrap justify-content-evenly">
        <div>
          <Table
            style={{
              width: "300px",
              height: "400px",
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
            className=" mx-auto rounded-3"
            striped
            bgcolor="f4a261"
            hover
          >
            <thead>
              <tr className=" justify-content-center">
                <th colSpan={2} style={{ width: "100px" }}>
                  <img className="rounded-circle" src={picture?.large}></img>
                </th>
              </tr>
            </thead>
            <tbody>
              <div className="ana">
                <div>
                  <button
                    className="icon"
                    data-label="name"
                    onClick={(e) => setIs(!is)}
                  >
                    <img
                      src={gender == "female" ? womanSvg : manSvg}
                      alt="user"
                      id="iconImg"
                    />
                  </button>
                </div>

                {is && (
                  <div className="kardes">
                    My name is {name?.first} {name?.last}
                  </div>
                )}
              </div>

              <div className="ana">
                <div>
                  <button
                    className="icon"
                    data-label="email"
                    onClick={(e) => setMek(!mek)}
                  >
                    <img src={mailSvg} alt="mail" id="iconImg" />
                  </button>
                </div>
                {mek && <div className="kardes">My email is {ert.email}</div>}
              </div>

              <div className="ana">
                <div>
                  <button
                    className="icon"
                    data-label="age"
                    onClick={(e) => setYas(!yas)}
                  >
                    <img
                      src={gender == "female" ? womanAgeSvg : manAgeSvg}
                      alt="age"
                      id="iconImg"
                    />
                  </button>
                </div>
                {yas && (
                  <div className="kardes">My age is {registered?.age}</div>
                )}
              </div>

              <div className="ana">
                <div>
                  <button
                    className="icon"
                    data-label="street"
                    onClick={(e) => setLoca(!loca)}
                  >
                    <img src={mapSvg} alt="map" id="iconImg" />
                  </button>
                </div>
                {loca && (
                  <div className="kardes">
                    My street is {location?.street.name}
                  </div>
                )}
              </div>

              <div className="ana">
                <div>
                  <button
                    className="icon"
                    data-label="phone"
                    onClick={(e) => setTel(!tel)}
                  >
                    <img src={phoneSvg} alt="phone" id="iconImg" />
                  </button>
                </div>
                {tel && <div className="kardes">My phone is {ert.cell}</div>}
              </div>

              <div className="ana">
                <div
                  className="animated jello infinite"
                  style={{ border: "none" }}
                >
                  <button
                    className="icon animated jello infinite"
                    data-label="password"
                    onClick={(e) => setPasw(!pasw)}
                  >
                    <img src={padlockSvg} alt="lock" id="iconImg" />
                  </button>
                </div>
                {pasw && (
                  <div
                    className="kardes"
                    style={{ border: "none" }}
                    colSpan={2}
                  >
                    My password is {login?.password}
                  </div>
                )}
              </div>
            </tbody>
          </Table>
          <div className="container d-flex justify-content-center gap-5">
            <button
              onClick={() => {
                return veri();
              }}
              className="btn btn-success"
            >
              NEW USER
            </button>
            <button
              onClick={() => {
                ekleme();
              }}
              className="btn btn-warning"
            >
              ADD
            </button>
          </div>
        </div>
        <div className="asd">
          <div className="container">
            <Table
              style={{
                width: "600px",
                boxShadow:
                  "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
              }}
              className=" mx-auto rounded-3"
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th colSpan={1}>First Name</th>
                  <th colSpan={1}>Email</th>
                  <th colSpan={1}>Phone</th>
                  <th colSpan={1}>Age</th>
                </tr>
              </thead>

              {eklen.map((item) => (
                <tbody>
                  <tr>
                    <td>
                      {item.tit} {item.fir} {item.las}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.cell}</td>
                    <td>{item.ag}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
          {eklen.length == 0 ? (
            ""
          ) : (
            <button
              onClick={() => {
                setEkle([]);
              }}
              className="btn btn-danger"
            >
              DELETE ALL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
