
$.CallBack;
$.Msg;
$.connectionID

function ProcessEftpos(Amount, callback){
    $.CallBack = callback;
    
   // var msg = app.CreateMsg(Amount);
    var msg = KeylinkMsg(Amount);
    
    $.Msg = msg;
    
    getEftpos(getEftposCallBack)
}

function getEftposCallBack(ip, port){
    
    if (ip !==''){
  
        
        ConnetToIP(ip,port, connectionSuccess);
        
        }
    else{
        alert('Eftpos infor not setup');
    }
}

function KeylinkMsg(Amount){
    var stxChar = "\x02";
    var etxChar = "\x03";
    var output = "";
    
     var pAmount = Amount.toFixed(2);
        
        
          var pAmountSplit = pAmount.split('.');
          if (pAmountSplit.length > 1){
              if (pAmountSplit[1].length < 2){
                  pAmountSplit[1] += "0";
              }
              pAmount = pAmountSplit[0]+"."+pAmountSplit[1];
          }
          else{
               pAmount = pAmountSplit[0]+".00";  
          }
        
          while (pAmount.length < 9){
              pAmount = "0"+pAmount;
          }      
    
       
    output+=stxChar+"PUR,1,"+pAmount+",000000.00"+etxChar;
    
    
     var lrc = 0x00;       
         for (var i = 1; i < output.length; i++) {
             lrc ^= output.charCodeAt(i);
         }
         
         var lrcChar = String.fromCharCode(lrc);
         output += lrcChar;
                
        return output;
}

function AcceptEftpos(){
    $.CallBack();
}



function connectionSuccess(connectionID){
    $.connectionID = connectionID;
    var millisecondsToWait = 1000;
setTimeout(function() {
    SendDataToIP($.Msg, connectionID, true, false);
}, millisecondsToWait);
    
}

function ProcessIPData(data){
    
   
    alert(data);
    
     var buffer = data.replace("\x02","");
          buffer = buffer.replace("\x03","");
        
          if (buffer[0] == "D"){            
             
              console.log(buffer.substring(1));
              SendDataToIP("\x06", $.connectionID, false, false);
              var ClearD = "\x02"+"D00"+"\x03";
              var lrc = 0x00;       
              for (var i = 1; i < ClearD.length; i++) {
                  lrc ^= ClearD.charCodeAt(i);
              }
         
              var lrcChar = String.fromCharCode(lrc);
              ClearD += lrcChar;
              
              SendDataToIP(ClearD,$.connectionID, false, false);
          }
          else if (buffer[0] == "T") {
              SendDataToIP("\x06", $.connectionID,false, false);
              if (buffer.indexOf("CANCELLED") > -1){
                  console.log("TRANS. CANCELLED");
              }
              else{
                  
                  var sMsg = buffer.substring(3,20);
                   
                  if (buffer.indexOf("T00") > -1){
                      console.log(sMsg);
                      setTimeout(function(){
                     DisconnectToIP($.connectionID);
                     $.CallBack();
                           },500);
                  }
                  else if (buffer.indexOf("T08") > -1){
                      console.log(sMsg);
                      setTimeout(function(){
                     DisconnectToIP($.connectionID);
                     $.CallBack();
                           },500);
                  }
                  else{
                      console.log("DECLINED, "+ sMsg);
                  }
              }
              
          }
}


var app = {
    macAddress: "AA:BB:CC:DD:EE:FF",  // get your mac address from bluetoothSerial.list
    Name: "Test",
    chars: "",
    Connected: "false",

/*
    Application constructor
 */
    initialize: function() {
       
        
         var listPorts = function() {
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    app.macAddress = results[0].address;
                    app.Name = results[0].name;
                  
                    app.manageConnection();
                },
                function(error) {
                   
                    alert('error');
                }
            );
        }

        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {
            alert("Bluetooth is not enabled.")
        }

         // check if Bluetooth is on:
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
    },
/*
    bind any events that are required on startup to listeners:
*/
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        connectButton.addEventListener('touchend', app.manageConnection, false);
        Sendbutton.addEventListener('touchend', app.SendData, false);
    },

/*
    this runs when the device is ready for user interaction:
*/
    onDeviceReady: function() {
        
        
        // check to see if Bluetooth is turned on.
        // this function is called only
        //if isEnabled(), below, returns success:
        var listPorts = function() {
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    app.macAddress = results[0].address;
                    app.Name = results[0].name;
                    //console.log(JSON.stringify(results));
                    alert('success');
                },
                function(error) {
                   // console.log(JSON.stringify(error));
                    alert('error');
                }
            );
        }

        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {
            app.display("Bluetooth is not enabled.")
        }

         // check if Bluetooth is on:
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
        
       
        
       
    },
