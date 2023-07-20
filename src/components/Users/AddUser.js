import React ,{useState,useRef} from 'react';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import Card from '../UI/Card'
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper'

const AddUser=(props)=>{

    const nameInputRef=useRef();
    const ageInputRef=useRef();
    const collegeNameInputRef=useRef();


    // const [enteredUsername,setEnteredUsername]=useState('');
    // const [enteredAge,setEnteredAge]=useState('');
    const [error,setError]=useState();

    const addUserHandler=(event)=>{
        event.preventDefault();

        const enteredName=nameInputRef.current.value;
        const  enteredUserAge=ageInputRef.current.value;
        const  enteredCollegeName=collegeNameInputRef.current.value;


        if(enteredName.trim().length===0|| enteredUserAge.trim().length===0 || enteredCollegeName.trim().length===0){
            setError({
                title:'Invalid Input',
                message:'Please Entera valid name and age (non-empty values). '
            })
            return;
        }
        if(+enteredUserAge<1){
            setError({
                title:'Invalid Age',
                message:'Please Enter a valid  age (>0). '
            })
            return;
        }
        props.onAddUser(enteredName,enteredUserAge,enteredCollegeName);
        nameInputRef.current.value='';
        ageInputRef.current.value='';
        collegeNameInputRef.current.value='';
        
    }

   
    const errorHandler=()=>{

        setError(null);
    }
    return(
    <Wrapper>
        
      {error && (
         <ErrorModal 
         key="error-modal"
         title={error.title} 
         message={error.message} 
          onConfirm={errorHandler}/>
)};
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor='username'>User Name</label>
                <input 
                type='text' 
                id='username' 
                
                ref={nameInputRef}
                />
                <label htmlFor='age'>Age (Years)</label>
                <input 
                id='age' 
                type='number'
                
                 ref={ageInputRef}
                 />
                 <label htmlFor='college'>College Name</label>
                 <input id='college'
                 type='text'
                 ref={collegeNameInputRef} />
                <Button type='submit'>Add User</Button>
            </form>
            
        </Card>
        </Wrapper>
      )

    
}
export default AddUser;