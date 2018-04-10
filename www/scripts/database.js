$.CallBack;
$.CallBack2;

$.Option;

$.ItemID;
$.TemplateID

$.KitchenPrint = true

$.KitchenPrintNow = false;
$.Template;

$.ItemPrinter;
$.PrinterID;

$.SubCategory;

$.Order;
$.OrderItem;
$.Payment;

$.KitchenCallBack;

$.OptionCallBack;
$.ItemCallBack;

$.PrinterCallBack;

$.CashdrawCallBack;
// Time : 26th Oct 2015

function ReInitilaiseDatabase(InitCallBack){
    
    $.CallBack = InitCallBack;
   
   
     var db = window.openDatabase('Monarch', "1.0", 'Monarch', 2000000); 
    try{
         db.transaction(ResetDB, errorCB, InitDatabase);
    }
    catch(err){
        alert(err)
    }
}

function ResetDB(tx){
   
    tx.executeSql("DROP TABLE IF EXISTS tbl_Role");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Staff");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Authority");
    tx.executeSql("DROP TABLE IF EXISTS tbl_RoleAuth");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Function");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Item");
    tx.executeSql("DROP TABLE IF EXISTS tbl_SubCategory");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Category");
    tx.executeSql("DROP TABLE IF EXISTS tbl_ItemTab");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Tab");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Price");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Barcode");
    tx.executeSql("DROP TABLE IF EXISTS tbl_PaymentType");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Order");
    tx.executeSql("DROP TABLE IF EXISTS tbl_OrderItem");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Payment");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Cost");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Printer");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Eftpos");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Option");
    tx.executeSql("DROP TABLE IF EXISTS tbl_Pending");
    tx.executeSql("DROP TABLE IF EXISTS tbl_ItemPrinter");

}

function InitDatabase(tx, result){
      var db = window.openDatabase('Monarch', "1.0", 'Monarch', 2000000); 
    try{
         db.transaction(populateDB, errorCB, successCB);
    }
    catch(err){
        alert(err)
    }
}

function InitilaiseDatabase(InitCallBack){
    $.CallBack = InitCallBack;
  
     var db = window.openDatabase('Monarch', "1.0", 'Monarch', 2000000); 
    try{
         db.transaction(populateDB, errorCB, successCB);
    }
    catch(err){
        alert(err)
    }
}

function populateDB(tx) {
    
   
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Role (Role_ID unique, Role_Name)');           
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Staff (Staff_ID unique, Staff_Code, First_Name, Last_Name, Password, Role_ID, Price_Level, Pay_Rate, Status)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Authority (Auth_ID unique, Auth_Name)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_RoleAuth (RoleAuth_ID unique, Role_ID, Auth_ID, Function_ID)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Function (Function_ID unique, Function_Name, Function_Text, Position, Back_Color, Fore_Color, Font_Size, Keyboard_Value, Fixed, Password)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Item (Item_ID unique, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_SubCategory (SubCategory_ID unique, SubCategory_Name, Category_ID, Redeem, Status)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Category (Category_ID unique, Category_Name, Status)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_ItemTab (ItemTab_ID unique, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image)'); 
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Tab (Tab_ID unique, Tab_Name, Position)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Price (Price_ID INTEGER PRIMARY KEY, Amount, Item_ID, Price_Level)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Barcode (Barcode_ID INTEGER PRIMARY KEY, Barcode, Item_ID)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_PaymentType (PaymentType_ID unique, PaymentType_Name, Use_Eftpos, Open_Cashdraw, Hide_Display)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Cost (Cost_ID INTEGER PRIMARY KEY, Item_ID, Cost, Batch, Full_Batch, Date)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Eftpos (Eftpos_ID INTEGER PRIMARY KEY, Eftpos_Name, IP, Port, Eftpos_Type, Is_Primary)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Printer (Printer_ID INTEGER PRIMARY KEY, Printer_Name, IP, Port, Type, Header, SubHeader, Footer)');
        
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Order (Order_ID unique, Order_Date, Order_Time, Staff_ID, Customer_ID, Terminal_ID, Discount_P, Discount_D, Surcharge_P, Surcharge_D, Total_Sale, Comment, Barcode)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_OrderItem (OrderItem_ID INTEGER PRIMARY KEY, Order_ID, Item_ID, Item_Price, Item_Qty, Item_Cost, Discount_P, Discount_D, Group_ID, ItemType_ID, OptionString)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Payment (Payment_ID INTEGER PRIMARY KEY, Order_ID, PaymentType_ID, Amount, Actual_Payment)');
    
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Option (Option_ID INTEGER PRIMARY KEY, Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit, Item_ID, Template_ID)');
    
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_ItemPrinter (ItemPrinter_ID INTEGER PRIMARY KEY, Printer_ID, Item_ID)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Pending (Pending_ID INTEGER PRIMARY KEY, PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString)');
        // tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_PendingItem (PendingItem_ID INTEGER PRIMARY KEY, Pending_ID, Item_ID, Price, Qty, Discount_P, Discount_D, OptionString)');    
                 
}



function errorCB(tx, err) {
        console.log("Error processing SQL: "+err);
}

function errorCallBack(tx, err){
    $.CallBack(err);
}

    // Transaction success callback
    //
function successCB(tx, results) {
        
        var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){                              
             tx1.executeSql('SELECT * FROM tbl_PaymentType',[],CheckDataResult,errorCB);         
     }, errorCB);
    }



function CheckDataResult(tx, result){
   
    
    console.log(result.rows.length);
   if (result.rows.length === 0){
        
         var db = window.openDatabase('Monarch', "1.0", 'Monarch', 2000000); 
    try{
         db.transaction(InitInsert, errorCB, InsertSuccess);
    }
    catch(err){
        alert(err)
    }
      
   }
    else
    $.CallBack();
}

