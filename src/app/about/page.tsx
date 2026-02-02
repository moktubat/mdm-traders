import aboutHeader from "@/assets/aboutHeader.webp";
import PageHeader from "@/components/common/PageHeader";
import Activities from "@/components/pages/About/Activities";
import CompanyOverview from "@/components/pages/About/CompanyOverview";
import MissionVision from "@/components/pages/About/MissionVision";
import Teams from "@/components/pages/About/Teams";

const page = () => {
    return (
        <div>
            <PageHeader
                title="09 years of connecting businesses to industry leading voice, data, video and networking solutions."
                backgroundImage={aboutHeader.src}
            />
            <CompanyOverview />
            <MissionVision />
            <Activities />
            <Teams />
        </div>
    );
};

export default page;