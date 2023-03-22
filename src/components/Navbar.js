import React from "react";
// import styles from '@/styles/Home.module.css'
import Link from "next/link";
import mypic from "../../asset/blogg.jpeg";
import Image from "next/image";
import { useRouter } from "next/router";


const Navbar = () => {
  const router = useRouter();
  const signOutHandler = () => {
    localStorage.clear();
      router.push("/login");
  }

  return (
    // <nav className='d-flex align-items-center'>
    //     {/* <ul> */}
    //       <Link href='/'>Home </Link>
    //       <Link href='/about'>About </Link>
    //       <Link href='/blog'>Blog </Link>
    //       <Link href='/contact'>Contact </Link>
    //     {/* </ul> */}
    //   </nav>
    <nav className="navbar navbar-expand-lg navbar-light ">
      <a className="navbar-brand" href="#">
        <Image src={mypic} width={200} height={120} alt="blog experts" />
      </a>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">ABC</span>
      </button> */}

      <div className="d-flex collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
        
        <ul className=" d-flex navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active ml-auto p-2">
            <Link className="nav-link" href="/">
              Home 
              {/* <span className="sr-only">(current)</span> */}
            </Link>
          </li>
          <li className="nav-item p-2 align-items-right">
            <Link className="nav-link" href="/blog-list">
              My Blogs
            </Link>
          </li>
          <li className="nav-item p-2">
            <Link className="nav-link" href="/my-profile">
              My-Profile
            </Link>
          </li>

          <li className="nav-item p-2">
            <Link
              className="nav-link btn btn-warning my-2 my-sm-0"
              href="/contact"
            >
              Contact Us
            </Link>
          </li>

          <li className="nav-item p-2">
            <button
              className="nav-link btn btn-danger my-2 my-sm-0"
              href="/contact"
              onClick={signOutHandler}
            >
              Sign-Out
            </button>
          </li>
        </ul>
        {/* <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          ></input>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
};

export default Navbar;
