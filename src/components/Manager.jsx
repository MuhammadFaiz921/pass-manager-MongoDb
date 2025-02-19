import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords)
  }


  useEffect(() => {
    getPasswords()
  }, [])


  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes("icons/eyeoff.svg")) {
      ref.current.src = "icons/eyeon.svg"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyeoff.svg"
    }

  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // If any such id exists in the db, delete it 
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

      // Otherwise clear the form and show toast
      setform({ site: "", username: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast('Error: Password not saved!');
    }

  }

  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))

      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  }

  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(213,197,255,.5)_100%)]"></div>
      <div className="p-3 md:p-0 md:mycontainer min-h-[88.2vh] ">
        <h1 className="text-4xl  font-bold text-center">
          <span className="text-[#9678c8]">&lt;</span>
          Pass
          <span className="text-[#9678c8]">-Buddy&gt;</span>
        </h1>
        <p className="text-[#9678c8] text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder="Enter Url" className="rounded-md border
           border-[#642fec] w-full p-4 py-1"type="text" name="site" id="site" />

          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange}
              placeholder="Enter Username" className="rounded-md border 
             border-[#642fec] w-full p-4 py-1"type="text" name="username"
              id="username" />

            <div className="relative">
              <input
                ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter password"
                className=" rounded-md border border-[#642fec] w-full p-4 py-1"
                type="password" name="password" id="password" />
              <span
                className="absolute right-[4px] top-[4px] cursor-pointer"
                onClick={showPassword} >
                <img ref={ref} className="p-1" width={26} src="icons/eyeon.svg" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className=" flex justify-center
           text-white items-center border border-[#642fec] bg-[#7b67af] 
           px-2 py-2 w-fit  hover:bg-[#9678c8] rounded-md   ring-white ring-1">
            Save
          </button>
        </div>


        <div className="passwords ">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show </div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md  overflow-hidden mb-10">
            <thead className=" text-black bg-[#9678c8]">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#d5c5ff] ">
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className="py-2 border border-white text-center">
                    <div className="flex items-center justify-center">
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className="copybtn size-5 cursor-pointer" onClick={() => { copyText(item.site); }}>
                        <img src="icons/copy.svg" alt="copy" />
                      </div>
                    </div>
                  </td>

                  <td className="py-2 border border-white text-center">
                    <div className="flex items-center justify-center">
                      <span>{item.username}</span>
                      <div className="copybtn size-5 cursor-pointer" onClick={() => { copyText(item.username); }}>
                        <img src="icons/copy.svg" alt="copy" />
                      </div>
                    </div>
                  </td>

                  <td className="py-2 border border-white text-center">
                    <div className="flex items-center justify-center">
                      <span>{"●".repeat(item.password.length)}</span>
                      <div className="copybtn size-5 cursor-pointer"
                        onClick={() => { copyText(item.password) }}>
                        <img src="icons/copy.svg" alt="copy" />
                      </div>
                    </div>
                  </td>

                  <td className="justify-center py-2 border border-white text-center">
                    <div className="flex items-center justify-center ">
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <img
                          className="size-5"
                          src="icons/edit.svg"
                          alt="delete"
                        />
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <img
                          className="size-5"
                          src="icons/delete.svg"
                          alt="delete"
                        />
                      </span>
                    </div>
                  </td>
                </tr>

              })}
            </tbody>
          </table>
          }
        </div>
      </div>
    </>
  )
}

export default Manager;
