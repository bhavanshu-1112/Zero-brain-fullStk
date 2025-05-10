import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react"
import { BACKEND_URL } from "../config";

//@ts-ignore
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
//controlled component
export function CreateContentModel({ open, onClose }: { open: boolean, onClose: () => void }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube)


    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/user/content`, {
            title,
            link,
            type
        },{
            headers : {
                "Authorization": localStorage.getItem("token")
            }
        }
    )
    onClose();
    }
    return (
        <div>
            {open && <div className="w-screen h-screen bg-slate-400 fixed top-0 left-0 opacity-90 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white p-4 rounded-xl ">
                        <div className="flex justify-end">
                            <div onClick={onClose}>
                                <CrossIcon size="md" />

                            </div>
                        </div>
                        <div>
                            <Input placeholder={"Title"} ref={titleRef} />
                            <Input placeholder={"Link"} ref={linkRef} />
                        </div>
                        <div className="flex gap-4 p-2 justify-center">
                            <h1>Type :</h1>

                            <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} size="sm" onClick={() => {
                                setType(ContentType.Youtube)
                            }} />
                            <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} size="sm" onClick={() => {
                                setType(ContentType.Twitter)
                            }} />
                        </div>
                        <div className="p-2 flex justify-center">
                            <Button variant="primary" text="Submit" size={"md"} onClick={addContent} />
                        </div>

                    </span>
                </div>
            </div>
            }
        </div>
    )
}

