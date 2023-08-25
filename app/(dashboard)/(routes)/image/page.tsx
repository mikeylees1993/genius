import Heading from "@/components/heading";

const HeadingIcon = <i className="fa fa-picture-o" aria-hidden="true"></i>;
const ImagePage = () =>{
    return(
    <div> 
        <Heading 
            title="Image Generation"
            description="Our fastest and accurate image generation model yet"
            icon={HeadingIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
        />
    </div>
    )
}

export default ImagePage;