"use client"

import "./navbar.css"
import Image from 'next/image';
import Link from "next/link";


export default function Navbar() {

    return (<>
        <header className="p-3" style={{ background: "#636CCB" }}>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a
                        href="/"
                        className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
                    >
                        <Image
                            src="/img/logo.png"
                            alt="Descrição da minha foto"
                            width={50}
                            height={50}
                            className="rounded me-2"
                            priority
                        />
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                        <li>
                            <a href="/" className="nav-link px-2 text-white">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/produtos" className="nav-link px-2 text-white">
                                Products
                            </a>
                        </li>
                        {/*
                        <li>
                            <a href="#" className="nav-link px-2 text-white">
                                Manufacturers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-2 text-white">
                                Services & Tools
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-2 text-white">
                                Help
                            </a>
                        </li>
                        */}
                    </ul>
                    <div className="me-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-search mr"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">

                        <input
                            type="search"
                            className="form-control form-control-dark "
                            placeholder="Search..."
                            aria-label="Search"
                        />
                    </form>
                    <div className="text-end">
                        <Link href="http://localhost:3000/login">
                            <button type="button" className="btn btn-outline-light me-2">
                                Login
                            </button>
                        </Link>

                        <Link href="http://localhost:3000/login">
                            <button type="button" className="btn text-white btn-info">
                                Sign-up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>

    </>)
}                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-search mr"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">

                        <input
                            type="search"
                            className="form-control form-control-dark "
                            placeholder="Search..."
                            aria-label="Search"
                        />
                    </form>
                    <div className="text-end">
                        <Link href="http://localhost:3000/login">
                            <button type="button" className="btn btn-outline-light me-2">
                                Login
                            </button>
                        </Link>

                        <Link href="http://localhost:3000/login">
                            <button type="button" className="btn text-white btn-info">
                                Sign-up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>

    </>)
}