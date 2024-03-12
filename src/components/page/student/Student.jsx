import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { FaTrashCan, FaY } from "react-icons/fa6";
// import { toast } from 'react-toastify';
import { API_URL } from "../../../App";

const Student = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [allmentor, setAllMontor] = useState([]);
  let [allBatch, setAllBatch] = useState([]);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [batch, setBatch] = useState("");
  let [mentor, setMontor] = useState("");
let [previous_mentor, setPrevious_mentor] = useState([]);
  const handleAdd = async () => {
    try {
      let data = { name, batch, email, mentor, previous_mentor};
      if(data.name === "" || data.batch === "" || data.email === "" || data.mentor === ""){
           alert("Some input is empty")
      }else{
                let res = await axios.post(`${API_URL}/student`, data);
                if (res.status === 200) {
                  navigate("/");
                }
            }
      
    } catch (error) {
      // toast.error("Internal Server Error");
    }
  };
  
  const getDetails = async () => {
    let res = await axios.get(`${API_URL}/mentors`);
    setAllMontor(res.data.mentor);
    try {
      if (res.status === 200) {
      }
    } catch (error) {}
  };

  const mentorBatch = async (id)=>{
    setAllBatch([])
    if(id !== ""){
      let res = await axios.get(`${API_URL}/mentors/${id}`);
    setAllBatch(res.data.mentor.batch)
    setMontor(id)
    }else{
      setAllBatch([])
    }
  }



  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div className="edit-form">
        <div className="Title"><br/>
          <h1 className="text-center">
            Add Student Here...
          </h1>
        </div>
        <Form>
          <div className="formGroup">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label><b>NAME :</b></Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label><b>E-MAIL ID :</b></Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email"
              />
            </Form.Group>
               

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label><b>MENTOR :</b></Form.Label>
              <Form.Select className="select-student" onChange={(e) => {mentorBatch(e.target.value) }} aria-label="Default select example">
                <option value="">Select Mentor</option>
                {allmentor.map((e, i) => (<option key={i}  value={e._id}>{e.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label><b>BATCH :</b></Form.Label>
              <Form.Select className="select-student" onChange={(e)=>setBatch(e.target.value)}  aria-label="Default select example">
                <option value="">Select Batch</option>
                {allBatch.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="formGroup">
            <div className="student">
              <h5 className="text-center text-light">Previous Mentor</h5>
              {
                previous_mentor.map((e, i) => {
                  return (
                    <div key={i} className="d-flex justify-content-around">
                      <span>{e}</span>
                      <span className="trash_can">
                        <FaTrashCan />
                      </span>
                    </div>
                  );
                  // }
                })
              }
            </div>
          </div>
          <div className="buttonGroup">
            <Button onClick={() => handleAdd()} variant="primary">
              Submit
            </Button>
            &nbsp; &nbsp;
            <Button onClick={() => navigate("/dashboard")} variant="danger">
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Student;
