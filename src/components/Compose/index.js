import React,{useState,useContext} from 'react';
import './Compose.css';
import axios from 'axios';
import { Socket } from 'dgram';
import {messagesContext} from '../../dispatcher/MessagesDispatcher';
const guid = () => {
  function _s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }
  return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
}
export default function Compose(props) {
  const [message, setMessage] = useState("");
  const {dispatch} = useContext(messagesContext);
  
  const inputKeyDownHandler = e => {
    if( e.key === "Enter" ){
      
      const data = {
        id: guid(),
        author: 'apple',
        message: message,
        timestamp: new Date().getTime()
      };
      dispatch({type:"toServer",message : data});
      //socket.emit("toServer",data);
      setMessage("");
      e.target.value = "";
    }
  };
  const inputOnChangeHandler =  e => {
    setMessage(e.target.value);
  };

  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        onKeyDown={inputKeyDownHandler}
        onChange={inputOnChangeHandler}
      />

      {
        props.rightItems
      }
    </div>
  );
}