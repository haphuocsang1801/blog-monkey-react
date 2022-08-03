import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/",
    title: "Blog",
  },
  {
    url: "/",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
    &-item {
      transition: all 0.25s linear;
    }
    &-item:hover {
      color: ${(props) => props.theme.primary};
    }
  }
  .search {
    margin-left: auto;
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header-links {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .toggle-menu {
    display: none;
  }
  .logout-text {
    display: none;
  }
  .logout {
    color: ${(props) => props.theme.gray80};
  }
  @media screen and (max-width: 1023.98px) {
    .logout-text {
      display: inline-block;
    }
    .toggle-menu {
      display: inline-block;
    }
    .logout {
      margin-top: 20px;
      gap: 30px;
    }
    .logo {
      max-width: 30px;
    }
    .header-links {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      width: 250px;
      flex-direction: column;
      background-color: white;
      padding: 20px 30px;
      gap: 40px;
      transform: translateX(250px);
      transition: all 0.25s;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      align-items: flex-start;
      z-index: 10;
    }
    .menu {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 0;
    }
    .header-auth-contain {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
const Header = () => {
  const { userInfo } = useAuth();
  const [toggle, setToggle] = useState(false);
  const menuHeader = useRef();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {});
  };
  const handleToggleMenu = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    const handleToggleOutSide = (e) => {
      if (
        !menuHeader.current.contains(e.target) &&
        !e.target.matches(".toggle-menu")
      ) {
        setToggle(false);
      }
    };
    window.addEventListener("click", handleToggleOutSide);
  }, []);

  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </NavLink>
          <span
            className="cursor-pointer toggle-menu"
            onClick={handleToggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pointer-events-none cursor-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </span>
          <div
            className={`header-links ${toggle ? "!translate-x-[0px]" : ""}`}
            ref={menuHeader}
          >
            <ul className="menu">
              {menuLinks.map((item) => (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            {userInfo?.role === 1 && (
              <div className="header-auth">
                <Button
                  type="button"
                  height="56px"
                  className="header-button"
                  to="/dashboard"
                >
                  Dashboard
                </Button>
              </div>
            )}
            {!userInfo ? (
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/sign-in"
              >
                Login
              </Button>
            ) : (
              <div className="flex items-center gap-4 header-auth-contain">
                <div className="header-auth">
                  <Link to="/profile" className="header-avatar">
                    <img src={userInfo?.avatar} alt="avatar" />
                  </Link>
                  {userInfo.fullname && (
                    <strong className="text-primary">
                      {userInfo?.fullname}
                    </strong>
                  )}
                </div>
                <div
                  className="logout cursor-pointer flex gap-4 items-center"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="logout-text">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