/*
    Connects if not connected, and disconnects if connected:
*/
    manageConnection: function() {

        // connect() will get called only if isConnected() (below)
        // returns failure. In other words, if not connected, then connect:
       // var connect = function () {
            // if not connected, do this:
            // clear the screen and display an attempt to connect
            app.clear();
            app.display("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");
            // attempt to connect:
            bluetoothSerial.connect(
                app.macAddress,  // device to connect to
                app.openPort,    // start listening if you succeed
                app.showError    // show the error if you fail
            );
       // };

        // disconnect() will get called only if isConnected() (below)
        // returns success  In other words, if  connected, then disconnect:
      /*  var disconnect = function () {
            app.display("attempting to disconnect");
            // if connected, do this:
            bluetoothSerial.disconnect(
                app.closePort,     // stop listening to the port
                app.showError      // show the error if you fail
            );
        };

        // here's the real action of the manageConnection function:
        bluetoothSerial.isConnected(disconnect, connect);*/
        
       
    },
    
    SendData: function() {
        
        if (app.Connected == "true"){
            try{
                 var msg = app.CreateMsg();
                 app.display(msg);    

                 bluetoothSerial.write(msg, app.Success, app.showError);

                }
            catch(err){
                alert(err);
            }
        }
        else{
            app.display("No device is connected");
        }
   
    },
    
    CreateMsg: function(amount){
        //  var stx = "0x02";
        //  var etx = "0x03";
       //   var stxChar = String.fromCharCode(parseInt(stx,2));
       //   var etxChar = String.fromCharCode(parseInt(etx,2));
          var stxChar = "\x02";
          var etxChar = "\x03";
          var output = "";
        
        //  var pAmount = toFixed(localStorage.getItem('sum'), 2);
          var pAmount = amount.toFixed(2);
        
         // var pAmount = "20.00";
          var pAmountSplit = pAmount.split('.');
          if (pAmountSplit.length > 1){
              if (pAmountSplit[1].length < 2){
                  pAmountSplit[1] += "0";
              }
              pAmount = pAmountSplit[0]+pAmountSplit[1];
          }
          else{
               pAmount = pAmountSplit[0]+"00";  
          }
        
          while (pAmount.length < 12){
              pAmount = "0"+pAmount;
          }          
                        
          output = stxChar+"TP000"+
                    pAmount +
                    "000000000000" + "000000000000" + etxChar;
        
         var lrc = 0x00;       
         for (var i = 1; i < output.length; i++) {
             lrc ^= output.charCodeAt(i);
         }
         
         var lrcChar = String.fromCharCode(lrc);
         output += lrcChar;
                
        return output;
    },
    
/*
    subscribes to a Bluetooth serial listener for newline
    and changes the button:
*/
    openPort: function() {
        // if you get a good Bluetooth serial connection:
        app.display("Connected to: "+ app.macAddress);
        app.Connected = "true";
        // change the button's name:
       // connectButton.innerHTML = "Disconnect";
        // set up a listener to listen for newlines
        // and display any new data that's come in since
        // the last newline:
        bluetoothSerial.subscribe("\x02", function (data) {
           
            setTimeout(function(){
			 app.clear();
            // app.display(data);
           
             app.ProcessData(data);
		    }, 1200);
           
        });
                        
    },
    
   
    
    ProcessData: function(data){
          var buffer = data.replace("\x02","");
          buffer = buffer.replace("\x03","");
        
          if (buffer[0] == "D"){            
             
              app.display(buffer.substring(1));
              bluetoothSerial.write("\x06", app.clear, app.showError);
              var ClearD = "\x02"+"D00"+"\x03";
              var lrc = 0x00;       
              for (var i = 1; i < ClearD.length; i++) {
                  lrc ^= ClearD.charCodeAt(i);
              }
         
              var lrcChar = String.fromCharCode(lrc);
              ClearD += lrcChar;
              
              bluetoothSerial.write(ClearD, app.clear, app.showError);
          }
          else if (buffer[0] == "T") {
              bluetoothSerial.write("\x06", app.clear, app.showError);
              if (buffer.indexOf("CANCELLED") > -1){
                  app.display("TRANS. CANCELLED");
              }
              else{
                  
                  var sMsg = buffer.substring(3,20);
                   
                  if (buffer.indexOf("T00") > -1){
                      app.display(sMsg);
                      
                      setTimeout(function(){
                    
                          window.location.href = "#/email";
                          },500);
                  }
                  else if (buffer.indexOf("T08") > -1){
                      app.display(sMsg);
                      setTimeout(function(){
                     window.location.href = "#/email";
                           },500);
                  }
                  else{
                      app.display("DECLINED, "+ sMsg);
                  }
              }
              
          }
    },

/*
    unsubscribes from any Bluetooth serial listener and changes the button:
*/
    closePort: function() {
        // if you get a good Bluetooth serial connection:
        app.display("Disconnected from: " + app.macAddress);
        app.Connected = "false";
        // change the button's name:
        connectButton.innerHTML = "Connect";
        // unsubscribe from listening:
        bluetoothSerial.unsubscribe(
                function (data) {
                    app.display(data);
                },
                app.showError
        );
    },
/*
    appends @error to the message div:
*/
    showError: function(error) {
        app.display(error);
    },
    
    Success: function() {
        app.display('Success!');
    },
    
    

}



