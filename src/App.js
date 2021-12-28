
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World!</h1>
      <Clock></Clock>
      {/* <Update></Update> */}
       <input type="button" value="remove func" onClick={function(){
         setFuncShow(false);
       }}></input>
       <input type="button" value="remove class" onClick={function(){
         setClassShow(false);
       }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
} 

var funStyle = 'color:blue';
var funcId = 0;
function FuncComp(props){
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1]; 

  // var dateState = useState((new Date()).toString());
  // var date = dateState[0];
  // var setDate = dateState[1];
  var [date, setDate] = useState((new Date()).toString());

  //side effect
  useEffect(function(){
    console.log('%cfunc ==> useEffect number(componendDidMount & componentDidUpdate) ' + (++funcId), funStyle);
    document.title = number;
    return function(){
      console.log('%cfunc ==> useEffect number return(componendDidMount & componentDidUpdate) ' + (++funcId), funStyle);
    }
  }, [number]);
  //side effect 복수 설치 가능
  // useEffect(function(){
  //   console.log('%cfunc ==> useEffectB(componendDidMount & componentDidUpdate) ' + (++funcId), funStyle);
  //   document.title = number + ' : ' + date;
  // });

  useEffect(function(){
    console.log('%cfunc ==> useEffect(componendDidMount) ' + (++funcId), funStyle);
    document.title = number;
    return function(){
      console.log('%cfunc ==> useEffect return(componendWillunMount) ' + (++funcId), funStyle);
    }
  }, []);


  console.log('%cfunc ==> render ' + (++funcId), funStyle)
  return(
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {date}</p>
      <input type="button" value="random" onClick={
        function(){
          setNumber(Math.random());
        }
      }></input>
      <input type="button" value="date" onClick={
        function(){
          setDate((new Date()).toString());
        }
      }></input>
    </div>
  );
}

var classStyle = 'color:red';
class ClassComp extends React.Component{
  state = {
    number : this.props.initNumber,
    date : (new Date()).toString()
  }
  componentWillMount(){
    console.log('%cclass ==> componentWillMount', classStyle);
  }
  componentDidMount(){
    console.log('%cclass ==> componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass ==> shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log('%cclass ==> componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState){
    console.log('%cclass ==> componentDidUpdate', classStyle);
  }
  componentWillUnmount(nextProps, nextState){
    console.log('%cclass ==> componentWillUnmount', classStyle);
  }
  render(){
    console.log('%cclass ==> render', classStyle);
    return(
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date().toString())})
          }.bind(this)
        }></input>
      </div>
    )
  }
}


function Update() {
  var appdata = (new Date()).toLocaleTimeString();

  return(
    <div>
      <h2>
      여기는 App 안 : {appdata}
       </h2>
    </div>
  );
}

function Clock() {
  var [date, setDate] = useState((new Date()).toLocaleTimeString());
  //var otherdate = (new Date()).toLocaleTimeString();

  // setInterval( () => {
  //   setDate((new Date()).toLocaleTimeString());
  //   //date = (new Date()).toLocaleTimeString();
  //   otherdate = (new Date()).toLocaleTimeString();
  // }, 1000);
  // // console.log('No useEffect');

  useEffect(function(){
    setInterval( () => {
      setDate((new Date()).toLocaleTimeString());
      //otherdate = (new Date()).toLocaleTimeString();
      //console.log('인터벌');
    }, 1000);
    //console.log('인터벌 밖');
  },[]);

  return(
    <div>
      <h2>
        현재 시각은 {date}입니다.
      </h2>
      {/* <h2>
        여기는 Clock 안 : {otherdate}.
      </h2> */}
    </div>
  );
}

export default App;
