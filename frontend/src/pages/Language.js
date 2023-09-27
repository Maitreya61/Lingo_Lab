import React from 'react'
import {useNavigate} from 'react-router-dom'

const Language = () => {

  let selected;
    const language = localStorage.getItem('language');
    if(language){
      selected = true;
    }else{
      selected = false;
    }

    const langSel = (val)=>{
      localStorage.setItem('language',val);
      navigate('/homepage')
    }
    
    const navigate = useNavigate();
  return (
    <div className='lang-sel-container'>
      <div className='lang-sel'>
        {selected ? '' : <h1>Lets Get Started!</h1>}
        <div><h1>Choose an Language</h1></div>
        <div>
            <button className='lang-sel-button' onClick={()=>langSel('english')}> <h4>English</h4><img src="images/english.png" alt="english" /></button>
            <button className='lang-sel-button' onClick={()=>langSel('french')}><h4>French</h4><img src="images/french.png" alt="french" /></button>
            <button className='lang-sel-button' onClick={()=>langSel('hindi')}><h4>Hindi</h4><img src="images/hindi.png" alt="Hindi" /></button>
            <button className='lang-sel-button' onClick={()=>langSel('italian')}><h4>Italian</h4><img src="images/italian.png" alt="Italian" /></button>
            <button className='lang-sel-button' onClick={()=>langSel('spanish')}><h4>Spanish</h4><img src="images/spanish.png" alt="Spanish" /> </button>
            <button className='lang-sel-button' onClick={()=>langSel('portugese')}><h4>Portugese</h4><img src="images/portugese.png" alt="Protugese" /> </button>
        </div>
        {selected ? <div className='center'><div><h3>Selecting another language will reset your current language progress. Press "Back" to revert back</h3></div><button onClick={()=>navigate('/homepage')} className='back-button'>Back</button></div> : ''}
      </div>
    </div>
  )
}

export default Language
