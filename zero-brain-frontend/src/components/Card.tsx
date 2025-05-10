import { BACKEND_URL } from "../config";
import { DeleteIcon } from "../icons/DeleteIcon";
import { NoteBookIcon } from "../icons/NoteBookIcon";
import { ShareIcon } from "../icons/ShareIcon";
import axios from "axios";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube"
}

export function Card(props: CardProps) {

    async function deleteCard(){
        await axios.delete(`${BACKEND_URL}/api/v1/user/content`,{
            headers: {
                "Authorization" :localStorage.getItem("token")
            }
        })
    }
    return (
        <div>
            <div className="m-4 p-8 bg-white-rounded-md shadow-md border-slate-200 max-w-72 border min-h-48 min-w-72 bg-white">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-3 text-md">
                        <NoteBookIcon size="md" />
                        <b>{props.title}</b>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <DeleteIcon size="md"/>
                        <a href={props.link} target="_blank">
                            <ShareIcon size="md" />
                        </a>
                    </div>

                </div>


                <div>
                    {/* // embedding a youtube video */}
                    {props.type === "youtube" &&
                        <iframe className='pt-5 w-full' src={props.link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }

                    {/* embedding a tweet */}
                    {props.type === "twitter" && <blockquote className="pt-5 w-full">&mdash;<a href={props.link.replace("x.com","twitter.com")}></a></blockquote>} </div>
            </div>
        </div>

    )
}