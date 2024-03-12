import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { API_URL } from "../../../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { LiaUserEditSolid } from "react-icons/lia";
import { toast } from "react-toastify";

const AllStudent = () => {
  
  let navigate = useNavigate();
  let [student, setStudent] = useState([]);

  const findIndex = (array, id)=>{ 
    // array index finder
    for(let i = 0; i< array.length; i++){
      if(array[i]._id === id){
        return i
      }
    }
  }

  // All user datas geting
  const getDetails = async () => {
    let res = await axios.get(`${API_URL}/student`);
    //api/mentors/student/:mentor_id
    try {
      if (res.status === 200) {
        setStudent(res.data.student);
      }
    } catch (error) {}
  };

    // handleDelete users
    const handleDelete = async (id, batch) => {
      if (confirm("Are you sure to delete the Student?")) {
        try {
        const index = findIndex(student, id)
        let newArray = [...student]
        newArray.splice(index, 1)
        setStudent(newArray)
        toast.success("Student Deleted Successfully!");
          let res = await axios.delete(`${API_URL}/student/${id}`); //api/student/:id
          if (res.status === 200) {
            getDetails();
          }
        } catch (error) {
          toast.error("Internal Server Error");
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
            <th>S.NO</th>
            <th>NAME</th>
            <th>E-MAIL ID</th>
            <th>BATCH</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {student.map((e, i) => {
            return (
              <tr className="text-center" key={e._id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.batch}</td>
                <td>
                  <Button onClick={() => navigate(`/student-edit/${e._id}`)} variant="warning">
                  <LiaUserEditSolid />
                  </Button>{" "}
                  &nbsp;
                  <Button onClick={() => handleDelete(e._id, e.batch)} variant="danger">
                  <FaTrashCan />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AllStudent;
