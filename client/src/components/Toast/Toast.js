import React, { useEffect, useContext } from 'react';
import { ToastContext } from '../../context/toast/toastContext'
import './toast.css';

const Toast = ({ position = 'top-right', autoDelete = true, dismissTime = 4000 }) => {

    const { toastList, deleteToast } = useContext(ToastContext)

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);

        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, dismissTime]);

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    toastList.map((toast, i) =>
                        <div
                            key={i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}


export default Toast;