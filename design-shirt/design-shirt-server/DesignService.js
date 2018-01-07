var mysql = require('mysql');



class DesignService{
    constructor(req, res){
        this.req = req
        this.res = res
        this.con = mysql.createConnection({
                     host: "localhost",
                     user: "root",
                     password: "abcd",
                     database: "customizeShirt"
                   });
    }

    addDesign(){  
    let image = this.req.body.image;
    let _self = this;
    this.con.connect(function(err) {
	    if (err) throw err;
	    console.log("Connected!");
	    var sql = "INSERT INTO Shirts (user_id, image) VALUES (1, '"+image+"')";
	    _self.con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("1 record inserted");
	        _self.con.end();

	    });
    });
        
    }
    getDesign(){
      let self = this;
      this.con.connect(function(err) {
      if (err) throw err;
      self.con.query("SELECT user_id, image FROM Shirts where id=2", function (err, result, fields) {
      if (err) throw err;
      console.log(result);  
      self.con.end();  

	  return self.res.status(200).json({
	        status: 'success',
	        data: result
	        });
    });
    });
    }
}
module.exports = DesignService;