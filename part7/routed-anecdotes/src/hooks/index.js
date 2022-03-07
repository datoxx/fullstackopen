import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => { setValue(e.target.value)}
    const reset = (e) => {setValue('')}

    return { 
        fields: {
            type, 
            value, 
            onChange,
        },
         reset 
        }
}