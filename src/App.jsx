
import { useCallback, useState,useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [coppied, setcoppied] = useState(false);


  const generatePassword=useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+=-|?/.>,<|"
    for (let index = 1; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass+=str.charAt(char);
      
    }
    setPassword(pass)
    setcoppied(false)
  },[length,numberAllowed,charAllowed])

  useEffect(() => {
    generatePassword()
  },[length,numberAllowed,charAllowed])

  const copyPassword= (()=> {
    window.navigator.clipboard.writeText(password)
    setcoppied(true)
  })


  return (
    
      <div className='bg-gray-800 w-full mx-auto max-w-lg shadow-md rounded-lg px-4 py-3 my-8 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword}> {coppied ?  "copied" : "copy"} </button>
         </div>
        <div className='flex flex-row gap-4'>
          <div className='flex' >
            <input
              type="range"
              className='cursor-pointer'
              max={15}
              min={8}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}/>
            <label htmlFor="lengthRange" className='ps-4'>Length: {length}</label>
          </div>
    
          <div className='flex'>
            <input
              type="checkbox"
              className='cursor-pointer'
              value={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev)=>!prev);
              }}/>
            <label htmlFor="numberCheckbox" className='ps-1'>Number</label>
          </div>

          <div className='flex flex-row'>
            <input
              type="checkbox"
              className='cursor-pointer'
              value={charAllowed}
              onChange={() => {
                setCharAllowed((prev)=>!prev);
              }}/>
            <label htmlFor="charCheckbox" className='ps-1'>Characteristic</label>
          </div>
        </div>
      </div>
    
  )
}

export default App
