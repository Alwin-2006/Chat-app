
import {useParams} from 'react-router-dom'

const UserPage = () => {
    const {id} = useParams();
    const data  = localStorage.getItem("user");
    const user = JSON.parse(data);
    const date  = user.createdAt;
    const dateobj = new Date(date);
    console.log(dateobj);
    return (
        <>
            <div className='text-7xl my-20 flex flex-col w-full h-screen items-center gap-10'>
                <div>HELLO THERE!</div>
                <span className='text-3xl'>{user.username}!</span>
                <span className='text-3xl'>created at {dateobj.getDate()}</span>
                <span className='text-3xl'>Level {user.level}</span>
            </div>
        </>
    )
};

export default UserPage;