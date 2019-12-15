

import  { useEffect, useRef } from 'react'
const {remote} = window.require('electron')
const { Menu ,MenuItem}  = remote

const useContextMenu = (itemArr,selector,deps)=>{
    let clickedElement = useRef(null)
    useEffect(()=>{
        const menu = new Menu()
        itemArr.forEach(item => {
            menu.append(new MenuItem(item))
        });
        const handleContext = (e)=>{
            const el = e.target
            if(document.querySelector(selector).contains(el)){
                clickedElement.current = el
                menu.popup({
                    window:remote.getCurrentWindow()
                })
            }
           
        }
        window.addEventListener('contextmenu',handleContext)
        return ()=>{
            window.removeEventListener('contextmenu',handleContext)
        }
    },deps)
    return clickedElement
}

export default useContextMenu