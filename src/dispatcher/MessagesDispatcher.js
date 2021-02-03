import{ createContext } from 'react';
import {io} from 'socket.io-client';



const reducer = (state, action) => {
    switch (action.type) {
      case 'init_socket':
        return {
            socket : io('ws://localhost:5000/',{})
        };
      case 'toServer':
        console.log('toServer',action);
        state.socket.emit("toServer",action.message);
        return state;
      case 'toClient':        
        return {
            messages : [...state.messages].concat(action.message),
            socket: state.socket
        };
      default:
        return state;
    }
  };
  
  const messagesContext = createContext({
    socket : null,
    messages : [],
    dispatch:null,
  });
  
  export {reducer, messagesContext};