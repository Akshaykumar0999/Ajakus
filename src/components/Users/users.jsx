import Header from '../Header/header'
import './users.css'

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { UserDetails } from '../UserDetails/userdetails';
import { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';

const DashBoard = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [show, setShow] = useState(false);
    const [EditShow, setEditShow] = useState(false);
    const [userData, setUserData] = useState({ id: '', firstName: '', lastName: '', email: '', department: '' })
    const [activeID, setActiveID] = useState(null)
    const [defaultValues, setDefaultValue] = useState({ firstName: '', lastName: '', email: '', department: '' })
    const [userEditedData, setEditedUserData] = useState({ firstName: defaultValues.name, lastName: defaultValues.name, email: defaultValues.email, department: defaultValues.website })

    const data = useContext(ThemeContext)

    // This funtion is used to chage the values in input fields and set the data in state(userData)
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    // This funtion is used to chage the Editedvalues in input fields and set the data in state(userEditedData) 
    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditedUserData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    // Intializing basrUrl and other data here using Axios Library
    const Api = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',

    })

    // Making Api call and get the userData from backend api
    const getUsersData = async () => {
        try {
            const res = await Api.get('/users')
            if (res.status === 200) {
                setUserDetails(res.data)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
        getUsersData();
    }, []);


    // Add usersData to the Api
    const handleSubmitData = async (e) => {
        e.preventDefault()
        if (!isNaN(userData.id)) {
        const newID = userDetails.find((eachData) => {
            return eachData.id === parseInt(userData.id);
        });
        // if (!newID) {
            try {
                const newUser = {
                    id: userData.id,
                    name: userData.firstName + ' ' + userData.lastName,
                    email: userData.email,
                    website: userData.department
                }
                const res = await Api.post('/users', newUser)
                console.log(res)
                if (res.status === 201) {
                    setShow(false)
                    alert('Added User Successfully🤩')
                }else {
                    alert('Failed to Add')
                }
                setUserDetails((prev) => ([...prev, res.data]))
            } catch (error) {
                alert(error.message)
            }
            setUserData({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                department: ''
            })
        }else {
            alert('Give Unique Id')
        }
    // }else {
    //         alert('Enter The Fields')
    //     }
        
    }

    // EditUser Api Calling
    const editUser = (id, data) => {
        setDefaultValue(data)
        setEditShow(true)
        setActiveID(id)
    }
    const editUpdatedValue = async (e) => {
        e.preventDefault();
        try {
            const newEditedUser = {
                name: userEditedData.firstName + ' ' + userEditedData.lastName,
                email: userEditedData.email,
                website: userEditedData.department,
            }
            const res = await Api.put(`/users/${activeID}`, newEditedUser)
            if (res.status === 200) {
                setEditShow(false)
                alert('Updated User Successfully🤩')
            }else {
                alert('Failed to Update')
            }
            const editedUserDetails = userDetails.map(each => {
                if (each.id === res.data.id) {
                    return res.data
                } else {
                    return each
                }
            })
            setUserDetails(editedUserDetails)
        } catch (error) {
            alert(error.message)
        }
    }

    // Delete User Api calling...
    const deleteUserData = async (id) => {
        try {
            const response = await Api.delete(`/users/${id}`)
            console.log(response)
            const filteredData = userDetails.filter(each => each.id !== id)
            setUserDetails(filteredData)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='dash-main-card-container' style={{
            background: data.dark ? '#212631' : '#fff',
            color: data.dark ? '#fff' : '#212631'
        }}>
            <Header />
            <div className='dashboard-content-card'>
                <main className='main-content-of-list-item'>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{ color: '#3399ff', marginBottom: '20px' }}>Users Data</h2>
                        <button className='bg-primary text-white' style={{ borderRadius: '5px', alignSelf: 'flex-end', marginBottom: '10px' }} onClick={() => setShow(true)}>Add Employee</button>
                    </div>
                    <div className='table-acrd'>
                        <Table striped bordered hover>
                            <thead>
                                <tr key='abc'>
                                    <th style={{ background: '#3399ff', color: '#ffffff' }}>ID</th>
                                    <th style={{ background: '#3399ff', color: '#ffffff' }}>FirstName</th>
                                    <th style={{ background: '#3399ff', color: '#ffffff' }}>LastName</th>
                                    <th style={{ background: '#3399ff', color: '#ffffff' }}>Email</th>
                                    <th style={{ background: '#3399ff', color: '#ffffff' }}>Department</th>
                                    <th style={{ background: '#3399ff', color: '#ffffff' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.map((user) =>
                                    <UserDetails key={user.id} details={user} editUser={editUser} deleteUserData={deleteUserData} />
                                )}
                            </tbody>
                        </Table>
                    </div>
                </main>
                <Modal
                    show={show}
                    size='xl'
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton style={{
                        background: data.dark ? '#212631' : '#fff',
                        color: data.dark ? '#fff' : '#212631'
                    }}>
                        <Modal.Title id="example-custom-modal-styling-title" >
                            Add User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{
                        background: data.dark ? '#212631' : '#fff',
                        color: data.dark ? '#fff' : '#212631'
                    }}>
                        <Form>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col md style={{ marginBottom: '10px' }}>
                                    {data.dark && <Form.Label>Unique ID</Form.Label>}
                                    <Form.Control type='number' placeholder="Unique ID" name='id' value={userData.id} onChange={handleChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                                <Col md style={{ marginBottom: '10px' }}>
                                    {data.dark && <Form.Label>First name</Form.Label>}
                                    <Form.Control placeholder="First name" name='firstName' value={userData.firstName} onChange={handleChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                                <Col md style={{ marginBottom: '10px' }}>
                                    {data.dark && <Form.Label>Last name</Form.Label>}
                                    <Form.Control placeholder="Last name" name='lastName' value={userData.lastName} onChange={handleChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                                <Col md style={{ marginBottom: '10px' }}>
                                    {data.dark && <Form.Label>Email</Form.Label>}
                                    <Form.Control placeholder="Email" name='email' value={userData.email} onChange={handleChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                                <Col md style={{ marginBottom: '10px' }}>
                                    {data.dark && <Form.Label>Department</Form.Label>}
                                    <Form.Control placeholder="Department" name='department' value={userData.department} onChange={handleChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                            </Row>
                        </Form>
                        <button type='submit' className='btn btn-success' onClick={handleSubmitData} style={{ marginTop: '10px', marginRight: '10px' }}>
                            Add User
                        </button>
                        {data.dark && 
                        <button className='btn btn-secondary' onClick={() => setShow(false)} style={{ marginTop: '10px', color: '#fff' }}>
                            Close
                        </button>}
                    </Modal.Body>
                </Modal>
                        
                        
                <Modal
                    show={EditShow}
                    size='xl'
                    onHide={() => setEditShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton style={{
                        background: data.dark ? '#212631' : '#fff',
                        color: data.dark ? '#fff' : '#212631'
                    }}>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Edit User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{
                        background: data.dark ? '#212631' : '#fff',
                        color: data.dark ? '#fff' : '#212631'
                    }}>
                        <Form>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    {data.dark && <Form.Label>FirstName</Form.Label>}
                                    <Form.Control placeholder="First name" name='firstName' value={userEditedData.firstName} onChange={handleEditChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                                <Col>
                                    {data.dark && <Form.Label>LastName</Form.Label>}
                                    <Form.Control placeholder="Last name" name='lastName' value={userEditedData.lastName} onChange={handleEditChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                                <Col>
                                    {data.dark && <Form.Label>Email</Form.Label>}
                                    <Form.Control placeholder="Email" name='email' value={userEditedData.email} onChange={handleEditChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                                <Col>
                                    {data.dark && <Form.Label>Department</Form.Label>}
                                    <Form.Control placeholder="Department" name='department' value={userEditedData.department} onChange={handleEditChange} style={{
                                        background: data.dark ? '#212631' : '#fff',
                                        color: data.dark ? '#fff' : '#212631'
                                    }} />
                                </Col>
                            </Row>
                        </Form>
                        <button className='btn btn-success' onClick={editUpdatedValue} style={{ marginTop: '10px', marginRight: '10px' }}>
                            Edit
                        </button>
                        {data.dark && 
                        <button className='btn btn-secondary' onClick={() => setEditShow(false)} style={{ marginTop: '10px', color: '#fff' }}>
                            Close
                        </button>}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default DashBoard