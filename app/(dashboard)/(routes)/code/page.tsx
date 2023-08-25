import Heading from "@/components/heading";
const HeadingIcon = <i className="fa fa-code" aria-hidden="true"></i>;
const CodePage = () =>{
    return(
    <div>
        <Heading 
            title="Code Generation"
            description="Most Advance and complex code generator in the world"
            icon={HeadingIcon}
            iconColor="text-green-700"
            bgColor="bg-green-700/10"
        />
    </div>
    )
}

export default CodePage;