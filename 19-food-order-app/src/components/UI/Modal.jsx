import { createPortal } from "react-dom";
import {useEffect, useRef} from "react";

export default function Modal({ children, open, className = '', onClose }) {
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current
        if (open) {
            modal.showModal();
        }

        return () => {
            if (modal) {
                modal.close();
            }
        }
    }, [open]);

    return createPortal(
        <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
            {children}
        </dialog>
        , document.getElementById("modal"));
}
