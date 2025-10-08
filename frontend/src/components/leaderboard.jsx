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

const arr = ["alwin1","alwin2","alwin3"];

const leaderboard = () => {
    return (
        <>  
            <div className="flex items-center justify-center h-full">
            <Card className = 'w-1/2'>
                <CardTitle className = 'flex justify-center text-6xl'>
                    LEADERBOARD
                </CardTitle>
                <CardContent className = 'flex flex-col gap-10 text-4xl justify-between items-center'>
                        {arr.map((ele)=><div className = 'flex'>{ele}</div>)}
                </CardContent>
            </Card>
            </div>
        </>
    )
};

export default leaderboard;