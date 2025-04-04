import { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]); // State to store the list of users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers); // Store the fetched users in state
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>
      <ul>
        {/* Map over the users array and display each username in a list item */}
        {users.map((user) => (
          <li key={user._id}>{user.username}</li> // Assuming each user has a unique `_id`
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;