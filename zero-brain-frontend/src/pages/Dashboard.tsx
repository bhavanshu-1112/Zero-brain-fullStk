import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const {contents, refresh} = useContent();
  

useEffect(()=>{
    refresh();
},[modelOpen])

  
  return (<div>
    <SideBar/>
    <div className='p-4 ml-72 min-h-screen bg-slate-100'>
                <CreateContentModel open={modelOpen} onClose = {()=>{setModelOpen(false)}}/>

       <div className='flex px-4 justify-end py-2 space-x-4'>
        {/* <Button variant='primary' startIcon = {<PlusIcon size={"sm"}/>} size='sm' text="Add content" onClick={()=>{}}/> */}
        <Button variant='primary' startIcon={<PlusIcon size={"md"} />} size='md' text="Add Content" onClick = {()=>{setModelOpen(true)}} />
        <Button variant='secondary' startIcon={<ShareIcon size={"md"} />} size='md' text="Share Brain" onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/brain/share`, {
                share :true
            }, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`
            alert(shareUrl)
        }} />

      </div>

    
      <div className='flex gap-4 flex-wrap'>
        {contents.map(({type, title, link})=> <Card
            title={title}
            link={link}
            type ={type}/>
        )}

      </div>

     </div>
     </div>)
}

