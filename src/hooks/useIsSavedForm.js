import {useEffect} from "react";

export function useIsSavedForm (reset, isSubmitSuccessful, isSubmitting, isDirty) {
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({}, {keepValues: true, keepIsSubmitSuccessful: true});
        }
    }, [isSubmitSuccessful, reset, isSubmitting]);

    return isSubmitSuccessful && !isDirty;
}