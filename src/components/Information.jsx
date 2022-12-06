import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapMarker} from "react-icons/fa";
import { FaClock} from "react-icons/fa";
export default function Information(props) {
  return (
    <>
      <div className="row d-flex align-items-center mb-3">
        <div className="col-auto">
          <span className="fs-4">
            <FaMapMarker />
          </span>
        </div>
        <div className="col">
          <span className="fs-4 ms-2">{props.country}</span>
        </div>
      </div>
      <div className="row d-flex align-items-center mb-3">
        <div className="col-auto">
          <span className="fs-4">
            <FaMapMarkerAlt />
          </span>
        </div>
        <div className="col">
          <span className="fs-4 ms-2">{props.region}</span>
        </div>
      </div>
      <div className="row d-flex align-items-center">
        <div className="col-auto">
          <span className="fs-4">
            <FaClock/>
          </span>
        </div>
        <div className="col">
          <span className="fs-4 ms-2">{props.clock}</span>
        </div>
      </div>
    </>
  );
}