function InitInsert(tx){
      
     tx.executeSql('INSERT INTO tbl_Role (Role_ID, Role_Name) VALUES (1, "Admin")');
     tx.executeSql('INSERT INTO tbl_Role (Role_ID, Role_Name) VALUES (2, "User")');
     tx.executeSql('INSERT INTO tbl_Staff (Staff_ID, Staff_Code, First_Name, Last_Name, Password, Role_ID, Price_Level, Pay_Rate, Status) VALUES (1,"","Admin","Admin",1,1,1,0,1)');
     tx.executeSql('INSERT INTO tbl_PaymentType (PaymentType_ID, PaymentType_Name, Use_Eftpos, Open_Cashdraw, Hide_Display) VALUES (1,"Cash",0,1,0)');
     tx.executeSql('INSERT INTO tbl_PaymentType (PaymentType_ID, PaymentType_Name, Use_Eftpos, Open_Cashdraw, Hide_Display) VALUES (2,"Eftpos",1,1,0)');
     tx.executeSql('INSERT INTO tbl_PaymentType (PaymentType_ID, PaymentType_Name, Use_Eftpos, Open_Cashdraw, Hide_Display) VALUES (3,"Credit Card",1,1,0)');
     tx.executeSql('INSERT INTO tbl_Category (Category_ID, Category_Name, Status) VALUES (1,"General", 1)');    
    
     tx.executeSql('INSERT INTO tbl_Eftpos (Eftpos_Name, IP, Port, Eftpos_Type, Is_Primary) VALUES ("Eftpos","192.168.1.130",5000,"Wolfstrike",1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (1,"General", 1, 0, 1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (2,"Food", 1, 0, 1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (3,"Drink", 1, 0, 1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (4,"Kid", 1, 0, 1)');
    
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (1,"1", "Bread", "", 1, 0, 0, 1, "./img/category_img/pastry.jpg", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (2,"2", "Snack", "", 2, 0, 0, 1, "./img/category_img/snacks.jpg", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (3,"3", "Coke", "", 3, 0, 0, 1, "./img/category_img/softdrinks.jpg", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (4,"4", "Apple", "", 3, 0, 0, 1, "./img/category_img/fruit.jpg", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (5,"5", "Kids Meal", "", 4, 0, 0, 1, "./img/category_img/meals.jpg", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (6,"6", "Candy", "", 4, 0, 0, 1, "./img/category_img/candy.jpg", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (7,"7", "Coffee", "", 3, 0, 0, 1, "./img/category_img/coffee.jpg", "")');
    
   
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (1,"General", 1)');
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (2,"Food", 2)');
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (3,"Drink", 3)');
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (4,"Kid", 4)');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (1, 1, 1, 1, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (2, 2, 2, 2, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (3, 3, 3, 1, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (4, 4, 3, 2, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (5, 5, 4, 1, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (6, 6, 4, 1, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (7, 7, 2, 1, "#FFFFFF", 12,"#000000" ,"")');
    
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (12.99, 1, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (7.99, 2, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (2.50, 3, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (1.99, 4, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (9.00, 5, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (10.99, 6, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (4.00, 7, 1)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("998877665544", 1)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("598877665541", 2)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("698877665542", 3)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("798877665543", 4)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("898877665545", 5)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("198877665546", 6)');
    
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (1,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (2,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (3,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (4,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (5,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (6,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (7,1,0,0,"")');
    
    tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("Main Receipt","192.168.1.87",9100,"Receipt","Mulan","GST # 1234567","Thanks for your business")');
    tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("Kitchen","192.168.1.87",9100,"Kitchen","Mulan","GST # 1234567","Thanks for your business")');
    
    tx.executeSql('INSERT INTO tbl_ItemPrinter (Printer_ID, Item_ID) VALUES(1,1)');
   
    //*************** Test Data****************
  /*  tx.executeSql('INSERT INTO tbl_Category (Category_ID, Category_Name, Status) VALUES (1,"General", 1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (1,"General", 1, 0, 1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (2,"Drink", 1, 0, 1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (3,"Combo", 1, 0, 1)');
    tx.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES (4,"Kid", 1, 0, 1)');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (1,"1", "Misc", "", 1, 0, 0, 1, "", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (2,"2", "Food1", "", 1, 0, 0, 1, "", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (3,"3", "Drink1", "", 2, 0, 0, 1, "", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (4,"4", "Drink2", "", 2, 0, 0, 1, "", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (5,"5", "Combo", "", 3, 0, 0, 1, "", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (6,"6", "Kid", "", 4, 0, 0, 1, "", "")');
    tx.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES (7,"7", "Coffee", "", 2, 0, 0, 1, "", "")');
    
    
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (1,"Food", 1)');
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (2,"Drink", 2)');
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (3,"Combo", 3)');
    tx.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES (4,"Kid", 4)');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (1, 1, 1, 1, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (2, 2, 1, 2, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (3, 3, 2, 1, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (4, 4, 2, 2, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (5, 5, 3, 1, "#FFFFFF", 12,"#000000" ,"")');
    tx.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES (6, 6, 4, 1, "#FFFFFF", 12,"#000000" ,"")');
     
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (12.99, 1, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (7.99, 2, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (2.99, 3, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (1.99, 4, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (92.99, 5, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (10.99, 6, 1)');
    tx.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES (4.00, 6, 1)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("998877665544", 1)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("598877665541", 2)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("698877665542", 3)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("798877665543", 4)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("898877665545", 5)');
    tx.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("198877665546", 6)');
    
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (1,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (2,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (3,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (4,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (5,1,0,0,"")');
    tx.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES (6,1,0,0,"")');
    
    tx.executeSql('INSERT INTO tbl_Eftpos (Eftpos_Name, IP, Port, Eftpos_Type, Is_Primary) VALUES ("Eftpos","192.168.1.130",5000,"Wolfstrike",1)');
   // tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port) VALUES ("Printer","192.168.1.156",9100)'); - Robin's house
    tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("Main Receipt","192.168.1.87",9100,"Receipt","Mulan","GST # 1234567","Thanks for your business")');
    tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("Sub Printer","192.168.1.87",9100,"Receipt","","","")');
    tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("Alcohol","192.168.1.87",9100,"Kitchen","","","")');
    tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("Kitchen","192.168.1.87",9100,"Kitchen","","","")');
    tx.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("Coffee","192.168.1.87",9100,"Kitchen","","","")');
   //  tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Option (Option_ID INTEGER PRIMARY KEY, Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Item_ID)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Single","1",0,0,"Hot",0,0,0,0,0,0,"",1,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Single","1",0,0,"Cold",0,0,0,0,0,0,"",1,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Quanty","3",0,0,"Sugar",0,0,0,5,1,0,"",1,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Multi","2",0,1,"Cream",2,0,0,0,0,0,"",1,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Multi","2",0,1,"Chocolate",3,0,0,0,0,0,"",1,0)');
    
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Single","1",0,0,"Hot",0,0,0,0,0,0,"",2,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Single","1",0,0,"Cold",0,0,0,0,0,0,"",2,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Quanty","3",0,0,"Sugar",0,0,0,5,1,0,"",2,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Multi","2",0,1,"Cream",2,0,0,0,0,0,"",2,0)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Multi","2",0,1,"Chocolate",3,0,0,0,0,0,"",2,0)');
    
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Single","1",0,0,"Hot",0,0,0,0,0,0,"",0,1)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Single","1",0,0,"Cold",0,0,0,0,0,0,"",0,1)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Quanty","3",0,0,"Sugar",0,0,0,5,1,0,"",0,1)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Multi","2",0,1,"Cream",2,0,0,0,0,0,"",0,1)');
    tx.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("Multi","2",0,1,"Chocolate",3,0,0,0,0,0,"",0,1)');
    
    tx.executeSql('INSERT INTO tbl_ItemPrinter (Printer_ID, Item_ID) VALUES(1,1)');
    tx.executeSql('INSERT INTO tbl_ItemPrinter (Printer_ID, Item_ID) VALUES(1,2)');
    tx.executeSql('INSERT INTO tbl_ItemPrinter (Printer_ID, Item_ID) VALUES(1,3)');
    tx.executeSql('INSERT INTO tbl_ItemPrinter (Printer_ID, Item_ID) VALUES(2,4)');
    tx.executeSql('INSERT INTO tbl_ItemPrinter (Printer_ID, Item_ID) VALUES(2,5)');*/
    
   
    //tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Pending (Pending_ID INTEGER PRIMARY KEY, PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString)');
    //tx.executeSql('INSERT INTO tbl_Pending (PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString) VALUES ("2016-04-24 15:00:00","1","for Roger",12.50,0,"")');
    //tx.executeSql('INSERT INTO tbl_Pending (PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString) VALUES ("2016-04-24 16:00:00","2","for Jerry",13.50,0,"")');
    //tx.executeSql('INSERT INTO tbl_Pending (PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString) VALUES ("2016-04-24 17:00:00","","Takeaway",14.50,0,"")');
    //tx.executeSql('INSERT INTO tbl_Pending (PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString) VALUES ("2016-04-24 18:00:00","","Takeaway Roger",15.50,0,"")');
    //tx.executeSql('INSERT INTO tbl_Pending (PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString) VALUES ("2016-04-24 19:00:00","","Takeaway Jerry",16.50,0,"")');
    
    
   // tx.executeSql('INSERT INTO tbl_Function (Function_ID unique, Function_Name, Function_Text, Position, Back_Color, Fore_Color, Font_Size, Keyboard_Value, Fixed, Password) VALUES (1, "Duscount %", "Discount %", 1, "#FFFFFF", "#000000", 12, "",0,0)');
  //  tx.executeSql('INSERT INTO tbl_Function (Function_ID unique, Function_Name, Function_Text, Position, Back_Color, Fore_Color, Font_Size, Keyboard_Value, Fixed, Password) VALUES (2, "Duscount $", "Discount $", 2, "#FFFFFF", "#000000", 12, "",0,0)');
    //*****************************************
    
   // tx.executeSql('INSERT INTO tbl_Order (Order_Date, Order_Time, Staff_ID, Customer_ID, Terminal_ID, Discount_P, Discount_D, Sucharge_P, Surchar_D, Total_Sale, Comment, Barcode) VALUES (1, "", "","","","","","","","","","")');
    
   // tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_Option (Option_ID INTEGER PRIMARY KEY, Title, Type_ID, Default, Cost, Name, Amount, Status, Min, Max, Step, Unit, Amount, Count, Item_ID');
        
}

function InsertSuccess(tx, results){
   
    $.CallBack();
    
}

function UpdateItemPrinter(itemlist, printerid, callback){
    
    $.CallBack = callback;
    $.ItemPrinter = itemlist
    $.PrinterID = printerid;
    
    console.log('thy')
    console.log(itemlist)
   
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
      db.transaction( function(tx1){  
          tx1.executeSql('DELETE FROM tbl_ItemPrinter WHERE Printer_ID='+printerid);
         
      }, errorCB, SuccessDeleteItemPrinter);
    
   
}

function SuccessDeleteItemPrinter(tx, result){
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
      db.transaction( function(tx1){  
           for (var i=0; i < $.ItemPrinter.length; i++){
              tx1.executeSql('INSERT INTO tbl_ItemPrinter (Printer_ID, Item_ID) VALUES ('+$.PrinterID+','+$.ItemPrinter[i]+')');
              
           }
         
      }, errorCB, SuccessAddItemPrinter);
   
}

function SuccessAddItemPrinter(tx, result){  
    GetItemPrinter();
    $.CallBack()
}

function AddPending(order,callback){
    $.CallBack = callback;
    
    var date = getCurrentDateTime()
    var pendingstring = escape(JSON.stringify(order.cartItems))
    
    var tablenum = order.TableNumber
    var orderinfo = order.OrderInfo
    var amount = order.OrderAmount
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);    
    
     db.transaction( function(tx1){ 
      
          tx1.executeSql('INSERT INTO tbl_Pending (PDateTime, Table_Number, Order_Info, Order_Amount, Customer_ID, PendingString) VALUES ("'+date+'","'+tablenum+'","'+orderinfo+'","'+amount+'","","'+pendingstring+'")');
         
      }, errorCB, SuccessReloadPending);
}

function DeletePending(pendingid, callback){
    $.CallBack = callback;    
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
      db.transaction( function(tx1){  
          tx1.executeSql('DELETE FROM tbl_Pending WHERE Pending_ID="'+pendingid+'"');
         
      }, errorCB, SuccessReloadPending);
}

function SuccessReloadPending(tx, result){
   
    GetPending()
    $.CallBack()
}


function UpdateOption(option, ItemID,TemplateID,callback){
     $.CallBack = callback;
	
  
    $.Option = option;
    $.ItemID=ItemID;
    $.TemplateID = TemplateID;
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
        
    if (ItemID == 0){
         db.transaction( function(tx1){
           tx1.executeSql('DELETE FROM tbl_Option WHERE Template_ID='+TemplateID)
     }, errorCB, UpdateOptionSuccess);
    }
    else{
        db.transaction( function(tx1){
           
            tx1.executeSql('DELETE FROM tbl_Option WHERE Item_ID='+ItemID)
        }, errorCB, UpdateOptionSuccess);
    }
    
    
}

function getTemplateID(callback){
     $.CallBack = callback;    
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
      db.transaction( function(tx1){  
          tx1.executeSql('SELECT MAX(Template_ID) "max" FROM tbl_Option',[],getTemplateIDSuccess,errorCB);
         
      }, errorCB);
}

function getTemplateIDSuccess(tx, result){
    if (result.rows.length > 0){
        var num = result.rows.item(0).max + 1
        $.CallBack(num)
    }else{
        $.CallBack(1)
    }
}


function UpdateOptionSuccess(tx,result){
     AddOption($.Option, $.ItemID,$.TemplateID, $.CallBack);
}

function AddOption(option,ItemId,templateID,callback)
{
    $.OptionCallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);	
	 db.transaction( function(tx1){  
         
         for (var n=0; n<option.length; n++){
           if (option[n].Type == "3")	 
		   {
                
		       tx1.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("'+option[n].Title+'","'+option[n].Type+'", "'+option[n].Default+'", '+option[n].Cost+',"",'+option[n].Amount+',0,'+option[n].Min+','+option[n].Max+','+option[n].Step+', '+option[n].Count+',"'+option[n].Unit+'",'+ItemId+','+templateID+')'); 
		   }
		   else{
            for (var i=0; i < option[n].Options.length; i++){
               
                var state = 0
                if (option[n].Options[i].state == true)
                {
                    state = 1;
                }
               tx1.executeSql('INSERT INTO tbl_Option (Title, Type_ID, DefaultB, Cost, Name, Amount, Status, Min, Max, Step, Count, Unit,Item_ID,Template_ID) VALUES ("'+option[n].Title+'","'+option[n].Type+'","'+option[n].Default+'",'+option[n].Cost+',"'+option[n].Options[i].name+'",'+option[n].Options[i].amount+','+state+',0,0,0,0,"",'+ItemId+','+templateID+')');
              
			}
		   }
         }
     }, errorCB, AddOptionSuccess);
}

function AddOptionSuccess(tx, result){
    getAllOptions(getItemAllOptions); 
    
}

function getItemAllOptions(){
    getAllItem($.OptionCallBack)
}

function updateEftpos(ip, port, type, callback){
    $.CallBack = callback;
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
        
     db.transaction( function(tx1){ 
         tx1.executeSql('UPDATE tbl_Eftpos SET IP="'+ip+'", Port='+port+',Eftpos_Type="'+type+'"');
     }, errorCB, InsertSuccess);
}

function AddPrinter(printer, callback){
     $.CallBack = callback;
    
     var ip = printer.IP
     var port = printer.Port
     var name = printer.PrinterName
     var type = printer.Type
    var header = printer.Header
    var subheader = printer.SubHeader
    var footer = printer.Footer
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
        
     db.transaction( function(tx1){ 
         tx1.executeSql('INSERT INTO tbl_Printer (Printer_Name, IP, Port, Type, Header, SubHeader, Footer) VALUES ("'+name+'","'+ip+'",'+port+',"'+type+'","'+header+'","'+subheader+'","'+footer+'")');
     }, errorCB, UpdatePrinterSuccess);
}

function updatePrinter(printer, callback){
     $.CallBack = callback;
    
     var id = printer.PrinterID
     var ip = printer.IP
     var port = printer.Port
     var name = printer.PrinterName
     var type = printer.Type
    var header = printer.Header
    var subheader = printer.SubHeader
    var footer = printer.Footer
    
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
        
     db.transaction( function(tx1){ 
         tx1.executeSql('UPDATE tbl_Printer SET Printer_Name="'+name+'", IP="'+ip+'", Port='+port+', Type="'+type+'", Header="'+header+'", SubHeader="'+subheader+'", Footer="'+footer+'" WHERE Printer_ID='+id);
     }, errorCB, UpdatePrinterSuccess);
}

function UpdatePrinterSuccess(tx, result){
    getPrinter($.CallBack);    
}

function AddSubCategory(categoryName, callback){
    
    $.SubCategoryCallBack = callback;
    var subcatID=6;
    
    if (localStorage.getItem('subcategoryid')){        
        subcatID = parseInt(localStorage.getItem('subcategoryid'))+1;
    }
    
    localStorage.setItem('subcategoryid',subcatID);
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
        
     db.transaction( function(tx1){                              
             tx1.executeSql('INSERT INTO tbl_SubCategory (SubCategory_ID, SubCategory_Name, Category_ID, Redeem, Status) VALUES ('+subcatID+',"'+categoryName+'", 1, 0, 1)');              
             tx1.executeSql('INSERT INTO tbl_Tab (Tab_ID, Tab_Name, Position) VALUES ('+subcatID+',"'+categoryName+'", 1)');
     }, errorCB, SubCategoryItemSuccess);
    
   
}

function SubCategoryItemSuccess(tx, result){
    
    getAllTabItem();
    getAllItem($.SubCategoryCallBack);   
    
}

function UpdateSubCatgeory(categoryID, categoryName, callback){
     $.SubCategoryCallBack = callback;
   
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){                              
             tx1.executeSql('UPDATE tbl_SubCategory SET SubCategory_Name="'+categoryName+'" WHERE SubCategory_ID='+categoryID);
             tx1.executeSql('UPDATE tbl_Tab SET Tab_Name="'+categoryName+'" WHERE Tab_ID='+categoryID);
     }, errorCB, SubCategoryItemSuccess)
}


function DeleteSubCategory(categoryList, callback){
     $.SubCategoryCallBack = callback;
   
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){     
          for (var i=0; i < categoryList.length; i++){
                 tx1.executeSql('UPDATE tbl_SubCategory SET Status=0 WHERE SubCategory_ID='+categoryList[i].Tab_ID);
                 tx1.executeSql('DELETE FROM tbl_Tab WHERE Tab_ID='+categoryList[i].Tab_ID);
              }
     }, errorCB, SubCategoryItemSuccess)
}


function AddItem(item, callback){
     $.CallBack = callback;
     var itemID=10;
    
    if (localStorage.getItem('itemid')){        
        itemID = parseInt(localStorage.getItem('itemid'))+1;
    }
    
    var option = item.Options
    
    localStorage.setItem('itemid',itemID);
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){     
         
             tx1.executeSql('INSERT INTO tbl_Item (Item_ID, Item_Code, Item_Name, Item_Name2, SubCategory_ID, Current_Stock, Min_Stock, Status, Img, Comment) VALUES ('+itemID+','+itemID+', "'+item.Item_Name+'","'+item.Item_Name2+'", '+item.Tab+', '+item.Current_Stock+',0, 1,"'+item.Img+'" , "'+item.Notes+'")');
             tx1.executeSql('INSERT INTO tbl_Price (Amount, Item_ID, Price_Level) VALUES ('+item.Amount+', '+itemID+', 1)');
             if (item.Barcode !== ""){
                 tx1.executeSql('INSERT INTO tbl_Barcode (Barcode, Item_ID) VALUES ("'+item.Barcode+'", '+itemID+')');
             }
             tx1.executeSql('INSERT INTO tbl_Cost (Item_ID, Cost, Batch, Full_Batch, Date) VALUES ('+itemID+','+item.Cost+','+item.Current_Stock+','+item.Current_Stock+',"")');
             tx1.executeSql('INSERT INTO tbl_ItemTab (ItemTab_ID, Item_ID, Tab_ID, Position, Color, Font_Size, Font_Color, Image) VALUES ('+itemID+', '+itemID+', '+item.Tab+', 1, "'+item.Color+'", 12,"#000000" ,"'+item.Img+'")');
     }, errorCB, AddItemSuccess)
    
      AddOption(option,itemID,0,callback);
}

function AddItemSuccess(tx, result){
    getAllTabItem();
}


function UpdateItem(item, callback){
     $.SubCategoryCallBack = callback;
   
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){                              
             tx1.executeSql('UPDATE tbl_Item SET Item_Code="'+item.Item_Code+'", Item_Name="'+item.Item_Name+'", Item_Name2="'+item.Item_Name2+'", SubCategory_ID='+item.Tab+',Current_Stock='+item.Current_Stock+', Img="'+item.Img+'",Comment="'+item.Notes+'" WHERE Item_ID='+item.Item_ID);
             tx1.executeSql('UPDATE tbl_ItemTab SET Tab_ID='+item.Tab+',Color="'+item.Color+'",Image="'+item.Img+'" WHERE Item_ID='+item.Item_ID);
             tx1.executeSql('UPDATE tbl_Price SET Amount='+item.Amount+' WHERE Item_ID='+item.Item_ID);
             tx1.executeSql('UPDATE tbl_Barcode SET Barcode="'+item.Barcode+'" WHERE Item_ID='+item.Item_ID);
             tx1.executeSql('UPDATE tbl_Cost SET Cost='+item.Cost+' WHERE Item_ID='+item.Item_ID);
     }, errorCB, SubCategoryItemSuccess)
}


function DeleteItem(itemList, callback){
    $.SubCategoryCallBack = callback;
   
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){     
         
         for (var i=0; i < itemList.length; i++){
             
             tx1.executeSql('UPDATE tbl_Item SET Status=0 WHERE Item_ID='+itemList[i].Item_ID);
             tx1.executeSql('DELETE FROM tbl_ItemTab WHERE Item_ID='+itemList[i].Item_ID);
         }
     }, errorCB, SubCategoryItemSuccess)
}


function AddUser(user, callback){
     $.CallBack = callback;
     var userID=3;
    
    
    if (localStorage.getItem('userid')){        
        userID = parseInt(localStorage.getItem('userid'))+1;
    }
    
    localStorage.setItem('userid',userID);
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){     
         
            tx1.executeSql('INSERT INTO tbl_Staff (Staff_ID, Staff_Code, First_Name, Last_Name, Password, Role_ID, Price_Level, Pay_Rate, Status) VALUES ('+userID+',"'+user.Staff_Code+'","'+user.First_Name+'","'+user.Last_Name+'",'+user.Password+','+user.Role_ID+',1,0,1)');
                   
     }, errorCB, UserSuccess)
}

function UserSuccess(tx, result){
    getAllStaff($.CallBack);
}


function UpdateUser(user, callback){
     $.CallBack = callback;
   
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){                              
   
             tx1.executeSql('UPDATE tbl_Staff SET First_Name="'+user.First_Name+'",Last_Name="'+user.Last_Name+'",Password='+user.Password+',Role_ID='+user.Role_ID+' WHERE Staff_ID='+user.Staff_ID);
            
     }, errorCB, UserSuccess)
}

function DeleteUser(userList, callback){
     $.CallBack = callback;
   
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx1){     
         
         for (var i=0; i < userList,length; i++){
             
             tx1.executeSql('UPDATE tbl_Staff SET Status=0 WHERE Staff_ID='+userList[i].Staff_ID);
            
         }
     }, errorCB, UserSuccess)
}

