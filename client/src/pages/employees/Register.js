import { Form, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ecode, setEcode] = useState("");
  const [ver, setVer] = useState("");
  const handleCode = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/getcode`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVer(data.verify);
      });
  };
  const onFinish = async (values) => {
    // e.preventDefault()
    if(ecode===ver) {
      try {
        dispatch(ShowLoading());
        const response = await axios.post("/api/employee/register", values);
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error(error.message);
      }
    } else{
      toast.error("please enter the correct code")
    }
  };
  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen">
      <Form layout="vertical w-400 white p-4" onFinish={onFinish}>
        <h1 className="text-medium"><b>KL RESULTS</b></h1>
        <hr />
        <h1 className="text-medium">Employee - Registration</h1>
        <hr />
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="employeeId" label="Employee ID">
          <Input />
        </Form.Item>
        <Form.Item name="Email" label="Email">
          <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Item>
        <div style={{display:"flex",gap:"10px"}}>
          <button onClick={handleCode} style={{width:"150px"}} className="primary text-white px-2">Get code</button>
          <Input onChange={(e)=>setEcode(e.target.value)} type="text" placeholder="enter code"/>
        </div>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="confirmPassword" label="Confirm Password">
          <Input type="password" />
        </Form.Item>
        <button className="primary text-white px-5 my-2 w-100">REGISTER</button>
        <Link to="/login" className=" text-mini">
          Already Registered , Click Here To Login
        </Link>
      </Form>
    </div>
  );
}

export default Register;
