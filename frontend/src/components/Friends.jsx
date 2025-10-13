import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useEffect } from "react";


const friends = ["Tejas"];


const Friends = () => {
    const [value,setValue] = useState("");
    useEffect(()=> {

    },[])
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-4 sm:px-6 md:px-8 gap-6 md:gap-10">
            <div className="flex md:flex-col items-center text-sm md:text-3xl bg-gray-500 h-auto md:h-3/4 w-full md:w-1/4 rounded-3xl p-4 sm:p-6 md:p-10 gap-4 md:gap-6">
                <div className="font-bold text-xl sm:text-2xl md:text-3xl">Friends</div>
                <div className="flex flex-col gap-2 md:gap-4 max-h-60 md:max-h-full overflow-scroll">
                    {friends.length == 0?<div>No friends haha!</div>:
                    friends.map((friend)=>{
                        return (
                            <div className="" key={friend}>
                                {friend}
                            </div>
                        )
                    })
                }
                </div>
            </div>

            <div className="bg-gray-500 h-auto md:h-3/4 w-full md:w-1/2 rounded-3xl flex flex-col items-center justify-around p-4 sm:p-6 md:p-10 gap-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold ">Add friends!</div>
                <ul>
                    {value}
                </ul>
                <form>
                    <label className="flex w-full items-center gap-2">
                    <Input type = "text" placeholder="Get new friends!" className = 'bg-black w-full flex-1' onChange ={(e)=>{setValue(e.target.value)}}/>
                    <Button className='shrink-0'>Send</Button>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Friends