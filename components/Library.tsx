"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import SubscribeModal from "./SubscribeMOdal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps{
    songs:Song[];
}
const Library:React.FC<LibraryProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
    const SubscribeModal =useSubscribeModal();
    const AuthModal = useAuthModal();
    const UploadModal = useUploadModal();
    const { user,subscription } = useUser();

    const onclick = () => {
        if (!user) {
            return AuthModal.onOpen();
        }

        if(!subscription){
            return SubscribeModal.onOpen();
        }
        return UploadModal.onOpen();
    }
    return (
        <div className="flex flex-col">
            <div className="
         flex
         items-center
         justify-between
         pt-4
         px-5

       ">
                <div className="inline-flex
                items-center
                gap-x-2
                
                ">
                    <TbPlaylist size={26} className="text-neutral-400
                     font-medium
                      text-md" />
                    <p>Your Library</p>
                </div>
                <AiOutlinePlus onClick={onclick}
                    size={20}
                    className="text-neutral-400
             cursor-pointer
             hover:text-white
             transition
             "
                />
            </div>
            <div className="flex
            flex-col
            gap-y-2
             mt-4
             pc-3
            ">
               {songs.map((item)=>(
                <MediaItem
                onclick={(id:string)=>onplay(id)}
                key={item.id}
                data={item}
                />
               ))}
            </div>
        </div>
    )
}
export default Library;