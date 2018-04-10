function ConnetToIP(ip, port,callback){
        
    try{
    window.tlantic.plugins.socket.connect(
  function (connectionId) {
     
     // SendDataToIP(data, connectionId, listen);
      callback(connectionId);
  },

  function () {
    alert('connection failed!');
  },
  ip,
  port
);
    }
catch(err){    
    alert(err);
    }
}

function DisconnectToIP(connectionID){
    window.tlantic.plugins.socket.disconnect(
  function () {
   // alert('disconnect worked!');  
  },

  function () {
   // alert('disconnect failed!');
  },
  connectionID
);
}

function SendDataToIP(data, connectionID, listen, disconnect){
    
   
    window.tlantic.plugins.socket.send(
  function () {
      if (listen){
         
         
          try{
			document.addEventListener(window.tlantic.plugins.socket.receiveHookName, function (ev) {
                alert(ev.metadata.data);
              // console.log(ev.metadata.host);    // host who sent the data
             //  console.log(ev.metadata.port);    // sender port
             //  console.log(ev.metadata.id);      // connection id
                 ProcessIPData(ev.metadata.data);    // received data
             });
              
           /* setTimeout(function(){
                 SendDataToIP("\x06", connectionID, false, false);
              var ClearD = "\x02"+"D00"+"\x03";
              var lrc = 0x00;       
              for (var i = 1; i < ClearD.length; i++) {
                  lrc ^= ClearD.charCodeAt(i);
              }
         
              var lrcChar = String.fromCharCode(lrc);
              ClearD += lrcChar;
              
              SendDataToIP(ClearD,connectionID, false, false);
            });*/
              
          }
          catch(err){
              alert(err);
          }
         
      }
      else{
          //  alert('work');
          if (disconnect){
            DisconnectToIP(connectionID);
          }
      }
  },

  function () {
    alert('failed.....');
    DisconnectToIP(connectionID);  
  },
  connectionID,
  data
);
}

function ReceiveData(){

    var data;
document.addEventListener(window.tlantic.plugins.socket.receiveHookName, function (ev) {
 // console.log(ev.metadata.host);    // host who sent the data
 // console.log(ev.metadata.port);    // sender port
 // console.log(ev.metadata.id);      // connection id
 data = ev.metadata.data    // received data
});
    
return data;
    
}