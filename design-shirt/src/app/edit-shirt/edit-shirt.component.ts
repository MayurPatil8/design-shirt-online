import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Design} from "../design";
import {DesignService} from "../design.service";
import 'fabric'; 
declare let fabric;
declare var $: any;


@Component({
  selector: 'app-edit-shirt',
  templateUrl: './edit-shirt.component.html',
  styleUrls: ['./edit-shirt.component.css']
})
export class EditShirtComponent implements OnInit {   
  image: any;
  file:File = null;
  canvas:any;

  constructor(private designService : DesignService,private http:HttpClient) { }; 

  ngOnInit(){
    let _self = this;
    this.canvas = new fabric.Canvas('canvas', { selection: false });    
    fabric.Image.fromURL('http://www.pngmart.com/files/1/Black-T-Shirt-PNG.png', function(o) {
      _self.canvas.setBackgroundImage(o, _self.canvas.renderAll.bind(_self.canvas), {
        top: 0,
        left: 0
      });
    }); 
  };

  handleDrop(e) { 
    this.file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (imgFile) => {  
      const data = imgFile.target["result"];                    
      fabric.Image.fromURL(data, (img) => {
      let oImg = img.set({
        left: 250,
        top: 250,
        height:300,
        width:300,
        angle: 0
      }).scale(0.5);
       this.canvas.add(oImg).renderAll();
       var a = this.canvas.setActiveObject(oImg);    
      });
    };
    reader.readAsDataURL(this.file);
    return false;
  }
  
  addText(){
    this.canvas.add(new fabric.IText('Tap and Type', { 
                         fill:'white',
                         left: 100, 
                         top: 100 ,
                         color:'#fff'
                      }));
  }

  saveShirt(){
     var json = JSON.stringify(this.canvas);
     this.designService.addDesign(json).subscribe(heroes =>{
     console.log("Inserted"); 

     });;
     console.log("Here");
    // this.http.post<Design>('http://localhost:3000/api/getDesign');
    let _self = this;
   

  
     
  }

  getDesign(){
    let _self = this;
    let json:String; 

    this.designService.getDesign().subscribe(data =>{
      json = data.data[1].image; 
      this.canvas.clear();
      this.canvas.loadFromJSON(json, function() {
      // making sure to render canvas at the end
      _self.canvas.renderAll(); 
  });
     

     });

  }

}