function getAllStaff(callback){
    $.CallBack = callback;
    var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Staff WHERE Status=1',[],getAllStaffSuccess,errorCB);         
     }, errorCB);
}

function getAllStaffSuccess(tx, result){
     var users = [];
    for (var i=0; i <result.rows.length; i++){
        var single = {};
        single["Staff_ID"] = result.rows.item(i).Staff_ID;
        single["Staff_Code"] = result.rows.item(i).Staff_Code;
        single["First_Name"] = result.rows.item(i).First_Name;
        single["Last_Name"] = result.rows.item(i).Last_Name;
        single["Password"] = result.rows.item(i).Password;
        single["Role_ID"] = result.rows.item(i).Role_ID;
        single["Price_Level"] = result.rows.item(i).Price_Level;
        single["Pay_Rate"] = result.rows.item(i).Pay_Rate;
       
        
        users.push(single);
    }   
    
        localStorage.setItem('allStaffs',JSON.stringify(users));
    
    $.CallBack();
}

function ProcessLgin(password, callback)
{
    console.log(password);
    $.CallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Staff WHERE Password='+password+' AND Status=1',[],ProcessLoginSuccess,errorCB);         
     }, errorCB);
}

function ProcessLoginSuccess(tx, result){
    
    console.log(result.rows.length);
    if (result.rows.length > 0){
        var json = {};
        json["Staff_ID"] = result.rows.item(0).Staff_ID;
        json["Staff_Code"] = result.rows.item(0).Staff_Code;
        json["First_Name"] = result.rows.item(0).First_Name;
        json["Last_Name"] = result.rows.item(0).Last_Name;
        json["Role_ID"] = result.rows.item(0).Role_ID;
        json["Price_Level"] = result.rows.item(0).Price_Level;
    
        localStorage.setItem('Staff',JSON.stringify(json));
        $.CallBack(true);
    }
    else
        $.CallBack(false);
}

