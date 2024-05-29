import {useEffect} from "react";

export function useClosingDropDownList (elementRef, handler, attached = true) {
    const onKeyUp = e => {
        if (e.keyCode === 27) {
            handler();
        }
    };

    const onClick = e => {
        if (!elementRef.current.contains(e.target)) {
            handler();
        }
    }

    useEffect(() => {
        if (!attached) return;
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
    }, [elementRef, handler, attached]);
}