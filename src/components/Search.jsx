import { useState, useEffect } from "react";
import MaskedInput from "react-text-mask";
import Location from "./Location";

export default function Search() {
  const [ipData, setIpData] = useState();
  const [ip, setIp] = useState();

  const getDataFromApi = () => {
    fetch(`https://ipinfo.io/${ip}/json?token=91544cae5bed13`)
      .then((response) => response.json())
      .then((ipData) => setIpData(ipData))
      .catch((err) => console.error(err));
  };

  function handleIpSearch() {
    getDataFromApi();
  }

  const props = {
    guide: true,
    mask: (value) => {
      let result = [];
      const chunks = value.split(".");

      for (let i = 0; i < 4; ++i) {
        const chunk = (chunks[i] || "").replace(/_/gi, "");

        if (chunk === "") {
          result.push(/\d/, /\d/, /\d/, ".");
          continue;
        } else if (+chunk === 0) {
          result.push(/\d/, ".");
          continue;
        } else if (
          chunks.length < 4 ||
          (chunk.length < 3 && chunks[i].indexOf("_") !== -1)
        ) {
          if (
            (chunk.length < 2 && +`${chunk}00` > 255) ||
            (chunk.length < 3 && +`${chunk}0` > 255)
          ) {
            result.push(/\d/, /\d/, ".");
            continue;
          } else {
            result.push(/\d/, /\d/, /\d/, ".");
            continue;
          }
        } else {
          result.push(...new Array(chunk.length).fill(/\d/), ".");
          continue;
        }
      }

      result = result.slice(0, -1);
      return result;
    },
    pipe: (value) => {
      if (value === "." || value.endsWith("..")) return false;

      const parts = value.split(".");

      if (
        parts.length > 4 ||
        parts.some((part) => part === "00" || part < 0 || part > 255)
      ) {
        return false;
      }

      return value;
    },
    onChange: (e) => {
      setIp(e.target.value);
    },
  };

  return (
    <>
      <div className="row mt-150 align-items-center">
        <div className="col-12 text-center">
          <p className="fs-1">IP Address</p>
        </div>
        <div className="col-7 text-end">
          <MaskedInput {...props} />
        </div>
        <div className="col text-start">
          <button className="btn btn-primary" onClick={handleIpSearch}>
            Search
          </button>
        </div>
        {ipData && (
        <div className="col-6 mt-150">
          <p className="fs-3">{ipData.region}</p>
        </div>)}
        {ipData && (
          <div className="col-6 mt-150">
            <Location location={ipData.loc}></Location>
          </div>
        )}
      </div>
    </>
  );
}