function CheckAuth(authname, roleid, callback){
    $.CallBack = callback;
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Auth a, tbl_RoleAuth r WHERE a.Auth_ID=r.Auth_ID AND a.Auth_Name="'+authname+'" AND r.Role_ID="'+roleid+'"',[],CheckAuthSuccess,errorCB);         
     }, errorCB);
    
}

function CheckAuthSuccess(tx, result){
    if (result.rows.length > 0)
       $.CallBack(true);
    else
       $.CallBack(false);
}

function GetItemPrinter(){
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_ItemPrinter',[],getItemPrinterSuccess,errorCB);         
     }, errorCB);
}

function getItemPrinterSuccess(tx, result){
     if (result.rows.length > 0){
        var list = []
        
        for (var i=0; i < result.rows.length; i++){
            var json = {}
            json["ID"]= result.rows.item(i).ItemPrinter_ID
            json["PrinterID"]= result.rows.item(i).Printer_ID
            json["ItemID"]= result.rows.item(i).Item_ID
           
            
            list.push(json)
        }
        
        localStorage.setItem('ItemPrinter',JSON.stringify(list));
    }
}

function GetItembyPrinterID(printerId, callback){
    $.CallBack = callback;
      var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_ItemPrinter WHERE Printer_ID='+printerId,[],GetItembyPrinterIDSuccess,errorCB);         
     }, errorCB);
}

function GetItembyPrinterIDSuccess(tx, result){
     if (result.rows.length > 0){
       $.CallBack(result.rows)         
    }
}

function GetPrinterbyType(type,callback){
    $.KitchenCallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Printer WHERE Type="'+type+'"',[],GetPrinterbyTypeSuccess,errorCB);         
     }, errorCB);
}

function GetPrinterbyTypeSuccess(tx, result){
     if (result.rows.length > 0){
                
       $.KitchenCallBack(result.rows);         
    }
}


function GetPending(){
       
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Pending',[],getPendingSuccess,errorCB);         
     }, errorCB);
    
}

function getPendingSuccess(tx, result){
       
    if (result.rows.length > 0){
        var orderlist = []
        
        for (var i=0; i < result.rows.length; i++){
            var json = {}
            json["PendingID"]= result.rows.item(i).Pending_ID
            json["DateTime"]= result.rows.item(i).PDateTime
            json["TableNumber"]= result.rows.item(i).Table_Number
            json["OrderInfo"]= result.rows.item(i).Order_Info   
            json["OrderAmount"]= result.rows.item(i).Order_Amount 
            if (result.rows.item(i).PendingString == ""){
                json["cartItems"] = []
            }
            else{
                json["cartItems"]= JSON.parse(unescape(result.rows.item(i).PendingString))
            }
            
            orderlist.push(json)
        }
              
        localStorage.setItem('allOrders',JSON.stringify(orderlist));
    }
    else{
         localStorage.removeItem('allOrders')
    }
       
}

function getAllFunctionbyRole(roleid){
       
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT Function_Name, Function_Text, Position, Back_Color, Fore_Color, Font_Size, Keyboard_Value, Fixed, Password FROM tbl_Function f, tbl_RoleAuth r WHERE f.Function_ID=r.Function_ID AND r.Role_ID="'+roleid+'"',[],getAllFunctionSuccess,errorCB);         
     }, errorCB);
}

function getAllFunctionSuccess(tx, result){
    if (result.rows.length > 0){
          var json = {};
        json["Function_Name"] = result.rows.item(0).Function_Name;
        json["Function_Text"] = result.rows.item(0).Function_Text;
        json["Position"] = result.rows.item(0).Position;
        json["Back_Color"] = result.rows.item(0).Back_Color;
        json["Fore_Color"] = result.rows.item(0).Fore_Color;
        json["Font_Size"] = result.rows.item(0).Font_Size;
        json["Keyboard_Value"] = result.rows.item(0).Keyboard_Value;
        json["Fixed"] = result.rows.item(0).Fixed;
        json["Passwrod"] = result.rows.item(0).Passwrod;
    
        localStorage.setItem('Functions',JSON.stringify(json));
        
   }
   
}


function CheckFunction(functionname, roleid, callback){
    $.CallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Function f, tbl_RoleAuth r WHERE f.Function_ID=r.Function_ID AND f.Function_Name="'+functionname+'" AND r.Role_ID="'+roleid+'"',[],CheckFunctionSuccess,errorCB);         
     }, errorCB);
    
}

function CheckFunctionSuccess(tx, result){
    if (result.rows.length > 0)
       $.CallBack(true);
    else
       $.CallBack(false);
}

function getAllOptions(callback){
     $.CallBack = callback;
     $.Template = false;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Option WHERE Item_ID<>0 ORDER by Item_ID, Type_ID',[],getOptionSuccess,errorCB);         
     }, errorCB);
}

function getOptionTemplate(){
      $.Template = true;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Option WHERE Item_ID=0 ORDER by Template_ID, Type_ID',[],getOptionSuccess,errorCB);         
     }, errorCB);
}

function getOptionSuccess(tx, result)
{
  
    var OptionList =[];
  
    var single={}
    var itemid=""
	var typeid = ""
    var option = []
	var optionsingle = {}
    
    var IDName = "Item_ID";
    var ResultID = "";
    
    if ($.Template){
		IDName = "Template_ID"
    }
          
    var length = result.rows.length -1;
    var state = false;
    
    for (var i=0; i <result.rows.length; i++){
	     optionsingle = {}
        
        ResultID = result.rows.item(i).Item_ID
         if ($.Template){
             ResultID = result.rows.item(i).Template_ID
         }
        
        
        //first item
        if (itemid=="")
        {          
            itemid = ResultID;           
		    typeid = result.rows.item(i).Type_ID;
           
		    single[IDName] = itemid;
			single["Title"] = result.rows.item(i).Title;
            single["Id"] = result.rows.item(i).Option_ID;
            single["Type"] = result.rows.item(i).Type_ID;
            single["Default"] = result.rows.item(i).DefaultB;
			 if (result.rows.item(i).Type_ID == "1" || result.rows.item(i).Type_ID == "2")
             {
                  single["Cost"] = result.rows.item(i).Cost;
				  optionsingle["name"] = result.rows.item(i).Name;
                  optionsingle["amount"] = result.rows.item(i).Amount;
                  if (result.rows.item(i).Status == 1){
                      state = true;
                  }
                  else{
                     state = false
                  }
                 
                  optionsingle["state"] = state;
				  option.push(optionsingle);
             }
             else if (result.rows.item(i).Type_ID == "3")
             {
                  single["Min"] = result.rows.item(i).Min;
                  single["Max"] = result.rows.item(i).Max;
                  single["Step"] = result.rows.item(i).Step;
                  single["Cost"] = result.rows.item(i).Cost;
				  single["Amount"] = result.rows.item(i).Amount;
                  single["Count"] = result.rows.item(i).Count;
                  single["Unit"] = result.rows.item(i).Unit;
				  OptionList.push(single)
             }
        }
        else if (itemid == ResultID && typeid == result.rows.item(i).Type_ID && i < length){
             if (result.rows.item(i).Type_ID == "1" || result.rows.item(i).Type_ID == "2")
             {
                  single["Cost"] = result.rows.item(i).Cost;
				  optionsingle["name"] = result.rows.item(i).Name;
                  optionsingle["amount"] = result.rows.item(i).Amount;
                 if (result.rows.item(i).Status == 1){
                      state = true;
                  }
                  else{
                     state = false
                  }
                  optionsingle["state"] = state;
				  option.push(optionsingle);
             }
             else if (result.rows.item(i).Type_ID == "3")
             {
                  single["Min"] = result.rows.item(i).Min;
                  single["Max"] = result.rows.item(i).Max;
                  single["Step"] = result.rows.item(i).Step;
                  single["Cost"] = result.rows.item(i).Cost;
				  single["Amount"] = result.rows.item(i).Amount;
                  single["Count"] = result.rows.item(i).Count;
                  single["Unit"] = result.rows.item(i).Unit;
				  OptionList.push(single)
             }

        }
		//Last Item
		else if (i == length){
		  if (itemid == ResultID && typeid == result.rows.item(i).Type_ID){
		       if (result.rows.item(i).Type_ID == "1" || result.rows.item(i).Type_ID == "2")
             {                 
				  optionsingle["name"] = result.rows.item(i).Name;
                  optionsingle["amount"] = result.rows.item(i).Amount;
                 if (result.rows.item(i).Status == 1){
                      state = true;
                  }
                  else{
                     state = false
                  }
                  optionsingle["state"] = state;
				  option.push(optionsingle);
				  single["Options"] = option
				  OptionList.push(single)
                 
             }
             else if (result.rows.item(i).Type_ID == "3")
             {
                  single["Min"] = result.rows.item(i).Min;
                  single["Max"] = result.rows.item(i).Max;
                  single["Step"] = result.rows.item(i).Step;
                  single["Cost"] = result.rows.item(i).Cost;
				  single["Amount"] = result.rows.item(i).Amount;
                  single["Count"] = result.rows.item(i).Count;
                  single["Unit"] = result.rows.item(i).Unit;
				  OptionList.push(single)            
                 
             }
		  }
		  else{
              if (option.length > 0){
                 
		        single["Options"] = option
			    OptionList.push(single)                                
			  }
             single = {}
			 option=[]
              
		    single[IDName] = ResultID;
		    single["Title"] = result.rows.item(i).Title;
            single["Id"] = result.rows.item(i).Option_ID;
            single["Type"] = result.rows.item(i).Type_ID;
            single["Default"] = result.rows.item(i).DefaultB;
		   if (result.rows.item(i).Type_ID == "1" || result.rows.item(i).Type_ID == "2")
             {
                  single["Cost"] = result.rows.item(i).Cost;
				  optionsingle["name"] = result.rows.item(i).Name;
                  optionsingle["amount"] = result.rows.item(i).Amount;
                 if (result.rows.item(i).Status == 1){
                      state = true;
                  }
                  else{
                     state = false
                  }
                  optionsingle["state"] = state;
				  option.push(optionsingle);
				  single["Options"] = option
				  OptionList.push(single)
             }
             
             else if (result.rows.item(i).Type_ID == "3")
             {
                  single["Min"] = result.rows.item(i).Min;
                  single["Max"] = result.rows.item(i).Max;
                  single["Step"] = result.rows.item(i).Step;
                  single["Cost"] = result.rows.item(i).Cost;
				  single["Amount"] = result.rows.item(i).Amount;
                  single["Count"] = result.rows.item(i).Count;
                  single["Unit"] = result.rows.item(i).Unit;
				  OptionList.push(single)
             }
		  }
		
		}
	
		else{
		      if (option.length > 0){
                 
		        single["Options"] = option
			    OptionList.push(single)
                
                 // console.log(single)
			  }
			  //Initialize
			  single = {}
			  option=[]
			  
		      itemid = ResultID;
		      typeid = result.rows.item(i).Type_ID;
			   
			  single[IDName] = ResultID; 
			  single["Title"] = result.rows.item(i).Title;
              single["Id"] = result.rows.item(i).Option_ID;
              single["Type"] = result.rows.item(i).Type_ID;
              single["Default"] = result.rows.item(i).DefaultB;
		     if (result.rows.item(i).Type_ID == "1" || result.rows.item(i).Type_ID == "2")
             {
                  single["Cost"] = result.rows.item(i).Cost;
				  optionsingle["name"] = result.rows.item(i).Name;
                  optionsingle["amount"] = result.rows.item(i).Amount;
                 if (result.rows.item(i).Status == 1){
                      state = true;
                  }
                  else{
                     state = false
                  }
                  optionsingle["state"] = state;
				  option.push(optionsingle);
             }
             else if (result.rows.item(i).Type_ID == "3")
             {
                  single["Min"] = result.rows.item(i).Min;
                  single["Max"] = result.rows.item(i).Max;
                  single["Step"] = result.rows.item(i).Unit;
                  single["Cost"] = result.rows.item(i).Cost;
				  single["Amount"] = result.rows.item(i).Amount;
                  single["Count"] = result.rows.item(i).Count;
                  single["Unit"] = result.rows.item(i).Unit;
				  OptionList.push(single)
             }
		
		}
			                       
    }
    
   
    localStorage.setItem('allOptions',JSON.stringify(OptionList)); 
    try{
     $.CallBack();
            }
    catch(err){}
}

