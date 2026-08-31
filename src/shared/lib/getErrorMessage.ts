import axios from 'axios'

export const getErrorMessage = (error:unknown):string =>{
    if(axios.isAxiosError(error)){
        return (
            error.response?.data?.message??
            error.response?.data?.error??
            'Something went wrong. Please try again.'
        );
    }

    return 'An unexpected error occurred.';
}