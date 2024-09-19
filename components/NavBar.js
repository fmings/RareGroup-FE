/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-bar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Rare</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/myPosts">
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link>All Categories</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link>All Tags</Nav.Link>
            </Link>
            <Link passHref href="/profile/profile">
              <Nav.Link>Browse Users</Nav.Link>
            </Link>
          </Nav>
          <Button className="sign-out ms-auto" variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
