import React, { useContext } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context';

function Nav() {
  const { user, setUser } = useContext(UserContext);  // Access 'user' to check login status
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user')
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Brand as={Link} to="/user">Profile</Navbar.Brand>

          {user ? (
            <Button variant="danger" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
              Logout
            </Button>
          ) : (
            <Link to="/login" style={{ marginLeft: 'auto' }}>
              <Button variant="primary">
                Login
              </Button>
            </Link>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Nav;
