import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/logo.svg";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Header() {
  // 로그아웃 기능
  const { logout } = useLogout();
  //사용자 있으면 값이 있음
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <header>
      <div className={styles["header-wrap"]}>
        <h1>
          <Link to="./">
            <img className={styles.logo} src={logo} alt="두근두근 비밀일기" />
          </Link>
        </h1>
        <div>
          {/* 만약 유저의 상태가 null 이 아니라면  */}
          {user && (
            <>
              <p className="hello">
                환영합니다 <strong>{user.displayName}</strong>님!
              </p>
              <Link to="/" className="btn-logout" onClick={logout}>
                로그아웃
              </Link>
            </>
          )}
          {/* 만약 유저의 상태가 null, 즉 로그아웃 이라면 */}
          {!user && (
            <>
            {/* 회원가입 페이지라면 위에 로그인 아니라면 네비엔 회원가입 */}
              {location.pathname === "/signup" ? (
                <Link to="/login" className="btn-login">
                  로그인
                </Link>
              ) : (
                <Link to="/signup" className="btn-join">
                  회원가입
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
