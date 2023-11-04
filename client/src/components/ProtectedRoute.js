import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts.js";
import { SetEmployee } from "../redux/employees.js";
import DefaultLayout from "../components/DefaultLayout.js";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const [loggedinTime,setLoggedinTime] = useState()
  const now = new Date();
  // console.log(d)
  const timeDifference = now - loggedinTime;
  const minutesDifference = timeDifference / (1000 * 60);
  const navigate = useNavigate();
  if(minutesDifference>=10) {
    localStorage.removeItem("token")
    toast.error("session timed out")
    navigate("/")
  }
  const [readyToRednder, setReadyToRednder] = React.useState(false);
  const dispatch = useDispatch();

  const geEmployeeData = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      dispatch(HideLoading());
      const resposne = await axios.post(
        "/api/employee/get-employee-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resposne.data.success) {
        dispatch(SetEmployee(resposne.data.data));
        setReadyToRednder(true);
        let d = new Date();
        setLoggedinTime(d)
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(HideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    geEmployeeData();
  }, []);

  return readyToRednder && <DefaultLayout>{props.children}</DefaultLayout>;
}

export default ProtectedRoute;
