import { Component } from "react";
import Modal from "./Modal";
import './App.css';

class App extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            contents: ['myeongdong.jpg', 'seoultower.jpg', 'dongdaemoon.jpg', 'seoulcici.jpg'],
            index: null,
      
            hasModal: false,
        };
    }

    controlModal = (index) => {
        this.setState({
            index: index,
            hasModal: !this.state.hasModal
        });
    }

    render() {
        const images = this.state.contents.map((image, index) =>
            <img
            style={{width:'13vw', height:'13vw'}}
            key={index} onClick={() => this.controlModal(index)} src={image} alt="alt" />
        )
        return (
            <div>
              <div className="App">

          
      <div className="header">
      <img alt="setting" src="settings.png"/>

        <h1 style={{textAlign:"center" }}>Sharpic</h1>
      </div>

      <div className="main">
      <div className="imagetitle">
      <img style={{width:"3vw", height:"3vw", marginLeft:"30px" ,marginRight:"10px", float:"left" }} alt="book" src="book.png"/>
      <img id ="share" style={{width:"1.5vw", height:"1.5vw", marginTop:"5px" ,marginLeft:"10px" , float:"right" }} alt="friend" src="friend.png"/>
      <img style={{width:"1.5vw", height:"1.5vw", marginTop:"5px" ,marginLeft:"10px" ,marginRight:"10px", float:"right" }} alt="share" src="share.png"/>
      <img style={{width:"1.5vw", height:"1.5vw", marginTop:"5px" ,marginLeft:"10px" ,marginRight:"10px", float:"right" }} alt="menu" src="menu.png"/>
      <img style={{width:"1.5vw", height:"1.5vw", marginTop:"5px" , marginLeft:"10px" ,marginRight:"10px", float:"right" }} alt="menu2" src="menu2.png"/>
        <h1 style={{marginLeft: "40px", marginTop: "20px"}}>Seoul Travel</h1>
        </div>

        <div className='imgmenu'>
         {images}
                {this.state.hasModal && (
                    <Modal images={this.state.contents} index={this.state.index} close={this.controlModal}></Modal>
                )}
        </div>
      </div>


      <div className="profile">
        <img  alt="Profile" src="user.png"/>
        <div>
        <h1>James</h1>
        <h4 style={{}}>example@gmail.com</h4>        
        </div>
      </div>


      <div className="menu">
      <img alt="book" src="book.png"/>
        <h2 >Seoul Travel</h2>
        <img alt="book" src="book2.png"/>
        <h2>Tokyo Travel</h2>
        <img alt="book" src="book2.png"/>
        <h2>Busan Travel</h2>
      </div>
    
    </div> 
            </div>
        );
    }
}




export default App;