import React, { useState } from 'react';
import { useAuthContext } from "../../contexts/auth";
import { useHistory } from "react-router-dom";

const Login = () => {
    const { login } = useAuthContext();
    const history = useHistory();

    const [ formData, setFormData ] = useState({ email: "", password: "" })
    const [ error, setError ] = useState();
    const [ loading, setLoading ] = useState(false);
    
    const handleInput = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const formIncomplete = () => Object.values(formData).some(v => !v)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await login(formData)
            history.push('/feed')
        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} aria-label="login">
            <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleInput} placeholder="Password" />
            <input type="submit" className={formIncomplete() ? 'disabled' : 'enabled'} disabled={formIncomplete()} value="Login" />
        </form>
        { error && <div id="error">{error}</div> }
        { loading && <div id="loading">Logging in . . .</div> }
        </>
    );
}

export default Login;