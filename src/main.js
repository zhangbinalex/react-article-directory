import  React from  'react'
import styles from './defaultStyle.css'
class ArticleDirectory extends React.Component{
  constructor(props){
    super(props);
    this.state={
      directoryActive:'',
      directoryPos:'absolute',
      directoryList:[],
      sliding:false
    }
  }
  componentDidMount(){
    const criticalValue=this.props.style.topAbs-this.props.style.topFix;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.setState({directoryPos:scrollTop>=criticalValue?'fixed':'absolute'});
    window.addEventListener('scroll',this.handleScroll);
    this.getDirectoryInfo()
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.handleScroll)
  }
  getDirectoryInfo=()=>{
    const id=this.props.id;
    const offset=this.props.offset||0;
    const selector=this.props.selector||'h1';
    const directoryArr=document.getElementById(id).getElementsByTagName(selector);
    const directoryList=this.state.directoryList;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (let i=0;i< directoryArr.length;i++){
      directoryList.push({label:directoryArr[i].innerText,scrollTop:parseInt(directoryArr[i].getBoundingClientRect().top+scrollTop-offset)})
    }
    this.setState({directoryList})
  };
  handleScroll=()=>{
    const criticalValue=this.props.style.topAbs-this.props.style.topFix;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const directoryList=this.state.directoryList;

    //如果没有在滑动，则监听scrollTop改变当前的激活目录
    if(!this.state.sliding){
      let maxScrollTop=(document.body.scrollHeight||document.documentElement.scrollHeight)-
        (document.body.clientHeight||document.documentElement.clientHeight);
      let directoryActive=this.state.directoryActive;
      for(let i=0;i<directoryList.length;i++){
        if(scrollTop>=directoryList[i].scrollTop){
          directoryActive=i;
        }
      }
      if(scrollTop===maxScrollTop){
        directoryActive=directoryList.length-1;
      }
      this.setState({directoryActive});
    }
    this.setState({
      directoryPos:scrollTop>=criticalValue?'fixed':'absolute'
    })
  };
  slideToDirectory=(scrolltop,index)=>{
    if(this.state.sliding) return;

    this.setState({directoryActive:index,sliding:true});
    let maxTop=(document.body.scrollHeight||document.documentElement.scrollHeight)-(document.body.clientHeight||document.documentElement.clientHeight);
    const interVal=setInterval(()=>{
      let top= document.body.scrollTop||document.documentElement.scrollTop;
      let speed=scrolltop-top>0?Math.ceil((scrolltop-top)/12):Math.floor((scrolltop-top)/12);
      top+=speed;
      console.log(document.body.clientHeight)
/*
      console.log(document.body.scrollHeight||document.documentElement.scrollHeight,document.body.clientHeight||document.documentElement.clientHeight)
*/    console.log(scrolltop-top)
      console.log(top,maxTop,speed)
      document.body.scrollTop=document.documentElement.scrollTop=top;
      if(top===scrolltop||top>=maxTop){
        this.setState({sliding:false});
        clearInterval(interVal)
      }
    },20)
  };
  render(){
    const containerStyle=this.props.style||{};
    const directoryStyle=this.props.itemStyle||{};
    const title=this.props.title||'Directory';
    const absStyle={
      position:'absolute',
      top:containerStyle.topAbs||100,
      left:containerStyle.left||100,
      width:containerStyle.width||250
    };
    const fixStyle={
      position:'fixed',
      top:containerStyle.topFix||30,
      left:containerStyle.left||100,
      width:containerStyle.width||250
    };
    return (
      <ul
        style={this.state.directoryPos==='fixed'?{...fixStyle}:{...absStyle}}
        className="directory"
      >
        <li className='directoryTitle'>{title}</li>
        {this.state.directoryList.map((directory,index)=>{
          return <li
                     key={index}
                     style={{...directoryStyle}}
                     className={index===this.state.directoryActive?'directoryActive':''}
                     onClick={()=>{this.slideToDirectory(directory.scrollTop,index)}} >{directory.label}
                 </li>
        })}
      </ul>
    )
  }
}
export default ArticleDirectory
