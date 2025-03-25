document.getElementById("register_form").addEventListener("submit",async(e)=> {
    e.preventDefault();
    // console.log(e.target.elements.fullName.value);
    // console.log(e.target.elements.email.value);
    // console.log(e.target.elements.username.value);
    // console.log(e.target.elements.dni.value);
    // console.log(e.target.elements.password.value);
    // console.log(e.target.elements.confirmPassword.value);

    //Nos comunicamos con el backend usando fetch
    const res = await fetch("http://localhost:3000/api/register",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          fullName: e.target.elements.fullName.value,
          email: e.target.elements.email.value,
          username: e.target.elements.username.value,
          dni: e.target.elements.dni.value,
          password: e.target.elements.password.value,
          confirmPassword : e.target.elements.confirmPassword.value
        })
      });
      if(resJson.redirect){
          window.location.href = resJson.redirect;
      }
    })