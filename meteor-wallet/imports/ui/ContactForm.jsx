import React, {useState} from 'react';
import {Meteor} from "meteor/meteor";
import { ErrorAlert } from './components/ErrorAlert';
import { SuccessAlert } from './components/SuccessAlert';

export const ContactForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const showError = ({message}) => {
      setError(message)
      setTimeout(() => {
        setError("")
      }, 3000)
    }

    const showSuccess = ({message}) => {
      setSuccess(message)
      setTimeout(() => {
        setSuccess("")
      }, 3000)
    }

    
    const saveContact = () =>{
        Meteor.call('contacts.insert',{name, email, imageUrl}, (errorResponse) => {
          if(errorResponse){
            showError({message: errorResponse.error});
            setError(errorResponse.error);
          } else{
              setName("");
              setEmail("");
              setImageUrl("");
              showSuccess({ message: "Contact saved." });
          }
        });

    }

    return(
      <form className = "mt-6">
        {error && <ErrorAlert message = {error}/>}
        {success && <SuccessAlert message = {success}/>}
        <div className = "grid grid-cols-6 gap-6">
          <div className = "col-span-6 sm:col-span-6 lg:col-span-2">
            <label htmlFor='name' className = "block text-sm font-medium text-gray-700">
              Name
            </label>
            <input 
            id = "name" 
            value = {name}
            onChange = {(e) => setName(e.target.value)} 
            type = "text"
            className = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
            />
          </div>
          <div className = "col-span-6 sm:col-span-6 lg:col-span-2">
            <label htmlFor='name' className = "block text-sm font-medium text-gray-700">
              Email
            </label>
            <input 
            type = "email" 
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            id = "email"
            className = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
            />
          </div>
          <div className = "col-span-6 sm:col-span-6 lg:col-span-2">
            <label htmlFor='name' className = "block text-sm font-medium text-gray-700">
              ImageUrl
            </label>
            <input 
            type = "text" 
            value = {imageUrl}
            onChange = {(e) => setImageUrl(e.target.value)}
            id = "imageUrl"
            className = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <button 
            type = "button" 
            onClick={saveContact}
            className = "mt-2 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center"
            >
              Save Contact
            </button>
        </div>
      </form>
    )
}