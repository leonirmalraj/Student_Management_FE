import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import axios from 'axios';
import { FaTrashCan } from "react-icons/fa6";
import { API_URL } from '../../App'; 

const Edit = () => {
  let navigate = useNavigate()
  let params = useParams()
  
  let [name, setName] = useState("");
  let [batch, setBatch] = useState([]);
  let [email, setEmail] = useState("");
  let [students, setStudents] = useState([]);

  let [newBatch, setNewBatch] = useState('')

  const handleEdit = async ()=> {
    try {
      let data = {name, batch, email, students}
      let res = await axios.put(`${API_URL}/mentors/${params.id}`,data)
      if(res.status === 200){
        navigate('/')
      }
    } catch (error) {
        toast.error("Internal Server Error")
    }   
  }

  const getDetails = async ()=>{    
    let res = await axios.get(`${API_URL}/mentors/${params.id}`)
    let res2 = await axios.get(`${API_URL}/mentors/students/${params.id}`)
    try {
      if(res.status === 200){
        setName(res.data.mentor.name)
        setBatch(res.data.mentor.batch)
        setEmail(res.data.mentor.email)
        setStudents(res2.data.students)
      }
    } catch (error) {
      
    }
  }

  const handleAddBatch = ()=>{
      let newArray = [...batch]
      if(newBatch === ""){
        alert("Input is empty")
      }else{
        let trime = newBatch.trim()
        newArray.push(trime)
      }
      setBatch(newArray)
      setNewBatch("")     
  }

  const handleBatchDelte = (index)=>{
    let newArray = [...batch]
    newArray.splice(index,1)
     setBatch(newArray)
  }

  useEffect(()=>{
     getDetails()
  },[])

  return (
    <>
     <div className="edit-form">
        <div className="Title">
            <h1 className='text-center'>Edit Mentor
                <FaUserEdit style={{ paddingBottom: "5px" , fontSize: "60px" , filter: "drop-shadow(1px 1px 20px blue)"
                    }} />
            </h1>
        </div>
        <Form>
            <div className="formGroup">
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Name :</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email :</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Batchs :</Form.Label>
                    <Form.Control type="text" value={newBatch} onChange={(e)=>{setNewBatch(e.target.value)}} placeholder="Add New Batch" />
                    <Button onClick={()=> handleAddBatch()} variant="success">Add</Button>
                </Form.Group>
            </div>
            <div className="formGroup">
                <div className="batch m-2">
                    <h5 className='text-center text-light'>Batchs</h5>
                    {
                        batch.map((e, i)=> <div key={i} className='d-flex justify-content-around'><span>{e}</span><span  onClick={()=>handleBatchDelte(i)} className='trash_can'><FaTrashCan /></span></div>)
                    }                  
                        
                </div>
                <div className="student m-2">
                    <h5 className='text-center text-light'>Students</h5>
                    {                       
                            students.map((e, i)=>{                               
                                  return <div key={i} className='d-flex justify-content-around'><span>{e.name}</span><span className='trash_can'><FaTrashCan /></span></div>                               
                          })                            
                    }                  
                        
                </div>
            </div>
            <div className="buttonGroup">
                <Button onClick={()=> handleEdit()} variant="primary">
                    Submit
                </Button>
                &nbsp; &nbsp;
                <Button onClick={()=> navigate("/dashboard")} variant="warning">
                    Cancel
                </Button>
            </div>
        </Form>
    </div>
    </>   
  )
}

export default Edit