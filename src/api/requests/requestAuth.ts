import { useAuthStore } from 'stores/authStore';

// react component 외부에서 zustand 사용
function requestSignin() {
  // useAuthStore.setState({isAuth: true})
  const setAuth = useAuthStore.getState().setIsAuth;
  setAuth(true);
}

function requestSignout() {
  const setAuth = useAuthStore.getState().setIsAuth;
  setAuth(false);
}

export { requestSignin, requestSignout };
