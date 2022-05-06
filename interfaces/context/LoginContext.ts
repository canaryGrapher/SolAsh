interface IContextLogin {
    isLoggedIn: boolean;
    isLoginModalOpen: boolean;
    toggleLogin: (state: boolean) => void;
    toggleLoginModal: () => void;
}

export type { IContextLogin }