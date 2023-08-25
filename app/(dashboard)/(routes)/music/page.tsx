import Heading from "@/components/heading";
const HeadingIcon = <i className="fa fa-music" aria-hidden="true"></i>;

const MusicPage = () => {
    return(
    <div>
        <Heading 
            title="Music Generation"
            description="Fastest music generator around"
            icon={HeadingIcon}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
        />
    </div>
    )
}

export default MusicPage;