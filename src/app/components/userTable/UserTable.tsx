import React, { useState } from 'react';
import styles from './UserTable.module.css'; // Import the CSS file

const UserTable = ({ users }:{users:any[]}) => {
    const [userList, setUserList] = useState(users);

    const handleDelete = (id:string) => {
        const updatedUsers = userList.filter((user:any) => user.id !== id);
        setUserList(updatedUsers);
        alert(`User with ID: ${id} deleted!`);
    };

    const handleView = (id:string) => {
        const user = userList.find((user:any) => user.id === id);
        alert(`Viewing details of ${user.name}: ${JSON.stringify(user, null, 2)}`);
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user:any) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className={styles.action}>
                                <button className={styles.viewButton} onClick={() => handleView(user.id)}>View</button>
                                <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
