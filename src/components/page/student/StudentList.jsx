import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { API_URL } from "../../../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const StudentList = () => {
    let params = useParams()
    let id = params.id
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
    let res = await axios.get(`${API_URL}/mentors/students/${id}`);
    //api/mentors/students/:mentor_id
    try {
      if (res.status === 200) {
        setStudent(res.data.students);
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
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
         let res = await axios.delete(`${API_URL}/student/${id}`); 
        //api/student/:id
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
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Batch</th>
            <th>Action</th>
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
                  <Button onClick={() => navigate(``)} variant="info">
                    Edit
                  </Button>{" "}
                  &nbsp;
                  <Button onClick={() => handleDelete(e._id, e.batch)} variant="danger">
                    Delete
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

export default StudentList;
