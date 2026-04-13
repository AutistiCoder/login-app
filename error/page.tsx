type ErrorComponentSearchParams = {message:string};
export default function ErrorComponent({searchParams}:{searchParams:ErrorComponentSearchParams | null})
{
    return <div>
        An error occurred.
        {searchParams ? <div>Message: {searchParams.message} </div> : ""};
        
    </div>
}