function getOptionbyID(id){
        
    
    var options = JSON.parse(localStorage.getItem('allOptions'));
    
    var selectoption = []
   
    for (var i=0; i< options.length; i++){
        if (options[i].Item_ID===id)
        {   
                   
            selectoption.push(options[i]);            
        }
    }
    
    
  return selectoption;
        
}

function getAllItem(callback)
{
    $.ItemCallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT i.Item_ID, i.Item_Code, i.Item_Name, i.Item_Name2, i.SubCategory_ID, i.Current_Stock, i.Min_Stock, i.Comment, i.Img, p.Amount, b.Barcode, c.Cost FROM tbl_Item i, tbl_Price p, tbl_Cost c Left Join tbl_Barcode b on b.Item_ID=i.Item_ID  WHERE i.Item_ID=c.Item_ID AND i.Item_ID=p.Item_ID AND Status=1',[],getItemSuccess,errorCB);         
     }, errorCB);
}

function getItemSuccess(tx, result){
    
    var items = [];
    
    
    for (var i=0; i <result.rows.length; i++){
        var single = {};
        single["Item_ID"] = result.rows.item(i).Item_ID;
        single["Item_Code"] = result.rows.item(i).Item_Code;
        single["Item_Name"] = result.rows.item(i).Item_Name;
        single["Item_Name2"] = result.rows.item(i).Item_Name2;
        single["SubCategory_ID"] = result.rows.item(i).SubCategory_ID;
        single["Current_Stock"] = result.rows.item(i).Current_Stock;
        single["Min_Stock"] = result.rows.item(i).Min_Stock;
        single["Comment"] = result.rows.item(i).Comment;
        single["Img"] = result.rows.item(i).Img;
        single["Amount"] = result.rows.item(i).Amount;
        single["Barcode"] = result.rows.item(i).Barcode;
        single["Cost"] = result.rows.item(i).Cost;
        single["Options"] = getOptionbyID(result.rows.item(i).Item_ID);
        
        items.push(single);
    }   
    
     
     localStorage.setItem('allProducts',JSON.stringify(items));
    
     getOptionTemplate()
        
   try{
       $.ItemCallBack();
       }
    catch(er){}
       
}

function getAllTabItem(callback){
        
    $.CallBack = callback
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Tab',[],getTabSuccess,errorCB);
             tx.executeSql('SELECT t.Tab_ID, t.Position, t.Color, t.Font_Size, t.Font_Color, t.Image, i.Item_Code, i.Item_Name, i.Item_Name2, c.Cost, p.Amount FROM tbl_ItemTab t, tbl_Item i, tbl_Price p, tbl_Cost c WHERE c.Item_ID=i.Item_ID AND t.Item_ID=i.Item_ID AND i.Item_ID=p.Item_ID',[],getItemTabSuccess,errorCB);
     }, errorCB);
}

function getTabSuccess(tx, result){
     var tabs = [];
    for (var i=0; i <result.rows.length; i++){
        var single = {};
        single["Tab_ID"] = result.rows.item(i).Tab_ID;
        single["Tab_Name"] = result.rows.item(i).Tab_Name;
        single["Position"] = result.rows.item(i).Position;

        tabs.push(single);
    }   
    
        localStorage.setItem('allTabs',JSON.stringify(tabs));
   
}

function getItemTabSuccess(tx, result){
     var itemtabs = [];
    console.log(result.rows.length);
    for (var i=0; i <result.rows.length; i++){
        var single = {};
       
        single["Tab_ID"] = result.rows.item(i).Tab_ID;
        single["Position"] = result.rows.item(i).Position;
        single["Color"] = result.rows.item(i).Color;
        single["Font_Size"] = result.rows.item(i).Font_Size;
        single["Font_Color"] = result.rows.item(i).Font_Color;
        single["Image"] = result.rows.item(i).Image;
        single["Item_Code"] = result.rows.item(i).Item_Code;
        single["Item_Name"] = result.rows.item(i).Item_Name;
        single["Item_Name2"] = result.rows.item(i).Item_Name2;
        single["Cost"] = result.rows.item(i).Cost;
        single["Amount"] = result.rows.item(i).Amount;

        itemtabs.push(single);
    }   
    
        localStorage.setItem('allItemTabs',JSON.stringify(itemtabs));
    
     try{
    $.CallBack()
        }
    catch(er){
        
    }
   
}

function getButtonItem(callback){
    $.CallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_ItemTab',[],getButtonItemSuccess,errorCB);         
     }, errorCB);
}

function getButtonItemSuccess(tx, result)
{
     $.CallBack(result);
}

function getItembyID(id, callback){
    
    var bfound = false;
    var Item = JSON.parse(localStorage.getItem('Item'));
    var selectitem;
    for (var i=0; i< Item.items.length; i++){
        if (Item.items[i].Item_ID===id)
        {
            bfound = true;
            selectitem = Item.items[i];
            break;
        }
    }
    
    if (bfound)
       AddItemtoGrid(selectitem, callback);
    else
       callback("Not Found");
        
}

function getItembyID(barcode, callback){
    
    var bfound = false;
    var Item = JSON.parse(localStorage.getItem('Item'));
    var selectitem;
    for (var i=0; i< Item.items.length; i++){
        if (Item.items[i].Barcode===barcode)
        {
            bfound = true;
            selectitem = Item.items[i];
            break;
        }
    }
    
    if (bfound)
       AddItemtoGrid(selectitem, callback);
    else
       callback("Not Found");
        
}

function AddItemtoGrid(item, callback){
    var grid = JSON.parse(localStorage.setItem('grid'));
    var single ={};
    single['Item'] = item.Item_Name;
    single['Qty'] = 1;
    single['Price'] = item.Amount;
    
    grid.items.push(single);
    localStorage.setItem('grid',JSON.stringify(json));
    callback(grid);
    
}

function getCategory(callback){
    $.CallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Category',[],getCategorySuccess,errorCB);         
     }, errorCB);
}

function getCategorySuccess(tx, result){
    $.CallBack(result);
}

function getSubCategory(catid, callback){
    $.CallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_SubCategory WHERE Category_ID="'+catid+'"',[],getSubCategorySuccess,errorCB);         
     }, errorCB);
}

function getSubCategorySuccess(tx, result){
    $.CallBack(result);
}

function getItembySubCat(subcatid, callback){
     var bfound = false;
    var Item = JSON.parse(localStorage.getItem('Item'));
    var selectitem = [];
    for (var i=0; i< Item.items.length; i++){
        if (Item.items[i].SubCategory_ID===subcatid)
        {
            bfound = true;
            selectitem.push(Item.items[i]);           
        }
    }
    
    if (bfound)
       callback(selectitem);
    else
       callback("Not Found");
}

function getPaymentType(callback){
    $.CallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
   
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_PaymentType',[],getPaymentTypeSuccess,errorCB);         
     }, errorCB);
}

function getPaymentTypeSuccess(tx, result){
       
    var paymenttype = [];
     if (result.rows.length > 0){
        for (var i=0; i<result.rows.length; i++){
        var json = {};
              json["PaymentType_ID"] = result.rows.item(i).PaymentType_ID;
              json["PaymentType_Name"] = result.rows.item(i).PaymentType_Name;
              json["Use_Eftpos"] = result.rows.item(i).Use_Eftpos;
              json["Open_Cashdraw"] = result.rows.item(i).Open_Cashdraw;
              json["Hide"] = result.rows.item(i).Role_ID;
              paymenttype.push(json);
        }
          
        localStorage.setItem('PaymentType',JSON.stringify(paymenttype));       
    }
     try{
        $.CallBack();
        }
    catch(err){}
   
}

function ConverttoJSON(dx, name){
           
}

$.PaymentList = [];
$.Amount = 0;
$.PaymentName ="";

function MakePayment(paymentname, amount, callback){
     $.CallBack = callback;
     $.Amount = amount;
    $.PaymentName = paymentname;
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_PaymentType WHERE PaymentType_Name="'+paymentname+'"',[],getPaymentTypeSuccessbyName,errorCallBack);
            
     }, errorCallBack);
        
}

