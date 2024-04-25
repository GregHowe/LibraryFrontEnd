import { useState } from 'react'

const UseInput = (initialValue, placeholder= '') => {
    
    const [value, setValue] = useState(initialValue)
    
    const clearText = () => { setValue(initialValue)}
    
    const bindForm = {
         value,
        onChange: (e) => { setValue(e.target.value) },
        placeholder,
    }

    return [value, bindForm, clearText]
}

export default UseInput
