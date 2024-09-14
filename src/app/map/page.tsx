import DashboardHeading from "@/components/atoms/DashboardHeading";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import PageContainer from "@/components/atoms/PageContainer";
import PageWrapper from "@/components/atoms/PageWrapper";
import MapComponent from "@/components/organism/MapComponent";
import { SelectOptions } from "@/types/common";

const DashboardPage = () => {
  const categoryOptions: SelectOptions = [
    { value: "tournaments", label: "Turnieje" },
    { value: "schools", label: "Szkółki i akademie" },
    { value: "sportFields", label: "Boiska i hale na wynajem" },
    { value: "camps", label: "Obozy" },
    { value: "sixLeagues", label: "Ligi szóstek" },
    { value: "services", label: "Usługi" },
  ];
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
      <PageWrapper classNames="flex justify-center mb-8">
        <SelectInput
          label="Kategoria"
          instanceId="esa"
          id="category"
          name="category"
          isMulti
          closeMenuOnSelect={false}
          placeholder="Wybierz kategorię"
          options={categoryOptions}
        />
      </PageWrapper>
      <MapComponent />
    </PageContainer>
  );
};

export default DashboardPage;
