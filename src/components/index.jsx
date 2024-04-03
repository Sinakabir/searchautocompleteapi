import React, { useEffect, useState } from 'react'
import Suggestion from './suggestin';

const SearchAutoCompelete = () => {
  const [loading, setLoading] =useState(false);
  const [users,setUsers] = useState([])
  const [error,setError] = useState(null)
  const [searchParam , setSearchParam] = useState('')
  const [showDropDown, setShowDropDown] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState([])

  function handleChange(e){
    const query = e.target.value.toLowerCase()
    setSearchParam(query);
    if(query.length > 1 ){
   const filterData = users && users.length ?
   users.filter((item) => item.toLowerCase().indexOf(query) > -1) : [];
   setFilteredUsers(filterData);
   setShowDropDown(true)
    }
    else{
      setShowDropDown(false);
    }
  }
  function handleClick(e){
    console.log(e.target.innerText);
    setShowDropDown(false);
    setSearchParam(e.target.innerText)
    setFilteredUsers([])
  }

  async function fetchListOfUsers(){
    try{
      setLoading(true)
      const res = await fetch('https://dummyjson.com/users')
      const data = await res.json();

      console.log(data);
      if(data && data.users && data.users.length){
        setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        setError(null)
      }
    }
    catch(error){
      setLoading(false)
    console.log(error);
    setError(error)
    }
  }

useEffect(()=>{
  fetchListOfUsers()
},[])

console.log(users , filteredUsers);
  return (
    <div className='search-auto-complete-container'>
      {
        loading ? <h1> loading data ! please Wait...</h1> : 
         <input value={searchParam} type="text" name='search-users' placeholder='Search Users here...' onChange={handleChange}/>
      }
   

    {
      showDropDown && <Suggestion handleClick={handleClick} data={filteredUsers}/>
    }
    </div>
  )
}

export default SearchAutoCompelete