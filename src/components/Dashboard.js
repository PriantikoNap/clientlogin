import React,{Fragment,useState,useEffect} from 'react'

function Dashboard(props) {
    const [name, setName] = useState('')

    async function getName(props){
        try {
            const response = await fetch('http://localhost:5100/dashboard',{
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            })
            const parseRes = await response.json()
            setName(parseRes.user_name)
        } catch (err) {
            
        }
    }
    const logout= (e) =>{
        e.preventDefault()
        localStorage.removeItem("token")
        props.setAuth(false)
    }

    useEffect(()=>{
        getName()
    })
    return (
        <Fragment>
            <h1>Dashboard</h1>
            {name}
            <button className="btn btn-primay" onClick={e => logout(e)}>Log out</button>
        </Fragment>
    )
}

export default Dashboard
