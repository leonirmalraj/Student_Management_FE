import React from 'react'
import TopBar from '../common/TopBar'
import Dashbord from '../page/Dashbord'
import Mentor from '../page/mentor/Mentor'
import Student from '../page/student/Student'
import AllStudent from '../page/student/AllStudent'
import StudentList from '../page/student/StudentList'
import { Navigate } from 'react-router-dom'
import Edit from '../common/Edit'
import StudentEdit from '../page/student/StudentEdit'

const AppRoutes = [
    {
        path: "/",
        exact: true,
        element: <><TopBar/><Dashbord/></>
    },
    {
        path: "/mentor",
        exact: true,
        element: <><TopBar/><Mentor/></>
    },
    {
        path: "/student",
        exact: true,
        element: <><TopBar/><Student/></>
    },
    {
        path: "/all-student",
        exact: true,
        element: <><TopBar/><AllStudent/></>
    },
    {
        path: "/student-list/:id",
        exact: true,
        element: <><TopBar/><StudentList/></>
    },
    {
        path: "/edit/:id",
        exact: true,
        element: <><Edit/></>
    },
    {
        path: "/student-edit/:id",
        exact: true,
        element: <><StudentEdit/></>
    },
    {
        path: "/*",
        exact: true,
        element: <Navigate to="/" />
    },

]

export default AppRoutes