function getPaymentTypeSuccessbyName(tx, result){
  try{
    var paymentid = result.rows.item(0).PaymentType_ID;
    var single = {ID: paymentid,
                  Amount: $.Amount,
                  Name:$.PaymentName};
    var PaymentList = [];
    
    if (localStorage.getItem('paymentList')){
        PaymentList = JSON.parse(localStorage.getItem('paymentList'));
    }
    
    PaymentList.push(single);
    
    localStorage.setItem('paymentlist', JSON.stringify(PaymentList));
    
    $.CallBack("");
    }
    catch(err){
        alert(err);
    }
}

function pad(str){
    
    var output="";
    if (str.toString().length <2){
        output = "0"+str;
    }
    else{
        output = str;
    }
    
    return output;
}

function FinalizePayment(callback){
    $.CallBack = callback;
    var orderid=1;
    var order = JSON.parse(localStorage.getItem('order'))
    var cartitem = order.cartItems
    var totalsale = localStorage.getItem('cartAmount')
        
    if (localStorage.getItem('orderid')){        
        orderid = parseInt(localStorage.getItem('orderid'))+1;
    }
    
    localStorage.setItem('orderid', orderid);
    
    var staffid = JSON.parse(localStorage.getItem('Staff')).Staff_ID;
    var custid = 0;
    
    var date = new Date();
    var orderdate = date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getDate());
    var ordertime = date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds();
    var terminalid = 1;
    
    var PaymentList = JSON.parse(localStorage.getItem('paymentlist'));

     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction(function(tx){    
                      
        tx.executeSql('INSERT INTO tbl_Order (Order_ID, Order_Date, Order_Time, Staff_ID, Customer_ID, Terminal_ID, Discount_P, Discount_D, Surcharge_P, Surcharge_D, Total_Sale, Comment, Barcode) VALUES ('+orderid+',"'+orderdate+'","'+ordertime+'",'+staffid+','+custid+','+terminalid+',0,0,0,0,'+totalsale+',"","")');
         
         for (var i=0; i < cartitem.length; i++){
             var id = cartitem[i].Item_ID;
             var price = cartitem[i].Amount;
             var qty = cartitem[i].Item_Count;
             var cost = cartitem[i].Cost;  
             var optionstring = escape(JSON.stringify(cartitem[i].Options))
             var discount = 0;
             for (var p=0; p < cartitem[i].functions.length; p++){
                 if (cartitem[i].functions[p].Name=="Discount"){
                     if (cartitem[i].functions[p].Amount > 0){
                         discount = cartitem[i].functions[p].Amount;
                     }
                     break;
                 }
             }
            
             tx.executeSql('INSERT INTO tbl_OrderItem (Order_ID, Item_ID, Item_Price, Item_Qty, Item_Cost, Discount_P, Discount_D, Group_ID, ItemType_ID, OptionString) VALUES ('+orderid+','+id+','+price+','+qty+','+cost+','+discount+',0,"","","'+optionstring+'")');
             tx.executeSql('UPDATE tbl_Item SET Current_Stock=Current_Stock-1 WHERE Item_ID='+id);
         }
         
         var paytotal = 0
         var actualpay = 0
         for (var n=0; n<PaymentList.length; n++){
              
             if ( PaymentList[n].Amount >= totalsale){
                 if (paytotal == 0){
                     actualpay = totalsale;
                 }
                 else{
                     actualpay = totalsale - paytotal;
                 }
             }
             else{
                 
                 if (paytotal + PaymentList[n].Amount >= totalsale){
                     actualpay = totalsale- paytotal
                 }
                 else{
                     paytotal += PaymentList[n].Amount
                     actualpay = PaymentList[n].Amount;
                 }
             }
             tx.executeSql('INSERT INTO tbl_Payment (Order_ID, PaymentType_ID, Amount, Actual_Payment) VALUES ('+orderid+','+PaymentList[n].ID+','+PaymentList[n].Amount+','+actualpay+')');
         }
            
     }, errorCB, FinalizeSuccess); 
    
    
    
    var content = GenerateReceipt(); 
    
    console.log(content);
    
     localStorage.setItem('receipt',content);
    
      if ($.KitchenPrint){        
        PrintKitchen();
    } 
    //OpenCashDraw();          
}

function CashdrawCallback(){ 
   
     
}

function FinalizeSuccess(tx){          
    $.CallBack();       
}

function getCurrentDateTime(){
    var date = new Date();
    var orderdate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    var ordertime = + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
    return orderdate+" "+ordertime
}

function CheckItemPrinter(printerid, itemid){
    var itemprinter = JSON.parse(localStorage.getItem('ItemPrinter'));
    var result = false
    
    for (var i=0; i<itemprinter.length; i++){
        if ((itemprinter[i].PrinterID == printerid) && (itemprinter[i].ItemID==itemid)){
            result = true
            break
        }
    }
    
    return result
   
}

function GenerateKitchenDocket(printerid){
     var date = new Date();
    var orderdate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    var ordertime = + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var order = JSON.parse(localStorage.getItem('order'));
    var cartitems = order.cartItems
    var category = JSON.parse( localStorage.getItem('allTabs'));
    var kitchen = "";
    
    if (order.OrderName != ""){
        kitchen+="Order Name: "+order.OrderName+"\n";
    }
   
    if (order.TableNumber != ""){
        kitchen+="Table Number: "+order.TableNumber+"\n";
    }
    
     if (order.OrderInfo != ""){
        kitchen+="Comments: "+order.OrderInfo+"\n";
    }
    
    kitchen+= "\nTransaction No: "+ localStorage.getItem('orderid')+"\n";
    kitchen+= "Date: "+orderdate+" "+ordertime+"\n\n"
        
    var bFirstMatch = false;
    var itemcount = 0;
    
    for (var i=0; i< category.length; i++){
        for (var n=0; n< cartitems.length; n++)
        {
          if (CheckItemPrinter(printerid, cartitems[n].Item_ID)){
            if (cartitems[n].SubCategory_ID==category[i].Tab_ID)
            {
                if (bFirstMatch == false)
                {
                    kitchen+= "\n"+category[i].Tab_Name+"\n";
                    kitchen+="------------------ \n\n";
                    bFirstMatch = true;
                }
                 var sTemp = cartitems[n].Item_Name;
                 kitchen+= sTemp + FindSpace(sTemp,30)+"X "+cartitems[n].Item_Count+"\n";
               
                 for (var j=0; j<cartitems[n].Options.length; j++){
                    if (cartitems[n].Options[j].Type=="3"){
                       
                       if (cartitems[n].Options[j].Count > 0){
                           sTemp = "   L "+cartitems[n].Options[j].Title;
                           kitchen+= sTemp + FindSpace(sTemp,30)+"X "+cartitems[n].Options[j].Count+"\n";                         
                       }
                       
                    }
                    else{
                       
                        for (var m=0; m<cartitems[n].Options[j].Options.length; m++){
                            if (cartitems[n].Options[j].Options[m].state == true){
                                sTemp = "   L "/*+cartitems[n].Options[j].Title*/+" "+cartitems[n].Options[j].Options[m].name;
                                kitchen+= sTemp + FindSpace(sTemp,30)+"X 1 \n";                                
                            }                    
                       }
                       
                    }
                 }
                
                 itemcount++;
            }
          }
        }
        
        bFirstMatch = false;
    }
    
     kitchen+="\n\n"
    
    if (itemcount == 0){
        kitchen = ""
    }
    
   return kitchen;
}

function GenerateReceipt(){
    
    var date = new Date();
    var orderdate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    var ordertime = + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var order = JSON.parse(localStorage.getItem('order'));
    var cartitems = order.cartItems
    var paymentList = JSON.parse(localStorage.getItem('paymentlist'));
    var receipt = "";
    
    receipt+= "\nTransaction No: "+ localStorage.getItem('orderid')+"\n";
    receipt+= "Date: "+orderdate+" "+ordertime+"\n\n"
    
    var total=0.00;
    
  
    for (var i=0; i < cartitems.length; i++){
               
        var sTemp = cartitems[i].Item_Count +" X "+cartitems[i].Item_Name;
        receipt+= sTemp + FindSpace(sTemp,30)+"$"+cartitems[i].Amount.toFixed(2)+"\n";
        total += cartitems[i].Amount;
        
        for (var p=0; p < cartitems[i].functions.length; p++){
             if (cartitems[i].functions[p].Name=="Discount"){
                   if (cartitems[i].functions[p].Amount > 0){
                       receipt+= "   L Discount "+cartitems[i].functions[p].Amount+"%\n";
                   }
                   break;
             }
        }
        
        
        for (var n=0; n<cartitems[i].Options.length; n++){
            if (cartitems[i].Options[n].Type=="3"){
                if (cartitems[i].Options[n].Count > 0){
                     sTemp = "   L "+cartitems[i].Options[n].Count +" X "+cartitems[i].Options[n].Title;
                     receipt+= sTemp /*+ FindSpace(sTemp,30)+"$"+cartitems[i].Options[n].Amount.toFixed(2)*/+"\n";
                   //  total += cartitems[i].Options[n].Amount;
                }
            }
            else{
                
                for (var m=0; m<cartitems[i].Options[n].Options.length; m++){
                    if (cartitems[i].Options[n].Options[m].state == true){
                     sTemp = "   L "+"1" +" X "/*+cartitems[i].Options[n].Title*/+" "+cartitems[i].Options[n].Options[m].name;
                     receipt+= sTemp /*+ FindSpace(sTemp,30)+"$"+cartitems[i].Options[n].Options[m].amount.toFixed(2)*/+"\n";
                  //   total += cartitems[i].Options[n].Options[m].amount;
                    }                    
                }
            }
        }
                             
    }
    receipt+= "\n\n ------------------ \n";
    receipt+= "Sub-Total:"+FindSpace("Sub-Total:",30)+"$"+total.toFixed(2)+"\n";
    var gst = total * (1 - (100 / (100 + 15)));
    receipt+= "GST Amount 15%:"+FindSpace("GST Amount 15%:",30)+"$"+gst.toFixed(2);
    receipt+= "\n ------------------ \n\n";
    var paytotal = 0.00;
    
    for (var j=0; j< paymentList.length; j++){
        receipt+= paymentList[j].Name + FindSpace(paymentList[j].Name,30)+"$"+paymentList[j].Amount.toFixed(2)+"\n";
        paytotal += paymentList[j].Amount;
    }
    
    var change = paytotal-total;
    if (change > 0){
        receipt+= "Change:"+FindSpace("Change:",30)+"$"+change.toFixed(2)+"\n";
    }
    
    receipt+="\n\n"
    
   return receipt;
    
    
   /* var Empty = [];
    localStorage.setItem('paymentlist', Empty);
    $.CallBack();*/
}

