import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/blocks/Navbar";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      {/* Login 1 - Bootstrap Brain Component */}
      <div className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center mb-5">
                      <a href="#!">
                        <img
                          src="img/iconGm.png"
                          alt="BootstrapBrain Logo"
                          width={175}
                          height={57}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <form action="#!">
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-primary btn-lg" type="submit">
                          Login para GL
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-primary btn-lg" type="submit">
                          Login para a tenda
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                      <a href="#!" className="link-secondary text-decoration-none">
                        Create new account
                      </a>
                      <a href="#!" className="link-secondary text-decoration-none">
                        Forgot password
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
