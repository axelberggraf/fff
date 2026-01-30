import TypeTester from "../modules/typetester";
import AlternatePreview from "../modules/alternatePreview";
import AlternateTogglePreview from "../modules/alternateTogglePreview";
import CustomProject from "../modules/customProject";
import CustomFeatures from "../modules/customFeatures";
import VariableTypeTester from "../modules/variableTypetester";
import { useState } from "react";
const PageBuilder = ({ blocks, parent, fontLoaded }) => {
  const [globalTypetesterSettings, setGlobalTypetesterSettings] = useState();

  const handleGlobalSettings = (settings) => {
    setGlobalTypetesterSettings(settings);
  };
  return (
    <>
      {blocks &&
        blocks.map((block, i) => {
          let Component;
          switch (block._type) {
            case "typetester": {
              Component = (
                <TypeTester
                  defaultCut={block.defaultCut}
                  length={block.length}
                  key={block._key}
                  cuts={parent.cuts}
                  initialStyles={block.activeStyles}
                  stylisticSets={parent.stylisticSets}
                  features={parent.fontFeatures?.features}
                  globalTypetesterSettings={globalTypetesterSettings}
                  handleGlobalSettings={handleGlobalSettings}
                />
              );
              break;
            }
            case "variableTypetester": {
              Component = (
                <VariableTypeTester
                  defaultCut={block.defaultCut}
                  length={block.length}
                  key={block._key}
                  // cuts={parent.cuts}
                  stylisticSets={parent.stylisticSets}
                  features={parent.fontFeatures?.features}
                  globalTypetesterSettings={globalTypetesterSettings}
                  handleGlobalSettings={handleGlobalSettings}
                />
              );
              break;
            }
            case "alternatePreview": {
              Component = (
                <AlternateTogglePreview
                  content={block}
                  fontLoaded={fontLoaded}
                  key={block._key}
                />
              );
              break;
            }
            case "customProject": {
              Component = <CustomProject content={block} key={block._key} />;
              break;
            }
            case "customFeatures": {
              Component = <CustomFeatures content={block} key={block._key} />;
              break;
            }
            default: {
              Component = <div key={block._key}></div>;
            }
          }
          return Component;
        })}
    </>
  );
};

export default PageBuilder;
