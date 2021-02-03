import React,{useEffect, useState, useReducer, createContext } from 'react';
import {io} from 'socket.io-client';
import Messenger from '../Messenger';
import {reducer,messagesContext } from '../../dispatcher/MessagesDispatcher';

export default function App() {
  const [state, dispatch] = useReducer( reducer, {messages : [], socket : io('ws://localhost:5000/',{})} );
    return (
      <messagesContext.Provider value = {{messages:state.messages, dispatch, socket:state.socket}}>  
        <Messenger />
      </messagesContext.Provider>
    );
}
