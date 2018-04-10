
$.CallBack;

function SendEmail(address, customer, callback){
$.CallBack = callback;
      
    
var content =  localStorage.getItem('receipt');  
    
var tranNum =  localStorage.getItem('orderid');
   
try{   
window.plugins.socialsharing.shareViaEmail(
  content, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
  'Receipt for Tansaction '+tranNum,
  [address], // TO: must be null or an array
  null, // CC: must be null or an array
  null, // BCC: must be null or an array
  null, // FILES: can be null, a string, or an array
  onSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
  onError // called when sh*t hits the fan
);
    }
catch(err){
    alert(err);
    }
    
}

function onSuccess(){
    $.CallBack();
}

function onError(){
    alert('Email is not suuported in this device');
}