import { Form, Input } from "antd";
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function Login() {
  const [code,setCode] = useState("");
  const [vcode,setVcode] = useState("")
  const generateRandomWord = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let word = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      word += characters[randomIndex];
    }
    setVcode(word);
  };
  useEffect(() => {
    generateRandomWord()
  }, [])
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    if(vcode===code){
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/employee/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/employee");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }}else {
      toast.error("please type the correct code")
    }
  };
  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen">
      <Form layout="vertical w-400 white p-4" onFinish={onFinish}>
        <h1 className="text-medium"><b>KL RESULTS</b></h1>
        <hr />
        <h1 className="text-medium">Employee - Login</h1>
        <hr />
        <Form.Item name="employeeId" label="Employee ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <h5>Please enter the code: {vcode}</h5>
        <Form.Item name="code">
          <Input type="text" placeholder="code" onChange={(e)=>setCode(e.target.value)} />
        </Form.Item>

        <button className="primary text-white px-5 my-2 w-100">Login</button>
        <Link to="/register" className="text-mini text-black">
          Not yet Registered , Click Here To Register
        </Link>
      </Form>
    </div>
  );
}

export default Login;
