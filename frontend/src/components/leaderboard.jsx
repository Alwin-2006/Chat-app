import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const arr1 = ["nice","nice1"];
console.log(arr1);
const apiUrl = "http://localhost:3000/leaderboard";

const leaderboard = () => {
    const [fetched,setFetched] = useState(false);
    const [arr,setArr] = useState([]);
    useEffect(() =>{
        const fetchUsers = async () => {
            try {
                const res = await fetch(apiUrl);
                if(res.ok){
                    setFetched(true);
                    const data = await  res.json();
                     setArr(data.users);
                    console.log("success!");
                }else {
                    console.log("error");
                }
            }catch(err){
                console.log(err.message);
                 console.error(err);
                 setFetched(false);
            }
        }
        fetchUsers();
    },[])
    return (
        <>  
            <div className="flex items-center justify-center h-full">
            <Card className = 'w-1/2'>
                <CardTitle className = 'flex justify-center text-6xl'>
                    LEADERBOARD
                </CardTitle>
                <CardContent className = 'flex flex-col gap-10 text-4xl justify-between items-center'>
                        {arr.map((ele,index)=>
                        
                        <div className = 'flex justify-around gap-10' key = {index} >
                            <span >{ele.username} </span>
                            Level -
                            <span > {ele.level}</span>
                        </div>  
                        
                        )
                            }
                </CardContent>
            </Card>
            </div>
        </>
    )
};

export default leaderboard;