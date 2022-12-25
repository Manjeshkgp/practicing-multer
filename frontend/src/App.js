import './App.css';
import {useState,useEffect} from "react";
import axios from "axios"

function App() {
  const [data,setData] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000")
    .then((res)=>{setData(res.data)})
    .catch((err)=>{console.log(err,"an error occured")})
  },[])
  return (
    <div className="App">
      React App
      {data.map((singleData)=>{
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return <img src={`data:image/png;base64,${base64String}`} alt="" width="300"/>
      })}
    </div>
  );
}

export default App;
