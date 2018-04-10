

function UploadSalesDatatoWebServer(data)
{
     
    $.ajax({
			    url: "http://monarch.co.nz/UloadData.asmx/GetData",
                timeout: 20000,
			    type: 'post',
                cache: false,
			    data: JSON.stringify(data),           
			    headers: {
					'Accept': 'text/json',
					'User-Agent': 'Fiddler',
					
			    },
			    dataType: 'json',
			    success: function (data) {
                  
                   //SuccessFunction(data);
                    alert(data)
                  
			    },
			    error: function(msg) {
                    alert(msg);
                }
        });
}