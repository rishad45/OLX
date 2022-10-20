import {createContext, useState} from "react";

export const PostContext = createContext(null)

export default function Post({children}){ 
    const[post,setPost] = useState('')
    return(
         <PostContext.Provider value={{post,setPost}}>
            {children} 
         </PostContext.Provider> 
    )

}