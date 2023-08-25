import Heading from "@/components/heading";
const HeadingIcon = <i className="fa fa-cog" aria-hidden="true"></i>;

const SettingsPage = () => {
    return(
    <div>
        <Heading 
            title="Settings"
            description="View and edit system settings"
            icon={HeadingIcon}
            iconColor="text-zinc-400"
            bgColor="bg-zinc-400/20"
        />
    </div>
    )
}

export default SettingsPage;