$.StartDate;
$.EndDate;
$.Report;

function GenerateReport(startdate, enddate, callback){
    
    $.StartDate = startdate;
    $.EndDate = enddate;  
    $.CallBack = callback;
        
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){    
    
        
           console.log('SELECT PaymentType_Name, COUNT(p.Amount) "Num", SUM(p.Amount) "Total" FROM tbl_Payment p, tbl_PaymentType pt, tbl_Order o WHERE o.Order_ID=p.Order_ID AND p.PaymentType_ID=pt.PaymentType_ID AND o.Order_Date>='+startdate+' AND o.Order_Date<='+enddate+' GROUP BY PaymentType_Name');
             tx.executeSql('SELECT PaymentType_Name, COUNT(p.Amount) "Num", SUM(p.Amount) "Total" FROM tbl_Payment p, tbl_PaymentType pt, tbl_Order o WHERE o.Order_ID=p.Order_ID AND p.PaymentType_ID=pt.PaymentType_ID AND o.Order_Date>="'+startdate+'" AND o.Order_Date<="'+enddate+'" GROUP BY PaymentType_Name',[],getSalesReportSuccess,errorCB);
       
            
    }, errorCB);
}

function getSalesReportSuccess(tx, result){
    $.Report = "SALES REPORT\n";
    $.Report+="-----------------------------\n\n";
    
    var total=0;
    for (var i=0; i<result.rows.length; i++){
        
        var name = result.rows.item(i).PaymentType_Name;
        var temp = name + FindSpace(name,15)+"x"+result.rows.item(i).Num;
        $.Report += temp + FindSpace(temp,30)+"$"+result.rows.item(i).Total.toFixed(2)+"\n";
        
        total += result.rows.item(i).Total;
    }
    
    $.Report += "\nTotal:"+FindSpace("Total:",30)+"$"+total.toFixed(2)+"\n\n\n";
    
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){  
       
             tx.executeSql('SELECT Item_Name, COUNT(oi.Item_Price) "Num", SUM(oi.Item_Price) "Total" FROM tbl_OrderItem oi, tbl_Item i, tbl_Order o WHERE o.Order_ID=oi.Order_ID AND oi.Item_ID=i.Item_ID AND o.Order_Date>="'+$.StartDate+'" AND o.Order_Date<="'+$.EndDate+'" GROUP BY Item_Name',[],getItemReportSuccess,errorCB);
        
            
     }, errorCB);
}

function getItemReportSuccess(tx, result){
    $.Report += "ITEM REPORT\n";
    $.Report+="-----------------------------\n\n";
    
    var total=0;
    for (var i=0; i<result.rows.length; i++){
        
        var name = result.rows.item(i).Item_Name;
        var temp = name + FindSpace(name,15)+"x"+result.rows.item(i).Num;
        $.Report += temp + FindSpace(temp,30)+"$"+result.rows.item(i).Total.toFixed(2)+"\n";
        
        total += result.rows.item(i).Total;
    }
    
    $.Report += "\nTotal:"+FindSpace("Total:",30)+"$"+total.toFixed(2)+"\n\n\n\n\n\n";
    
    localStorage.setItem('PrintText',$.Report);
    console.log($.Report)
   // alert($.Report);
    Print();
    $.CallBack();
    
}

function FindSpace(text, length){
     var iLength = text.length;
     var iNumSpace = length - iLength;

            var sSpace = "";
            for (var i = 0; i < iNumSpace; i++)
            {
                sSpace += " ";
            }

     return sSpace;
}

function getItembyBarcode(barcode, callback){
     $.CallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT i.Item_ID, i.Item_Name, p.Amount FROM tbl_Item i, tbl_Barcode b, tbl_Price p WHERE i.Item_ID=p.Item_ID AND p.Price_Level=1 AND i.Item_ID=b.Item_ID AND b.Barcode="'+barcode+'"',[],getItembyBarcodeSuccess,errorCB);         
     }, errorCB);
}

function getItembyBarcodeSuccess(tx, result){
    $.CallBack(result);
}

function InitializeGrid(){
    var json={items:[]};
    localStorage.setItem('grid',JSON.stringify(json));
}

function getEftpos(callback){
    $.CallBack2 = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT IP, Port, Eftpos_Type FROM tbl_Eftpos',[],getEftposSuccess,errorCB);         
     }, errorCB);
}

function getEftposSuccess(tx, result){
    
     if (result.rows.length > 0){
         var json = {}
         json["IP"] = result.rows.item(0).IP;
         json["Port"] = result.rows.item(0).Port;
         json["Type"] = result.rows.item(0).Eftpos_Type;
         
         localStorage.setItem('EftposSettings',JSON.stringify(json));
         
         try{
            $.CallBack2(result.rows.item(0).IP,result.rows.item(0).Port)
             }
         catch(e){}
     }    
    
}



function getPrinter(callback){
    $.PrinterCallBack = callback;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
     db.transaction( function(tx){                              
             tx.executeSql('SELECT * FROM tbl_Printer',[],getPrinterSuccess,errorCB);         
     }, errorCB);
}

function getPrinterSuccess(tx, result){
    if (result.rows.length > 0){
        var printerlist = []
        
        for (var i=0; i < result.rows.length; i++){
            var json = {}
            json["PrinterID"]= result.rows.item(i).Printer_ID
            json["PrinterName"]= result.rows.item(i).Printer_Name
            json["IP"]= result.rows.item(i).IP
            json["Port"]= result.rows.item(i).Port   
            json["Type"]= result.rows.item(i).Type
            json["Header"]= result.rows.item(i).Header
            json["SubHeader"]= result.rows.item(i).SubHeader   
            json["Footer"]= result.rows.item(i).Footer
            
            printerlist.push(json)
        }
        
        localStorage.setItem('PrinterSetup',JSON.stringify(printerlist));
    }
    
    try{
     $.PrinterCallBack(result.rows.item(0).IP,result.rows.item(0).Port);
        }
    catch(err){}
}

function ScanBarcodeBD(){ 
                
         
          try{
              cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          "preferFrontCamera" : false,
          "showFlipCameraButton" : false,
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
        
      }
   );
   
              
     
          }
          catch(err){
              alert(err);
          }
          
 }

//----------------Report-----------------------------
function getSalesReport(startdate, enddate, callback){
    $.StartDate = startdate;
    $.EndDate = enddate;  
    $.CallBack = callback;
        
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){                              
             tx.executeSql('SELECT PaymentType_Name, COUNT(p.Actual_Payment) "Num", SUM(p.Actual_Payment) "Total" FROM tbl_Payment p, tbl_PaymentType pt, tbl_Order o WHERE o.Order_ID=p.Order_ID AND p.PaymentType_ID=pt.PaymentType_ID AND o.Order_Date>="'+startdate+'" AND o.Order_Date<="'+enddate+'" GROUP BY PaymentType_Name',[],SalesReportSuccess,errorCB);
            
    }, errorCB);
}

function SalesReportSuccess(tx, result){
     var report = "SALES REPORT\n";
    report+="-----------------------------\n\n";
    
    var total=0;
    for (var i=0; i<result.rows.length; i++){
        
        var name = result.rows.item(i).PaymentType_Name;
        var temp = name + FindSpace(name,15)+"x"+result.rows.item(i).Num;
       report += temp + FindSpace(temp,30)+"$"+result.rows.item(i).Total.toFixed(2)+"\n";
        
        total += result.rows.item(i).Total;
    }
    
   report += "\nTotal:"+FindSpace("Total:",30)+"$"+total.toFixed(2)+"\n\n\n";
    
   localStorage.setItem('PrintText',report);
   $.CallBack(report);
}

function PrintReport(){
    Print();
}

function getCategoryReport(startdate, enddate, callback){
     $.StartDate = startdate;
    $.EndDate = enddate;  
    $.CallBack = callback;
        
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){                              
             tx.executeSql('SELECT SubCategory_Name, SUM(oi.Item_Qty) "Num", SUM(oi.Item_Price) "Total" FROM tbl_Item i, tbl_OrderItem oi, tbl_Order o, tbl_SubCategory c WHERE o.Order_ID=oi.Order_ID AND oi.Item_ID=i.Item_ID AND i.SubCategory_ID=c.SubCategory_ID AND o.Order_Date>="'+startdate+'" AND o.Order_Date<="'+enddate+'" GROUP BY SubCategory_Name',[],CategoryReportSuccess,errorCB);
            
    }, errorCB);
}

function CategoryReportSuccess(tx, result){
    var report = "CATEGORY REPORT\n";
    report+="-----------------------------\n\n";
    
    var total=0;
    for (var i=0; i<result.rows.length; i++){
        
        var name = result.rows.item(i).SubCategory_Name;
        var temp = name + FindSpace(name,15)+"x"+result.rows.item(i).Num;
        report += temp + FindSpace(temp,30)+"$"+result.rows.item(i).Total.toFixed(2)+"\n";
        
        total += result.rows.item(i).Total;
    }
    
   report += "\nTotal:"+FindSpace("Total:",30)+"$"+total.toFixed(2)+"\n\n\n";
    
   localStorage.setItem('PrintText',report);
   $.CallBack(report);
}

function getItemReport(startdate, enddate, callback){
    $.StartDate = startdate;
    $.EndDate = enddate;  
    $.CallBack = callback;
        
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){                              
             tx.executeSql('SELECT SubCategory_Name, SubCategory_ID FROM tbl_SubCategory',[],SubCategorySuccess,errorCB);
            
    }, errorCB);
}

function SubCategorySuccess(tx, result){
    $.SubCategory = result.rows;
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){                              
             tx.executeSql('SELECT i.Item_Name, i.SubCategory_ID, COUNT(oi.Item_Price) "Num", SUM(oi.Item_Price) "Total" FROM tbl_OrderItem oi, tbl_Item i, tbl_Order o WHERE o.Order_ID=oi.Order_ID AND oi.Item_ID=i.Item_ID AND o.Order_Date>="'+$.StartDate+'" AND o.Order_Date<="'+$.EndDate+'" GROUP BY Item_Name',[],ItemReportSuccess,errorCB);
            
     }, errorCB);
}

