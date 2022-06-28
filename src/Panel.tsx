import React from "react";
import { useParameter } from "@storybook/api";
import {
  AddonPanel,
  Button,
  H3,
  Icons,
  P,
  Placeholder,
} from "@storybook/components";

interface BreadCrumbProps {
  componentPath: string;
  githubUrl: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({
  componentPath,
  githubUrl,
}) => (
  <Placeholder>
    <H3>{componentPath}</H3>
    <Button isLink primary href={githubUrl}>
      <Icons icon="github" />
      Component Source
    </Button>
  </Placeholder>
);

const BreadCrumbPlaceholder = () => (
  <Placeholder>
    <H3>No Breadcrumb found</H3>
    <P>Add the component import path to your stories parameters</P>
  </Placeholder>
);

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const githubUrl = useParameter("githubComponentUrl", "");
  const breadcrumb = useParameter("breadcrumb", "");

  return (
    <AddonPanel {...props}>
      {breadcrumb ? (
        <BreadCrumb componentPath={breadcrumb} githubUrl={githubUrl} />
      ) : (
        <BreadCrumbPlaceholder />
      )}
    </AddonPanel>
  );
};
