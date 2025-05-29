import { ToastContainer } from 'react-toastify';

const Toast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3500}
            limit={3}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    )
}

export default Toast