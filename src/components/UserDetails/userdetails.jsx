import { useContext } from 'react';
import './userdetails.css'
import { MdEdit, MdDelete } from "react-icons/md";
import { ThemeContext } from '../../context/ThemeContext';

export const UserDetails = ({ details, editUser, deleteUserData }) => {
    const { id, name, email, website } = details
    const firstName = name.split(' ')[0]
    const lastName = name.split(' ')[1]
    // const defaultValue = {id, firstName, lastName, email, website}
    const data = useContext(ThemeContext)
    const onClickEditEmployee = () => {
        editUser(id, details)
    }
    const onClickDeleteUser = () => {
        deleteUserData(id)
    }
    return (
        <>
            <tr >
                <td style={{
                    background: data.dark ? '#212631' : '#fff',
                    color: data.dark ? '#fff' : '#212631'
                }}>{id}</td>
                <td style={{
                    background: data.dark ? '#212631' : '#fff',
                    color: data.dark ? '#fff' : '#212631'
                }}>{firstName}</td>
                <td style={{
                    background: data.dark ? '#212631' : '#fff',
                    color: data.dark ? '#fff' : '#212631'
                }}>{lastName}</td>
                <td style={{
                    background: data.dark ? '#212631' : '#fff',
                    color: data.dark ? '#fff' : '#212631'
                }}>{email}</td>
                <td style={{
                    background: data.dark ? '#212631' : '#fff',
                    color: data.dark ? '#fff' : '#212631'
                }}>{website}</td>
                <td style={{
                    background: data.dark ? '#212631' : '#fff',
                    color: data.dark ? '#fff' : '#212631'
                }}>
                    <MdEdit style={{ color: '#3399ff', marginRight: '10px', border: '1px solid #3399ff', borderRadius: '4px' }} size={20} onClick={onClickEditEmployee} />
                    <MdDelete style={{ color: '#e55353', border: '1px solid #e55353', borderRadius: '4px' }} size={20} onClick={onClickDeleteUser} />
                </td>
            </tr>
        </>

    )
}