function ItemReportSuccess(tx, result){
    var report = "ITEM REPORT\n";
    report+="-----------------------------\n\n";
    
    var total=0;
    var cattotal = 0
    var bFirstMatch = false
    
    for (var n=0; n< $.SubCategory.length; n++){
       for (var i=0; i<result.rows.length; i++){
        
           if ($.SubCategory.item(n).SubCategory_ID == result.rows.item(i).SubCategory_ID){
               if (bFirstMatch == false)
                  {
                    report+= "\n"+$.SubCategory.item(n).SubCategory_Name+"\n";
                    report+="-------------- \n";
                    bFirstMatch = true;
                  }
                 var name = result.rows.item(i).Item_Name;
                 var temp = name + FindSpace(name,15)+"x"+result.rows.item(i).Num;
                 report += temp + FindSpace(temp,30)+"$"+result.rows.item(i).Total.toFixed(2)+"\n";
               
                 total += result.rows.item(i).Total;
                 cattotal += result.rows.item(i).Total;
           }                   
       }
        
        if (cattotal > 0){
             report += "\n\nCategory Total:"+FindSpace("Category Total:",30)+"$"+cattotal.toFixed(2)+"\n";
        }
       
        bFirstMatch = false
        cattotal = 0
    }
    
    report += "\n\nTotal:"+FindSpace("Total:",30)+"$"+total.toFixed(2)+"\n\n\n\n\n\n";
    
    localStorage.setItem('PrintText',report);
    $.CallBack(report);
}

function getTransactionReport(startdate, enddate, callback){
    $.StartDate = startdate;
    $.EndDate = enddate;  
    $.CallBack = callback;
        
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){                              
             tx.executeSql('SELECT Order_ID, Order_Date, Order_Time FROM tbl_Order WHERE Order_Date>="'+startdate+'" AND Order_Date<="'+enddate+'"',[],getOrderTranSuccess,errorCB);
            
    }, errorCB);
}

function getOrderTranSuccess(tx, result){
    $.Order = result;

     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){                              
             tx.executeSql('SELECT o.Order_ID, oi.Item_Qty, oi.Item_Price, oi.OptionString, i.Item_Name FROM tbl_OrderItem oi, tbl_Order o, tbl_Item i WHERE i.Item_ID=oi.Item_ID AND o.Order_ID=oi.Order_ID AND o.Order_Date>="'+$.StartDate+'" AND o.Order_Date<="'+$.EndDate+'"',[],getOrderItemTranSuccess,errorCB);
            
    }, errorCB);
}

function getOrderItemTranSuccess(tx, result){
    $.OrderItem = result
     var db = window.openDatabase("Monarch", "1.0", "Monarch", 2000000);
    
    db.transaction( function(tx){                              
             tx.executeSql('SELECT p.Order_ID, pt.PaymentType_Name, p.Amount FROM tbl_Payment p,tbl_PaymentType pt, tbl_Order o WHERE o.Order_ID=p.Order_ID AND p.PaymentType_ID=pt.PaymentType_ID AND o.Order_Date>="'+$.StartDate+'" AND o.Order_Date<="'+$.EndDate+'"',[],getPaymentTranSuccess,errorCB);
            
    }, errorCB);
}

function getPaymentTranSuccess(tx, result){
    $.Payment = result;
    var tranlist = []
    var single={}
    for (var i=0; i<$.Order.rows.length; i++){
        single={}
        var orderid = $.Order.rows.item(i).Order_ID
          single["OrderID"]= orderid
          single["OrderDate"]= $.Order.rows.item(i).Order_Date
          single["OrderTime"]= $.Order.rows.item(i).Order_Time
          single["Transaction"] = generateTransaction(orderid, $.Order.rows.item(i).Order_Date, $.Order.rows.item(i).Order_Time)
          tranlist.push(single)
    }
       
    $.CallBack(tranlist)
}

function generateTransaction(orderid, orderdate, ordertime){
    
    var receipt = ""
    receipt+= "Transaction No: "+ orderid+"\n";
    receipt+= "Date: "+orderdate+" "+ordertime+"\n\n"
    
    var total=0.00;
    
    
  for (var i=0; i < $.OrderItem.rows.length; i++){
        
     if ($.OrderItem.rows.item(i).Order_ID==orderid){
        var sTemp = $.OrderItem.rows.item(i).Item_Qty +" X "+$.OrderItem.rows.item(i).Item_Name;
        receipt+= sTemp + FindSpace(sTemp,30)+"$"+$.OrderItem.rows.item(i).Item_Price.toFixed(2)+"\n";
        total += $.OrderItem.rows.item(i).Item_Price;
         
         if ($.OrderItem.rows.item(i).Discount_P >0){
               receipt+= "   L Discount "+$.OrderItem.rows.item(i).Discount_P+"%\n";
         }
        
      if ($.OrderItem.rows.item(i).OptionString != ""){
           var option = JSON.parse(unescape($.OrderItem.rows.item(i).OptionString));        
               
        for (var n=0; n<option.length; n++){
            if (option[n].Type=="3"){
                if (option[n].Count > 0){
                     sTemp = "   L "+option[n].Count +" X "+option[n].Title;
                     receipt+= sTemp /*+ FindSpace(sTemp,30)+"$"+option[n].Amount.toFixed(2)*/+"\n";
                   //  total += option[n].Amount;
                }
            }
            else{
                for (var m=0; m<option[n].Options.length; m++){
                    if (option[n].Options[m].state == true){
                     sTemp = "   L "+"1" +" X "/*+option[n].Title*/+" "+option[n].Options[m].name;
                     receipt+= sTemp /*+ FindSpace(sTemp,30)+"$"+option[n].Options[m].amount.toFixed(2)*/+"\n";
                    // total += option[n].Options[m].amount;
                    }                    
                }
            }
        }
      }
    }
  }
    receipt+= "\n\n ------------------ \n";
    receipt+= "Sub-Total:"+FindSpace("Sub-Total:",30)+"$"+total.toFixed(2)+"\n";
    var gst = total * (1 - (100 / (100 + 15)));
    receipt+= "GST Amount 15%:"+FindSpace("GST Amount 15%:",30)+"$"+gst.toFixed(2);
    receipt+= "\n ------------------ \n\n";
    var paytotal = 0.00;
    for (var j=0; j< $.Payment.rows.length; j++){
      if ($.Payment.rows.item(j).Order_ID==orderid){
        receipt+= $.Payment.rows.item(j).PaymentType_Name + FindSpace($.Payment.rows.item(j).PaymentType_Name,30)+"$"+$.Payment.rows.item(j).Amount.toFixed(2)+"\n";
        paytotal += $.Payment.rows.item(j).Amount;
      }
    }
    
    var change = paytotal-total;
    if (change > 0){
        receipt+= "Change:"+FindSpace("Change:",30)+"$"+change.toFixed(2)+"\n";
    }
    
    receipt+="\n\n\n\n\n"
    return receipt;
}

//----------------Printer----------------------------
function TestPrinet(ip, port, text){
    localStorage.setItem('PrintText', text);
     PrintCallBack(ip, port);
}

function PrintReceipt(){
    GetPrinterbyType("Receipt",PrintReceiptCallBack)
}

function PrintReceiptCallBack(rows){
    for (var i=0; i<rows.length; i++){
        var header = rows.item(i).Header
        var subheader = rows.item(i).SubHeader
        var footer = rows.item(i).Footer
        var body = localStorage.getItem('receipt'); 
        var receipt = header +"\n\n"+subheader+"\n\n"+body+"\n\n"+footer+"\n\n\n\n"
       
        localStorage.setItem('PrintText',receipt); 
        
        PrintCallBack(rows.item(i).IP,rows.item(i).Port);
    }
    
}

function PrintKitchen(){
     
    GetPrinterbyType("Kitchen",PrintKitchenCallBack)
}

function PrintKitchenCallBack(rows){
         
    for (var i=0; i<rows.length; i++){
          
       
       var header = rows.item(i).Header
       var subheader = rows.item(i).SubHeader
       var footer = rows.item(i).Footer
       kitchencontent = GenerateKitchenDocket(rows.item(i).Printer_ID);  
      if (kitchencontent != ""){
          $.KitchenPrintNow = true;
          kitchencontent = header +"\n\n"+subheader+"\n\n"+kitchencontent+"\n\n"+footer+"\n\n\n\n"
          
          localStorage.setItem('kitchen',kitchencontent);          
          console.log(kitchencontent)
               
        PrintCallBack(rows.item(i).IP,rows.item(i).Port);
      }
    }
    
    setTimeout(function() {
      $.KitchenPrintNow = false;
    }, 1000);
    
}

function OpenCashDraw(){    
     getPrinter(CashdrawCallBack)
}

function CashdrawCallBack(ip, port){
     if (ip !== ""){    
        console.log("cashdraw "+ip);
        ConnetToIP(ip,port, CashdrawConectionSuccess);        
    }
    else{        
        alert('Printer infor not setup');
    }
}

function CashdrawConectionSuccess(connectionID){
       
    var opencommand = '\x1B'+'\x70'+'\x30'+'\x37'+'\x79';
    
    var millisecondsToWait = 1000;
    setTimeout(function() {      
       SendDataToIP(opencommand, connectionID, false, true);      
    }, millisecondsToWait);
}


function Print(){
         
    getPrinter(PrintCallBack)
    
}

function PrintCallBack(ip, port){
    
    if (ip !== ""){           
        ConnetToIP(ip,port, PrintConnectSuccess);        
    }
    else{
        alert('Printer infor not setup');
    }
}

String.prototype.toBytes = function() {
 var arr = []
 for (var i=0; i < this.length; i++) {
   arr.push(this[i].charCodeAt(0))
 }
 return arr
}

function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

function PrintConnectSuccess(connectionID){
  // alert(connectionID);
      
    var content; 
    
    if ($.KitchenPrintNow)
    {
        content =  localStorage.getItem('kitchen');        
    }
    else{
        content =  localStorage.getItem('PrintText');
    }
        
    //alert(content);
  
   // var cutcommand = ['\x1D', '\x56', '\x48'];
    var cutcommand = '\x1D'+'\x56'+'\x48';
    
   // var opencommand = '\x1B'+'\x70'+'\x30'+'\x37'+'\x79';
    
    //content += bin2String(cutcommand);
    
    var millisecondsToWait = 1000;
    setTimeout(function() {
       SendDataToIP(content, connectionID, false, false);
       SendDataToIP(cutcommand, connectionID, false, false);
      //  SendDataToIP(opencommand, connectionID, false, true);
    }, millisecondsToWait);
    
}

