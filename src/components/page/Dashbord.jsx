import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { API_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { LiaUserEditSolid } from "react-icons/lia";

const Dashboard = () => {
  let navigate = useNavigate();
  let [mentor, setMentor] = useState([]);
  // All user datas geting
  const getDetails = async () => {
    let res = await axios.get(`${API_URL}/mentors`);
    try {
      if (res.status === 200) {
        setMentor(res.data.mentor);
        console.log(mentor)
    }
} catch (error) {
     
    }
  };

  // handleDelete users
  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete the Mentor?")) {
      try {
        let res = await axios.delete(`${API_URL}/mentors/${id}`); //api/mentors/:id
        
        if (res.status === 200) {
        //   toast.success("Blog Deleted Successfully!");
          getDetails();
        }
      } catch (error) {
        // toast.error("Internal Server Error");
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className="Table-container">
        <Table striped bordered hover>
            <thead>
                <tr className="text-center">
                    <th>S.No</th>
                    <th>NAME</th>
                    <th>E-MAIL ID</th>
                    <th>BATCHES</th>
                    <th>STUDENTS</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody className="tableBody">
                {mentor.map((e, i) => {
                    
                return (
                <tr  className="text-center" key={e._id} >
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>
                    <Form.Select aria-label="Default select example">     
                      {e.batch.map((o, index) =>  <option value={o} key={index}>{o}</option>)}
                    </Form.Select>
                    </td>
                    <td><Button onClick={()=> navigate(`/student-list/${e._id}`)} variant="info">View Student</Button></td>
                    <td>
                        <Button onClick={()=> navigate(`/edit/${e._id}`)} variant="warning"><LiaUserEditSolid/></Button>{" "}
                        &nbsp;
                        <Button onClick={()=> handleDelete(e._id)} variant="danger"><FaTrashCan/></Button>
                    </td>
                </tr>);
                })}
            </tbody>
        </Table>
    </div>
  );
};

export default Dashboard;