import {useEffect, useState} from "react";

export function useToggleDropDownList (elementRef, timeout = 0, afterCloseHandle, beforeCloseHandle) {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleHandler = (state, data) => {
        if (!state) setIsClosing(true);
        beforeCloseHandle && beforeCloseHandle(state, data);

        const t = setTimeout(() => {
            setIsClosing(false);
            setIsOpen(state);
            afterCloseHandle && afterCloseHandle(state, data);
            clearTimeout(t);
        }, state ? 0 : timeout);
    };

    const onKeyUp = e => {
        if (e.keyCode === 27) toggleHandler(false);
    };

    const onClick = e => {
        const modal = document.getElementById('modalConfirm');
        if (!elementRef.current.contains(e.target) && !modal?.contains(e.target)) toggleHandler(false);
    };

    useEffect(() => {
        if (!isOpen) return;
        const root = document.getElementById('root');

        root.addEventListener('keyup', onKeyUp);
        root.addEventListener('click', onClick);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('click', onClick);

        return () => {
            root.removeEventListener('keyup', onKeyUp);
            root.removeEventListener('click', onClick);
            document.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('click', onClick);
        };
    }, [elementRef, isOpen]);

    return [isOpen, toggleHandler, isClosing];
}