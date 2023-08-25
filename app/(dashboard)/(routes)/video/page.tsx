import Heading from "@/components/heading";
const HeadingIcon = <i className="fa fa-video-camera" aria-hidden="true"></i>;
const VideoPage = () => {
    return(
    <div>
        <Heading 
            title="Video Generation"
            description="Our greatest video rendering engine"
            icon= {HeadingIcon}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
        />
    </div>
    )
}

export default VideoPage;