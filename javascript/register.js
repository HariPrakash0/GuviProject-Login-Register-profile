const signup_rules = {
    email: {
        presence: true,
        email:true
      },
      password:{
        presence:true,
        length:{
            minimum:8,
            maximum:30
        }
      },
      repassword:{
        presence: true,
        length:{
          minimum:8,
          maximum:30
        },
        equality:"password"
      },
      first_name:{
        presence:true,
        length:{
            minimum:2,
            maximum:100
        }
      },
      last_name:{
        presence:true,
        numericality:{
            onlyInteger:true
        },
        length:{
            minimum:1,
            maximum:100
        }
      }
      ,
      mobile:{
        presence:true,
        numericality:{
            onlyInteger:true
        },
        length:{
            is:10
        }
      },
      age:{
        presence:true,
        numericality:{
            onlyInteger:true
        },
      }
    
};


document.getElementById("signup").addEventListener('submit',(e)=>{
    e.preventDefault();

    function clearErr(fields){
      for(let field of fields){
        document.getElementById("error-"+field).innerHTML="";
      }
    }

    function setErr(fields,errors){
      for(let field of fields){
        let errContent = '';
        if(errors[field]){
          errContent = '<ul>'
          for(let error of errors[field]){
              errContent+='<li>'+error+'</li>';
          }
          errContent+='</ul>';
        }
        document.getElementById("error-"+field).innerHTML = errContent;

      }
    }


    const fields = ['email','password','repassword','first_name','last_name','gender','mobile'];

    clearErr(fields);


    const values = validate.collectFormValues(e.target);
    const validated = validate(values,signup_rules);
    const data = new URLSearchParams(new FormData(e.target));
    if(validated===undefined){
        fetch("../php/register.php",{
            method:'POST',
            body:data
        }).then((res)=>res.json()).then(data=>{alert(data.message);
        if(data.success){
          window.location.replace("../html/login.html");
        }
      });
    }else{
        setErr(fields,validated);
    }
});



