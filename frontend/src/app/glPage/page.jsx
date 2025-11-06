"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GLPage() {
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <header
      className="border-bottom shadow-sm position-sticky top-0 z-3"
      style={{
        background:
          "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 40%, #084298 100%)",
        color: "white",
      }}
    >
      <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
        {/* ===== LOGO + TÍTULO ===== */}
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: "48px",
              height: "48px",
              background: "rgba(255,255,255,0.15)",
              boxShadow: "0 0 10px rgba(255,255,255,0.2)",
              animation: "pulse 2s infinite",
            }}
          >
            <i className="bi bi-gear-wide-connected fs-4 text-white"></i>
          </div>

          <div>
            <h1 className="h5 fw-bold mb-1">Equipamentos - GA</h1>
            <p className="small text-light opacity-75 mb-0">Painel do GL</p>
          </div>
        </div>

        {/* ===== PERFIL DO USUÁRIO ===== */}
        <div className="dropdown">
          <button
            className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill px-3 py-2"
            id="userMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src="https://ui-avatars.com/api/?name=GL&background=0d6efd&color=fff"
              alt="Avatar"
              className="rounded-circle border border-light"
              width="32"
              height="32"
            />
            <span className="fw-semibold">Administrador</span>
            <i className="bi bi-chevron-down"></i>
          </button>

          {/* ===== MENU DROPDOWN ===== */}
          <ul
            className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2"
            aria-labelledby="userMenu"
          >
            <li>
              <h6 className="dropdown-header text-muted">Perfil</h6>
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-2"
                onClick={() => router.push("/perfil")}
              >
                <i className="bi bi-person-circle"></i> Meu Perfil
              </button>
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-2"
                onClick={() => router.push("/configuracoes")}
              >
                <i className="bi bi-gear"></i> Configurações
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item text-danger d-flex align-items-center gap-2"
                onClick={() => router.push("/login")} // troque para sua rota
              >
                <i className="bi bi-box-arrow-right"></i> Sair
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== ANIMAÇÃO CSS ===== */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </header>
  );
}
