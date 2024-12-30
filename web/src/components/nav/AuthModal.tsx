import { MouseEvent, useState } from "react";
import { TextField } from "../TextField";
import { IUsers } from "../../types/users";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../Modal";

interface IAuthModal {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: IAuthModal) {
  const { isLoading, auth } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [userInfo, setUserInfo] = useState<IUsers>({
    username: "",
    password: "",
  });

  function handleUserInfo(info: string, id: string) {
    setUserInfo({ ...userInfo, [id]: info });
  }

  function handleIsRegistering() {
    setIsRegistering((prev) => !prev);
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    auth(isRegistering, userInfo);
  }
  return (
    <Modal
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      title={isRegistering ? "Register" : "Log in"}
    >
      <div className="p-10 flex items-center flex-col">
        <form className="flex flex-col w-[300px] gap-2 ">
          <label>Username</label>
          <TextField
            id="username"
            onChangeHandler={handleUserInfo}
            placeholder="Jorgito23"
          />
          <label>Password</label>
          <TextField
            id="password"
            onChangeHandler={handleUserInfo}
            placeholder="Password123"
            type="password"
          />
          <button onClick={handleSubmit} className="bg-container-secondary">
            {isRegistering ? "Register" : "Log in"}
          </button>
        </form>
        <div className=" flex flex-col items-center justify-center text-center gap-2 w-[200px]">
          <p className="min-h-[100px] flex items-center">
            {isRegistering
              ? "You already have an account then Log in"
              : "You not have account?. Not problem just register pressing here"}
          </p>
          <button
            onClick={handleIsRegistering}
            className="bg-container-secondary"
          >
            {isRegistering ? "Log In" : "Register"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
