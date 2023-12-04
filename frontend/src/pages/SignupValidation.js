function Validation(values){
    
    let error = {}

    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const confirmpassword_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    
    if(values.username=== ""){
        error.username="Name should not be empty"
    }
    
    else{
        error.username=""
    }


    if(values.firstname=== ""){
        error.firstname="Name should not be empty"
    }
    
    else{
        error.firstname=""
    }
    

    if(values.lastname=== ""){
        error.lastname="Name should not be empty"
    }
    
    else{
        error.lastname=""
    }
    
    if(values.email=== ""){
        error.email="Email should not be empty"
    }
    else if(!email_pattern.test(values.email))
    {
        error.email="Email did not match"
    }
    else{
        error.email=""
    }

    if(values.password=== ""){
        error.password="Password should not be empty"
    }
    // else if(!password_pattern.test(values.password))
    // {
    //     error.password="Credentials did not match"
    // }
    else{
        error.password=""
    }

    if(values.confirmpassword=== ""){
        error.confirmpassword="Password should not be empty"
    }
    else if(!confirmpassword_pattern.test(values.password))
    {
        error.confirmpassword="Passwords did not match"
    }
    else{
        error.confirmpassword=""
    }

    
    return error;

   
   
}

export default Validation